//const fetch = require('fetch');

const handleResponse = response => {
    console.log(response);
}

const get = async (path, apiContext) => {

    const response = await fetch(apiContext.baseUrl + path, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `bearer ${apiContext.user.AuthenticationResult.AccessToken}`
        }
    });
    return response;
}

const post = async (path, data, apiContext) => {
    const response = await fetch(apiContext.baseUrl + path, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `bearer ${apiContext.user.AuthenticationResult.AccessToken}`
        },
        body: JSON.stringify(data)
    });
    return response;
}

const getLibrary = async apiContext => {
    console.log('getLibrary()');
    const response = get(`/users/${apiContext.user.AuthenticationResult.userId}/library`, apiContext);
    return handleResponse(response);
}

const addBook = async (book, apiContext) => {
    const response = post('/book', book, apiContext);
    return handleResponse(response);
}

const addBookToLibrary = async (book, apiContext) => {
    const response = post('/library/book', book, apiContext);
    return handleResponse(response);
}

module.exports = {
    getLibrary,
    addBookToLibrary,
    addBook
}
