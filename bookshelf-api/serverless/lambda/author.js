const aws = require('aws-sdk')
const { getSingletonByKey } = require('../dynamodb')

const dynamo = new aws.DynamoDB.DocumentClient()
const TABLE_NAME = 'bookshelf'

/*
    DynamoDB Key Structure

    Each user has 1 library, each library has 1 to many bookshelves.
    Each bookshelf has 1 to many books.  

    dynamo keys:

    1.  Library (bookshelves)
        user-{userId}-library
    2.  Bookshelf (books)
        Partition Key: user-{userId}-bookshelf-{bookshelfId}
        Range Key: bookId
    3.  User Profile
        Partition Key: user-{userId}
        Range Key: "profile"
    4.  Author
        Partition Key: author-{authorId}
        Range Key: "profile"
    5.  Books by Author
        Parition Key: author-{authorId}
        Range Key: {isbn}
*/

const buildAuthorKey = authorId => `author-${userId}`
const getUserProfile = userId => getSingletonByKey(buildUserKey(userId))

const addUser = async (userId, user) => {
    const partitionKey = `user-${userId}`
    const params = {
        TableName: TABLE_NAME,
        Item: {
            item_key: partitionKey,
            item_name: 'profile',
            ...user
        }
    }

    return dynamo.put(params).promise()
}

const updateUserProfile = async (userId, user) => {
    const partitionKey = `user-${userId}`
    const params = {
        TableName: TABLE_NAME,
        Key: {
            item_key: partitionKey,
            item_name: 'profile'
        },
        UpdateExpression: 'set #email = :email, #displayName = :displayName, #about = :about',
        ExpressionAttributeNames: {
            '#email': 'email',
            '#displayName': 'displayName',
            '#about': 'about'
        },
        ExpressionAttributeValues: {
            ':email': user.email,
            ':displayName': user.displayName,
            ':about': user.about
        }
    }

    return dynamo.update(params).promise()
}

module.exports = {
    addUser,
    updateUserProfile,
    getUserProfile
}
