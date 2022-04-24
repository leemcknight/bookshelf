'use strict'
const bookshelf = require('./bookshelf.js')
const profile = require('./profile')

const BASE_HEADERS = {
    statusCode: 200,
    headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': true
    },
}

function buildResponse(response) {
    return {
        ...BASE_HEADERS,
        body: JSON.stringify({
            success: true,
            results: response
        })
    }
}

function buildSingletonResponse(response) {
    return {
        ...BASE_HEADERS,
        body: JSON.stringify({
            success: true,
            result: response
        })
    }
}

function buildErrorResponse(error) {
    console.error(error)
    return {
        statusCode: 500,
        body: JSON.stringify({
            success: false,
            errror: error
        })
    }
}

function getCognitoId(event) {
    return event.requestContext.authorizer.claims.sub
}

module.exports.getLibrary = async event => {
    const userId = getCognitoId(event)
    const response = await bookshelf.getLibrary(userId)
    try {
        return buildResponse(response)
    } catch (error) {
        return buildErrorResponse(error)
    }
}

module.exports.getBooks = async event => {
    console.log('getBooks')
    const userId = getCognitoId(event)
    const bookshelfId = event.pathParameters.bookshelfId
    const response = await bookshelf.getBooks(userId, bookshelfId)
    try {
        return buildResponse(response)
    } catch (error) {
        return buildErrorResponse(error)
    }
}

module.exports.addBookshelf = async event => {
    const body = JSON.parse(event.body)
    const userId = getCognitoId(event)
    try {
        const response = await bookshelf.addBookshelf(userId, body)
        return buildResponse(response)
    } catch (e) {
        return buildErrorResponse(e)
    }
}

module.exports.addBookToBookshelf = async event => {
    const book = JSON.parse(event.body)
    const userId = getCognitoId(event)
    const bookshelfId = event.pathParameters.bookshelfId
    try {
        const response = await bookshelf.addBookToBookshelf(userId, bookshelfId, book)
        return buildResponse(response)
    } catch (e) {
        return buildErrorResponse(e)
    }
}

module.exports.addUser = async (event, context, callback) => {
    const userId = getCognitoId(event)
    const user = event.request.userAttributes
    console.log(user)
    await profile.addUser(userId, user)
    callback(null, event)
}

module.exports.updateUserProfile = async (event, callback) => {
    const userId = getCognitoId(event)
    const user = JSON.parse(event.body)
    await profile.updateUserProfile(userId, user)
    callback(null, event)
}

module.exports.getUserProfile = async event => {
    const userId = getCognitoId(event)
    try {
        const response = await profile.getUserProfile(userId)
        return buildSingletonResponse(response)
    } catch (e) {
        return buildErrorResponse(e)
    }
}
