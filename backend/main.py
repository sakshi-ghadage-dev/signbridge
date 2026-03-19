from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import cv2
import numpy as np
import mediapipe as mp
import joblib
import base64
import time
import pandas as pd
from collections import deque, Counter

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

model = joblib.load("sign_model.pkl")

print("🔥 MODEL FEATURES:", model.n_features_in_)

mp_hands = mp.solutions.hands
hands = mp_hands.Hands(max_num_hands=1)

prediction_buffer = deque(maxlen=5)

current_word = ""
last_letter = ""
last_time = 0


# ✅ 63 FEATURE BUILDER (x,y,z)
def build_features(landmarks):
    feature = []
    for x, y, z in landmarks:
        feature.append(x)
        feature.append(y)
        feature.append(z)
    return feature


@app.post("/predict")
async def predict(data: dict):
    global current_word, last_letter, last_time

    try:
        print("\n🔥 API HIT")

        image_data = data["image"]

        # ✅ SAFE BASE64 DECODE
        if "," in image_data:
            image_data = image_data.split(",")[1]

        image_bytes = base64.b64decode(image_data)
        np_arr = np.frombuffer(image_bytes, np.uint8)
        frame = cv2.imdecode(np_arr, cv2.IMREAD_COLOR)

        if frame is None:
            print("❌ Frame decode failed")
            return {"sign": current_word, "letter": "", "confidence": 0}

        rgb = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)
        result = hands.process(rgb)

        print("Landmarks detected:", bool(result.multi_hand_landmarks))

        if result.multi_hand_landmarks:

            for hand_landmarks in result.multi_hand_landmarks:

                landmarks = [(lm.x, lm.y, lm.z) for lm in hand_landmarks.landmark]

                feature = build_features(landmarks)

                print("Feature length:", len(feature))
                print("First 5:", feature[:5])

                df = pd.DataFrame([feature])

                proba = model.predict_proba(df)[0]
                pred = model.predict(df)[0].lower()

                model_conf = np.max(proba)

                print("Prediction:", pred)
                print("Model confidence:", model_conf)

                # smoothing
                prediction_buffer.append(pred)

                most_common = Counter(prediction_buffer).most_common(1)[0][0]
                freq = Counter(prediction_buffer)[most_common]

                confidence = (freq / len(prediction_buffer)) * model_conf

                print("Final:", most_common, confidence)

                if confidence < 0.3:
                    return {"sign": current_word, "letter": "", "confidence": 0}

                current_time = time.time()

                if most_common != last_letter and (current_time - last_time) > 1.0:

                    if most_common == "space":
                        current_word += " "
                    elif most_common == "del":
                        current_word = current_word[:-1]
                    else:
                        current_word += most_common

                    last_letter = most_common
                    last_time = current_time

                return {
                    "sign": current_word,
                    "letter": most_common,
                    "confidence": round(confidence * 100, 2),
                }

        return {"sign": current_word, "letter": "", "confidence": 0}

    except Exception as e:
        print("❌ ERROR:", e)
        return {"sign": current_word, "letter": "", "confidence": 0}