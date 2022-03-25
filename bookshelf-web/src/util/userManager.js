import Amplify, { Auth } from 'aws-amplify';
Amplify.configure({
  aws_cognito_region: "us-west-2", // (required) - Region where Amazon Cognito project was created   
  aws_user_pools_id: "us-west-2_1jHl1mG9W", // (optional) -  Amazon Cognito User Pool ID   
  aws_user_pools_web_client_id: "8p8q8f6qtllhdilgmp9gpskl2", // (optional) - Amazon Cognito App Client ID (App client secret needs to be disabled)  

});

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

const resendConfirmationCode = async (username) => {
  try {
    await Auth.resendConfirmationCode(username);
  } catch (error) {
    console.log('error resending confirmation code', error);
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

export {
  signUp,
  confirmSignUp,
  resendConfirmationCode,
  signIn,
  signOut
}
