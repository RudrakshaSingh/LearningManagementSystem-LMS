<p align="center">
  <img src="https://img.shields.io/badge/React-18.2-61DAFB?style=for-the-badge&logo=react&logoColor=black" alt="React"/>
  <img src="https://img.shields.io/badge/Vite-4.4-646CFF?style=for-the-badge&logo=vite&logoColor=white" alt="Vite"/>
  <img src="https://img.shields.io/badge/Redux-Toolkit-764ABC?style=for-the-badge&logo=redux&logoColor=white" alt="Redux"/>
  <img src="https://img.shields.io/badge/Tailwind-3.3-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white" alt="Tailwind"/>
</p>

<h1 align="center">📱 LMS Client Application</h1>

<p align="center">
  <strong>Modern React-based frontend for the Learning Management System</strong>
</p>

<p align="center">
  A beautifully crafted, responsive single-page application built with React 18, featuring smooth animations, intuitive navigation, and a premium dark-themed UI powered by Tailwind CSS and DaisyUI.
</p>

---

## 🌟 Features

### 🎨 User Interface
- **Modern Dark Theme**: Premium dark mode with carefully chosen color palette
- **Responsive Design**: Mobile-first approach, works seamlessly on all devices
- **DaisyUI Components**: Beautiful, accessible UI components out of the box
- **Smooth Animations**: Micro-interactions for enhanced user experience
- **Toast Notifications**: Real-time feedback with React Hot Toast
- **Icon Libraries**: Rich iconography with React Icons and Lucide

### 📱 Core Pages

| Page | Description | Access |
|------|-------------|--------|
| **Home** | Landing page with hero section and course highlights | Public |
| **About Us** | Platform information and mission statement | Public |
| **Contact** | Contact form for user inquiries | Public |
| **Courses** | Browse all available courses | Public |
| **Course Details** | Detailed course information and enrollment | Public |
| **Login** | User authentication | Public |
| **Sign Up** | New user registration with avatar upload | Public |
| **Profile** | User dashboard with subscription status | Private |
| **Edit Profile** | Update personal information and avatar | Private |
| **Checkout** | Subscription purchase flow | Private |
| **Admin Dashboard** | Analytics and management (Admin only) | Admin |
| **Create Course** | Course creation interface | Admin |
| **Add Lecture** | Upload video lectures | Admin |

### 🔐 Authentication Flow
```
┌─────────────┐    ┌─────────────┐    ┌─────────────┐
│   Sign Up   │ ─▶ │   Login     │ ─▶ │  Dashboard  │
│ (with avatar)│    │ (JWT token) │    │  (profile)  │
└─────────────┘    └─────────────┘    └─────────────┘
                          │
                          ▼
              ┌───────────────────────┐
              │    Password Reset     │
              │  (email verification) │
              └───────────────────────┘
```

### 📊 State Management
- **Redux Toolkit**: Centralized state management
- **RTK Slices**: Modular slice architecture
  - `authSlice` - Authentication state
  - `courseSlice` - Course data management
  - `razorpaySlice` - Payment processing
  - `lectureSlice` - Lecture management
  - `statSlice` - Dashboard analytics

---

## 🛠️ Tech Stack

| Category | Technology | Version |
|----------|------------|---------|
| **Framework** | React | 18.2.0 |
| **Build Tool** | Vite | 4.4.5 |
| **State Management** | Redux Toolkit | 1.9.7 |
| **Routing** | React Router DOM | 6.17.0 |
| **Styling** | Tailwind CSS | 3.3.3 |
| **UI Components** | DaisyUI | 3.9.3 |
| **HTTP Client** | Axios | 1.5.1 |
| **Charts** | Chart.js + react-chartjs-2 | 4.4.0 / 5.2.0 |
| **Icons** | React Icons + Lucide | 4.11.0 / 0.476.0 |
| **Notifications** | React Hot Toast | 2.4.1 |

---

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- npm or yarn
- Backend server running on port 5000

### Installation

```bash
# Navigate to client directory
cd client

# Install dependencies
npm install

# Create environment file
echo "VITE_API_URL=http://localhost:5000/api/v1" > .env

# Start development server
npm run dev
```

### Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server with HMR |
| `npm run build` | Build for production |
| `npm run preview` | Preview production build |
| `npm run lint` | Run ESLint checks |

