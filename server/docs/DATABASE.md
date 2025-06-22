# Database Schema Documentation

## Overview
The application uses MongoDB with Mongoose ODM for data modeling. The database is designed to support user authentication, session management, URL shortening, and analytics.

## Database Connection
- **URI:** Configured via `MONGODB_URI` environment variable
- **Default:** `mongodb://localhost:27017/urlfox`
- **Connection:** Established in `utils/DB.js`

---

## Models

### 1. User Model (`user.model.js`)

Stores user account information and authentication data.

**Schema:**
```javascript
{
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  password: {
    type: String,
    required: true,
    trim: true,
    select: false  // Excluded from queries by default
  },
  userType: {
    type: String,
    enum: ["admin", "user"],
    default: "user"
  },
  isEmailVerified: {
    type: Boolean,
    default: false
  },
  emailVerificationToken: {
    type: String,
    default: null,
    select: false  // Excluded from queries by default
  },
  emailVerificationExpiry: {
    type: Date,
    default: Date.now() + 15*60*1000,  // 15 minutes
    select: false  // Excluded from queries by default
  },
  username: {
    type: String,
    default: "User"
  },
  credits: {
    type: Number,
    default: 0
  },
  profileURL: {
    type: String,
    default: "https://res.cloudinary.com/dh5frdemm/image/upload/v1747980547/logo_mox6pq_c_fill_w_200_h_200_ar_1_1_hjbohs.webp"
  }
}
```

**Timestamps:** `createdAt`, `updatedAt` (automatic)

**Indexes:**
- `email` (unique)

**Usage:**
- User registration and authentication
- Profile management
- Email verification tracking
- User type and permissions

---

### 2. Session Model (`session.model.js`)

Tracks user login sessions for security and analytics.

**Purpose:**
- Session management and tracking
- Device and location monitoring
- Security audit trails
- Multi-device login support

**Expected Schema:**
```javascript
{
  userId: {
    type: ObjectId,
    ref: 'User',
    required: true
  },
  userAgent: {
    type: String,
    required: true
  },
  ipAddress: {
    type: String,
    required: true
  },
  device: {
    type: String,
    required: true
  },
  isActive: {
    type: Boolean,
    default: true
  },
  lastActivity: {
    type: Date,
    default: Date.now
  }
}
```

**Indexes:**
- `userId`
- `isActive`

---

### 3. Forgot Password Model (`forgotPassword.model.js`)

Manages password reset tokens and expiration.

**Purpose:**
- Secure password reset flow
- Token expiration management
- One-time use tokens

**Expected Schema:**
```javascript
{
  userId: {
    type: ObjectId,
    ref: 'User',
    required: true
  },
  token: {
    type: String,
    required: true,
    unique: true
  },
  expiryDate: {
    type: Date,
    required: true
  },
  isUsed: {
    type: Boolean,
    default: false
  }
}
```

**Indexes:**
- `token` (unique)
- `userId`
- `expiryDate`

---

### 4. URL Model (`url.model.js`)

Stores shortened URLs and their metadata (Future Implementation).

**Purpose:**
- URL shortening service core functionality
- Analytics and tracking
- User-specific URL management

**Expected Schema:**
```javascript
{
  originalUrl: {
    type: String,
    required: true
  },
  shortCode: {
    type: String,
    required: true,
    unique: true
  },
  customAlias: {
    type: String,
    sparse: true,
    unique: true
  },
  userId: {
    type: ObjectId,
    ref: 'User',
    required: true
  },
  groupId: {
    type: ObjectId,
    ref: 'Group'
  },
  domainId: {
    type: ObjectId,
    ref: 'Domain'
  },
  title: String,
  description: String,
  tags: [String],
  isActive: {
    type: Boolean,
    default: true
  },
  expiryDate: Date,
  clickCount: {
    type: Number,
    default: 0
  },
  lastClickedAt: Date
}
```

---

### 5. Click Logs Model (`clickLogs.model.js`)

Records detailed analytics for URL clicks.

**Purpose:**
- Detailed click analytics
- Geographic and device tracking
- Referrer analysis
- Time-based statistics

**Expected Schema:**
```javascript
{
  urlId: {
    type: ObjectId,
    ref: 'URL',
    required: true
  },
  ipAddress: String,
  userAgent: String,
  referer: String,
  country: String,
  city: String,
  device: String,
  browser: String,
  os: String,
  timestamp: {
    type: Date,
    default: Date.now
  }
}
```

