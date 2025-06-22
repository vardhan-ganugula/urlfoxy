# Contributing to UrlFox Backend

## Welcome
Thank you for considering contributing to the UrlFox backend! This document provides guidelines and information to help you contribute effectively to the project.

## Table of Contents
- [Code of Conduct](#code-of-conduct)
- [Getting Started](#getting-started)
- [How to Contribute](#how-to-contribute)
- [Development Guidelines](#development-guidelines)
- [Pull Request Process](#pull-request-process)
- [Issue Guidelines](#issue-guidelines)
- [Style Guide](#style-guide)
- [Testing Guidelines](#testing-guidelines)
- [Documentation](#documentation)
- [Community](#community)

---

## Code of Conduct

### Our Pledge
We pledge to make participation in our project a harassment-free experience for everyone, regardless of age, body size, disability, ethnicity, sex characteristics, gender identity and expression, level of experience, education, socio-economic status, nationality, personal appearance, race, religion, or sexual identity and orientation.

### Our Standards
Examples of behavior that contributes to creating a positive environment include:
- Using welcoming and inclusive language
- Being respectful of differing viewpoints and experiences
- Gracefully accepting constructive criticism
- Focusing on what is best for the community
- Showing empathy towards other community members

### Unacceptable Behavior
Examples of unacceptable behavior include:
- The use of sexualized language or imagery
- Trolling, insulting/derogatory comments, and personal or political attacks
- Public or private harassment
- Publishing others' private information without explicit permission
- Other conduct which could reasonably be considered inappropriate in a professional setting

---

## Getting Started

### Prerequisites
Before contributing, ensure you have:
- Node.js v18+ installed
- MongoDB running locally or access to MongoDB Atlas
- Redis running locally
- Git configured with your GitHub account
- Basic understanding of JavaScript/ES6+, Express.js, and MongoDB

### Development Setup
1. **Fork the repository** on GitHub
2. **Clone your fork** locally:
   ```bash
   git clone https://github.com/vardhan-ganugula/urlfoxy
   cd urlfoxy/server
   ```
3. **Add upstream remote**:
   ```bash
   git remote add upstream https://github.com/vardhan-ganugula/urlfoxy
   ```
4. **Install dependencies**:
   ```bash
   npm install
   ```
5. **Set up environment**:
   ```bash
   cp .env.example .env
   # Edit .env with your configuration
   ```
6. **Start development server**:
   ```bash
   npm run dev
   ```

---

## How to Contribute

### Types of Contributions

#### 🐛 Bug Reports
- Use the bug report template
- Include steps to reproduce
- Provide expected vs actual behavior
- Include system information

#### ✨ Feature Requests
- Use the feature request template
- Explain the use case
- Provide detailed requirements
- Consider implementation complexity

#### 🔧 Code Contributions
- Bug fixes
- New features
- Performance improvements
- Code refactoring
- Documentation updates

#### 📚 Documentation
- API documentation improvements
- Code comments
- README updates
- Tutorial creation
- Translation work

#### 🧪 Testing
- Unit test coverage
- Integration tests
- Performance tests
- Security testing

---

## Development Guidelines

### Branch Naming Convention
```bash
# Features
feature/user-authentication
feature/url-shortening
feature/analytics-dashboard

# Bug fixes
bugfix/login-validation-error
bugfix/email-queue-timeout

# Hotfixes
hotfix/security-vulnerability

# Documentation
docs/api-documentation
docs/deployment-guide

# Refactoring
refactor/auth-middleware
refactor/database-models
```

### Commit Message Format
Follow the [Conventional Commits](https://www.conventionalcommits.org/) specification:

```
<type>[optional scope]: <description>

[optional body]

[optional footer(s)]
```

#### Types
- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation only changes
- `style`: Changes that do not affect the meaning of the code
- `refactor`: Code change that neither fixes a bug nor adds a feature
- `perf`: Performance improvement
- `test`: Adding missing tests or correcting existing tests
- `chore`: Changes to the build process or auxiliary tools

#### Examples
```bash
feat(auth): implement JWT token refresh mechanism
fix(middleware): resolve CORS header configuration
docs(api): add comprehensive endpoint documentation
refactor(utils): optimize password hashing function
test(auth): add unit tests for login controller
perf(db): improve query performance with indexes
```

---

## Pull Request Process

### Before Submitting
1. **Sync with upstream**:
   ```bash
   git fetch upstream
   git checkout main
   git merge upstream/main
   ```

2. **Create feature branch**:
   ```bash
   git checkout -b feature/your-feature-name
   ```

3. **Make your changes** following the style guide

4. **Run tests**:
   ```bash
   npm test
   npm run lint
   ```

5. **Commit your changes**:
   ```bash
   git add .
   git commit -m "feat(scope): your descriptive message"
   ```

6. **Push to your fork**:
   ```bash
   git push origin feature/your-feature-name
   ```

### Pull Request Template
When creating a PR, include:

```markdown
## Description
Brief description of the changes made.

## Type of Change
- [ ] Bug fix (non-breaking change which fixes an issue)
- [ ] New feature (non-breaking change which adds functionality)
- [ ] Breaking change (fix or feature that would cause existing functionality to not work as expected)
- [ ] Documentation update

## Testing
- [ ] Unit tests pass
- [ ] Integration tests pass
- [ ] Manual testing completed
- [ ] Edge cases tested

## Checklist
- [ ] My code follows the project's coding standards
- [ ] I have performed a self-review of my code
- [ ] I have commented my code, particularly in hard-to-understand areas
- [ ] I have made corresponding changes to the documentation
- [ ] My changes generate no new warnings
- [ ] I have added tests that prove my fix is effective or that my feature works
- [ ] New and existing unit tests pass locally with my changes

## Screenshots (if applicable)
Add screenshots to help explain your changes.

## Additional Notes
Any additional information that would be helpful for reviewers.
```

### Review Process
1. **Automated checks** must pass (tests, linting)
2. **Code review** by at least one maintainer
3. **Manual testing** if applicable
4. **Documentation review** for significant changes
5. **Approval** and merge by maintainer

---

## Issue Guidelines

### Bug Reports
Use the following template:

```markdown
## Bug Description
A clear and concise description of what the bug is.

## Steps to Reproduce
1. Go to '...'
2. Click on '....'
3. Scroll down to '....'
4. See error

## Expected Behavior
A clear description of what you expected to happen.

## Actual Behavior
A clear description of what actually happened.

## Environment
- OS: [e.g. Windows 10, macOS 12.0, Ubuntu 20.04]
- Node.js version: [e.g. 18.15.0]
- Browser: [e.g. Chrome 91, Firefox 89]
- MongoDB version: [e.g. 5.0.8]

## Additional Context
Add any other context about the problem here, including:
- Error messages
- Console logs
- Screenshots
- Network requests/responses
```

### Feature Requests
Use the following template:

```markdown
## Feature Description
A clear and concise description of the feature you'd like to see.

## Problem Statement
Describe the problem this feature would solve.

## Proposed Solution
Describe the solution you'd like to see implemented.

## Alternative Solutions
Describe any alternative solutions or features you've considered.

## Use Cases
Provide specific use cases where this feature would be beneficial.

## Implementation Considerations
Any technical considerations or constraints to keep in mind.

## Additional Context
Add any other context, mockups, or examples about the feature request.
```

---

## Style Guide

### JavaScript/Node.js Standards

#### File Structure
```javascript
// 1. External imports
import express from 'express';
import { config } from 'dotenv';

// 2. Internal imports
import userModel from '../models/user.model.js';
import { generateToken } from '../utils/auth.utils.js';

// 3. Constants
const RATE_LIMIT = 100;

// 4. Main implementation
export const handleUserLogin = async (req, res) => {
  // Implementation
};

// 5. Default export (if applicable)
export default router;
```

#### Naming Conventions
```javascript
// Variables and functions: camelCase
const userEmail = req.body.email;
const generateAccessToken = (payload) => { /* ... */ };

// Constants: UPPER_SNAKE_CASE
const ACCESS_TOKEN_EXPIRATION = 15 * 60 * 1000;
const JWT_SECRET = process.env.JWT_SECRET;

// Files: kebab-case or dot notation
user.model.js
auth.middleware.js
rate-limit.util.js

// Database fields: camelCase
{
  firstName: String,
  emailVerified: Boolean,
  createdAt: Date
}
```

#### Function Definitions
```javascript
// Async functions for operations that may take time
export const handleUserRegistration = async (req, res) => {
  try {
    // Implementation
  } catch (error) {
    // Error handling
  }
};

// Arrow functions for simple operations
const validateEmail = (email) => /\S+@\S+\.\S+/.test(email);

// Regular functions for middleware and utilities
function authMiddleware(req, res, next) {
  // Implementation
  next();
}
```

#### Error Handling
```javascript
// Consistent error response format
const sendErrorResponse = (res, statusCode, error, details = null) => {
  return res.status(statusCode).json({
    error,
    status: "error",
    ...(details && { details })
  });
};

// Try-catch for async operations
try {
  const result = await someAsyncOperation();
  res.json({ success: true, data: result });
} catch (error) {
  console.error("Operation failed:", error);
  sendErrorResponse(res, 500, "Internal server error");
}
```

### Database Guidelines

#### Model Definition
```javascript
import { Schema, model } from "mongoose";

const entitySchema = new Schema({
  // Required fields first
  name: {
    type: String,
    required: [true, "Name is required"],
    trim: true,
    maxlength: [100, "Name cannot exceed 100 characters"]
  },
  
  // Optional fields
  description: {
    type: String,
    trim: true
  },
  
  // References
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  
  // Enums
  status: {
    type: String,
    enum: {
      values: ['active', 'inactive', 'pending'],
      message: 'Status must be active, inactive, or pending'
    },
    default: 'pending'
  }
}, {
  timestamps: true,
  toJSON: {
    transform: (doc, ret) => {
      // Remove sensitive fields
      delete ret.password;
      delete ret.__v;
      return ret;
    }
  }
});

// Indexes
entitySchema.index({ userId: 1, status: 1 });

export default model('Entity', entitySchema);
```

#### Query Patterns
```javascript
// Use lean() for read-only operations
const users = await userModel.find({ isActive: true }).lean();

// Use select() to limit fields
const user = await userModel.findById(id).select('name email');

// Use proper error handling
try {
  const user = await userModel.findById(userId);
  if (!user) {
    return sendErrorResponse(res, 404, "User not found");
  }
} catch (error) {
  console.error("Database error:", error);
  return sendErrorResponse(res, 500, "Database operation failed");
}
```

---

## Testing Guidelines

### Test Structure
```
tests/
├── unit/              # Unit tests
│   ├── controllers/
│   ├── models/
│   ├── utils/
│   └── middleware/
├── integration/       # API endpoint tests
│   ├── auth.test.js
│   └── user.test.js
├── fixtures/         # Test data
│   └── users.json
└── setup/           # Test configuration
    └── database.js
```

### Writing Tests

#### Unit Tests
```javascript
// tests/unit/utils/auth.utils.test.js
import { hashPassword, comparePassword } from '../../../utils/auth.utils.js';

describe('Auth Utils', () => {
  describe('hashPassword', () => {
    test('should hash password correctly', async () => {
      const password = 'testpassword123';
      const hashed = await hashPassword(password);
      
      expect(hashed).toBeDefined();
      expect(hashed).not.toBe(password);
      expect(typeof hashed).toBe('string');
    });

    test('should generate different hashes for same password', async () => {
      const password = 'testpassword123';
      const hash1 = await hashPassword(password);
      const hash2 = await hashPassword(password);
      
      expect(hash1).not.toBe(hash2);
    });
  });

  describe('comparePassword', () => {
    test('should return true for correct password', async () => {
      const password = 'testpassword123';
      const hashed = await hashPassword(password);
      
      const isValid = await comparePassword(password, hashed);
      expect(isValid).toBe(true);
    });

    test('should return false for incorrect password', async () => {
      const password = 'testpassword123';
      const wrongPassword = 'wrongpassword';
      const hashed = await hashPassword(password);
      
      const isValid = await comparePassword(wrongPassword, hashed);
      expect(isValid).toBe(false);
    });
  });
});
```

#### Integration Tests
```javascript
// tests/integration/auth.test.js
import request from 'supertest';
import app from '../../src/index.js';
import { connectTestDB, clearTestDB } from '../setup/database.js';

describe('Authentication Endpoints', () => {
  beforeAll(async () => {
    await connectTestDB();
  });

  afterAll(async () => {
    await clearTestDB();
  });

  beforeEach(async () => {
    // Clear test data before each test
    await User.deleteMany({});
  });

  describe('POST /api/auth/register', () => {
    const validUserData = {
      username: 'testuser',
      email: 'test@example.com',
      password: 'password123'
    };

    test('should register user with valid data', async () => {
      const response = await request(app)
        .post('/api/auth/register')
        .send(validUserData)
        .expect(201);

      expect(response.body.status).toBe(true);
      expect(response.body.data.email).toBe(validUserData.email);
      expect(response.body.data.password).toBeUndefined();
    });

    test('should reject registration with invalid email', async () => {
      const invalidData = { ...validUserData, email: 'invalid-email' };
      
      const response = await request(app)
        .post('/api/auth/register')
        .send(invalidData)
        .expect(400);

      expect(response.body.error).toContain('email');
    });

    test('should reject registration with short password', async () => {
      const invalidData = { ...validUserData, password: '123' };
      
      const response = await request(app)
        .post('/api/auth/register')
        .send(invalidData)
        .expect(400);

      expect(response.body.error).toContain('password');
    });
  });
});
```

### Test Coverage Requirements
- **Minimum Coverage:** 80% overall
- **Critical Paths:** 100% coverage for authentication, security functions
- **New Features:** Must include tests
- **Bug Fixes:** Must include regression tests

---

## Documentation

### Code Documentation

#### JSDoc Comments
```javascript
/**
 * Generates a JWT access token for user authentication
 * @param {Object} payload - Token payload containing user information
 * @param {string} payload.id - User ID
 * @param {string} payload.username - Username
 * @param {string} payload.role - User role
 * @returns {string} JWT access token
 * @throws {Error} If token generation fails
 */
export const generateAccessToken = (payload) => {
  try {
    return jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });
  } catch (error) {
    throw new Error('Token generation failed: ' + error.message);
  }
};
```

#### API Documentation
```javascript
/**
 * @api {post} /api/auth/register Register User
 * @apiName RegisterUser
 * @apiGroup Authentication
 * @apiVersion 1.0.0
 * 
 * @apiDescription Register a new user account with email verification
 * 
 * @apiParam {String{3-10}} username User's username
 * @apiParam {String} email User's email address
 * @apiParam {String{6-20}} password User's password
 * 
 * @apiSuccess {Boolean} status Success status
 * @apiSuccess {String} message Success message
 * @apiSuccess {Object} data User data
 * @apiSuccess {String} data.id User ID
 * @apiSuccess {String} data.username Username
 * @apiSuccess {String} data.email Email address
 * 
 * @apiError {String} error Error message
 * @apiError {String} status Error status
 * 
 * @apiExample {curl} Example usage:
 *     curl -X POST http://localhost:8000/api/auth/register \
 *          -H "Content-Type: application/json" \
 *          -d '{"username":"john","email":"john@example.com","password":"password123"}'
 */
```

### README Updates
When adding new features, update the main README.md with:
- Feature description
- Configuration requirements
- Usage examples
- API endpoint documentation

---

## Community

### Getting Help
- **GitHub Issues:** For bug reports and feature requests
- **Discussions:** For questions and general discussion
- **Discord/Slack:** For real-time chat (if available)
- **Email:** For private/security-related issues

### Mentorship
New contributors are welcome! If you're new to the project:
- Start with issues labeled `good first issue`
- Ask questions in discussions
- Request code review feedback
- Participate in community discussions

### Recognition
Contributors will be recognized through:
- Contributors list in README
- Release notes mentions
- Annual contributor highlights
- Maintainer nominations for significant contributions

---

## License

By contributing to this project, you agree that your contributions will be licensed under the same license as the project (ISC License).

---

## Questions?

If you have any questions about contributing, please:
1. Check existing documentation
2. Search closed issues and discussions
3. Create a new discussion or issue
4. Contact the maintainers directly

Thank you for contributing to UrlFox! 🚀
