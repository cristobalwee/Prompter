# AWS Cognito Authentication Setup

This guide will help you set up AWS Cognito authentication in your Next.js app.

## 1. Environment Variables

Create a `.env.local` file in your project root with the following variables:

```env
# AWS Cognito Configuration
NEXT_PUBLIC_AWS_REGION=us-east-1
NEXT_PUBLIC_USER_POOL_ID=your-user-pool-id
NEXT_PUBLIC_USER_POOL_WEB_CLIENT_ID=your-app-client-id

# Optional: Custom domain for cookies
# NEXT_PUBLIC_COOKIE_DOMAIN=.yourdomain.com
```

## 2. AWS Cognito User Pool Setup

### Create User Pool:
1. Go to AWS Console → Cognito
2. Create a new User Pool
3. Configure sign-in experience (email/username)
4. Set password requirements
5. Configure MFA (optional)
6. Set up message customizations
7. Add app client

### App Client Configuration:
1. Create an app client in your User Pool
2. Enable username password auth
3. Enable SRP (Secure Remote Password)
4. Set callback URLs (for production)
5. Copy the Client ID and User Pool ID

## 3. Features Implemented

### Authentication Flow:
- ✅ Sign In
- ✅ Sign Up with email verification
- ✅ Password reset
- ✅ Account confirmation
- ✅ Sign Out
- ✅ Persistent authentication state

### UI Components:
- ✅ Modal-based authentication
- ✅ Responsive design
- ✅ Loading states
- ✅ Error handling with toast notifications
- ✅ User display in header

### Security:
- ✅ Client-side only Amplify configuration
- ✅ Environment variable configuration
- ✅ Secure password requirements
- ✅ Email verification

## 4. Usage

The authentication is now integrated into your header component. Users can:
- Click "Sign up" to create a new account
- Click "Log in" to sign in with existing credentials
- Use "Forgot password?" to reset their password
- See their username/email when signed in
- Sign out using the logout button

## 5. Customization

### Styling:
The auth modal uses your existing design system with:
- Dark theme
- Consistent button styles
- Framer Motion animations
- Responsive design

### Additional Features:
You can extend the authentication by:
- Adding social login providers
- Implementing role-based access control
- Adding profile management
- Customizing email templates

## 6. Testing

1. Set up your environment variables
2. Run `npm run dev`
3. Test the sign-up flow
4. Verify email confirmation
5. Test sign-in and sign-out
6. Test password reset functionality

## 7. Production Deployment

For production:
1. Update environment variables with production values
2. Configure custom domain in Cognito
3. Set up proper callback URLs
4. Enable HTTPS
5. Configure email templates
6. Set up monitoring and logging 