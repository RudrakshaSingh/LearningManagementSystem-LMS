<p align="center">
  <img src="https://img.shields.io/badge/MERN-Stack-00D8FF?style=for-the-badge&logo=react&logoColor=white" alt="MERN Stack"/>
  <img src="https://img.shields.io/badge/License-ISC-blue?style=for-the-badge" alt="License"/>
  <img src="https://img.shields.io/badge/Node.js-18+-339933?style=for-the-badge&logo=nodedotjs&logoColor=white" alt="Node.js"/>
  <img src="https://img.shields.io/badge/React-18-61DAFB?style=for-the-badge&logo=react&logoColor=black" alt="React 18"/>
</p>

<h1 align="center">📚 Learning Management System (LMS)</h1>

<p align="center">
  <strong>A comprehensive, production-ready Learning Management System built with the MERN stack</strong>
</p>

<p align="center">
  Transform the way you deliver education with our feature-rich platform that empowers educators to create, manage, and monetize courses while providing students with an immersive learning experience.
</p>

---

## 🌟 Overview

This Learning Management System is a full-featured educational platform designed for modern online learning. Built with scalability and user experience in mind, it provides a complete solution for course creators, educators, and students.

### Why This LMS?

- 🎯 **Complete Solution**: Everything you need to run an online education business
- 🔒 **Secure & Reliable**: JWT authentication with role-based access control
- 💳 **Monetization Ready**: Integrated Razorpay payment gateway for subscriptions
- 📱 **Responsive Design**: Beautiful UI that works on all devices
- ☁️ **Cloud-Native**: Cloudinary integration for seamless media management
- 📧 **Automated Communications**: Email notifications for password resets and updates

---

## ✨ Key Features

### 🔐 Authentication & Security
| Feature | Description |
|---------|-------------|
| **User Registration** | Secure sign-up with avatar upload and email validation |
| **JWT Authentication** | Stateless authentication with encrypted tokens |
| **Password Recovery** | Email-based password reset with secure token expiry |
| **Role-Based Access** | Separate permissions for Users and Administrators |
| **Change Password** | Secure password update with old password verification |

### 📚 Course Management
| Feature | Description |
|---------|-------------|
| **Create Courses** | Rich course creation with title, description, category, and thumbnails |
| **Video Lectures** | Upload and manage video content via Cloudinary |
| **Lecture Management** | Add, update, and remove individual lectures |
| **Category Organization** | Organize courses by categories for easy discovery |
| **Course Analytics** | Track course performance and engagement |

### 💳 Subscription System
| Feature | Description |
|---------|-------------|
| **Razorpay Integration** | Secure payment processing with Indian rupee support |
| **Subscription Plans** | Monthly/yearly subscription models |
| **Payment Verification** | Cryptographic signature verification for payments |
| **Refund Support** | 14-day refund policy with automated processing |
| **Payment Analytics** | Track subscriptions and revenue with visual charts |

### 👨‍💼 Admin Dashboard
| Feature | Description |
|---------|-------------|
| **Overview Statistics** | Total users, courses, and revenue at a glance |
| **User Management** | View and manage registered users |
| **Course Administration** | Create, edit, and delete courses |
| **Sales Analytics** | Monthly subscription charts with Chart.js |
| **Content Moderation** | Full control over platform content |

### 👤 User Experience
| Feature | Description |
|---------|-------------|
| **Profile Management** | Update name, avatar, and personal details |
| **Course Discovery** | Browse and search available courses |
| **Video Player** | Stream lecture videos with Cloudinary CDN |
| **Progress Tracking** | Resume courses where you left off |
| **Subscription Status** | View and manage active subscriptions |

---

## 🛠️ Tech Stack

### Frontend
```
┌─────────────────────────────────────────────────────────────────┐
│  Framework     │  React 18.2 with Vite 4.4                      │
│  State         │  Redux Toolkit 1.9.7 + React Redux 8.1.3       │
│  Routing       │  React Router DOM 6.17                         │
│  Styling       │  Tailwind CSS 3.3 + DaisyUI 3.9                │
│  HTTP Client   │  Axios 1.5.1                                   │
│  Charts        │  Chart.js 4.4 + React ChartJS 2                │
│  Icons         │  React Icons 4.11 + Lucide React               │
│  Notifications │  React Hot Toast 2.4                           │
└─────────────────────────────────────────────────────────────────┘
```

