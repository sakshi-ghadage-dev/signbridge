import pandas as pd
import os

folder = "dataset_csv"

all_data = []

for file in os.listdir(folder):

    if file.endswith(".csv"):

        path = os.path.join(folder, file)
        df = pd.read_csv(path)

        label = file.replace(".csv", "")

        # अगर label column already नहीं है
        if "label" not in df.columns:
            df["label"] = label

        all_data.append(df)

# Merge all files
final_data = pd.concat(all_data, ignore_index=True)

# Save
final_data.to_csv("dataset.csv", index=False)

print("✅ Dataset merged successfully!")