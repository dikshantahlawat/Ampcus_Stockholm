import pandas as pd
from sklearn.linear_model import LinearRegression
import joblib

def train_model():
    
    data = {
        "sleep": [6, 7, 8, 5, 6, 7, 8],
        "calories": [2000, 2200, 2500, 1800, 2100, 2300, 2600],
        "prev_steps": [4000, 5000, 6000, 5500, 7000, 7500, 8000],
        "steps": [4500, 5200, 6100, 5800, 7200, 7800, 8200]
    }

    df = pd.DataFrame(data)


    X = df[["sleep", "calories", "prev_steps"]]


    y = df["steps"]

   
    model = LinearRegression()
    model.fit(X, y)


    joblib.dump(model, "backend/ml/model.pkl")

    print("Model trained successfully!")

if __name__ == "__main__":
    train_model()