### Backend
```
┌─────────────────────────────────────────────────────────────────┐
│  Runtime       │  Node.js 18+                                   │
│  Framework     │  Express.js 4.18                               │
│  Database      │  MongoDB with Mongoose 7.4 ODM                 │
│  Auth          │  JWT (jsonwebtoken 9.0) + bcryptjs 2.4         │
│  File Storage  │  Cloudinary 1.40                               │
│  Payments      │  Razorpay 2.9                                  │
│  Email         │  Nodemailer 6.9                                │
│  File Upload   │  Multer 1.4.5                                  │
│  Logging       │  Morgan 1.10                                   │
└─────────────────────────────────────────────────────────────────┘
```

---

## 🚀 Quick Start

### Prerequisites

Before you begin, ensure you have the following installed:
- **Node.js** (v18 or higher) - [Download](https://nodejs.org/)
- **MongoDB** (Local or Atlas) - [Download](https://www.mongodb.com/)
- **npm** or **yarn** package manager
- **Git** - [Download](https://git-scm.com/)

### Installation

#### 1. Clone the Repository
```bash
git clone https://github.com/RudrakshaSingh/LearningManagementSystem-LMS.git
cd LearningManagementSystem-LMS
```

#### 2. Backend Setup
```bash
# Navigate to server directory
cd server

# Install dependencies
npm install

# Create environment file
cp .env.example.js .env

# Configure your .env file (see Environment Variables section)

# Start the development server
npm run dev
```

#### 3. Frontend Setup
```bash
# Open new terminal and navigate to client directory
cd client

# Install dependencies
npm install

# Start the development server
npm run dev
```

#### 4. Access the Application
- **Frontend**: http://localhost:5173
- **Backend API**: http://localhost:5000

---

## ⚙️ Environment Variables

### Server (`server/.env`)

```env
# Application
NODE_ENV=development
PORT=5000

# Database
MONGO_URI=mongodb://127.0.0.1:27017/lms

# JWT Configuration
JWT_SECRET=your_super_secret_jwt_key_here
JWT_EXPIRY=7d

# Cloudinary (Media Storage)
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

# SMTP (Email)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USERNAME=your_email@gmail.com
SMTP_PASSWORD=your_app_password
SMTP_FROM_EMAIL=noreply@yourlms.com

# Razorpay (Payments)
RAZORPAY_KEY_ID=rzp_test_xxxxx
RAZORPAY_SECRET=your_razorpay_secret
RAZORPAY_PLAN_ID=plan_xxxxx

# Frontend URL
FRONTEND_URL=http://localhost:5173

# Contact
CONTACT_US_EMAIL=contact@yourlms.com
```

### Client Environment
Create a `.env` file in the client directory:
```env
VITE_API_URL=http://localhost:5000/api/v1
```

---

## 📂 Project Structure

```
LearningManagementSystem-LMS/
│
├── 📁 client/                      # React Frontend Application
│   ├── 📁 public/                  # Static assets
│   ├── 📁 src/
│   │   ├── 📁 Assets/              # Images, icons, media
│   │   ├── 📁 Components/          # Reusable UI components
│   │   │   └── 📁 Auth/            # Authentication guards
│   │   ├── 📁 Constants/           # App constants
│   │   ├── 📁 Helpers/             # Utility functions
│   │   ├── 📁 Layouts/             # Page layouts
│   │   ├── 📁 Pages/               # Application pages
│   │   │   ├── 📁 Course/          # Course pages
│   │   │   ├── 📁 Dashboard/       # Admin dashboard
│   │   │   ├── 📁 Payment/         # Checkout & status
│   │   │   ├── 📁 Policy/          # Legal pages
│   │   │   └── 📁 User/            # User profile pages
│   │   └── 📁 Redux/               # State management
│   │       └── 📁 Slices/          # Redux slices
│   ├── 📄 package.json
│   └── 📄 README.md
│
├── 📁 server/                      # Node.js Backend API
│   ├── 📁 config/                  # Configuration files
│   ├── 📁 controllers/             # Route handlers
│   │   ├── 📄 userController.js
│   │   ├── 📄 courseController.js
│   │   ├── 📄 paymentController.js
│   │   └── 📄 miscellaneousController.js
│   ├── 📁 middlewares/             # Custom middleware
│   │   ├── 📄 authMiddleware.js
│   │   └── 📄 asyncHandlerMiddleware.js
│   ├── 📁 models/                  # Mongoose schemas
│   │   ├── 📄 userModel.js
│   │   ├── 📄 courseModel.js
│   │   └── 📄 paymentModel.js
│   ├── 📁 routes/                  # API routes
│   ├── 📁 uploads/                 # Temporary file storage
│   ├── 📁 utilityFunctions/        # Helper functions
│   ├── 📄 app.js                   # Express app setup
│   ├── 📄 server.js                # Entry point
│   └── 📄 package.json
│
└── 📄 README.md                    # This file
```

---

## 🔗 API Reference

### Authentication Endpoints
| Method | Endpoint | Description | Access |
|--------|----------|-------------|--------|
| POST | `/api/v1/user/register` | Register new user | Public |
| POST | `/api/v1/user/login` | User login | Public |
| POST | `/api/v1/user/logout` | User logout | Public |
| GET | `/api/v1/user/me` | Get logged-in user | Private |
| POST | `/api/v1/user/reset` | Forgot password | Public |
| POST | `/api/v1/user/reset/:token` | Reset password | Public |
| POST | `/api/v1/user/change-password` | Change password | Private |
| PUT | `/api/v1/user/update/:id` | Update profile | Private |

### Course Endpoints
| Method | Endpoint | Description | Access |
|--------|----------|-------------|--------|
| GET | `/api/v1/courses` | Get all courses | Public |
| POST | `/api/v1/courses` | Create course | Admin |
| GET | `/api/v1/courses/:id` | Get course lectures | Subscribed |
| PUT | `/api/v1/courses/:id` | Update course | Admin |
| DELETE | `/api/v1/courses/:id` | Delete course | Admin |
| POST | `/api/v1/courses/:id` | Add lecture | Admin |
| DELETE | `/api/v1/courses` | Remove lecture | Admin |

### Payment Endpoints
| Method | Endpoint | Description | Access |
|--------|----------|-------------|--------|
| GET | `/api/v1/payments/razorpay-key` | Get Razorpay key | Public |
| POST | `/api/v1/payments/subscribe` | Create subscription | Private |
| POST | `/api/v1/payments/verify` | Verify payment | Private |
| POST | `/api/v1/payments/unsubscribe` | Cancel subscription | Private |
| GET | `/api/v1/payments` | Get all payments | Admin |

---

## 🖼️ Screenshots

<p align="center">
  <i>Coming soon - Screenshots of the application interface</i>
</p>

---

## 🔧 Development

### Available Scripts

**Client:**
```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run preview  # Preview production build
npm run lint     # Run ESLint
```

**Server:**
```bash
npm run dev      # Start with nodemon (hot-reload)
npm start        # Start production server
```

### Code Quality
This project uses:
- ESLint for code linting
- Simple Import Sort for organized imports
- Prettier-compatible formatting

---

## 🔐 Third-Party Services Setup

### Cloudinary (Media Storage)
1. Create account at [cloudinary.com](https://cloudinary.com)
2. Navigate to Dashboard
3. Copy Cloud Name, API Key, and API Secret
4. Add to your `.env` file

### Razorpay (Payments)
1. Create account at [razorpay.com](https://razorpay.com)
2. Navigate to Settings → API Keys
3. Generate test/live keys
4. Create a subscription plan and copy Plan ID
5. Add credentials to `.env`

### MongoDB Atlas (Database)
1. Create account at [mongodb.com/atlas](https://mongodb.com/atlas)
2. Create a new cluster
3. Get connection string
4. Add to `MONGO_URI` in `.env`

### Gmail SMTP (Email)
1. Enable 2-Factor Authentication on Google Account
2. Generate App Password (Security → App Passwords)
3. Use this password in `SMTP_PASSWORD`

---

## 🚀 Deployment

### Vercel (Frontend)
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
cd client
vercel
```

### Backend (Railway/Render)
1. Push code to GitHub
2. Connect repository to Railway/Render
3. Add environment variables
4. Deploy

---

## 🤝 Contributing

While this is a solo project, suggestions and feedback are welcome!

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📄 License

This project is licensed under the **ISC License**.

---

## 👨‍💻 Author

<p align="center">
  <strong>Thakur Rudraksha Singh</strong>
  <br/>
  <a href="https://github.com/RudrakshaSingh">
    <img src="https://img.shields.io/badge/GitHub-RudrakshaSingh-181717?style=for-the-badge&logo=github" alt="GitHub"/>
  </a>
</p>

---

## 🙏 Acknowledgments

- [React](https://react.dev/) - Frontend library
- [Express.js](https://expressjs.com/) - Backend framework
- [MongoDB](https://www.mongodb.com/) - Database
- [Razorpay](https://razorpay.com/) - Payment gateway
- [Cloudinary](https://cloudinary.com/) - Media storage
- [Tailwind CSS](https://tailwindcss.com/) - Styling
- [DaisyUI](https://daisyui.com/) - UI components

---

<p align="center">
  Made with ❤️ by Thakur Rudraksha Singh
</p>

<p align="center">
  ⭐ Star this repository if you find it helpful!
</p>
