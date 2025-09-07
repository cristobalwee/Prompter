import { Amplify } from 'aws-amplify';

// Debug: Check if environment variable is loaded
console.log('Client Secret loaded:', process.env.NEXT_PUBLIC_USER_POOL_CLIENT_SECRET ? 'Yes' : 'No');

// Decode the client secret if it's URL-encoded
const clientSecret = process.env.NEXT_PUBLIC_USER_POOL_CLIENT_SECRET;
const decodedClientSecret = clientSecret ? decodeURIComponent(clientSecret) : undefined;

// Create configuration object
const awsconfig = {
  Auth: {
    Cognito: {
      region: 'us-east-2',
      userPoolId: 'us-east-2_QG2kie0bT',
      userPoolClientId: '7prjdsc5sdmahon8hvhonrc928',
      loginWith: {
        email: true,
        username: false,
        phone: true,
        // Add Google OAuth configuration
        oauth: {
          domain: process.env.NEXT_PUBLIC_COGNITO_DOMAIN,
          scopes: ['email', 'openid', 'profile'],
          responseType: 'code',
          redirectSignIn: process.env.NEXT_PUBLIC_REDIRECT_SIGN_IN,
          redirectSignOut: process.env.NEXT_PUBLIC_REDIRECT_SIGN_OUT,
        }
      },
    }
  }
};

// Temporarily comment out client secret to test
// if (decodedClientSecret) {
//   awsconfig.Auth.Cognito.userPoolClientSecret = decodedClientSecret;
// }

// Only configure Amplify on the client side
if (typeof window !== 'undefined') {
  console.log('Configuring Amplify without client secret for testing');
  Amplify.configure(awsconfig);
}

export default awsconfig;