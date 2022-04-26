const aws = require('aws-sdk')

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
        user-{userId}-profile
*/

const getLibrary = async userId => {
  const key = `user-${userId}-library`

  const params = {
    TableName: TABLE_NAME,
    KeyConditionExpression: 'item_key = :item_key',
    ExpressionAttributeValues: {
      ':item_key': key
    }
  }
  return dynamo.query(params).promise()
}

const getBooks = async (userId, bookshelfId) => {
  const partitionKey = `user-${userId}-bookshelf-${bookshelfId}`
  const params = {
    TableName: TABLE_NAME,
    KeyConditionExpression: 'item_key = :item_key',
    ExpressionAttributeValues: {
      ':item_key': partitionKey
    }
  }
  return dynamo.query(params).promise()
}

const addBookshelf = async (userId, bookshelf) => {
  const key = `user-${userId}-library`
  const params = {
    TableName: TABLE_NAME,
    Item: {
      item_key: key,
      item_name: bookshelf.id,
      ...bookshelf
    }
  }

  return dynamo.put(params).promise()
}

const addBookToBookshelf = async (userId, bookshelfId, book) => {
  const partitionKey = `user-${userId}-bookshelf-${bookshelfId}`
  const params = {
    TableName: TABLE_NAME,
    Item: {
      item_key: partitionKey,
      item_name: book.isbn,
      ...book
    }
  }

  return dynamo.put(params).promise()
}

const addBook = async book => {
  const partitionKey = `book-${book.isbn}`
  const sortKey = book.name

  const params = {
    TableName: TABLE_NAME,
    Item: {
      item_key: partitionKey,
      item_name: sortKey,
      ...book
    },
    UpdateExpression: 'set #a = :x + :y',
    ConditionExpression: '#a < :MAX',
    ExpressionAttributeNames: { '#a': 'Sum' },
    ExpressionAttributeValues: {
      ':x': 20,
      ':y': 45,
      ':MAX': 100
    }
  }

  return dynamo.update(params).promise()
}

module.exports = {
  getLibrary,
  getBooks,
  addBook,
  addBookshelf,
  addBookToBookshelf
}