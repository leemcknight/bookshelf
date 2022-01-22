const aws = require('aws-sdk');
const { v4: uuidv4 } = require('uuid');

const dynamo = new aws.DynamoDB.DocumentClient();
const TABLE_NAME = 'bookshelf';

const getLibrary = async userId => {
    const key = `user-${userId}-book`;
    const params = {
        TableName: TABLE_NAME,
        Key: key
    };
    return dynamo.get(params).promise();
}

const addBookToLibrary = async (user, book) => {
    const partitionKey = `user=${user.id}-book`;
    const sortKey = book.isbn;

    var params = {
        TableName: TABLE_NAME,
        Item: {
            item_key: partitionKey,
            item_name: book.isbn,
            ...book
        }
    };

    return dynamo.put(params).promise();
}

const addBook = async book => {
    const partitionKey = `book=${book.isbn}`;
    const sortKey = book.name;

    var params = {
        TableName: TABLE_NAME,
        Key: { HashKey: 'hashkey' },
        UpdateExpression: 'set #a = :x + :y',
        ConditionExpression: '#a < :MAX',
        ExpressionAttributeNames: { '#a': 'Sum' },
        ExpressionAttributeValues: {
            ':x': 20,
            ':y': 45,
            ':MAX': 100,
        }
    };


    return dynamo.update(params).promise();
}

const addUser = async (user) => {
    const userId = uuidv4();
    const partitionKey = `user=${userId}-profile`;
    const params = {
        TableName: TABLE_NAME,
        Item: {
            HashKey: partitionKey,
            firstName: user.firstName,
            lastName: user.lastName,
            cognitoSubjectId: user.id
        }
    }

    return dynamo.put(params).promise();
}

const updateUser = async user => {

}

const searchBooks = filterCriteria => {

}

module.exports = {
    getLibrary,
    addUser,
    addBook,
    addBookToLibrary
};
