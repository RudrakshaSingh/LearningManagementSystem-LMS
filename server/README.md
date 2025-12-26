<p align="center">
  <img src="https://img.shields.io/badge/Node.js-18+-339933?style=for-the-badge&logo=nodedotjs&logoColor=white" alt="Node.js"/>
  <img src="https://img.shields.io/badge/Express-4.18-000000?style=for-the-badge&logo=express&logoColor=white" alt="Express"/>
  <img src="https://img.shields.io/badge/MongoDB-7.4-47A248?style=for-the-badge&logo=mongodb&logoColor=white" alt="MongoDB"/>
  <img src="https://img.shields.io/badge/JWT-Auth-000000?style=for-the-badge&logo=jsonwebtokens&logoColor=white" alt="JWT"/>
</p>

<h1 align="center">⚙️ LMS Backend Server</h1>

<p align="center">
  <strong>Robust RESTful API for the Learning Management System</strong>
</p>

<p align="center">
  A secure, scalable Node.js backend built with Express.js, featuring JWT authentication, Razorpay payment integration, Cloudinary media storage, and comprehensive API endpoints for managing users, courses, and subscriptions.
</p>

---

## 🌟 Features

### 🔐 Authentication & Security
- **JWT Token Authentication**: Secure stateless authentication
- **Password Hashing**: bcrypt encryption for password security
- **Role-Based Access Control**: USER and ADMIN role permissions
- **Secure Cookie Management**: HTTP-only cookies with SameSite protection
- **Password Reset Flow**: Email-based secure password recovery

### 📚 Course Management
- **Full CRUD Operations**: Create, Read, Update, Delete courses
- **Video Lecture Upload**: Cloudinary integration for video content
- **Lecture Management**: Add/remove individual video lectures
- **Category Organization**: Organize courses by categories
- **Thumbnail Support**: Course cover image uploads

### 💳 Payment System
- **Razorpay Integration**: Indian payment gateway support
- **Subscription Management**: Create, verify, and cancel subscriptions
- **Payment Verification**: Cryptographic signature validation
- **Refund Processing**: Automated refund within 14-day period
- **Payment Analytics**: Monthly subscription tracking

### 📧 Email Service
- **Nodemailer Integration**: SMTP-based email delivery
- **Password Reset Emails**: Secure token-based reset links
- **Contact Form Handling**: User inquiry notifications

---

## 🛠️ Tech Stack

| Category | Technology | Purpose |
|----------|------------|---------|
| **Runtime** | Node.js 18+ | JavaScript runtime |
| **Framework** | Express.js 4.18 | Web application framework |
| **Database** | MongoDB + Mongoose 7.4 | Document database & ODM |
| **Authentication** | JWT + bcryptjs | Token auth & password hashing |
| **File Storage** | Cloudinary 1.40 | Cloud media storage |
| **File Upload** | Multer 1.4.5 | Multipart form handling |
| **Payments** | Razorpay 2.9 | Payment gateway |
| **Email** | Nodemailer 6.9 | SMTP email service |
| **Logging** | Morgan 1.10 | HTTP request logger |
| **Environment** | dotenv 16.3 | Environment configuration |

---

## 🚀 Quick Start

### Prerequisites
- Node.js 18 or higher
- MongoDB (local or Atlas)
- Cloudinary account
- Razorpay account
- SMTP credentials (Gmail/SendGrid)

### Installation

```bash
# Navigate to server directory
cd server

# Install dependencies
npm install

# Copy environment template
cp .env.example.js .env

# Configure environment variables (see below)

# Start development server
npm run dev
```

### Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start with nodemon (hot-reload) |
| `npm start` | Start production server |
| `npm test` | Run tests (if configured) |

---

## ⚙️ Environment Variables

Create a `.env` file in the server directory:

