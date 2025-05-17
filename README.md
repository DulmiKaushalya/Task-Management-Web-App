# 📋 Task Management Web App

A comprehensive task management system designed for administrators to efficiently manage intern tasks with a modern, responsive interface.

## ✨ Features

- **User Authentication** - Secure login/registration using OAuth 2.0 (Google)
- **Task Management** - Complete CRUD operations for intern tasks
- **Report Generation** - Export task data as PDF reports
- **Modern UI** - Built with Tailwind CSS

## 🛠️ Technology Stack

### Frontend
- React.js
- Tailwind CSS
- React Router for navigation
- PDF generation library

### Backend
- Node.js with Express
- MongoDB for database
- Passport.js for OAuth authentication

## 🚀 Getting Started

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/DulmiKaushalya/Task-Management-Web-App.git
   ```

2. **Set up environment variables**
   `.env`
   ```
   PORT=5000
   GOOGLE_CLIENT_ID=your_google_client_id
   GOOGLE_CLIENT_SECRET=your_google_client_secret
   MONGO_URI=mongodb+srv://dulmikaushalya02:dulmikaushalya02@cluster0.exj77ho.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0
   SESSION_SECRET=s3cureAndRand0mStr1ng
   CLIENT_URL=http://localhost:5173
   ```


### Running the Application

1. **Start the backend server**
   ```bash
   cd backend
   npm start
   ```
   The backend will run on http://localhost:5000

2. **Start the frontend**
   ```bash
   cd frontend
   npm run dev
   ```
   The frontend will run on http://localhost:5173