**Indexes:**
- `urlId`
- `timestamp`
- `country`
- `device`

---

### 6. Domains Model (`domains.model.js`)

Manages custom domains for URL shortening.

**Purpose:**
- Custom domain support
- Domain verification
- User-specific domain management

**Expected Schema:**
```javascript
{
  domain: {
    type: String,
    required: true,
    unique: true
  },
  userId: {
    type: ObjectId,
    ref: 'User',
    required: true
  },
  isVerified: {
    type: Boolean,
    default: false
  },
  verificationToken: String,
  isActive: {
    type: Boolean,
    default: true
  },
  sslEnabled: {
    type: Boolean,
    default: false
  }
}
```

---

### 7. Groups Model (`groups.model.js`)

Organizes URLs into collections.

**Purpose:**
- URL organization and categorization
- Team collaboration
- Bulk operations

**Expected Schema:**
```javascript
{
  name: {
    type: String,
    required: true
  },
  description: String,
  userId: {
    type: ObjectId,
    ref: 'User',
    required: true
  },
  color: String,
  isPublic: {
    type: Boolean,
    default: false
  },
  urlCount: {
    type: Number,
    default: 0
  }
}
```

---

## Relationships

### User Relationships
- **One-to-Many:** User → Sessions
- **One-to-Many:** User → URLs
- **One-to-Many:** User → Groups
- **One-to-Many:** User → Domains
- **One-to-Many:** User → ForgotPassword

### URL Relationships
- **Many-to-One:** URLs → User
- **Many-to-One:** URLs → Group
- **Many-to-One:** URLs → Domain
- **One-to-Many:** URL → ClickLogs

### Other Relationships
- **Many-to-One:** Groups → User
- **Many-to-One:** Domains → User
- **Many-to-One:** Sessions → User

---

## Data Validation

### User Validation (Zod Schema)
```javascript
// Registration
{
  username: string (3-10 chars),
  email: string (valid email),
  password: string (6-20 chars)
}

// Login
{
  email: string (valid email),
  password: string (min 6 chars)
}
```

### Security Considerations
- **Password Storage:** bcrypt hashing with salt
- **Email Verification:** Time-limited tokens
- **Session Security:** Device and IP tracking
- **Token Security:** JWT with expiration
- **Data Privacy:** Sensitive fields excluded from queries

---

## Indexes and Performance

### Recommended Indexes
```javascript
// Users
db.users.createIndex({ "email": 1 }, { unique: true })

// Sessions
db.sessions.createIndex({ "userId": 1 })
db.sessions.createIndex({ "isActive": 1 })

// URLs (future)
db.urls.createIndex({ "shortCode": 1 }, { unique: true })
db.urls.createIndex({ "userId": 1 })
db.urls.createIndex({ "customAlias": 1 }, { unique: true, sparse: true })

// Click Logs (future)
db.clicklogs.createIndex({ "urlId": 1 })
db.clicklogs.createIndex({ "timestamp": 1 })

// Forgot Password
db.forgotpasswords.createIndex({ "token": 1 }, { unique: true })
db.forgotpasswords.createIndex({ "expiryDate": 1 }, { expireAfterSeconds: 0 })
```

### Performance Considerations
- **Pagination:** Implement for large datasets
- **Aggregation:** Use for analytics queries
- **Caching:** Consider Redis for frequent queries
- **Archiving:** Old click logs and sessions

---

## Environment Variables

### Database Configuration
```env
MONGODB_URI=mongodb://localhost:27017/urlfox
```

### Connection Options
- **Automatic Reconnection:** Enabled
- **Connection Pooling:** MongoDB driver default
- **Timeout Settings:** Default values
- **SSL/TLS:** Configure as needed for production

---

## Backup and Maintenance

### Backup Strategy
- **Regular Backups:** Daily automated backups
- **Data Retention:** Based on business requirements
- **Point-in-Time Recovery:** Enable for critical data

### Maintenance Tasks
- **Index Optimization:** Regular index analysis
- **Data Cleanup:** Remove expired tokens and old sessions
- **Performance Monitoring:** Query performance tracking

---

## Migration Considerations

### Future Schema Changes
- **Version Control:** Track schema versions
- **Migration Scripts:** Automated data migration
- **Backward Compatibility:** Consider during updates
- **Testing:** Thorough testing of migrations

### Scaling Considerations
- **Sharding:** For large-scale deployments
- **Read Replicas:** For read-heavy workloads
- **Data Archiving:** For historical data management
