const aws = require('aws-sdk')
/*
    This is a light wrapper around the dynamodb docclient interface.

*/
const SINGLETON_WARNING_MULTIPLE_RESULTS = 'Multiple results were found when doing performing a singleton select with key:'
const SINGLETON_WARNING_NO_RESULTS = 'No results were found when doing performing a singleton select with key:'
const dynamo = new aws.DynamoDB.DocumentClient()
const TABLE_NAME = 'bookshelf'
const getByKey = async key => {
    const params = {
        TableName: TABLE_NAME,
        KeyConditionExpression: 'item_key = :item_key',
        ExpressionAttributeValues: {
            ':item_key': key
        }
    }

    try {
        const result = await dynamo.query(params).promise()
        return result.Items
    } catch (error) {
        console.error(error)
        throw error
    }
}

const getSingletonByKey = async (key, throwOnMultipleResults, throwOnNoResults) => {
    const result = await getByKey(key)
    let singleton
    switch (result.length) {
        case 0:
            singleton = {}
            console.warn(`${SINGLETON_WARNING_NO_RESULTS} ${key}`)
            if (throwOnNoResults) {
                throw new Error(`${SINGLETON_WARNING_NO_RESULTS} ${key}`)
            }
            break
        case 1:
            singleton = result[0]
            break
        default:
            singleton = result.Items[0]
            console.warn(`${SINGLETON_WARNING_MULTIPLE_RESULTS} ${key}`)
            if (throwOnMultipleResults) {
                throw new Error(`${SINGLETON_WARNING_MULTIPLE_RESULTS} ${key}`)
            }
            break
    }

    return singleton
}

const add = async (key, item) => {
    const params = {
        TableName: TABLE_NAME,
        Item: {
            item_key: key.paritionKey,
            item_name: key.sortKey,
            ...item
        }
    }

    return dynamo.put(params).promise()
}

const update = async item => {

}

const deleteItem = async item => {

}

module.exports = {
    getByKey,
    getSingletonByKey,
    add,
    update,
    deleteItem
}
