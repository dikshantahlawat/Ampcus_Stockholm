# BioSync : Personal Health Intelligence System

A **full-stack health tracking web application** that allows users to **log daily activities, visualize trends, and gain meaningful insights** into their health.

---

##  Project Overview

**BioSync** helps users monitor their daily health metrics such as:

- **Sleep**
- **Steps**
- **Calories**
- **Water Intake**
- **Meal Details (with file upload support)**

It transforms **raw user data into visual insights and simple predictions**, making health tracking easy and interactive.

---

##  Features

###  Authentication
- **User Registration & Login**
- **JWT-based secure authentication**
- **Protected routes for authorized access**

---

###  Activity Logging
- Log daily health data easily  
- **Form validation for accurate input**
- **Toast notifications for better UX**
- Upload **meal images or PDF files (Cloudinary integration)**  

---

###  Dashboard
- **Real-time stats** (Steps, Sleep, Calories, Water)
- **Health score visualization**
- **Interactive activity trend chart (time-series data)**
- **Future prediction based on recent activity logs**

---

### Insights
- **Average health metrics calculation**
- **Risk score generation**
- **Trend-based analysis for better understanding**

---

## AI / Logic Used

- **Rule-based health scoring system**
- **Time-series trend prediction**
- **Data-driven insights (based on user logs)**

>  Note: This project uses **logic-based prediction**, not full machine learning models.

---

##  Tech Stack

###  Frontend
- **React.js**
- **Tailwind CSS**
- **Axios**
- **Recharts (for graphs)**

### Backend
- **Node.js**
- **Express.js**
- **MongoDB**

### Other Tools
- **Cloudinary (file upload)**
- **JWT (authentication)**

---

## How It Works

1. User logs daily activity  
2. Data is sent to **backend APIs**  
3. Stored securely in **MongoDB database**  
4. Frontend fetches data dynamically  
5. **Health score & predictions are calculated**  
6. Results are displayed via **charts and UI**

---

## Environment Variables

Create a `.env` file in backend:


---

##  Screenshots

###  Dashboard
<img width="1899" height="866" alt="image" src="https://github.com/user-attachments/assets/a6324b5f-6645-4a31-b028-97cd1bc90c95" />


###  Activity Log
<img width="1892" height="866" alt="image" src="https://github.com/user-attachments/assets/be83e894-bb11-4b2f-9642-a912afd9cd57" />


###  Insights
<img width="1897" height="865" alt="image" src="https://github.com/user-attachments/assets/de27ba03-30e7-41c9-9337-7b1b25f12ea2" />

---


