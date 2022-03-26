'use strict';
const api = require('./bookshelf.js');

function buildResponse(response) {
    return {
        statusCode: 200,
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Credentials': true,
        },
        body: JSON.stringify({
            success: true,
            results: response
        })
    }
}

function buildErrorResponse(error) {
    console.error(error);
    return {
        statusCode: 500,
        body: JSON.stringify({
            success: false,
            errror: error
        })
    }
}

function getCognitoId(event) {
    return event.requestContext.authorizer.claims.sub;
}

module.exports.getLibrary = async event => {
    const userId = getCognitoId(event);
    const response = await api.getLibrary(userId);
    try {
        return buildResponse(response);
    } catch (error) {
        return buildErrorResponse(error);
    }
}

module.exports.getBooks = async event => {
    console.log('getBooks');
    const userId = getCognitoId(event);
    const bookshelfId = event.pathParameters.bookshelfId;
    const response = await api.getBooks(userId, bookshelfId);
    try {
        return buildResponse(response);
    } catch (error) {
        return buildErrorResponse(error);
    }
}

module.exports.addBookshelf = async event => {
    const bookshelf = JSON.parse(event.body);
    const userId = getCognitoId(event);
    try {
        const response = await api.addBookshelf(userId, bookshelf)
        return buildResponse(response);
    } catch (e) {
        return buildErrorResponse(e);
    }
}

module.exports.addBookToBookshelf = async event => {
    const book = JSON.parse(event.body);
    const userId = getCognitoId(event);
    const bookshelfId = event.pathParameters.bookshelfId;
    try {
        const response = await api.addBookToBookshelf(userId, bookshelfId, book)
        return buildResponse(response);
    } catch (e) {
        return buildErrorResponse(e);
    }
}
