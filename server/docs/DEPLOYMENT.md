# Deployment Guide

## Overview
This guide covers deployment options for the UrlFox backend API server. The application is designed to be deployed in various environments including cloud platforms, VPS, and containerized environments.

## Prerequisites

### System Requirements
- **Node.js:** v18+ (recommended v20+)
- **MongoDB:** v5.0+ or MongoDB Atlas
- **Redis:** v6.0+ (for email queue system)
- **Memory:** Minimum 512MB RAM
- **Storage:** Minimum 1GB free space

### Environment Setup
Ensure all required environment variables are configured (see Environment Variables section).

---

## Deployment Options

### 1. Docker Deployment (Recommended)

#### Using Docker Compose
The project includes a `docker-compose.yml` file for easy deployment.

```bash
# Clone the repository
git clone https://github.com/vardhan-ganugula/urlfoxy
cd saas-project

# Build and start services
docker-compose up -d

# View logs
docker-compose logs -f server
```

#### Custom Docker Build
```bash
# Build Docker image
cd server
docker build -t foxy-url-backend .

# Run container
docker run -d \
  --name foxy-url-api \
  -p 8000:8000 \
  --env-file .env \
  foxy-url-backend
```

#### Dockerfile Example
```dockerfile
FROM node:20-alpine

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm ci --only=production

# Copy source code
COPY . .

# Create non-root user
RUN addgroup -g 1001 -S nodejs
RUN adduser -S nodeuser -u 1001

# Change ownership
RUN chown -R nodeuser:nodejs /app
USER nodeuser

# Expose port
EXPOSE 8000

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD curl -f http://localhost:8000/ || exit 1

# Start application
CMD ["npm", "start"]
```

---

### 2. Cloud Platform Deployment

#### Heroku
```bash
# Install Heroku CLI
npm install -g heroku

# Login to Heroku
heroku login

# Create app
heroku create foxy-url-backend

# Set environment variables
heroku config:set JWT_SECRET=your-secret
heroku config:set MONGODB_URI=your-mongodb-uri
# ... (set all required env vars)

# Deploy
git push heroku main

# View logs
heroku logs --tail
```

#### Vercel
```bash
# Install Vercel CLI
npm install -g vercel

# Deploy
cd server
vercel

# Set environment variables in Vercel dashboard
# Configure custom domain if needed
```

#### Railway
```bash
# Install Railway CLI
npm install -g @railway/cli

# Login
railway login

# Initialize project
railway init

# Deploy
railway up

# Set environment variables
railway vars set JWT_SECRET=your-secret
```

#### AWS EC2
```bash
# Connect to EC2 instance
ssh -i your-key.pem ubuntu@your-ec2-ip

# Update system
sudo apt update && sudo apt upgrade -y

# Install Node.js
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt-get install -y nodejs

# Install PM2
sudo npm install -g pm2

# Clone and setup project
git clone https://github.com/vardhan-ganugula/urlfoxy
cd saas-project/server
npm install

# Configure environment
cp .env.example .env
nano .env

# Start with PM2
pm2 start src/index.js --name "foxy-url-backend"
pm2 startup
pm2 save

# Setup Nginx (optional)
sudo apt install nginx
# Configure reverse proxy
```

---

### 3. VPS Deployment

#### Ubuntu/Debian Server
```bash
# Update system
sudo apt update && sudo apt upgrade -y

# Install Node.js
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt-get install -y nodejs

# Install MongoDB
wget -qO - https://www.mongodb.org/static/pgp/server-5.0.asc | sudo apt-key add -
echo "deb [ arch=amd64,arm64 ] https://repo.mongodb.org/apt/ubuntu focal/mongodb-org/5.0 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-5.0.list
sudo apt-get update
sudo apt-get install -y mongodb-org

# Install Redis
sudo apt install redis-server

# Start services
sudo systemctl start mongod
sudo systemctl enable mongod
sudo systemctl start redis-server
sudo systemctl enable redis-server

# Setup application
git clone https://github.com/vardhan-ganugula/urlfoxy
cd saas-project/server
npm install

# Configure environment
cp .env.example .env
nano .env

# Install PM2
sudo npm install -g pm2

# Start application
pm2 start src/index.js --name "foxy-url-backend"
pm2 startup
pm2 save
```

---

## Environment Variables

