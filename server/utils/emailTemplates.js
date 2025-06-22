import { CLIENT_URL, COMPANY_NAME } from "./constants.js";

export const forgotPasswordEmailTemplate = (token) => {
  return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <title>Reset Your Password</title>
    <style>
        /* Reset styles */
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        
        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
            line-height: 1.6;
            color: #333333;
            background-color: #f8fafc;
            margin: 0;
            padding: 0;
        }
        
        .email-container {
            max-width: 600px;
            margin: 0 auto;
            background-color: #ffffff;
            border-radius: 12px;
            overflow: hidden;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        }
        
        .header {
            background: linear-gradient(135deg, #667eea 0%, #fff95b 100%);
            padding: 40px 20px;
            text-align: center;
            color: white;
        }
        
        .logo {
            font-size: 28px;
            font-weight: bold;
            margin-bottom: 10px;
        }
        
        .header-subtitle {
            font-size: 16px;
            opacity: 0.9;
        }
        
        .content {
            padding: 40px 30px;
        }
        
        .greeting {
            font-size: 24px;
            font-weight: 600;
            color: #1a202c;
            margin-bottom: 20px;
        }
        
        .message {
            font-size: 16px;
            color: #4a5568;
            margin-bottom: 30px;
            line-height: 1.7;
        }
        
        .reset-button {
            display: inline-block;
            background: linear-gradient(135deg, #667eea 0%, #fff95b 100%);
            color: white;
            text-decoration: none;
            padding: 16px 40px;
            border-radius: 50px;
            font-weight: 600;
            font-size: 16px;
            margin: 20px 0;
            transition: all 0.3s ease;
            box-shadow: 0 4px 15px rgba(102, 126, 234, 0.4);
        }
        
        .reset-button:hover {
            transform: translateY(-2px);
            box-shadow: 0 6px 20px rgba(102, 126, 234, 0.6);
        }
        
        .security-notice {
            background-color: #fef5e7;
            border-left: 4px solid #f6ad55;
            padding: 20px;
            margin: 30px 0;
            border-radius: 4px;
        }
        
        .security-notice h3 {
            color: #c05621;
            margin-bottom: 10px;
            font-size: 16px;
        }
        
        .security-notice p {
            color: #744210;
            font-size: 14px;
            margin: 0;
        }
        
        .expiry-info {
            background-color: #fef2f2;
            border: 1px solid #fecaca;
            border-radius: 8px;
            padding: 15px;
            margin: 20px 0;
            text-align: center;
        }
        
        .expiry-info p {
            color: #991b1b;
            font-size: 14px;
            margin: 0;
            font-weight: 600;
        }
        
        .info-box {
            background-color: #eff6ff;
            border: 1px solid #bfdbfe;
            border-radius: 8px;
            padding: 20px;
            margin: 25px 0;
        }
        
        .info-box h3 {
            color: #1e40af;
            margin-bottom: 10px;
            font-size: 16px;
            font-weight: 600;
        }
        
        .info-box p {
            color: #1e3a8a;
            font-size: 14px;
            margin: 0;
            line-height: 1.5;
        }
        
        .footer {
            background-color: #f8fafc;
            padding: 30px;
            text-align: center;
            border-top: 1px solid #e2e8f0;
        }
        
        .footer p {
            color: #718096;
            font-size: 14px;
            margin-bottom: 10px;
        }
        
        .footer a {
            color: #667eea;
            text-decoration: none;
        }
        
        .social-links {
            margin-top: 20px;
        }
        
        .social-links a {
            display: inline-block;
            margin: 0 10px;
            color: #a0aec0;
            text-decoration: none;
            font-size: 18px;
        }
        
        /* Responsive design */
        @media only screen and (max-width: 600px) {
            .email-container {
                margin: 0;
                border-radius: 0;
            }
            
            .content {
                padding: 30px 20px;
            }
            
            .header {
                padding: 30px 20px;
            }
            
            .greeting {
                font-size: 20px;
            }
            
            .reset-button {
                padding: 14px 30px;
                font-size: 15px;
            }
        }
        
        /* Dark mode support */
        @media (prefers-color-scheme: dark) {
            .email-container {
                background-color: #1a202c;
                color: #e2e8f0;
            }
            
            .content {
                background-color: #1a202c;
            }
            
            .greeting {
                color: #f7fafc;
            }
            
            .message {
                color: #cbd5e0;
            }
            
            .info-box {
                background-color: #2d3748;
                border-color: #4a5568;
            }
        }
    </style>
</head>
<body>
    <div class="email-container">
        <!-- Header -->
        <div class="header">
            <div class="logo">${COMPANY_NAME}</div>
            <div class="header-subtitle">Password Reset Request</div>
        </div>
        
        <!-- Main Content -->
        <div class="content">
            <h1 class="greeting">Reset Your Password 🔐</h1>
            
            <p class="message">
                We received a request to reset the password for your account. If you made this request, 
                click the button below to create a new password. If you didn't request a password reset, 
                you can safely ignore this email.
            </p>
            
            <!-- Reset Password Button -->
            <div style="text-align: center; margin: 30px 0;">
                <a href="${CLIENT_URL +'/reset-password/' + token}" class="reset-button">Reset My Password</a>
            </div>
            
            <!-- Expiry Information -->
            <div class="expiry-info">
                <p>⚠️ This password reset link expires in 15 Minutes for security</p>
            </div>
            
        
            
            <!-- Security Notice -->
            <div class="security-notice">
                <h3>🔒 Security Tips</h3>
                <p>
                    • Never share your password with anyone<br>
                    • Use a strong, unique password for your account<br>
                    • If you didn't request this reset, change your password immediately
                </p>
            </div>
            
            <p class="message">
                Having trouble with the button? Copy and paste this link 
                into your browser: <br>
                <a href="#" style="color: #667eea; word-break: break-all;">
                    ${CLIENT_URL +'/reset-password/' + token}
                </a>
            </p>
            
            <p class="message">
                If you continue to have problems, please don't hesitate to contact our support team. 
                We're here to help you regain access to your account safely and securely.
            </p>
        </div>
        
      
    </div>
</body>
</html>`;
};

export const userVerificationEmailTemplate = (username, token) => {
  return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <title>Verify Your Email Address</title>
    <style>
        /* Reset styles */
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        
        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
            line-height: 1.6;
            color: #333333;
            background-color: #f8fafc;
            margin: 0;
            padding: 0;
        }
        
        .email-container {
            max-width: 600px;
            margin: 0 auto;
            background-color: #ffffff;
            border-radius: 12px;
            overflow: hidden;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        }
        
        .header {
            background: linear-gradient(135deg, #667eea 0%, #fff95b 100%);
            padding: 40px 20px;
            text-align: center;
            color: white;
        }
        
        .logo {
            font-size: 28px;
            font-weight: bold;
            margin-bottom: 10px;
        }
        
        .header-subtitle {
            font-size: 16px;
            opacity: 0.9;
        }
        
        .content {
            padding: 40px 30px;
        }
        
        .greeting {
            font-size: 24px;
            font-weight: 600;
            color: #1a202c;
            margin-bottom: 20px;
        }
        
        .message {
            font-size: 16px;
            color: #4a5568;
            margin-bottom: 30px;
            line-height: 1.7;
        }
        
        .verification-box {
            background-color: #f7fafc;
            border: 2px dashed #e2e8f0;
            border-radius: 8px;
            padding: 30px;
            text-align: center;
            margin: 30px 0;
        }
        
        .verification-code {
            font-size: 32px;
            font-weight: bold;
            color: #667eea;
            letter-spacing: 4px;
            margin: 15px 0;
            font-family: 'Courier New', monospace;
        }
        
        .verify-button {
            display: inline-block;
            background: linear-gradient(135deg, #667eea 0%, #fff95b 100%);
            color: white;
            text-decoration: none;
            padding: 16px 40px;
            border-radius: 50px;
            font-weight: 600;
            font-size: 16px;
            margin: 20px 0;
            transition: all 0.3s ease;
            box-shadow: 0 4px 15px rgba(102, 126, 234, 0.4);
        }
        
        .verify-button:hover {
            transform: translateY(-2px);
            box-shadow: 0 6px 20px rgba(102, 126, 234, 0.6);
        }
        
        .security-notice {
            background-color: #fef5e7;
            border-left: 4px solid #f6ad55;
            padding: 20px;
            margin: 30px 0;
            border-radius: 4px;
        }
        
        .security-notice h3 {
            color: #c05621;
            margin-bottom: 10px;
            font-size: 16px;
        }
        
        .security-notice p {
            color: #744210;
            font-size: 14px;
            margin: 0;
        }
        
        .expiry-info {
            background-color: #e6fffa;
            border: 1px solid #b2f5ea;
            border-radius: 8px;
            padding: 15px;
            margin: 20px 0;
            text-align: center;
        }
        
        .expiry-info p {
            color: #234e52;
            font-size: 14px;
            margin: 0;
        }
        
        .footer {
            background-color: #f8fafc;
            padding: 30px;
            text-align: center;
            border-top: 1px solid #e2e8f0;
        }
        
        .footer p {
            color: #718096;
            font-size: 14px;
            margin-bottom: 10px;
        }
        
        .footer a {
            color: #667eea;
            text-decoration: none;
        }
        
        .social-links {
            margin-top: 20px;
        }
        
        .social-links a {
            display: inline-block;
            margin: 0 10px;
            color: #a0aec0;
            text-decoration: none;
            font-size: 18px;
        }
        
        /* Responsive design */
        @media only screen and (max-width: 600px) {
            .email-container {
                margin: 0;
                border-radius: 0;
            }
            
            .content {
                padding: 30px 20px;
            }
            
            .header {
                padding: 30px 20px;
            }
            
            .greeting {
                font-size: 20px;
            }
            
            .verification-code {
                font-size: 24px;
                letter-spacing: 2px;
            }
            
            .verify-button {
                padding: 14px 30px;
                font-size: 15px;
            }
        }
        
        /* Dark mode support */
        @media (prefers-color-scheme: dark) {
            .email-container {
                background-color: #1a202c;
                color: #e2e8f0;
            }
            
            .content {
                background-color: #1a202c;
            }
            
            .greeting {
                color: #f7fafc;
            }
            
            .message {
                color: #cbd5e0;
            }
            
            .verification-box {
                background-color: #2d3748;
                border-color: #4a5568;
            }
        }
    </style>
</head>
<body>
    <div class="email-container">
        <!-- Header -->
        <div class="header">
            <div class="logo">${COMPANY_NAME}</div>
            <div class="header-subtitle">Secure Email Verification</div>
        </div>
        
        <!-- Main Content -->
        <div class="content">
            <h1 class="greeting">Welcome ${username}! 🎉</h1>
            
            <p class="message">
                Thank you for signing up! We're excited to have you join our community. 
                To complete your registration and secure your account, please verify your email address.
            </p>
            
            <!-- Verification Button -->
            <div style="text-align: center; margin: 30px 0;">
                <a href="${CLIENT_URL}/verify/${token}" class="verify-button">Verify Email Address</a>
            </div>

            
            <!-- Expiry Information -->
            <div class="expiry-info">
                <p><strong>⏰ This verification link expires in 15 Minutes</strong></p>
            </div>
            
            <!-- Security Notice -->
            <div class="security-notice">
                <h3>🔒 Security Notice</h3>
                <p>
                    If you didn't create an account with us, please ignore this email. 
                    Your email address will not be added to our system without verification.
                </p>
            </div>
            
            <p class="message">
                Having trouble? If the button above doesn't work, copy and paste this link 
                into your browser: <br>
                <a href="#" style="color: #667eea; word-break: break-all;">
                  ${CLIENT_URL}/verify/${token}
                </a>
            </p>
            
            <p class="message">
                Need help? Our support team is here for you 24/7. 
                Just reply to this email or visit our help center.
            </p>
        </div>
        
    </div>
</body>
</html>`;
};
