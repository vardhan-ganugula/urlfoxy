# Development Guide

## Overview
This guide covers the development workflow, coding standards, and best practices for contributing to the UrlFox backend project.

## Table of Contents
- [Development Setup](#development-setup)
- [Project Structure](#project-structure)
- [Coding Standards](#coding-standards)
- [Development Workflow](#development-workflow)
- [Testing](#testing)
- [Debugging](#debugging)
- [Performance](#performance)
- [Security Guidelines](#security-guidelines)
- [Contributing](#contributing)

---

## Development Setup

### Prerequisites
- **Node.js:** v18+ (recommended v20+)
- **MongoDB:** v5.0+ (local installation or MongoDB Atlas)
- **Redis:** v6.0+ (for email queue system)
- **Git:** For version control
- **VS Code:** Recommended IDE with extensions

### Recommended VS Code Extensions
```json
{
  "recommendations": [
    "ms-vscode.vscode-json",
    "ms-vscode.vscode-typescript-next",
    "bradlc.vscode-tailwindcss",
    "ms-vscode.vscode-eslint",
    "esbenp.prettier-vscode",
    "ms-vscode.vscode-thunder-client",
    "mongodb.mongodb-vscode"
  ]
}
```

### Initial Setup
```bash
# Clone the repository
git clone https://github.com/vardhan-ganugula/urlfoxy
cd urlfoxy/server

# Install dependencies
npm install

# Copy environment template
cp .env.example .env

# Edit environment variables
nano .env

# Start development server
npm run dev
```

### Environment Configuration
Create a `.env` file with development settings:

```env
# Development Configuration
PORT=8000
DOMAIN=http://localhost
ENVIRONMENT=development
CLIENT_URL=http://localhost:5173

# Database
MONGODB_URI=mongodb://localhost:27017/urlfox

# JWT Configuration
JWT_SECRET=your-development-secret-key
JWT_EXPIRES_IN=15m
ACCESS_TOKEN_EXPIRATION=900000
REFRESH_TOKEN_EXPIRATION=604800000

# Email Configuration (use Mailtrap for testing)
SMTP_HOST=smtp.mailtrap.io
SMTP_PORT=2525
SMTP_USER=your-mailtrap-user
SMTP_PASS=your-mailtrap-pass

# Redis
REDIS_URL=redis://localhost:6379

# Other
COMPANY_NAME=UrlFox
VERIFICATION_EXPIRY_TIME=900000
FORGOT_PASSWORD_EXPIRY=3600000
```

---

## Project Structure

### Directory Organization
```
server/
├── config/             # Configuration files
│   ├── mail.config.js  # Email service configuration
│   └── redis.config.js # Redis configuration
├── controllers/        # Request handlers (business logic)
│   └── auth.controller.js
├── docs/              # Documentation files
│   ├── API.md
│   ├── DATABASE.md
│   └── DEPLOYMENT.md
├── jobs/              # Background job processors
│   └── email.jobs.js
├── middleware/        # Custom middleware functions
│   └── auth.middleware.js
├── models/           # Database models (Mongoose schemas)
│   ├── user.model.js
│   ├── session.model.js
│   └── ...
├── queues/           # Queue configurations
│   └── email.queue.js
├── routes/           # API route definitions
│   ├── auth.route.js
│   └── user.route.js
├── schemas/          # Validation schemas (Zod)
│   └── auth.schema.js
├── src/              # Main application entry
│   └── index.js
├── tests/            # Test files (to be implemented)
│   ├── unit/
│   ├── integration/
│   └── fixtures/
└── utils/            # Utility functions
    ├── auth.utils.js
    ├── constants.js
    ├── DB.js
    └── ...
```

### File Naming Conventions
- **Models:** `[entityName].model.js` (e.g., `user.model.js`)
- **Controllers:** `[entityName].controller.js` (e.g., `auth.controller.js`)
- **Routes:** `[entityName].route.js` (e.g., `user.route.js`)
- **Middleware:** `[functionality].middleware.js` (e.g., `auth.middleware.js`)
- **Utils:** `[functionality].utils.js` (e.g., `auth.utils.js`)
- **Schemas:** `[entityName].schema.js` (e.g., `auth.schema.js`)

---

## Coding Standards

### JavaScript/ES6+ Guidelines

#### Import/Export Style
```javascript
// Use ES6 modules
import express from 'express';
import { config } from 'dotenv';
import userModel from '../models/user.model.js';

// Named exports for utilities
export const generateToken = () => { /* ... */ };
export const hashPassword = async (password) => { /* ... */ };

// Default export for main exports
export default router;
```

#### Function Definitions
```javascript
// Use async/await for asynchronous operations
export const handleUserSignUp = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    // ... implementation
  } catch (error) {
    return res.status(500).json({ error: "Internal server error" });
  }
};

// Arrow functions for simple operations
const validateEmail = (email) => email.includes('@');

// Regular functions for middleware
function authMiddleware(req, res, next) {
  // ... implementation
  next();
}
```

#### Error Handling
```javascript
// Consistent error response format
const sendErrorResponse = (res, statusCode, error, message = null) => {
  return res.status(statusCode).json({
    error,
    status: "error",
    ...(message && { message })
  });
};

// Try-catch for database operations
try {
  const user = await userModel.findById(userId);
  if (!user) {
    return sendErrorResponse(res, 404, "User not found");
  }
} catch (error) {
  console.error("Database error:", error);
  return sendErrorResponse(res, 500, "Internal server error");
}
```

#### Variable Naming
```javascript
// Use camelCase for variables and functions
const userEmail = req.body.email;
const accessToken = generateAccessToken(payload);

// Use UPPER_CASE for constants
const ACCESS_TOKEN_EXPIRATION = 15 * 60 * 1000;
const JWT_SECRET = process.env.JWT_SECRET;

// Use descriptive names
const isEmailVerified = user.isEmailVerified;
const hasValidPassword = await comparePassword(password, user.password);
```

### Database Patterns

#### Model Definition
```javascript
import { Schema, model } from "mongoose";

const userSchema = new Schema({
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: true,
    trim: true,
    lowercase: true
  },
  // ... other fields
}, {
  timestamps: true,
  toJSON: {
    transform: (doc, ret) => {
      delete ret.password;
      delete ret.emailVerificationToken;
      return ret;
    }
  }
});

// Add indexes
userSchema.index({ email: 1 });

export default model('User', userSchema);
```

#### Query Patterns
```javascript
// Use lean() for read-only operations
const users = await userModel.find({ isActive: true }).lean();

// Select specific fields
const user = await userModel.findById(userId).select('username email');

// Use population for references
const userWithSessions = await userModel
  .findById(userId)
  .populate('sessions', 'device ipAddress createdAt');
```

### Validation Patterns

#### Zod Schema Definition
```javascript
import { z } from "zod";

export const registerSchema = z.object({
  username: z
    .string()
    .min(3, "Username must be at least 3 characters")
    .max(10, "Username must be at most 10 characters")
    .regex(/^[a-zA-Z0-9_]+$/, "Username can only contain letters, numbers, and underscores"),
  email: z
    .string()
    .email("Invalid email format")
    .toLowerCase(),
  password: z
    .string()
    .min(6, "Password must be at least 6 characters")
    .max(50, "Password must be at most 50 characters")
});
```

#### Validation Middleware
```javascript
export const validateRequest = (schema) => {
  return (req, res, next) => {
    const result = schema.safeParse(req.body);
    if (!result.success) {
      return res.status(400).json({
        error: "Validation failed",
        details: result.error.errors.map(err => ({
          field: err.path.join('.'),
          message: err.message
        }))
      });
    }
    req.validatedData = result.data;
    next();
  };
};
```

---

## Development Workflow

### Git Workflow

#### Branch Naming
```bash
# Feature branches
feature/user-authentication
feature/url-shortening
feature/analytics-dashboard

# Bug fixes
bugfix/login-validation-error
bugfix/email-queue-timeout

# Hotfixes
hotfix/security-vulnerability
hotfix/database-connection-issue
```

#### Commit Messages
```bash
# Format: type(scope): description
feat(auth): implement user registration with email verification
fix(middleware): resolve token refresh logic
docs(api): add comprehensive endpoint documentation
refactor(utils): optimize password hashing function
test(auth): add unit tests for login controller
```

#### Development Process
```bash
# Start new feature
git checkout -b feature/new-feature
git push -u origin feature/new-feature

# Regular commits
git add .
git commit -m "feat(feature): implement core functionality"
git push

# Before merging
git checkout main
git pull origin main
git checkout feature/new-feature
git rebase main
git push --force-with-lease

# Create pull request
# After review and approval, merge
```

### Code Review Checklist

#### Functionality
- [ ] Code accomplishes the intended purpose
- [ ] Edge cases are handled properly
- [ ] Error handling is comprehensive
- [ ] Input validation is implemented
- [ ] Database operations are efficient

#### Security
- [ ] No sensitive data in logs
- [ ] Proper authentication/authorization
- [ ] Input sanitization implemented
- [ ] SQL injection prevention
- [ ] XSS protection measures

#### Performance
- [ ] No unnecessary database queries
- [ ] Efficient algorithms used
- [ ] Memory usage optimized
- [ ] Proper indexing considered
- [ ] Caching implemented where appropriate

#### Code Quality
- [ ] Follows project coding standards
- [ ] Functions are single-purpose
- [ ] Meaningful variable names
- [ ] Adequate comments for complex logic
- [ ] No code duplication

---

## Testing

### Test Structure
```
tests/
├── unit/              # Unit tests for individual functions
│   ├── controllers/
│   ├── models/
│   ├── utils/
│   └── middleware/
├── integration/       # Integration tests for API endpoints
│   ├── auth.test.js
│   └── user.test.js
├── fixtures/         # Test data and mocks
│   ├── users.json
│   └── sessions.json
└── setup/           # Test configuration
    ├── database.js
    └── server.js
```

### Testing Framework Setup
```bash
# Install testing dependencies
npm install --save-dev jest supertest mongodb-memory-server

# Add test scripts to package.json
{
  "scripts": {
    "test": "jest",
    "test:watch": "jest --watch",
    "test:coverage": "jest --coverage"
  }
}
```

### Example Unit Test
```javascript
// tests/unit/utils/auth.utils.test.js
import { hashPassword, comparePassword, generateToken } from '../../../utils/auth.utils.js';

describe('Auth Utils', () => {
  describe('hashPassword', () => {
    test('should hash password correctly', async () => {
      const password = 'testpassword123';
      const hashed = await hashPassword(password);
      
      expect(hashed).toBeDefined();
      expect(hashed).not.toBe(password);
      expect(hashed.length).toBeGreaterThan(50);
    });
  });

  describe('comparePassword', () => {
    test('should compare passwords correctly', async () => {
      const password = 'testpassword123';
      const hashed = await hashPassword(password);
      
      const isValid = await comparePassword(password, hashed);
      expect(isValid).toBe(true);
      
      const isInvalid = await comparePassword('wrongpassword', hashed);
      expect(isInvalid).toBe(false);
    });
  });
});
```

### Example Integration Test
```javascript
// tests/integration/auth.test.js
import request from 'supertest';
import app from '../../src/index.js';
import { setupTestDB, clearTestDB } from '../setup/database.js';

describe('Auth Endpoints', () => {
  beforeAll(async () => {
    await setupTestDB();
  });

  afterAll(async () => {
    await clearTestDB();
  });

  describe('POST /api/auth/register', () => {
    test('should register new user successfully', async () => {
      const userData = {
        username: 'testuser',
        email: 'test@example.com',
        password: 'testpassword123'
      };

      const response = await request(app)
        .post('/api/auth/register')
        .send(userData)
        .expect(201);

      expect(response.body.status).toBe(true);
      expect(response.body.data.email).toBe(userData.email);
      expect(response.body.data.password).toBeUndefined();
    });

    test('should reject invalid email', async () => {
      const userData = {
        username: 'testuser',
        email: 'invalid-email',
        password: 'testpassword123'
      };

      const response = await request(app)
        .post('/api/auth/register')
        .send(userData)
        .expect(400);

      expect(response.body.error).toContain('email');
    });
  });
});
```

---

## Debugging

### Debug Configuration

#### VS Code Launch Configuration
```json
// .vscode/launch.json
{
  "version": "0.2.0",
  "configurations": [
    {
      "name": "Debug Server",
      "type": "node",
      "request": "launch",
      "program": "${workspaceFolder}/server/src/index.js",
      "env": {
        "NODE_ENV": "development"
      },
      "envFile": "${workspaceFolder}/server/.env",
      "console": "integratedTerminal",
      "restart": true,
      "runtimeExecutable": "npm",
      "runtimeArgs": ["run", "dev"]
    }
  ]
}
```

#### Debug Logging
```javascript
// utils/logger.js
const debug = {
  auth: require('debug')('app:auth'),
  db: require('debug')('app:db'),
  email: require('debug')('app:email'),
  api: require('debug')('app:api')
};

export default debug;

// Usage in controllers
import debug from '../utils/logger.js';

export const handleUserLogin = async (req, res) => {
  debug.auth('Login attempt for email: %s', req.body.email);
  // ... implementation
};
```

### Common Debugging Scenarios

#### Database Connection Issues
```javascript
// utils/DB.js
import mongoose from 'mongoose';
import debug from './logger.js';

export const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI, {
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
    });
    
    debug.db('MongoDB connected: %s', conn.connection.host);
  } catch (error) {
    debug.db('Database connection error: %O', error);
    process.exit(1);
  }
};

// Listen for connection events
mongoose.connection.on('error', (err) => {
  debug.db('MongoDB connection error: %O', err);
});

mongoose.connection.on('disconnected', () => {
  debug.db('MongoDB disconnected');
});
```

#### Authentication Issues
```javascript
// middleware/auth.middleware.js
export const authMiddleware = async (req, res, next) => {
  const { accessToken, refreshToken } = req.cookies;
  
  debug.auth('Auth middleware - Access token: %s, Refresh token: %s', 
    accessToken ? 'present' : 'missing',
    refreshToken ? 'present' : 'missing'
  );

  if (!accessToken && !refreshToken) {
    debug.auth('No tokens provided');
    return res.status(401).json({ error: "Unauthorized" });
  }

  // ... rest of implementation
};
```

---

## Performance

### Performance Monitoring

#### Response Time Logging
```javascript
// middleware/performance.middleware.js
export const performanceLogger = (req, res, next) => {
  const start = Date.now();
  
  res.on('finish', () => {
    const duration = Date.now() - start;
    console.log(`${req.method} ${req.originalUrl} - ${res.statusCode} - ${duration}ms`);
  });
  
  next();
};
```

#### Database Query Optimization
```javascript
// Enable MongoDB query logging in development
if (process.env.ENVIRONMENT === 'development') {
  mongoose.set('debug', (collectionName, method, query, doc) => {
    console.log(`${collectionName}.${method}`, JSON.stringify(query), doc);
  });
}
```

### Optimization Strategies

#### Database Optimization
```javascript
// Add indexes for frequently queried fields
userSchema.index({ email: 1 });
userSchema.index({ isEmailVerified: 1 });
sessionSchema.index({ userId: 1, isActive: 1 });

// Use lean() for read-only queries
const users = await userModel.find({ isActive: true }).lean();

// Use select() to limit fields
const user = await userModel.findById(id).select('username email');

// Use aggregation for complex queries
const userStats = await userModel.aggregate([
  { $match: { isEmailVerified: true } },
  { $group: { _id: '$userType', count: { $sum: 1 } } }
]);
```

#### Caching Implementation
```javascript
// utils/cache.js
import redis from 'redis';

const client = redis.createClient(process.env.REDIS_URL);

export const cache = {
  get: async (key) => {
    const value = await client.get(key);
    return value ? JSON.parse(value) : null;
  },
  
  set: async (key, value, ttl = 3600) => {
    await client.setex(key, ttl, JSON.stringify(value));
  },
  
  del: async (key) => {
    await client.del(key);
  }
};

// Usage in controllers
export const getUserProfile = async (req, res) => {
  const cacheKey = `user:${req.user.id}`;
  let user = await cache.get(cacheKey);
  
  if (!user) {
    user = await userModel.findById(req.user.id).lean();
    await cache.set(cacheKey, user, 900); // 15 minutes
  }
  
  res.json({ user });
};
```

---

## Security Guidelines

### Input Validation
```javascript
// Always validate and sanitize input
import { z } from 'zod';
import validator from 'validator';

const sanitizeString = (str) => validator.escape(str.trim());

export const createUrlSchema = z.object({
  originalUrl: z
    .string()
    .url("Invalid URL format")
    .refine((url) => validator.isURL(url, {
      protocols: ['http', 'https'],
      require_protocol: true
    }), "Invalid URL protocol"),
  customAlias: z
    .string()
    .optional()
    .refine((alias) => !alias || /^[a-zA-Z0-9_-]+$/.test(alias), 
      "Alias can only contain letters, numbers, hyphens, and underscores")
});
```

### SQL Injection Prevention
```javascript
// Use Mongoose properly to prevent injection
// BAD
const user = await userModel.findOne({
  $where: `this.email === '${email}'` // Vulnerable to injection
});

// GOOD
const user = await userModel.findOne({ email }); // Safe with Mongoose
```

### XSS Prevention
```javascript
// Sanitize output
import DOMPurify from 'dompurify';
import { JSDOM } from 'jsdom';

const window = new JSDOM('').window;
const purify = DOMPurify(window);

export const sanitizeHtml = (dirty) => {
  return purify.sanitize(dirty);
};
```

### Rate Limiting
```javascript
// utils/rateLimit.util.js
import rateLimit from 'express-rate-limit';

export const authRateLimit = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // 5 attempts per window
  message: {
    error: "Too many authentication attempts, please try again later"
  },
  standardHeaders: true,
  legacyHeaders: false,
});

export const apiRateLimit = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100, // 100 requests per 15 minutes
  message: {
    error: "Too many requests, please try again later"
  }
});
```

---

## Contributing

### Pull Request Process

1. **Create Feature Branch**
   ```bash
   git checkout -b feature/your-feature-name
   ```

2. **Development**
   - Follow coding standards
   - Write tests for new features
   - Update documentation
   - Run linting and tests

3. **Pre-commit Checklist**
   - [ ] Code follows style guidelines
   - [ ] Tests pass
   - [ ] Documentation updated
   - [ ] No console.logs in production code
   - [ ] Environment variables documented

4. **Submit Pull Request**
   - Clear description of changes
   - Link to related issues
   - Screenshots if UI changes
   - Test coverage information

### Code Review Guidelines

#### For Reviewers
- Check functionality and logic
- Verify security implications
- Ensure performance considerations
- Validate test coverage
- Review documentation updates

#### For Contributors
- Respond to feedback promptly
- Make requested changes
- Keep PR scope focused
- Update PR description if needed

### Development Commands
```bash
# Start development server
npm run dev

# Run tests
npm test
npm run test:watch
npm run test:coverage

# Linting
npm run lint
npm run lint:fix

# Format code
npm run format

# Build for production
npm run build

# Check dependencies
npm audit
npm run security-check
```

---

This development guide provides a comprehensive foundation for working on the UrlFox backend. Follow these guidelines to maintain code quality, security, and consistency across the project.
