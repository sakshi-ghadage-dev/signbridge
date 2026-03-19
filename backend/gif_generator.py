from PIL import Image, ImageEnhance
import imageio
import numpy as np
import os

INPUT_FOLDER = "Input"
OUTPUT_FOLDER = "../frontend/public/signs"

os.makedirs(OUTPUT_FOLDER, exist_ok=True)

def create_gif(image_path, output_path):
    img = Image.open(image_path).convert("RGBA")
    frames = []
    num_frames = 20

    for i in range(num_frames):
        frame = img.copy()

        # 🔥 Zoom effect
        scale = 1 + 0.05 * np.sin(i / 3)
        new_size = (
            int(frame.width * scale),
            int(frame.height * scale)
        )
        frame = frame.resize(new_size)

        # Center align
        canvas = Image.new("RGBA", img.size, (255, 255, 255, 0))
        x = (canvas.width - frame.width) // 2
        y = (canvas.height - frame.height) // 2
        canvas.paste(frame, (x, y), frame)
        frame = canvas

        # 🔥 Rotation
        angle = 2 * np.sin(i / 4)
        frame = frame.rotate(angle)

        # 🔥 Brightness
        enhancer = ImageEnhance.Brightness(frame)
        frame = enhancer.enhance(1 + 0.1 * np.sin(i / 2))

        # 🔥 Micro movement
        shift_x = int(3 * np.sin(i))
        shift_y = int(2 * np.cos(i))

        shifted = Image.new("RGBA", frame.size, (255, 255, 255, 0))
        shifted.paste(frame, (shift_x, shift_y), frame)

        frames.append(shifted)

    imageio.mimsave(output_path, frames, duration=0.08)

    print(f"✅ Created: {output_path}")


# 🚀 PROCESS ALL IMAGES
for file in os.listdir(INPUT_FOLDER):
    if file.endswith(".png") or file.endswith(".jpg"):
        name = os.path.splitext(file)[0].lower()

        input_path = os.path.join(INPUT_FOLDER, file)
        output_path = os.path.join(OUTPUT_FOLDER, f"{name}.gif")

        create_gif(input_path, output_path)

print("🔥 ALL GIFS GENERATED SUCCESSFULLY!")