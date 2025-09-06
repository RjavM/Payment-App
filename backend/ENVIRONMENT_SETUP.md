# Environment Variables Setup

This document explains how to set up environment variables for the Payment App backend.

## Required Environment Variables

Create a `.env` file in the backend directory with the following variables:

```bash
# Database Configuration
MONGODB_URI=mongodb://localhost:27017/payment-app

# JWT Secret (REQUIRED - Generate a strong secret)
JWT_SECRET=your-super-secret-jwt-key-here-make-it-long-and-random-at-least-32-characters

# Server Configuration
PORT=3000
NODE_ENV=development

# Frontend URL (for CORS configuration)
FRONTEND_URL=http://localhost:5173
```

## How to Generate a Strong JWT Secret

### Option 1: Using Node.js
```bash
node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"
```

### Option 2: Using OpenSSL
```bash
openssl rand -hex 64
```

### Option 3: Online Generator
Use a secure online generator like: https://generate-secret.vercel.app/64

## Environment-Specific Configurations

### Development
```bash
NODE_ENV=development
MONGODB_URI=mongodb://localhost:27017/payment-app-dev
PORT=3000
FRONTEND_URL=http://localhost:5173
```

### Production
```bash
NODE_ENV=production
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/payment-app-prod
PORT=3000
FRONTEND_URL=https://yourdomain.com
```

### Staging
```bash
NODE_ENV=staging
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/payment-app-staging
PORT=3000
FRONTEND_URL=https://staging.yourdomain.com
```

## Security Best Practices

1. **Never commit `.env` files** to version control
2. **Use different secrets** for different environments
3. **Rotate secrets regularly** in production
4. **Use strong, random secrets** (at least 32 characters)
5. **Restrict database access** by IP in production
6. **Use environment-specific databases**

## Troubleshooting

### Error: "Missing required environment variables"
- Make sure you have a `.env` file in the backend directory
- Check that all required variables are set
- Verify the `.env` file syntax (no spaces around `=`)

### Error: "Using default JWT secret in production"
- Set a strong `JWT_SECRET` in your production environment
- Never use the default secret in production

### CORS Issues
- Make sure `FRONTEND_URL` matches your frontend domain
- In development, CORS allows all origins
- In production, CORS is restricted to `FRONTEND_URL`
