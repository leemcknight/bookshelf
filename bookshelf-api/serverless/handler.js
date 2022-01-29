'use strict';
const api = require('./bookshelf.js');

function buildResponse(response) {
    return {
        statusCode: 200,
        body: {
            success: true,
            results: JSON.stringify(response)
        }

    }
}

function buildErrorResponse(error) {
    return {
        statusCode: 500,
        body: {
            success: false,
            results: JSON.stringify(error)
        }
    }
}

module.exports.getLibrary = async event => {
    console.log('getLibrary');
    console.log(event);
    const userId = event.pathParameters.userId;
    const response = await api.getLibrary(userId);
    try {
        return buildResponse(response);
    } catch (error) {
        return buildErrorResponse(error);
    }
}

module.exports.addBookshelf = async event => {
    const bookshelf = JSON.parse(event.body);
    const userId = event.pathParameters.userId;
    try {
        const response = await api.addBookshelf(userId, bookshelf)
        return buildResponse(response);
    } catch (e) {
        return buildErrorResponse(e);
    }
}

module.exports.addBookToBookshelf = async event => {
    const book = JSON.parse(event.body);
    const userId = event.pathParameters.userId;
    const bookshelfId = event.parameters.bookshelfId;
    try {
        const response = await api.addBook(userId, bookshelfId, book)
        return buildResponse(response);
    } catch (e) {
        return buildErrorResponse(e);
    }
}
