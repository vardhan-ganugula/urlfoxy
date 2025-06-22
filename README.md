# UrlFox - Modern URL Shortening Service

<div align="center">

![UrlFox Logo](https://res.cloudinary.com/dh5frdemm/image/upload/v1747980547/logo_mox6pq_c_fill_w_200_h_200_ar_1_1_hjbohs.webp)

# UrlFox
**A modern, scalable URL shortening service with analytics**

[![Node.js](https://img.shields.io/badge/Node.js-18%2B-green.svg)](https://nodejs.org/)
[![React](https://img.shields.io/badge/React-19.1.0-blue.svg)](https://reactjs.org/)
[![Express](https://img.shields.io/badge/Express-5.1.0-lightgrey.svg)](https://expressjs.com/)
[![MongoDB](https://img.shields.io/badge/MongoDB-5.0%2B-brightgreen.svg)](https://www.mongodb.com/)
[![License](https://img.shields.io/badge/License-ISC-yellow.svg)](https://opensource.org/licenses/ISC)

</div>

---

## 🚀 Quick Start

### One-Command Setup (Docker)
```bash
git clone https://github.com/vardhan-ganugula/urlfoxy
cd urlfoxy
docker-compose up -d
```

### Manual Setup
```bash
# Clone repository
git clone https://github.com/vardhan-ganugula/urlfoxy
cd urlfoxy

# Setup Backend
cd server
npm install
cp .env.example .env
# Configure your .env file
npm run dev

# Setup Frontend (new terminal)
cd ../client
npm install
npm run dev
```

**🌐 Frontend:** http://localhost:5173  
**📡 Backend API:** http://localhost:8000  
**📊 Redis:** http://localhost:6379

---

## 📋 Project Overview

UrlFox is a comprehensive URL shortening service built with modern web technologies. It provides user authentication, URL management, analytics, and team collaboration features.

### 🎯 **Key Features**

#### ✅ **Currently Implemented**
- 🔐 **User Authentication System**
  - User registration with email verification
  - Secure login/logout with JWT tokens
  - Password reset functionality
  - Session management with device tracking

- 📧 **Advanced Email System**
  - Background email processing with BullMQ
  - Redis-based queue management
  - Email verification and password reset
  - Retry logic and error handling

- 🛡️ **Security & Performance**
  - Rate limiting to prevent abuse
  - Input validation with Zod schemas
  - Password hashing with bcrypt
  - CORS configuration
  - Secure HTTP-only cookies

#### 🔮 **Planned Features**
- 🔗 **URL Shortening Core**
  - Custom short URLs with aliases
  - Bulk URL creation and management
  - URL expiration and scheduling
  - QR code generation

- 📈 **Analytics Dashboard**
  - Real-time click tracking
  - Geographic analytics
  - Device and browser analytics
  - Custom time range reports

- 🌐 **Advanced Features**
  - Custom domain support
  - Team collaboration and sharing
  - API rate limiting plans
  - URL grouping and tagging

---

## 🏗️ Architecture

### Full-Stack Architecture
```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   React Client  │    │  Express.js API │    │  MongoDB Atlas  │
│   (Frontend)    │◄──►│   (Backend)     │◄──►│   (Database)    │
│                 │    │                 │    │                 │
└─────────────────┘    └─────────────────┘    └─────────────────┘
         │                       │                       │
         │              ┌─────────────────┐              │
         │              │  Redis Server   │              │
         └──────────────►│ (Queue System)  │◄─────────────┘
                        │                 │
                        └─────────────────┘
```

### Tech Stack
#### Frontend
- **Framework:** React 19.1.0 with Vite
- **Styling:** Tailwind CSS 4.1.10
- **Routing:** React Router DOM 7.6.2
- **State Management:** React Hooks & Context
- **Build Tool:** Vite 6.3.5

#### Backend
- **Runtime:** Node.js 18+
- **Framework:** Express.js 5.1.0
- **Database:** MongoDB with Mongoose ODM
- **Authentication:** JWT (Access + Refresh Tokens)
- **Queue System:** BullMQ with Redis
- **Email Service:** Nodemailer
- **Validation:** Zod schemas
- **Security:** bcrypt, express-rate-limit

#### Infrastructure
- **Containerization:** Docker & Docker Compose
- **Database:** MongoDB Atlas (Production)
- **Cache/Queue:** Redis Server
- **Environment:** dotenv configuration

---

## 📁 Project Structure

```
urlfoxy/
├── 📱 client/                    # React Frontend Application
│   ├── public/                   # Static assets
│   ├── src/                      # Source code
│   │   ├── components/           # Reusable UI components
│   │   ├── pages/               # Route components
│   │   ├── assets/              # Images and static files
│   │   └── constants/           # Configuration constants
│   ├── package.json             # Frontend dependencies
│   └── vite.config.js           # Vite configuration
│
├── 🖥️ server/                    # Node.js Backend API
│   ├── config/                  # Configuration files
│   ├── controllers/             # Request handlers
│   ├── docs/                    # 📚 API Documentation
│   ├── jobs/                    # Background job processors
│   ├── middleware/              # Custom middleware
│   ├── models/                  # Database models
│   ├── queues/                  # Queue configurations
│   ├── routes/                  # API route definitions
│   ├── schemas/                 # Validation schemas
│   ├── src/                     # Main application entry
│   ├── utils/                   # Utility functions
│   └── package.json             # Backend dependencies
│
├── 🎨 design/                    # Design assets and mockups
├── 🐳 docker-compose.yml         # Docker orchestration
├── 📋 README.md                  # This documentation
└── 🔧 .gitignore                # Git ignore rules
```

---

## 📚 Complete Documentation

### 🏗️ **Backend Documentation**
The backend is comprehensively documented with multiple specialized guides:

| Document | Description | Audience |
|----------|-------------|----------|
| **[📖 Backend README](./server/README.md)** | Complete backend overview and quick start | All developers |
| **[📡 API Documentation](./server/docs/API.md)** | Detailed endpoint reference with examples | Frontend developers |
| **[🗄️ Database Schema](./server/docs/DATABASE.md)** | Models, relationships, and optimization | Backend developers |
| **[🚀 Deployment Guide](./server/docs/DEPLOYMENT.md)** | Production deployment instructions | DevOps engineers |
| **[🔧 Development Guide](./server/docs/DEVELOPMENT.md)** | Setup, standards, and best practices | Contributors |
| **[🤝 Contributing Guide](./server/docs/CONTRIBUTING.md)** | Contribution guidelines and workflow | New contributors |

### 🎯 **Quick Documentation Access**

#### For Frontend Developers
```bash
# Essential reading for frontend integration
📡 API Endpoints: ./server/docs/API.md
🔐 Authentication: ./server/README.md#authentication--authorization
⚠️ Error Handling: ./server/docs/API.md#error-response-format
```

#### For Backend Developers
```bash
# Core backend development resources
🏗️ Project Setup: ./server/docs/DEVELOPMENT.md
🗄️ Database Models: ./server/docs/DATABASE.md
🛡️ Security Guide: ./server/README.md#security-features
```

#### For DevOps Engineers
```bash
# Deployment and infrastructure guides
🚀 Deployment: ./server/docs/DEPLOYMENT.md
🐳 Docker Setup: ./docker-compose.yml
🔧 Environment: ./server/README.md#environment-setup
```

---

## 🚀 Getting Started

### Prerequisites
- **Node.js** v18+ (recommended v20+)
- **MongoDB** v5.0+ (local installation or MongoDB Atlas)
- **Redis** v6.0+ (for email queue system)
- **Git** for version control

### Option 1: Docker Setup (Recommended)
```bash
# Clone the repository
git clone https://github.com/vardhan-ganugula/urlfoxy
cd urlfoxy

# Start all services with Docker
docker-compose up -d

# Verify services are running
docker-compose ps
```

### Option 2: Manual Setup

#### Backend Setup
```bash
# Navigate to server directory
cd server

# Install dependencies
npm install

# Configure environment
cp .env.example .env
# Edit .env with your MongoDB, Redis, and email configurations

# Start development server
npm run dev
```

#### Frontend Setup
```bash
# Navigate to client directory (new terminal)
cd client

# Install dependencies
npm install

# Start development server
npm run dev
```

### Environment Configuration

Create `.env` file in the `server/` directory:

```env
# Server Configuration
PORT=8000
DOMAIN=http://localhost
ENVIRONMENT=development
CLIENT_URL=http://localhost:5173

# Database
MONGODB_URI=mongodb://localhost:27017/urlfox

# JWT Configuration
JWT_SECRET=your-super-secret-jwt-key-256-bits-minimum
JWT_EXPIRES_IN=15m
ACCESS_TOKEN_EXPIRATION=900000
REFRESH_TOKEN_EXPIRATION=604800000

# Email Configuration (use Mailtrap for development)
SMTP_HOST=smtp.mailtrap.io
SMTP_PORT=2525
SMTP_USER=your-mailtrap-user
SMTP_PASS=your-mailtrap-password

# Redis Configuration
REDIS_URL=redis://localhost:6379

# Additional Settings
COMPANY_NAME=UrlFox
VERIFICATION_EXPIRY_TIME=900000
FORGOT_PASSWORD_EXPIRY=3600000
```

---

## 🧪 Development Workflow

### Available Scripts

#### Backend (`/server`)
```bash
npm run dev         # Start development server with nodemon
npm start          # Start production server
npm run lint       # Code linting (if configured)
```

#### Frontend (`/client`)
```bash
npm run dev        # Start Vite development server
npm run build      # Build for production
npm run preview    # Preview production build
npm run lint       # ESLint code checking
```

### Development Guidelines

#### Code Standards
- **Backend:** Follow Node.js/Express best practices
- **Frontend:** Follow React and modern JavaScript standards
- **Styling:** Use Tailwind CSS utility classes
- **Git:** Use conventional commit messages

#### Development Tools
```bash
# Code quality and linting
cd server && npm run lint   # Backend code linting
cd client && npm run lint   # Frontend code linting

# Development servers
cd server && npm run dev    # Backend with nodemon
cd client && npm run dev    # Frontend with Vite hot reload
```

---

## 📡 API Reference

### Base URLs
- **Development:** `http://localhost:8000`
- **Production:** Your deployed domain

### Authentication Endpoints
```bash
POST   /api/auth/register              # User registration
POST   /api/auth/login                 # User login
GET    /api/auth/logout                # User logout
POST   /api/auth/forgot-password       # Password reset request
POST   /api/auth/reset-password        # Password reset confirmation
POST   /api/auth/send-verification-email # Resend verification
PUT    /api/auth/verify-user           # Email verification
```

### User Management
```bash
GET    /api/user/profile               # Get user profile (protected)
```

### Future URL Endpoints (Planned)
```bash
POST   /api/urls                       # Create short URL
GET    /api/urls                       # List user URLs
GET    /api/urls/:id                   # Get specific URL
PUT    /api/urls/:id                   # Update URL
DELETE /api/urls/:id                   # Delete URL
GET    /api/urls/:id/analytics         # URL analytics
```

📖 **Complete API documentation:** [server/docs/API.md](./server/docs/API.md)

---

## 🗄️ Database Design

### Current Models
- **👤 User Model:** Account management and authentication
- **🔐 Session Model:** Login sessions with device tracking
- **🔑 Forgot Password Model:** Password reset token management

### Planned Models
- **🔗 URL Model:** Shortened URLs with metadata
- **📊 Click Logs Model:** Detailed analytics tracking
- **🌐 Domains Model:** Custom domain management
- **📁 Groups Model:** URL organization

📖 **Complete database documentation:** [server/docs/DATABASE.md](./server/docs/DATABASE.md)

---

## 🛡️ Security Features

### Implemented Security
- **🔐 Authentication:** JWT with access and refresh tokens
- **🍪 Secure Cookies:** HTTP-only, secure, same-site strict
- **🔒 Password Security:** bcrypt hashing with salt
- **🚦 Rate Limiting:** Prevents brute force attacks
- **✅ Input Validation:** Zod schema validation
- **🌐 CORS:** Configured for specific origins
- **📱 Session Management:** Device and IP tracking

### Security Best Practices
- Environment variables for sensitive data
- Secure password requirements (min 6 characters)
- Email verification for account activation
- Token expiration and refresh mechanism
- Error message standardization (no data leakage)

---

## 🚀 Deployment

### Production Deployment Options

#### Docker Deployment (Recommended)
```bash
# Production Docker Compose
docker-compose -f docker-compose.prod.yml up -d
```

#### Cloud Platforms
- **Heroku:** [Deployment Guide](./server/docs/DEPLOYMENT.md#heroku)
- **Vercel:** [Deployment Guide](./server/docs/DEPLOYMENT.md#vercel)
- **AWS EC2:** [Deployment Guide](./server/docs/DEPLOYMENT.md#aws-ec2)
- **Railway:** [Deployment Guide](./server/docs/DEPLOYMENT.md#railway)

#### VPS Deployment
- **Ubuntu/Debian:** [Setup Guide](./server/docs/DEPLOYMENT.md#vps-deployment)
- **CentOS/RHEL:** [Setup Guide](./server/docs/DEPLOYMENT.md#vps-deployment)

📖 **Complete deployment guide:** [server/docs/DEPLOYMENT.md](./server/docs/DEPLOYMENT.md)

---

## 🤝 Contributing

We welcome contributions! Please see our comprehensive contributing guide for details.

### Quick Contributing Steps
1. **Read Documentation**
   - [Contributing Guide](./server/docs/CONTRIBUTING.md)
   - [Development Guide](./server/docs/DEVELOPMENT.md)

2. **Setup Development Environment**
   ```bash
   git clone <your-fork>
   cd urlfoxy
   # Follow setup instructions above
   ```

3. **Create Feature Branch**
   ```bash
   git checkout -b feature/your-feature-name
   ```

4. **Code Quality Check**
   ```bash
   # Check your code quality
   npm run lint  # Check code style
   git add . && git commit -m "feat: your feature description"
   ```

5. **Submit Pull Request**
   - Clear description of changes
   - Link to related issues
   - Include screenshots if UI changes

### Development Resources
- **🔧 Setup Guide:** [server/docs/DEVELOPMENT.md](./server/docs/DEVELOPMENT.md)
- **📝 Code Standards:** [server/docs/CONTRIBUTING.md](./server/docs/CONTRIBUTING.md)
- **🔧 Development Workflow:** [server/docs/DEVELOPMENT.md#development-workflow](./server/docs/DEVELOPMENT.md#development-workflow)

---

## 📊 Project Status

### Current Implementation Status
- ✅ **Backend API:** Fully functional with authentication
- ✅ **Database Models:** User management and sessions
- ✅ **Email System:** Background processing with queues
- ✅ **Security:** JWT, rate limiting, validation
- 🚧 **Frontend:** Basic React setup (in development)
- 🔮 **URL Shortening:** Planned for next phase
- 🔮 **Analytics:** Planned for next phase

### Roadmap
1. **Phase 1** ✅ - User authentication and management
2. **Phase 2** 🚧 - Frontend UI development
3. **Phase 3** 🔮 - URL shortening core functionality
4. **Phase 4** 🔮 - Analytics and reporting
5. **Phase 5** 🔮 - Advanced features and optimization

---

## 📞 Support & Community

### Getting Help
- **📖 Documentation:** Start with this README and linked docs
- **🐛 Issues:** [GitHub Issues](https://github.com/your-repo/issues) for bugs
- **💬 Discussions:** [GitHub Discussions](https://github.com/your-repo/discussions) for questions
- **📧 Contact:** [your-email@domain.com] for private inquiries

### Project Information
- **👨‍💻 Author:** Vardhan Ganugula
- **📄 License:** ISC
- **🏷️ Version:** 1.0.0
- **🌟 Repository:** [GitHub Repository](https://github.com/your-repo)

---

## 📋 Quick Commands Cheat Sheet

```bash
# Project Setup
git clone <repo> && cd urlfoxy
docker-compose up -d                    # Start all services

# Backend Development
cd server && npm run dev                # Start backend dev server
cd server && npm run lint               # Check backend code quality

# Frontend Development  
cd client && npm run dev                # Start frontend dev server
cd client && npm run build              # Build for production

# Documentation
ls server/docs/                         # View all documentation
cat server/docs/API.md                  # API reference
cat server/docs/DATABASE.md             # Database schema
```

---

<div align="center">

**🎉 Ready to build something amazing? 🎉**

**[⭐ Star this project](https://github.com/your-repo)** • **[🐛 Report bug](https://github.com/your-repo/issues)** • **[💡 Request feature](https://github.com/your-repo/issues)** • **[🤝 Contribute](./server/docs/CONTRIBUTING.md)**

*Built with ❤️ by the UrlFox team*

</div>
