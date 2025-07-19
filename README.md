# Personalized Diet Planner

A full-stack hackathon project that provides personalized diet plans based on BMI and health goals. Built with a monorepo structure using modern web technologies. The final push was delayed due to that I was encountering an HTTP 503 error from the Git server.

---

## 🚀 Tech Stack

### Frontend
- **React** 19.0.0
- **TypeScript** 5.8.3
- **Vite** 6.3.1
- **Formik** 2.4.6
- **Yup** 1.6.1
- **Redux Toolkit** 2.7.0
- **Tailwind CSS** 3.3.5
- **Axios** 1.9.0

### Backend
- **Node.js** 24.0.2
- **Express** 5.1.0
- **TypeScript** 5.8.3
- **Express Validator** 7.5.1
- **JWT** for Authentication
- **Bcrypt** 3.0.2 for Password Hashing
- **Morgan** for Logging
- **MongoDB** with **Mongoose**

### Security
- **Express Validator**
- **Express Rate Limiter**
- **Helmet**
- **CORS**

---

## 📁 Folder Structure
/personalized-diet-planner 
├── /client # Frontend (React + Vite) │ ├── /src │...
/server # Backend (Express + Node) │ ├── /src │ ...


---

## ⚙️ Setup Instructions

### Prerequisites
- Node.js v24+
- MongoDB running locally or via Atlas

### 1. Clone the Repository
```bash
git clone https://github.com/your-username/personalized-diet-planner.git
cd personalized-diet-planner

# Install root dependencies
npm install

# Install frontend dependencies
cd client
npm install

# Install backend dependencies
cd ../server
npm install

Create .env file in client with necessary key:
VITE_BASE_URL=http://localhost:3000/api/v1

Create .env file in server with necessary keys:
MONGO_URI=mongodb://localhost:27017/dietPlanner
PORT=3000
JWT_SECRET=authenticated_user_secret
BASIC_API_URL=/api/v1

MONGO_URI
JWT_SECRET
PORT

# Start backend
cd server
npm run dev

# Start frontend
cd ../client
npm run dev


🧪 Usage
Register and log in.
Fill in your profile with age, gender, height, weight, activity level, and dietary preferences.
View your BMI and health recommendations.
Generate a weekly diet plan.
Track your metrics and update them periodically.
View everything from your dashboard.

