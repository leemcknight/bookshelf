import { TUser } from '../types'
import { buildUserKey } from '../dynamodb/keys'
import { getSingletonByKey, add } from '../dynamodb'
import * as aws from 'aws-sdk'

const dynamo = new aws.DynamoDB.DocumentClient()
const TABLE_NAME = 'bookshelf'


export async function getUserProfile(userId: string): Promise<TUser> {
  const key = buildUserKey(userId)
  return getSingletonByKey<TUser>(key, true, true);
}


export async function addUser(userId: string, user: TUser) {
  return add(buildUserKey(userId), user);
}


export async function updateUserProfile(userId: string, user: TUser) {
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
