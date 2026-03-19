import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestClassifier
import joblib

# ✅ Load dataset safely
data = pd.read_csv("dataset.csv", header=None, low_memory=False)

print("Original shape:", data.shape)

# ✅ Last column = label
X = data.iloc[:, :-1]
y = data.iloc[:, -1].astype(str)

# 🔥 FORCE ALL FEATURES TO NUMERIC
X = X.apply(pd.to_numeric, errors='coerce')

# ✅ Replace invalid values with 0
X = X.fillna(0)

# ✅ Assign proper column names
X.columns = [f"f{i}" for i in range(X.shape[1])]

print("After cleaning:", X.shape)

# Split
X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.2, random_state=42
)

# Model
model = RandomForestClassifier(n_estimators=200)
model.fit(X_train, y_train)

# Accuracy
acc = model.score(X_test, y_test)
print("🔥 Accuracy:", acc)

# Save model
joblib.dump(model, "sign_model.pkl")

print("✅ Model trained successfully!")