### Production Configuration
```env
# Server
PORT=8000
DOMAIN=https://api.yourdomain.com
ENVIRONMENT=production
CLIENT_URL=https://yourdomain.com

# Database
MONGODB_URI=mongodb+srv://user:pass@cluster.mongodb.net/urlfox

# JWT
JWT_SECRET=your-super-secure-secret-key-256-bits
JWT_EXPIRES_IN=15m
ACCESS_TOKEN_EXPIRATION=900000
REFRESH_TOKEN_EXPIRATION=604800000

# Email
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=noreply@yourdomain.com
SMTP_PASS=your-app-password

# Redis
REDIS_URL=redis://localhost:6379

# Security
COMPANY_NAME=Your Company
VERIFICATION_EXPIRY_TIME=900000
FORGOT_PASSWORD_EXPIRY=3600000
```

---

## Reverse Proxy Setup

### Nginx Configuration
```nginx
server {
    listen 80;
    server_name api.yourdomain.com;

    # Redirect HTTP to HTTPS
    return 301 https://$server_name$request_uri;
}

server {
    listen 443 ssl http2;
    server_name api.yourdomain.com;

    # SSL Configuration
    ssl_certificate /path/to/certificate.crt;
    ssl_certificate_key /path/to/private.key;
    ssl_protocols TLSv1.2 TLSv1.3;
    ssl_ciphers ECDHE-RSA-AES256-GCM-SHA512:DHE-RSA-AES256-GCM-SHA512;

    # Proxy to Node.js application
    location / {
        proxy_pass http://localhost:8000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }

    # Security headers
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-XSS-Protection "1; mode=block" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header Referrer-Policy "no-referrer-when-downgrade" always;
    add_header Content-Security-Policy "default-src 'self'" always;
}
```

### Apache Configuration
```apache
<VirtualHost *:80>
    ServerName api.yourdomain.com
    Redirect permanent / https://api.yourdomain.com/
</VirtualHost>

<VirtualHost *:443>
    ServerName api.yourdomain.com
    
    SSLEngine on
    SSLCertificateFile /path/to/certificate.crt
    SSLCertificateKeyFile /path/to/private.key
    
    ProxyPreserveHost On
    ProxyRequests Off
    ProxyPass / http://localhost:8000/
    ProxyPassReverse / http://localhost:8000/
    
    # Security headers
    Header always set X-Frame-Options "SAMEORIGIN"
    Header always set X-XSS-Protection "1; mode=block"
    Header always set X-Content-Type-Options "nosniff"
</VirtualHost>
```

---

## Database Setup

### MongoDB Atlas (Recommended for Production)
1. Create MongoDB Atlas account
2. Create new cluster
3. Configure network access (whitelist IPs)
4. Create database user
5. Get connection string
6. Update `MONGODB_URI` in environment variables

### Self-hosted MongoDB
```bash
# Install MongoDB
# Ubuntu/Debian
sudo apt-get install -y mongodb-org

# CentOS/RHEL
sudo yum install -y mongodb-org

# Start service
sudo systemctl start mongod
sudo systemctl enable mongod

# Secure installation
mongo
use admin
db.createUser({
  user: "admin",
  pwd: "securepassword",
  roles: ["userAdminAnyDatabase"]
})

# Enable authentication
sudo nano /etc/mongod.conf
# Add: security.authorization: enabled
sudo systemctl restart mongod
```

---

## SSL/TLS Configuration

### Let's Encrypt (Free SSL)
```bash
# Install Certbot
sudo apt install certbot python3-certbot-nginx

# Get certificate
sudo certbot --nginx -d api.yourdomain.com

# Auto-renewal
sudo crontab -e
# Add: 0 12 * * * /usr/bin/certbot renew --quiet
```

### Custom SSL Certificate
```bash
# Generate private key
openssl genrsa -out private.key 2048

# Generate certificate request
openssl req -new -key private.key -out certificate.csr

# Get certificate from CA
# Configure Nginx/Apache with certificate files
```

---

## Monitoring and Logging

### PM2 Monitoring
```bash
# Monitor processes
pm2 monit

# View logs
pm2 logs foxy-url-backend

# Restart application
pm2 restart foxy-url-backend

# Update application
git pull
npm install
pm2 restart foxy-url-backend
```

### Log Management
```bash
# Setup log rotation
sudo nano /etc/logrotate.d/foxy-url-backend

# Add configuration:
/home/user/.pm2/logs/*.log {
    daily
    missingok
    rotate 7
    compress
    delaycompress
    notifempty
    copytruncate
}
```

---

## Health Checks and Monitoring