```env
# ═══════════════════════════════════════════════════════════════
# APPLICATION SETTINGS
# ═══════════════════════════════════════════════════════════════
NODE_ENV=development
PORT=5000

# ═══════════════════════════════════════════════════════════════
# DATABASE
# ═══════════════════════════════════════════════════════════════
MONGO_URI=mongodb://127.0.0.1:27017/lms

# ═══════════════════════════════════════════════════════════════
# JWT CONFIGURATION
# ═══════════════════════════════════════════════════════════════
JWT_SECRET=your_super_secret_jwt_key_minimum_32_characters
JWT_EXPIRY=7d

# ═══════════════════════════════════════════════════════════════
# CLOUDINARY (Media Storage)
# ═══════════════════════════════════════════════════════════════
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

# ═══════════════════════════════════════════════════════════════
# SMTP EMAIL CONFIGURATION
# ═══════════════════════════════════════════════════════════════
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USERNAME=your_email@gmail.com
SMTP_PASSWORD=your_app_password
SMTP_FROM_EMAIL=noreply@yourlms.com

# ═══════════════════════════════════════════════════════════════
# RAZORPAY PAYMENT GATEWAY
# ═══════════════════════════════════════════════════════════════
RAZORPAY_KEY_ID=rzp_test_xxxxxxxxxxxxx
RAZORPAY_SECRET=your_razorpay_secret
RAZORPAY_PLAN_ID=plan_xxxxxxxxxxxxx

# ═══════════════════════════════════════════════════════════════
# URLS
# ═══════════════════════════════════════════════════════════════
FRONTEND_URL=http://localhost:5173

# ═══════════════════════════════════════════════════════════════
# CONTACT
# ═══════════════════════════════════════════════════════════════
CONTACT_US_EMAIL=contact@yourlms.com
```

---

## 📂 Project Structure

```
server/
│
├── 📄 server.js                    # Entry point, server initialization
├── 📄 app.js                       # Express app configuration
├── 📄 package.json                 # Dependencies and scripts
├── 📄 .env                         # Environment variables (gitignored)
├── 📄 .env.example.js              # Environment template
├── 📄 .gitignore                   # Git ignore patterns
│
├── 📁 config/
│   └── 📄 dbConfig.js              # MongoDB connection setup
│
├── 📁 controllers/
│   ├── 📄 userController.js        # User authentication & profile
│   ├── 📄 courseController.js      # Course CRUD operations
│   ├── 📄 paymentController.js     # Razorpay payment handling
│   └── 📄 miscellaneousController.js # Contact form & stats
│
├── 📁 middlewares/
│   ├── 📄 authMiddleware.js        # JWT & role verification
│   ├── 📄 asyncHandlerMiddleware.js # Async error wrapper
│   ├── 📄 errorMiddleware.js       # Global error handler
│   └── 📄 multerMiddleware.js      # File upload configuration
│
├── 📁 models/
│   ├── 📄 userModel.js             # User schema with methods
│   ├── 📄 courseModel.js           # Course & lecture schema
│   └── 📄 paymentModel.js          # Payment record schema
│
├── 📁 routes/
│   ├── 📄 userRoutes.js            # /api/v1/user/*
│   ├── 📄 courseRoutes.js          # /api/v1/courses/*
│   ├── 📄 paymentRoutes.js         # /api/v1/payments/*
│   └── 📄 miscellaneousRoutes.js   # /api/v1/*
│
├── 📁 uploads/                     # Temporary file storage
│   └── .gitkeep
│
└── 📁 utilityFunctions/
    ├── 📄 errorUtil.js             # Custom AppError class
    └── 📄 sendEmail.js             # Nodemailer email utility
```

---

## 🔗 API Documentation

### Base URL
```
http://localhost:5000/api/v1
```

### Authentication Endpoints

#### Register User
```http
POST /user/register
Content-Type: multipart/form-data

{
  "fullName": "John Doe",
  "email": "john@example.com",
  "password": "SecurePass123",
  "avatar": <file>  // Optional
}

Response: 201 Created
{
  "success": true,
  "message": "User registered successfully",
  "user": { ... }
}
```

#### Login
```http
POST /user/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "SecurePass123"
}

Response: 200 OK
{
  "success": true,
  "message": "User logged in successfully",
  "user": { ... }
}
// Sets HTTP-only cookie: token
```

#### Logout
```http
POST /user/logout

Response: 200 OK
{
  "success": true,
  "message": "User logged out successfully"
}
```

#### Get Profile
```http
GET /user/me
Cookie: token=<jwt_token>

Response: 200 OK
{
  "success": true,
  "message": "User details",
  "user": { ... }
}
```

#### Forgot Password
```http
POST /user/reset
Content-Type: application/json

{
  "email": "john@example.com"
}

Response: 200 OK
{
  "success": true,
  "message": "Reset password token has been sent to john@example.com successfully"
}
```