---

## 📂 Project Structure

```
client/
├── 📁 public/                    # Static assets
│   └── favicon.ico
│
├── 📁 src/
│   ├── 📄 App.jsx                # Main app with routes
│   ├── 📄 main.jsx               # Entry point
│   ├── 📄 index.css              # Global styles
│   ├── 📄 App.css                # App-specific styles
│   │
│   ├── 📁 Assets/                # Images and media
│   │   └── Images/
│   │
│   ├── 📁 Components/            # Reusable components
│   │   ├── 📄 Footer.jsx
│   │   ├── 📄 Navbar.jsx
│   │   ├── 📄 CourseCard.jsx
│   │   └── 📁 Auth/
│   │       └── 📄 RequireAuth.jsx  # Route protection
│   │
│   ├── 📁 Constants/             # App constants
│   │   └── 📄 celebData.js
│   │
│   ├── 📁 Helpers/               # Utility functions
│   │   └── 📄 axiosInstance.js   # Configured axios
│   │
│   ├── 📁 Layouts/
│   │   └── 📄 HomeLayout.jsx     # Main layout wrapper
│   │
│   ├── 📁 Pages/
│   │   ├── 📄 HomePage.jsx
│   │   ├── 📄 AboutUs.jsx
│   │   ├── 📄 Contact.jsx
│   │   ├── 📄 Login.jsx
│   │   ├── 📄 SignUp.jsx
│   │   ├── 📄 Denied.jsx
│   │   ├── 📄 NotFound.jsx
│   │   │
│   │   ├── 📁 Course/
│   │   │   ├── 📄 CourseList.jsx
│   │   │   ├── 📄 CourseDescription.jsx
│   │   │   └── 📄 CreateCourse.jsx
│   │   │
│   │   ├── 📁 Dashboard/
│   │   │   ├── 📄 AdminDashboard.jsx
│   │   │   ├── 📄 AddLecture.jsx
│   │   │   └── 📄 DisplayLectures.jsx
│   │   │
│   │   ├── 📁 Payment/
│   │   │   ├── 📄 Checkout.jsx
│   │   │   ├── 📄 CheckoutSuccess.jsx
│   │   │   └── 📄 CheckoutFailure.jsx
│   │   │
│   │   ├── 📁 Policy/
│   │   │   ├── 📄 PrivacyPolicy.jsx
│   │   │   └── 📄 TermsofService.jsx
│   │   │
│   │   └── 📁 User/
│   │       ├── 📄 Profile.jsx
│   │       ├── 📄 EditProfile.jsx
│   │       ├── 📄 ChangePassword.jsx
│   │       ├── 📄 ForgotPassword.jsx
│   │       └── 📄 ResetPassword.jsx
│   │
│   └── 📁 Redux/
│       ├── 📄 store.js           # Redux store config
│       └── 📁 Slices/
│           ├── 📄 AuthSlice.js
│           ├── 📄 CourseSlice.js
│           ├── 📄 LectureSlice.js
│           ├── 📄 RazorpaySlice.js
│           └── 📄 StatSlice.js
│
├── 📄 index.html                 # HTML entry point
├── 📄 package.json               # Dependencies
├── 📄 vite.config.js             # Vite configuration
├── 📄 tailwind.config.js         # Tailwind configuration
├── 📄 postcss.config.js          # PostCSS configuration
├── 📄 vercel.json                # Vercel deployment config
└── 📄 .eslintrc.cjs              # ESLint configuration
```

---

## 🔀 Routing Architecture

```jsx
// Public Routes
/                     → HomePage
/about                → AboutUs
/courses              → CourseList
/contact              → Contact
/course/description   → CourseDescription
/signup               → SignUp
/login                → Login
/forgot-password      → ForgotPassword
/reset-password/:token → ResetPassword
/privacy              → PrivacyPolicy
/terms                → TermsofService
/denied               → Denied (Access Denied)
/*                    → NotFound (404)

// Admin Only Routes
/course/create        → CreateCourse
/course/addlecture    → AddLecture
/admin/dashboard      → AdminDashboard

// Authenticated User Routes
/user/profile         → Profile
/user/editprofile     → EditProfile
/changepassword       → ChangePassword
/checkout             → Checkout
/checkout/success     → CheckoutSuccess
/checkout/fail        → CheckoutFailure
/course/displaylectures → DisplayLectures
```

