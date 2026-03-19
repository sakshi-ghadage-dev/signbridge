import os
import pandas as pd
import joblib
import time

from tqdm import tqdm
from sklearn.model_selection import train_test_split
from sklearn.metrics import accuracy_score, classification_report
from sklearn.ensemble import ExtraTreesClassifier

data_path = "dataset_csv"

all_data = []

print("📂 Loading CSV files...")

files = [f for f in os.listdir(data_path) if f.endswith(".csv")]

for file in tqdm(files, desc="Reading CSV"):

    label = file.replace(".csv", "").lower()

    df = pd.read_csv(os.path.join(data_path, file), header=None)

    df["label"] = label

    all_data.append(df)

print("📊 Combining data...")
data = pd.concat(all_data, ignore_index=True)

# 🔥 REMOVE DUPLICATES
print("🧹 Removing duplicates...")
data = data.drop_duplicates()

print("🔀 Shuffling data...")
data = data.sample(frac=1, random_state=42).reset_index(drop=True)

print("✂️ Splitting features and labels...")
X = data.drop("label", axis=1)
y = data["label"]

# ✅ FEATURE CHECK (UPDATED)
print(f"📐 Feature count: {X.shape[1]}")
if X.shape[1] != 63:
    print("❌ ERROR: Expected 63 features. Regenerate CSV.")
    exit()

print(f"✅ Total samples after cleaning: {len(data)}")

print("\n📈 Class distribution:")
print(y.value_counts())

# 🔥 BALANCE DATA
print("\n⚖️ Balancing dataset...")

min_samples = y.value_counts().min()

balanced_data = []

for label in y.unique():
    subset = data[data["label"] == label].sample(min_samples, random_state=42)
    balanced_data.append(subset)

data = pd.concat(balanced_data, ignore_index=True)

X = data.drop("label", axis=1)
y = data["label"]

print(f"✅ Balanced samples per class: {min_samples}")

# 🔥 TRAIN TEST SPLIT
print("\n🧪 Splitting train/test...")
X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.2, random_state=42, stratify=y
)

# 🔥 MODEL TRAINING
print("\n🚀 Training model (this may take a few minutes)...")

start = time.time()

model = ExtraTreesClassifier(
    n_estimators=200,
    n_jobs=-1,
    random_state=42
)

model.fit(X_train, y_train)

end = time.time()

print(f"\n⏱ Training completed in {end - start:.2f} seconds")

# 🔥 EVALUATION
print("\n📊 Evaluating model...")

y_pred = model.predict(X_test)

acc = accuracy_score(y_test, y_pred)

print(f"\n✅ Accuracy: {acc * 100:.2f}%")

print("\n📋 Classification Report:")
print(classification_report(y_test, y_pred))

# 🔥 SAVE MODEL
print("\n💾 Saving model...")
joblib.dump(model, "sign_model.pkl")

print("\n🎉 MODEL READY 🚀")