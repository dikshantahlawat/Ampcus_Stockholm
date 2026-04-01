import joblib

def predict_steps(sleep, calories, prev_steps):
    model = joblib.load("backend/ml/model.pkl")

    prediction = model.predict([[sleep, calories, prev_steps]])

    return float(prediction[0])



if __name__ == "__main__":
    result = predict_steps(7, 2200, 5000)
    print("Predicted Steps:", result)
