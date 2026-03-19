import cv2
import os
import time

label = input("Enter label (a,b,c,1,2...): ").lower()

save_path = f"dataset/{label}"
os.makedirs(save_path, exist_ok=True)

cap = cv2.VideoCapture(0)

total_images = 100
count = 0

# 🔥 window name
window_name = "Hand Capture"

print("\nGet ready...")

# 🔥 Countdown with display
for i in range(3, 0, -1):
    ret, frame = cap.read()
    if not ret:
        continue

    cv2.putText(frame, f"Starting in {i}",
                (200, 200),
                cv2.FONT_HERSHEY_SIMPLEX,
                2, (0, 0, 255), 4)

    cv2.imshow(window_name, frame)
    cv2.waitKey(1000)

print("📸 Capturing started!")

while count < total_images:

    ret, frame = cap.read()
    if not ret:
        break

    h, w, _ = frame.shape

    # 🔥 draw center box (where to place hand)
    box_size = 300
    x1 = w//2 - box_size//2
    y1 = h//2 - box_size//2
    x2 = x1 + box_size
    y2 = y1 + box_size

    cv2.rectangle(frame, (x1, y1), (x2, y2), (0,255,0), 2)

    # 🔥 crop region (optional for future)
    hand_region = frame[y1:y2, x1:x2]

    # 🔥 overlay info
    cv2.putText(frame, f"Label: {label.upper()}",
                (10, 40), cv2.FONT_HERSHEY_SIMPLEX,
                1, (0,255,0), 2)

    cv2.putText(frame, f"{count}/{total_images}",
                (10, 80), cv2.FONT_HERSHEY_SIMPLEX,
                1, (255,255,0), 2)

    cv2.putText(frame, "Place hand inside box",
                (x1, y1-10), cv2.FONT_HERSHEY_SIMPLEX,
                0.7, (0,255,0), 2)

    # 🔥 show window
    cv2.imshow(window_name, frame)

    # 🔥 save only the box region (IMPORTANT for accuracy)
    img_path = os.path.join(save_path, f"{count}.jpg")
    cv2.imwrite(img_path, hand_region)

    print(f"Saved {img_path}")

    count += 1

    # 🔥 delay (important for variation)
    time.sleep(0.08)

    if cv2.waitKey(1) & 0xFF == ord('q'):
        break

print("✅ Done capturing!")

cap.release()
cv2.destroyAllWindows()