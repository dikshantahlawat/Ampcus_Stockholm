# Ampcus_Stockholm
BioSync : Personal Health Intelligence System 

A full-stack health tracking web application that allows users to log daily activities, visualize trends, and gain intelligent insights into their health.

📌 Project Overview

BioSync helps users monitor their daily health metrics such as:

💤 Sleep
🚶 Steps
🔥 Calories
💧 Water intake
🍽️ Meal details (with file upload)

It transforms raw user data into visual insights and predictions.

✨ Features
🔐 Authentication
User registration & login
JWT-based secure authentication
Protected routes

📝 Activity Logging
Log daily health data
Input validation
Toast notifications
Upload meal image/PDF (Cloudinary)

📊 Dashboard
Real-time stats (Steps, Sleep, Calories, Water)
Health score visualization
Activity trend chart (time-series data)
Future prediction (based on recent logs)

📈 Insights
Average health metrics
Risk score calculation
Trend-based analysis

🧠 AI / Logic Used
Rule-based health scoring system
Time-series trend prediction
Data-driven insights

🛠️ Tech Stack
Frontend
React.js
Tailwind CSS
Axios
Recharts
Backend
Node.js
Express.js
MongoDB
Other Tools
Cloudinary (file upload)
JWT (authentication)

⚙️ How It Works
User logs daily activity
Data is sent to backend APIs
Stored in MongoDB database
Frontend fetches data dynamically
Health score & predictions are calculated
Results displayed through charts & UI


📂 Folder Structure
frontend/
  ├── src/
  │   ├── components/
  │   ├── pages/
  │   ├── utils/
  │   └── data/

backend/
  ├── controllers/
  ├── models/
  ├── routes/
  ├── middleware/

  
 Getting Started
 
1️⃣ Clone the repository
git clone https://github.com/your-username/your-repo-name.git
2️⃣ Install dependencies
Frontend
cd frontend
npm install
npm run dev
Backend
cd backend
npm install
npm run dev
3️⃣ Environment Variables

Create a .env file in backend:

PORT=8080
MONGO_URI=your_mongodb_url
JWT_SECRET=your_secret

CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

Screenshots

Dashboard
Activity Log
Insights

(Add your screenshots here)

Future Improvements

Edit/Delete activity logs
Real AI-based food image classification
Notifications system
Performance optimization

 Conclusion

BioSync is a complete data-driven health tracking system that combines frontend design, backend APIs, and intelligent logic to provide meaningful insights to users
