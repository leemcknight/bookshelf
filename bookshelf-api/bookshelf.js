const aws = require('aws-sdk');

const dynamo = new aws.DynamoDB.DocumentClient();
const TABLE_NAME = 'bookshelf';

const getLibrary = async user => {
    const key = `user-${user.id}-book`;
    const params = {
        TableName: TABLE_NAME,
        Key: user.id
    };
    return dynamo.get(params).promise();
}

const addBook = async (user, book) => {
    const partitionKey = `user=${user.id}-book`;
    const sortKey = book.isbn;
    
    var params = {
        TableName: TABLE_NAME,
        Key: { HashKey : 'hashkey' },
        UpdateExpression: 'set #a = :x + :y',
        ConditionExpression: '#a < :MAX',
        ExpressionAttributeNames: {'#a' : 'Sum'},
        ExpressionAttributeValues: {
          ':x' : 20,
          ':y' : 45,
          ':MAX' : 100,
        }
      };
      

    return dynamo.update(params).promise();
}

const addUser = async (user) => {
    const partitionKey = `user=${user.id}-profile`;
    const params = {
        TableName: TABLE_NAME,
        Item: {
            HashKey: partitionKey 
         }
    }

    return dynamo.put(params).promise();
}

const searchBooks = filterCriteria => {
    
}

module.exports = {
    getLibrary,
    addUser,
    addBook
};
