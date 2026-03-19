import os
import cv2
import mediapipe as mp
import csv
from tqdm import tqdm

input_path = "dataset"
output_path = "dataset_csv"

os.makedirs(output_path, exist_ok=True)

# 🔥 mediapipe setup
mp_hands = mp.solutions.hands
hands = mp_hands.Hands(
    static_image_mode=True,
    max_num_hands=1,
    model_complexity=0
)

print("\n📂 Processing dataset (INCREMENTAL MODE)...\n")

total_new = 0

for folder in os.listdir(input_path):

    folder_path = os.path.join(input_path, folder)

    if not os.path.isdir(folder_path):
        continue

    label = folder.lower()
    images = sorted(os.listdir(folder_path))  # 🔥 sorted for consistency

    csv_file = os.path.join(output_path, f"{label}.csv")

    # 🔥 check existing rows
    processed_count = 0

    if os.path.exists(csv_file):
        with open(csv_file, "r") as f:
            processed_count = sum(1 for _ in f)

    print(f"\n📁 {label}: total={len(images)} | already={processed_count}")

    # 🔥 open in append mode
    with open(csv_file, "a", newline="") as f:

        writer = csv.writer(f)

        # 🔥 skip already processed images
        new_images = images[processed_count:]

        for img_name in tqdm(new_images, desc=f"{label}", ncols=100):

            img_path = os.path.join(folder_path, img_name)

            image = cv2.imread(img_path)
            if image is None:
                continue

            image = cv2.resize(image, (320, 240))
            rgb = cv2.cvtColor(image, cv2.COLOR_BGR2RGB)

            result = hands.process(rgb)

            if result.multi_hand_landmarks:

                for hand_landmarks in result.multi_hand_landmarks:

                    landmarks = [(lm.x, lm.y, lm.z) for lm in hand_landmarks.landmark]

                    xs = [x for x, y, z in landmarks]
                    ys = [y for x, y, z in landmarks]

                    min_x, max_x = min(xs), max(xs)
                    min_y, max_y = min(ys), max(ys)

                    row = []

                    for x, y, z in landmarks:
                        row.append((x - min_x) / (max_x - min_x + 1e-6))
                        row.append((y - min_y) / (max_y - min_y + 1e-6))
                        row.append(z)

                    writer.writerow(row)
                    total_new += 1

print(f"\n✅ DONE: Added {total_new} new samples only 🚀")