# 🎓 Learning Management System (LMS)

A full-stack Learning Management System built with the **MERN Stack** that provides a complete platform for students and instructors to manage, purchase, and consume online courses. The application includes secure authentication, course management, video learning, progress tracking, payments, ratings, cloud-based media management, and AI-powered learning assistance.

## 🚀 Live Demo

**Frontend:** Add your deployed frontend URL here

**Backend API:** Add your deployed backend URL here

## 📌 Features

### 🔐 Authentication & Authorization

* Secure JWT-based authentication
* HTTP-only cookie-based authentication
* Password hashing with bcrypt
* Protected routes and API endpoints
* Role-based access for students and instructors
* Secure logout functionality

### 👨‍🏫 Instructor Features

* Create and manage courses
* Upload course thumbnails
* Add and manage video lectures
* Upload videos and media using Cloudinary
* Update and delete courses
* Manage course content
* Track course-related information

### 🎓 Student Features

* Browse available courses
* Search and filter courses
* View course details
* Enroll in courses
* Purchase paid courses
* Access enrolled course content
* Continue videos from the last watched position
* Track video and course progress
* Mark lectures as completed
* Rate and review courses

### 💳 Payment Integration

* Integrated Stripe Checkout
* Secure online course payments
* Payment verification
* Automatic course enrollment after successful payment
* Payment webhook handling

### 📹 Video Learning System

* Cloudinary-based video storage
* Course video management
* Video duration tracking
* Video preview support
* Watch progress tracking
* Resume playback functionality
* Video completion tracking
* Course-level progress calculation

### ⭐ Ratings & Reviews

* Students can rate courses
* Rating validation
* Course rating aggregation
* Average course rating tracking

### 🔎 Search & Pagination

* Course search functionality
* Category-based filtering
* Server-side pagination
* Efficient MongoDB queries

### 🤖 AI Learning Assistance

* AI-powered learning assistance
* Integration with AI APIs
* Students can interact with the learning assistant for course-related help

### ☁️ Cloud Media Management

* Cloudinary integration for image and video uploads
* Secure media URLs
* Cloud resource management
* Media cleanup when resources are deleted or replaced

### 📱 Responsive UI

* Responsive design for desktop, tablet, and mobile devices
* Modern React-based user interface
* Reusable components
* Student and instructor dashboards
* User-friendly course learning experience

---

# 🛠️ Tech Stack

## Frontend

* React.js
* React Router
* Tailwind CSS
* Axios
* React Icons
* Vite

## Backend

* Node.js
* Express.js
* MongoDB
* Mongoose
* JWT
* bcrypt
* Cookie Parser
* Express Validator
* Stripe
* Cloudinary
* Multer

## AI

* Google Generative AI / AI API integration

## Development & Deployment

* Git
* GitHub
* Vercel

---

# 🏗️ Project Architecture

The backend follows a modular **MVC architecture** with separate responsibilities for routes, controllers, models, middleware, validation, configuration, and utility functions.

```text
LMS/
│
├── backend/
│   └── src/
│       ├── config/
│       ├── controllers/
│       ├── db/
│       ├── helpers/
│       ├── middleware/
│       ├── models/
│       ├── routes/
│       ├── utils/
│       └── validators/
│
└── frontend/
    └── lms/
        ├── src/
        │   ├── components/
        │   ├── pages/
        │   ├── context/
        │   ├── api/
        │   └── ...
        └── ...
```

---

# 🔄 Application Flow

```text
User
  │
  ▼
React Frontend
  │
  │ Axios / REST API
  ▼
Express.js Backend
  │
  ├── Authentication & Authorization
  ├── Course Management
  ├── Enrollment
  ├── Progress Tracking
  ├── Ratings & Reviews
  └── Payment Processing
  │
  ▼
MongoDB
  │
  └── Users, Courses, Videos,
      Enrollments, Progress & Ratings

External Services:

Cloudinary → Images & Videos
Stripe    → Payments
AI API    → Learning Assistance
```

---

# 🔑 Core API Modules

The backend provides RESTful APIs for:

* Authentication
* User management
* Course management
* Video management
* Enrollment
* Learning progress
* Ratings and reviews
* Payments
* AI learning assistance

API routes are organized using versioned endpoints and protected through authentication and authorization middleware where required.

---

# 🗄️ Database Models

The application uses MongoDB with Mongoose for data modeling.

Main collections include:

* `User`
* `Course`
* `Video`
* `Enrollment`
* `Progress`
* `Rating`

Relationships between entities are handled using MongoDB references and Mongoose population where required.

---

# ⚙️ Installation & Setup

## 1. Clone the Repository

```bash
git clone https://github.com/YOUR_USERNAME/YOUR_REPOSITORY.git
cd YOUR_REPOSITORY
```

## 2. Install Backend Dependencies

```bash
cd backend
npm install
```

## 3. Install Frontend Dependencies

```bash
cd ../frontend/lms
npm install
```

---

# 🔐 Environment Variables

Create a `.env` file inside the backend directory.

```env
PORT=5000

MONGODB_URI=your_mongodb_connection_string

JWT_SECRET=your_jwt_secret

FRONTEND_URL=http://localhost:5173

CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret

STRIPE_SECRET_KEY=your_stripe_secret_key
STRIPE_WEBHOOK_SECRET=your_stripe_webhook_secret

AI_API_KEY=your_ai_api_key
```

> Never commit your real `.env` file or API credentials to GitHub.

---

# ▶️ Running the Application

## Start Backend

```bash
cd backend
npm run dev
```

## Start Frontend

```bash
cd frontend/lms
npm run dev
```

The frontend will normally run on:

```text
http://localhost:5173
```

The backend will normally run on:

```text
http://localhost:5000
```

---

# 💳 Stripe Webhook

The application uses Stripe webhooks to process successful payment events and complete the corresponding enrollment workflow.

For local development, Stripe CLI can be used to forward webhook events to the backend.

```bash
stripe listen --forward-to localhost:5000/v1/payment/webhook
```

Use your actual webhook route if it differs from the example above.

---

# 🔒 Security

The application implements several security practices:

* JWT-based authentication
* HTTP-only cookies
* Password hashing with bcrypt
* Protected API routes
* Role-based authorization
* Input validation
* CORS configuration
* Environment-based secret management
* Secure payment processing through Stripe

---

# 📈 Future Improvements

Potential improvements include:

* Refresh token rotation
* Advanced rate limiting
* Email verification
* Password reset functionality
* Course certificates
* Instructor analytics
* Advanced course recommendations
* Notifications
* Automated testing
* CI/CD pipeline
* Redis-based caching
* Advanced search using MongoDB Atlas Search

---

# 👨‍💻 Author

**Muhammad Ahmad**

Full Stack MERN Developer

* GitHub: Add your GitHub profile URL
* LinkedIn: Add your LinkedIn profile URL

---

# ⭐ Project Highlights

This project demonstrates practical experience with:

**Full-Stack Development • RESTful APIs • MERN Architecture • Authentication • Authorization • Cloudinary • Stripe Payments • MongoDB • Video Progress Tracking • Responsive React UI • AI Integration • MVC Architecture • API Security**

If you find this project useful, consider giving it a ⭐ on GitHub.
