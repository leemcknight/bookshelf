import { TDynamoKey } from "../types"

import * as aws from 'aws-sdk'

/*
    This is a light wrapper around the dynamodb docclient interface.

*/
const SINGLETON_WARNING_MULTIPLE_RESULTS = 'Multiple results were found when doing performing a singleton select with key:'
const SINGLETON_WARNING_NO_RESULTS = 'No results were found when doing performing a singleton select with key:'
const dynamo = new aws.DynamoDB.DocumentClient()
const TABLE_NAME = 'bookshelf'


export async function getByKey<T>(key: TDynamoKey): Promise<T[]> {
    const baseConditionExpr = 'item_key = :item_key'
    const params = {
        TableName: TABLE_NAME,
        KeyConditionExpression: baseConditionExpr,
        ExpressionAttributeValues: {
            ':item_key': key.partitionKey
        }
    }

    if (key.sortKey) {
        params.KeyConditionExpression = baseConditionExpr + " AND item_name = :item_name"
        params.ExpressionAttributeValues[':item_name'] = key.sortKey
    }

    try {
        const result = await dynamo.query(params).promise()
        return result.Items! as T[]
    } catch (error) {
        console.error(error)
        throw error
    }
}

export async function getSingletonByKey<T>(
    key: TDynamoKey,
    throwOnMultipleResults: boolean,
    throwOnNoResults: boolean)
    : Promise<T> {
    var keyJson = JSON.stringify(key)
    const result = await getByKey<T>(key)
    switch (result.length) {
        case 0:
            console.warn(`${SINGLETON_WARNING_NO_RESULTS} ${keyJson}`)
            if (throwOnNoResults) {
                throw new Error(`${SINGLETON_WARNING_NO_RESULTS} ${keyJson}`)
            }
            break
        case 1:
            return result[0] as T
        default:
            console.warn(`${SINGLETON_WARNING_MULTIPLE_RESULTS} ${keyJson}`)
            if (throwOnMultipleResults) {
                throw new Error(`${SINGLETON_WARNING_MULTIPLE_RESULTS} ${keyJson}`)
            }
            return result[0] as T
    }

    throw new Error(`Unknown error on getSingletonByKey(): default case not handled.`);
}

export async function add<T>(key: TDynamoKey, item: T): Promise<aws.DynamoDB.DocumentClient.PutItemOutput> {
    const params = {
        TableName: TABLE_NAME,
        Item: {
            item_key: key.partitionKey,
            item_name: key.sortKey,
            ...item
        }
    }

    return dynamo.put(params).promise()
}

export async function update<T>(key: aws.DynamoDB.DocumentClient.Key, item: T) {
    const params = {
        TableName: TABLE_NAME,
        Key: key,
        UpdateExpression: buildUpdateExpression<T>(item),
        ExpressionAttributeNames: buildExpressionAttributeNames(item),
        ExpressionAttributeValues: buildExpressionAttributeValues(item)
    }

    return dynamo.update(params).promise()
}

function buildUpdateExpression<T>(item: T): string {
    var expr = 'set ';
    for (var prop in item) {
        expr += `#${prop} = :${prop},`
    }
    return expr
}

function buildExpressionAttributeNames(item) {
    var base = {}
    for (var prop in item) {
        base[`#${prop}`] = prop;
    }
    return base;
}

function buildExpressionAttributeValues(item) {
    var base = {}
    for (var prop in item) {
        base[`:${prop}`] = item[prop];
    }
    return base;
}

export const deleteItem = async item => {

}

