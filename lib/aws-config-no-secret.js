import { Amplify } from 'aws-amplify';

const awsconfig = {
  Auth: {
    Cognito: {
      region: 'us-east-2',
      userPoolId: 'us-east-2_QG2kie0bT',
      userPoolClientId: '4akv75hp23a6tun40v51kobo5u',
      loginWith: {
        email: false,
        username: true,
        phone: false,
      },
    }
  }
};

// Only configure Amplify on the client side
if (typeof window !== 'undefined') {
  console.log('Configuring Amplify without client secret');
  Amplify.configure(awsconfig);
}

export default awsconfig; 