### Application Health Check
```javascript
// Add to routes
app.get('/health', (req, res) => {
  res.status(200).json({
    status: 'OK',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    environment: process.env.ENVIRONMENT
  });
});
```

### External Monitoring
- **Uptime Robot:** For uptime monitoring
- **New Relic:** For application performance
- **DataDog:** For comprehensive monitoring
- **AWS CloudWatch:** For AWS deployments

---

## Backup Strategy

### Database Backup
```bash
# MongoDB backup
mongodump --uri="mongodb://user:pass@host:port/database" --out=/backup/directory

# Automated backup script
#!/bin/bash
DATE=$(date +%Y%m%d_%H%M%S)
mongodump --uri="$MONGODB_URI" --out="/backups/mongodb_$DATE"
tar -czf "/backups/mongodb_$DATE.tar.gz" "/backups/mongodb_$DATE"
rm -rf "/backups/mongodb_$DATE"

# Keep only last 7 days
find /backups -name "mongodb_*.tar.gz" -mtime +7 -delete
```

### Application Backup
```bash
# Code backup
git archive --format=tar.gz --output="/backups/code_$(date +%Y%m%d).tar.gz" HEAD

# Environment backup
cp .env "/backups/env_$(date +%Y%m%d).backup"
```

---

## Security Considerations

### Production Security Checklist
- [ ] Use strong JWT secrets (256-bit minimum)
- [ ] Enable HTTPS/SSL
- [ ] Configure CORS properly
- [ ] Set up rate limiting
- [ ] Use environment variables for secrets
- [ ] Regular security updates
- [ ] Monitor failed login attempts
- [ ] Implement proper logging
- [ ] Use secure session management
- [ ] Regular backup verification

### Firewall Configuration
```bash
# UFW (Ubuntu)
sudo ufw allow ssh
sudo ufw allow 80
sudo ufw allow 443
sudo ufw deny 8000  # Block direct access to app port
sudo ufw enable

# iptables
sudo iptables -A INPUT -p tcp --dport 22 -j ACCEPT
sudo iptables -A INPUT -p tcp --dport 80 -j ACCEPT
sudo iptables -A INPUT -p tcp --dport 443 -j ACCEPT
sudo iptables -A INPUT -p tcp --dport 8000 -s 127.0.0.1 -j ACCEPT
sudo iptables -A INPUT -p tcp --dport 8000 -j DROP
```

---

## Troubleshooting

### Common Issues

#### Port Already in Use
```bash
# Find process using port
sudo lsof -i :8000
sudo netstat -tulpn | grep 8000

# Kill process
sudo kill -9 <PID>
```

#### Database Connection Issues
```bash
# Check MongoDB status
sudo systemctl status mongod

# Check connection
mongo --host localhost --port 27017

# View MongoDB logs
sudo tail -f /var/log/mongodb/mongod.log
```

#### Memory Issues
```bash
# Check memory usage
free -h
htop

# Increase swap space
sudo fallocate -l 2G /swapfile
sudo chmod 600 /swapfile
sudo mkswap /swapfile
sudo swapon /swapfile
```

### Log Analysis
```bash
# PM2 logs
pm2 logs --lines 100

# System logs
sudo journalctl -u mongod -f
sudo journalctl -u redis -f

# Nginx logs
sudo tail -f /var/log/nginx/access.log
sudo tail -f /var/log/nginx/error.log
```

---

## Performance Optimization

### Node.js Optimization
- Use PM2 cluster mode for multi-core utilization
- Enable gzip compression
- Implement caching strategies
- Optimize database queries
- Use connection pooling

### Database Optimization
- Create proper indexes
- Implement query optimization
- Use aggregation pipelines efficiently
- Monitor slow queries
- Regular maintenance tasks

### Caching Strategy
```javascript
// Redis caching example
import redis from 'redis';
const client = redis.createClient(process.env.REDIS_URL);

// Cache middleware
const cache = (duration) => {
  return async (req, res, next) => {
    const key = req.originalUrl;
    const cached = await client.get(key);
    
    if (cached) {
      return res.json(JSON.parse(cached));
    }
    
    res.sendResponse = res.json;
    res.json = (data) => {
      client.setex(key, duration, JSON.stringify(data));
      res.sendResponse(data);
    };
    
    next();
  };
};
```

---

This deployment guide provides comprehensive instructions for deploying the UrlFox backend in various environments. Choose the deployment method that best fits your requirements and infrastructure.
