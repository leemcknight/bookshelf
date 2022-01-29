import Amplify, { Auth } from 'aws-amplify';
Amplify.configure({
  aws_cognito_region: "us-west-2", // (required) - Region where Amazon Cognito project was created   
  aws_user_pools_id: "us-west-2_1jHl1mG9W", // (optional) -  Amazon Cognito User Pool ID   
  aws_user_pools_web_client_id: "8p8q8f6qtllhdilgmp9gpskl2", // (optional) - Amazon Cognito App Client ID (App client secret needs to be disabled)  

});

const aws = require('aws-sdk');
const POOL_ID = 'us-west-2_1jHl1mG9W';
const CLIENT_ID = '8p8q8f6qtllhdilgmp9gpskl2';

const poolData = {
  UserPoolId: POOL_ID, // Your user pool id here
  ClientId: CLIENT_ID, // Your client id here
};

const userPool = new aws.CognitoIdentityServiceProvider({ region: 'us-west-2' });

const signUp = async (accountInfo) => {
  try {
    const { user } = await Auth.signUp({
      username: accountInfo.userName,
      password: accountInfo.password,
      attributes: {
        given_name: accountInfo.firstName,
        family_name: accountInfo.lastName,
        email: accountInfo.userName
      }
    });
    console.log(user);
    return user;
  } catch (error) {
    console.log('error signing up:', error);
  }
}

const confirmSignUp = async (username, code) => {
  try {
    await Auth.confirmSignUp(username, code);
  } catch (error) {
    console.log('error confirming sign up', error);
  }
}

const signIn = async (username, password) => {
  try {
    const user = await Auth.signIn(username, password);
    return user;
  } catch (error) {
    console.log('error signing in', error);
  }
}

const signOut = async () => {
  try {
    await Auth.signOut();
  } catch (error) {
    console.log('error signing out: ', error);
  }
}

const createAccount = async user => {
  var params = {
    ClientId: poolData.ClientId, /* required */
    Password: user.password, /* required */
    Username: user.userName, /* required */
    UserAttributes: [
      {
        Name: 'given_name', /* required */
        Value: user.firstName
      },
      {
        Name: 'family_name', /* required */
        Value: user.lastName
      },
      {
        Name: 'email',
        Value: user.userName
      }
    ]
  };

  const response = await userPool.signUp(params).promise();
  //const userId = response.UserSub;
  console.log(response);
  return response;

};

const confirmAccount = async (userName, confirmationCode) => {
  const response = userPool.confirmSignUp({
    ClientId: poolData.ClientId,
    Username: userName,
    ConfirmationCode: confirmationCode
  }).promise();
  return response;
};

const resendConfirmationCode = async (userName) => {
  return userPool.resendConfirmationCode({
    ClientId: poolData.ClientId,
    Username: userName
  });
}


const login = async (username, password) => {
  var params = {
    AuthFlow: 'USER_PASSWORD_AUTH',
    ClientId: poolData.ClientId,
    AuthParameters: {
      'USERNAME': username,
      'PASSWORD': password
    }
  };
  const result = await userPool.initiateAuth(params).promise();
  return result.$response;
}

export {
  signUp,
  confirmSignUp,
  resendConfirmationCode,
  signIn,
  signOut,
  createAccount,
  confirmAccount,
  login
}