#### Reset Password
```http
POST /user/reset/:resetToken
Content-Type: application/json

{
  "password": "NewSecurePass123"
}

Response: 200 OK
{
  "success": true,
  "message": "Password changed successfully"
}
```

#### Change Password
```http
POST /user/change-password
Cookie: token=<jwt_token>
Content-Type: application/json

{
  "oldPassword": "CurrentPass123",
  "newPassword": "NewSecurePass456"
}

Response: 200 OK
{
  "success": true,
  "message": "Password changed successfully"
}
```

#### Update Profile
```http
PUT /user/update/:id
Cookie: token=<jwt_token>
Content-Type: multipart/form-data

{
  "fullName": "John Updated",
  "avatar": <file>  // Optional
}

Response: 200 OK
{
  "success": true,
  "message": "User details updated successfully"
}
```

---

### Course Endpoints

#### Get All Courses
```http
GET /courses

Response: 200 OK
{
  "success": true,
  "message": "All courses",
  "courses": [ ... ]
}
```

#### Create Course (Admin)
```http
POST /courses
Cookie: token=<admin_jwt_token>
Content-Type: multipart/form-data

{
  "title": "Complete React Course",
  "description": "Learn React from scratch",
  "category": "Web Development",
  "createdBy": "John Doe",
  "thumbnail": <file>
}

Response: 201 Created
{
  "success": true,
  "message": "Course created successfully",
  "course": { ... }
}
```

#### Get Course Lectures
```http
GET /courses/:id
Cookie: token=<subscribed_user_token>

Response: 200 OK
{
  "success": true,
  "message": "Course lectures fetched successfully",
  "lectures": [ ... ]
}
```

#### Add Lecture (Admin)
```http
POST /courses/:id
Cookie: token=<admin_jwt_token>
Content-Type: multipart/form-data

{
  "title": "Introduction to React",
  "description": "Getting started with React basics",
  "lecture": <video_file>
}

Response: 200 OK
{
  "success": true,
  "message": "Course lecture added successfully",
  "course": { ... }
}
```

#### Update Course (Admin)
```http
PUT /courses/:id
Cookie: token=<admin_jwt_token>
Content-Type: application/json

{
  "title": "Updated Course Title",
  "description": "Updated description"
}

Response: 200 OK
{
  "success": true,
  "message": "Course updated successfully"
}
```

#### Delete Course (Admin)
```http
DELETE /courses/:id
Cookie: token=<admin_jwt_token>

Response: 200 OK
{
  "success": true,
  "message": "Course deleted successfully"
}
```

#### Remove Lecture (Admin)
```http
DELETE /courses?courseId=xxx&lectureId=xxx
Cookie: token=<admin_jwt_token>

Response: 200 OK
{
  "success": true,
  "message": "Course lecture removed successfully"
}
```

---

### Payment Endpoints

#### Get Razorpay Key
```http
GET /payments/razorpay-key

Response: 200 OK
{
  "success": true,
  "message": "Razorpay API key",
  "key": "rzp_test_xxxxx"
}
```

#### Create Subscription
```http
POST /payments/subscribe
Cookie: token=<jwt_token>

Response: 200 OK
{
  "success": true,
  "message": "subscribed successfully",
  "subscription_id": "sub_xxxxx"
}
```

#### Verify Payment
```http
POST /payments/verify
Cookie: token=<jwt_token>
Content-Type: application/json

{
  "razorpay_payment_id": "pay_xxxxx",
  "razorpay_subscription_id": "sub_xxxxx",
  "razorpay_signature": "xxxxx"
}

Response: 200 OK
{
  "success": true,
  "message": "Payment verified successfully"
}
```

#### Cancel Subscription
```http
POST /payments/unsubscribe
Cookie: token=<jwt_token>

Response: 200 OK
{
  "success": true,
  "message": "Subscription canceled successfully"
}
// Refund processed if within 14 days
```

#### Get All Payments (Admin)
```http
GET /payments?count=10&skip=0
Cookie: token=<admin_jwt_token>

Response: 200 OK
{
  "success": true,
  "message": "All payments for current year",
  "allPayments": { ... },
  "finalMonths": { ... },
  "monthlySalesRecord": [ ... ]
}
```

---

### Miscellaneous Endpoints

#### Contact Form
```http
POST /contact
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "message": "I have a question..."
}

Response: 200 OK
{
  "success": true,
  "message": "Your message has been sent successfully"
}
```