---

## 🎨 Styling Guide

### Tailwind Configuration
```javascript
// tailwind.config.js
module.exports = {
  content: [
    "./src/**/*.{html,js,jsx,ts,tsx}",
    "./index.html",
  ],
  plugins: [
    require("daisyui"),
    require("@tailwindcss/line-clamp")
  ]
}
```

### DaisyUI Theme
The application uses DaisyUI's built-in dark theme with custom accent colors.

### CSS Classes Used
- Tailwind utility classes for spacing, sizing, colors
- DaisyUI component classes (`btn`, `card`, `input`, etc.)
- Custom animations in `App.css`

---

## 🔧 Configuration

### Axios Instance
```javascript
// src/Helpers/axiosInstance.js
import axios from "axios";

const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api/v1";

const axiosInstance = axios.create();
axiosInstance.defaults.baseURL = BASE_URL;
axiosInstance.defaults.withCredentials = true;

export default axiosInstance;
```

### Redux Store
```javascript
// src/Redux/store.js
import { configureStore } from '@reduxjs/toolkit';
import authSliceReducer from './Slices/AuthSlice';
import courseSliceReducer from './Slices/CourseSlice';
import razorpaySliceReducer from './Slices/RazorpaySlice';
import lectureSliceReducer from './Slices/LectureSlice';
import statSliceReducer from './Slices/StatSlice';

const store = configureStore({
  reducer: {
    auth: authSliceReducer,
    course: courseSliceReducer,
    razorpay: razorpaySliceReducer,
    lecture: lectureSliceReducer,
    stat: statSliceReducer,
  },
  devTools: true,
});

export default store;
```

---

## 📦 Dependencies

### Production Dependencies
```json
{
  "@reduxjs/toolkit": "^1.9.7",
  "@tailwindcss/line-clamp": "^0.4.4",
  "axios": "^1.5.1",
  "chart.js": "^4.4.0",
  "daisyui": "^3.9.3",
  "lucide-react": "^0.476.0",
  "react": "^18.2.0",
  "react-chartjs-2": "^5.2.0",
  "react-dom": "^18.2.0",
  "react-hot-toast": "^2.4.1",
  "react-icons": "^4.11.0",
  "react-redux": "^8.1.3",
  "react-router-dom": "^6.17.0"
}
```

### Dev Dependencies
```json
{
  "@vitejs/plugin-react": "^4.0.3",
  "autoprefixer": "^10.4.16",
  "eslint": "^8.45.0",
  "eslint-plugin-react": "^7.32.2",
  "eslint-plugin-react-hooks": "^4.6.0",
  "eslint-plugin-react-refresh": "^0.4.3",
  "eslint-plugin-simple-import-sort": "^10.0.0",
  "postcss": "^8.4.31",
  "tailwindcss": "^3.3.3",
  "vite": "^4.4.5"
}
```

---

## 🚀 Deployment

### Vercel (Recommended)
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel

# Production deployment
vercel --prod
```

### Build for Production
```bash
npm run build
```
Output will be in the `dist/` folder.

### Static Hosting
The built application can be deployed to any static hosting service:
- Netlify
- GitHub Pages
- Firebase Hosting
- AWS S3 + CloudFront

---

## 🧪 ESLint Configuration

```javascript
// .eslintrc.cjs
module.exports = {
  plugins: ['simple-import-sort', 'react', 'react-hooks', 'react-refresh'],
  rules: {
    'simple-import-sort/imports': 'error',
    'react-refresh/only-export-components': 'warn',
  },
  settings: {
    react: {
      version: 'detect',
    },
  },
};
```

### Auto-Sort Imports (VS Code)
Add to `settings.json`:
```json
{
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true
  }
}
```

---

## 📄 License

This project is part of the LMS application licensed under the **ISC License**.

---

## 👨‍💻 Author

**Thakur Rudraksha Singh**

[![GitHub](https://img.shields.io/badge/GitHub-RudrakshaSingh-181717?style=flat-square&logo=github)](https://github.com/RudrakshaSingh)

---

<p align="center">
  Made with ❤️ using React and Vite
</p>
