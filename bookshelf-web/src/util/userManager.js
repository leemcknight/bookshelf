const aws = require('aws-sdk');
const POOL_ID = 'us-west-2_wctTfVt9s';
const CLIENT_ID = '135npqr2oc2m9s1ihug8pv58di';

const poolData = {
  UserPoolId: POOL_ID, // Your user pool id here
  ClientId: CLIENT_ID, // Your client id here
};

const userPool = new aws.CognitoIdentityServiceProvider({ region: 'us-west-2' });

const createAccount = async user => {
  console.log(`createAccount called with : ${JSON.stringify(user)}`);
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
  const userId = response.UserSub;
  console.log(response);
  return response;

};

const confirmAccount = async (userName, confirmationCode) => {
  return userPool.confirmSignUp({
    ClientId: poolData.ClientId,
    Username: userName,
    ConfirmationCode: confirmationCode
  });
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

module.exports = {
  createAccount,
  confirmAccount,
  login
}