#### Get Statistics (Admin)
```http
GET /admin/stats/users
Cookie: token=<admin_jwt_token>

Response: 200 OK
{
  "success": true,
  "message": "All registered users count",
  "allUsersCount": 150,
  "subscribedUsersCount": 45
}
```

---

## 🗄️ Database Schemas

### User Model
```javascript
{
  fullName: String (required, min: 5),
  email: String (required, unique),
  password: String (required, min: 8, select: false),
  avatar: {
    public_id: String,
    secure_url: String
  },
  role: String (USER | ADMIN, default: USER),
  subscription: {
    id: String,
    status: String
  },
  forgotPasswordToken: String,
  forgotPasswordExpiry: Date,
  createdAt: Date,
  updatedAt: Date
}

// Methods
user.comparePassword(plainPassword)  → Boolean
user.generateJWTToken()              → String
user.generatePasswordResetToken()    → String
```

### Course Model
```javascript
{
  title: String (required, min: 8, max: 59),
  description: String (required, min: 8, max: 200),
  category: String (required),
  thumbnail: {
    public_id: String (required),
    secure_url: String (required)
  },
  lectures: [{
    title: String,
    description: String,
    lecture: {
      public_id: String (required),
      secure_url: String (required)
    }
  }],
  numbersOfLectures: Number (default: 0),
  createdBy: String (required),
  createdAt: Date,
  updatedAt: Date
}
```

### Payment Model
```javascript
{
  razorpay_payment_id: String (required),
  razorpay_subscription_id: String (required),
  razorpay_signature: String (required),
  createdAt: Date,
  updatedAt: Date
}
```

---

## 🔒 Middleware

### Authentication Middleware
```javascript
// Check if user is logged in
isLoggedIn(req, res, next)  // Verifies JWT token

// Check user roles
authorizedRoles(...roles)   // Verifies user role permissions

// Usage in routes
router.get('/admin', isLoggedIn, authorizedRoles('ADMIN'), controller);
router.get('/user', isLoggedIn, authorizedRoles('ADMIN', 'USER'), controller);
```

### Error Middleware
```javascript
// Async handler wrapper
asyncHandler(fn)  // Wraps async functions for error handling

// Global error handler
errorMiddleware(err, req, res, next)  // Formats and sends error responses
```

### File Upload Middleware
```javascript
// Multer configuration
upload.single('field')     // Single file upload
upload.array('field', 5)   // Multiple files (max 5)
```

---

## 🛡️ Security Features

| Feature | Implementation |
|---------|---------------|
| **Password Hashing** | bcrypt with salt rounds (10) |
| **JWT Tokens** | Signed with secret, 7-day expiry |
| **HTTP-Only Cookies** | Prevents XSS token theft |
| **SameSite Cookies** | CSRF protection |
| **Input Validation** | Mongoose schema validation |
| **CORS** | Configured for frontend origin |
| **Rate Limiting** | Recommended to add in production |

---

## 📧 Email Configuration

### Gmail Setup
1. Enable 2-Factor Authentication
2. Generate App Password:
   - Google Account → Security → App Passwords
   - Select Mail and your device
   - Copy the 16-character password
3. Use in `SMTP_PASSWORD`

### SendGrid Setup
```env
SMTP_HOST=smtp.sendgrid.net
SMTP_PORT=587
SMTP_USERNAME=apikey
SMTP_PASSWORD=your_sendgrid_api_key
```

---

## 🚀 Deployment

### Railway
1. Create new project from GitHub
2. Add environment variables
3. Deploy

### Render
1. Create new Web Service
2. Connect GitHub repository
3. Configure:
   - Build Command: `npm install`
   - Start Command: `node server.js`
4. Add environment variables

### Docker
```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
EXPOSE 5000
CMD ["node", "server.js"]
```

---

## 🧪 Testing

### Manual Testing with cURL

```bash
# Register
curl -X POST http://localhost:5000/api/v1/user/register \
  -H "Content-Type: application/json" \
  -d '{"fullName":"Test User","email":"test@test.com","password":"password123"}'

# Login
curl -X POST http://localhost:5000/api/v1/user/login \
  -H "Content-Type: application/json" \
  -c cookies.txt \
  -d '{"email":"test@test.com","password":"password123"}'

# Get Profile (with saved cookie)
curl -X GET http://localhost:5000/api/v1/user/me \
  -b cookies.txt
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
  Built with ❤️ using Node.js and Express
</p>
