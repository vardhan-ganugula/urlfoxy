# API Documentation

## Base URL
- **Development:** `http://localhost:8000`
- **Production:** Your deployed domain

## Authentication
The API uses JWT-based authentication with access and refresh tokens stored in HTTP-only cookies.

### Authentication Flow
1. Register or login to receive tokens
2. Access token (15 min) is used for API requests
3. Refresh token (7 days) is used to renew access tokens
4. Both tokens are stored in secure HTTP-only cookies

## Rate Limiting
Authentication endpoints have rate limiting applied to prevent abuse.

---

## Auth Endpoints (`/api/auth`)

### 1. Register User
**POST** `/api/auth/register`

Register a new user account.

**Request Body:**
```json
{
  "username": "string (3-10 chars)",
  "email": "string (valid email)",
  "password": "string (6-20 chars)"
}
```

**Response (201):**
```json
{
  "message": "User registered successfully check you email",
  "status": true,
  "data": {
    "id": "user_id",
    "username": "username",
    "email": "user@example.com",
    "role": "user"
  }
}
```

**Error Responses:**
- `400` - Validation error
- `409` - User already exists
- `500` - Internal server error

---

### 2. Login User
**POST** `/api/auth/login`

Authenticate user and create session.

**Request Body:**
```json
{
  "email": "string (valid email)",
  "password": "string (min 6 chars)"
}
```

**Response (200):**
```json
{
  "message": "User logged in successfully",
  "status": true,
  "data": {
    "id": "user_id",
    "username": "username",
    "email": "user@example.com",
    "userType": "user",
    "isEmailVerified": true,
    "credits": 0,
    "profileURL": "profile_image_url",
    "createdAt": "2025-01-01T00:00:00.000Z",
    "updatedAt": "2025-01-01T00:00:00.000Z"
  }
}
```

**Cookies Set:**
- `accessToken` - HTTP-only, 15 minutes
- `refreshToken` - HTTP-only, 7 days

**Error Responses:**
- `400` - Validation error
- `401` - Invalid password
- `404` - User not found
- `500` - Internal server error

---

### 3. Logout User
**GET** `/api/auth/logout`

Logout user and invalidate session.

**Headers Required:**
- Cookies: `refreshToken`

**Response (200):**
```json
{
  "message": "User logged out successfully",
  "status": true
}
```

**Cookies Cleared:**
- `accessToken`
- `refreshToken`

**Error Responses:**
- `401` - Unauthorized (no refresh token)
- `404` - Session not found
- `500` - Internal server error

---

### 4. Forgot Password
**POST** `/api/auth/forgot-password`

Initiate password reset process.

**Request Body:**
```json
{
  "email": "string (valid email)"
}
```

**Response (200):**
```json
{
  "message": "Password reset email sent successfully",
  "status": true
}
```

**Error Responses:**
- `400` - Email is required
- `404` - User not found
- `500` - Internal server error

---

### 5. Reset Password
**POST** `/api/auth/reset-password`

Reset password using token from email.

**Request Body:**
```json
{
  "token": "string (reset token)",
  "password": "string (new password, min 6 chars)"
}
```

**Response (200):**
```json
{
  "message": "Password changed successfully",
  "status": true
}
```

**Error Responses:**
- `400` - Invalid or expired token
- `404` - User not found
- `500` - Internal server error

---

### 6. Send Verification Email
**POST** `/api/auth/send-verification-email`

Resend email verification.

**Request Body:**
```json
{
  "email": "string (valid email)"
}
```

**Response (200):**
```json
{
  "message": "Verification email sent successfully",
  "status": true
}
```

**Error Responses:**
- `400` - Email is required
- `404` - User not found
- `409` - Email already verified
- `500` - Internal server error

---

### 7. Verify User Email
**PUT** `/api/auth/verify-user`

Verify user email using token.

**Request Body:**
```json
{
  "token": "string (verification token)"
}
```

**Response (200):**
```json
{
  "message": "Email verified successfully",
  "status": true
}
```

**Error Responses:**
- `400` - Invalid or expired token
- `404` - User not found
- `500` - Internal server error

---

## User Endpoints (`/api/user`)

All user endpoints require authentication via access token.

### 1. Get User Profile
**GET** `/api/user/profile`

Get current user's profile information.

**Headers Required:**
- Cookies: `accessToken` or `refreshToken`

**Response (200):**
```json
{
  "message": "User status fetched successfully",
  "user": {
    "id": "user_id",
    "username": "username",
    "email": "user@example.com",
    "userType": "user",
    "isEmailVerified": true,
    "credits": 0,
    "profileURL": "profile_image_url",
    "createdAt": "2025-01-01T00:00:00.000Z",
    "updatedAt": "2025-01-01T00:00:00.000Z"
  }
}
```

**Error Responses:**
- `401` - Unauthorized (invalid or missing token)
- `500` - Internal server error

---

## Error Response Format

All error responses follow this format:

```json
{
  "error": "Error message",
  "status": "error",
  "message": "Detailed error description"
}
```

## Common HTTP Status Codes

- `200` - OK
- `201` - Created
- `400` - Bad Request (validation error)
- `401` - Unauthorized (authentication required)
- `404` - Not Found
- `409` - Conflict (resource already exists)
- `500` - Internal Server Error

## Request/Response Headers

### Content-Type
All requests should include:
```
Content-Type: application/json
```

### CORS
The API supports CORS for the configured client URL.

### Cookies
Authentication tokens are automatically included in requests via HTTP-only cookies.

## Rate Limiting

Authentication endpoints (`/api/auth/*`) have rate limiting applied:
- Limits requests per IP address
- Prevents brute force attacks
- Returns `429 Too Many Requests` when limit exceeded

## Notes

1. **Password Requirements:** Minimum 6 characters, maximum 20 characters
2. **Username Requirements:** 3-10 characters, alphanumeric
3. **Email Verification:** Required for full account access
4. **Session Management:** Sessions are tracked with device and IP information
5. **Token Refresh:** Access tokens are automatically refreshed using refresh tokens
6. **Security:** All sensitive operations require email verification
