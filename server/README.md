# UrlFox - Backend API Documentation

## Overview
UrlFox is a link management service backend built with Node.js, Express.js, and MongoDB. The application provides user authentication, session management, and URL management capabilities with email verification and password reset functionality.

## Table of Contents
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Environment Setup](#environment-setup)
- [Installation](#installation)
- [API Documentation](#api-documentation)
- [Database Models](#database-models)
- [Authentication & Authorization](#authentication--authorization)
- [Email System](#email-system)
- [Rate Limiting](#rate-limiting)
- [Error Handling](#error-handling)
- [Contributing](#contributing)

## Tech Stack
- **Runtime:** Node.js
- **Framework:** Express.js 5.1.0
- **Database:** MongoDB with Mongoose ODM
- **Authentication:** JWT (JSON Web Tokens)
- **Email Service:** Nodemailer
- **Queue System:** BullMQ for email processing
- **Validation:** Zod schemas
- **Password Hashing:** bcrypt
- **Rate Limiting:** express-rate-limit
- **Environment:** dotenv for configuration

## Project Structure
```
server/
├── config/             # Configuration files
│   ├── mail.config.js  # Email configuration
│   └── redis.config.js # Redis configuration
├── controllers/        # Request handlers
│   └── auth.controller.js
├── jobs/              # Background job handlers
│   └── email.jobs.js
├── middleware/        # Custom middleware
│   └── auth.middleware.js
├── models/           # Database models
│   ├── user.model.js
│   ├── session.model.js
│   ├── forgotPassword.model.js
│   ├── url.model.js
│   ├── clickLogs.model.js
│   ├── domains.models.js
│   └── groups.model.js
├── queues/           # Queue configurations
│   └── email.queue.js
├── routes/           # API routes
│   ├── auth.route.js
│   └── user.route.js
├── schemas/          # Validation schemas
│   └── auth.schema.js
├── src/              # Main application
│   └── index.js
└── utils/            # Utility functions
    ├── auth.utils.js
    ├── constants.js
    ├── DB.js
    ├── emailTemplates.js
    ├── mail.util.js
    └── rateLimit.util.js
```

## Environment Setup
Create a `.env` file in the server root directory with the following variables:

```env
# Server Configuration
PORT=8000
DOMAIN=http://localhost
ENVIRONMENT=development
CLIENT_URL=http://localhost:5173

# Database
MONGODB_URI=mongodb://localhost:27017/urlfox

# JWT Configuration
JWT_SECRET=your-super-secret-jwt-key
JWT_EXPIRES_IN=15m
ACCESS_TOKEN_EXPIRATION=900000  # 15 minutes in milliseconds
REFRESH_TOKEN_EXPIRATION=604800000  # 7 days in milliseconds

# Email Configuration
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password

# Redis Configuration (for email queue)
REDIS_URL=redis://localhost:6379

# Other
COMPANY_NAME=urlfox.com
VERIFICATION_EXPIRY_TIME=900000  # 15 minutes
FORGOT_PASSWORD_EXPIRY=3600000   # 1 hour
```

## Installation

1. **Clone the repository and navigate to server directory:**
   ```bash
   cd server
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Set up environment variables:**
   - Copy the environment variables from the section above
   - Update values according to your setup

4. **Start the development server:**
   ```bash
   npm run dev
   ```

5. **Start the production server:**
   ```bash
   npm start
   ```

## API Documentation
For detailed API documentation, see [API.md](./docs/API.md)

### Base URL
- **Development:** `http://localhost:8000`
- **Production:** Your deployed domain

### Authentication Endpoints
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `GET /api/auth/logout` - User logout
- `POST /api/auth/forgot-password` - Initiate password reset
- `POST /api/auth/reset-password` - Reset password
- `POST /api/auth/send-verification-email` - Resend verification email
- `PUT /api/auth/verify-user` - Verify user email

### User Endpoints
- `GET /api/user/profile` - Get user profile (Protected)

## Database Models
For detailed database schema documentation, see [DATABASE.md](./docs/DATABASE.md)

### Core Models
- **User Model:** User accounts and profiles
- **Session Model:** User login sessions
- **Forgot Password Model:** Password reset tokens
- **URL Model:** Shortened URLs (future implementation)
- **Click Logs Model:** URL click tracking
- **Domains Model:** Custom domains
- **Groups Model:** URL grouping

## Authentication & Authorization

### JWT Implementation
- **Access Token:** Short-lived (15 minutes) for API access
- **Refresh Token:** Long-lived (7 days) for token renewal
- **Secure Cookies:** HTTP-only cookies for token storage

### Session Management
- Device detection and tracking
- IP address logging
- User agent storage
- Session invalidation on logout

### Password Security
- bcrypt hashing with salt
- Minimum 6 characters requirement
- Secure password reset flow

## Email System

### Email Queue System
- **BullMQ:** Redis-based queue for email processing
- **Background Processing:** Non-blocking email sending
- **Retry Logic:** Automatic retry on failures
- **Job Cleanup:** Automatic cleanup of completed jobs

### Email Types
- **Verification Email:** Account email verification
- **Password Reset:** Forgot password emails
- **Welcome Email:** New user welcome (future)

## Rate Limiting
- **Authentication Routes:** Limited to prevent brute force attacks
- **Configurable:** Rate limits can be adjusted per environment
- **IP-based:** Rate limiting based on client IP address

## Error Handling

### Standardized Error Responses
```json
{
  "error": "Error message",
  "status": "error",
  "message": "Detailed error description"
}
```

### HTTP Status Codes
- `200` - Success
- `201` - Created
- `400` - Bad Request
- `401` - Unauthorized
- `404` - Not Found
- `409` - Conflict
- `500` - Internal Server Error

## Contributing

### Development Guidelines
1. Follow existing code structure and naming conventions
2. Add proper error handling for all operations
3. Include input validation using Zod schemas
4. Write meaningful commit messages
5. Test all endpoints before submitting PR

### Code Style
- Use ES6+ features and modules
- Implement async/await for asynchronous operations
- Add JSDoc comments for complex functions
- Use meaningful variable and function names

## Security Features
- **CORS:** Configured for specific origins
- **Rate Limiting:** Protection against abuse
- **Secure Cookies:** HTTP-only, secure, same-site strict
- **JWT Security:** Secret-based token signing
- **Password Hashing:** bcrypt with salt
- **Input Validation:** Zod schema validation
- **Session Management:** Secure session handling

## Monitoring & Logging
- Console logging for development
- Error tracking for authentication failures
- Session tracking for security monitoring

---

**Author:** Vardhan Ganugula  
**License:** ISC  
**Version:** 1.0.0
