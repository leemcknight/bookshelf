'use strict';
const api = require('../bookshelf.js');

function buildResponse(response) {
    return {
        statusCode: 200,
        body: JSON.stringify(response);
    }
}

function buildErrorResponse(error) {
    return {
        statusCode: 500,
        body: JSON.stringify(error);
    }
}

module.exports.index = async event => {
    console.log('getLibrary');
    console.log(event);
    const userId = event.parameters.userId;
    const response = await api.getLibrary(userId);
    try {
        return buildResponse(response);
    } catch(error) {
        return buildErrorResponse(error);
    }
}

module.exports.addBook = async event => {
    const book = JSON.parse(event.body);
    const user = event.parameters.userId;
    try {
        const response = await api.addBook(user, book)
        return buildResponse(response);
    } catch(e) {
        return buildErrorResponse(e);
    }
}
