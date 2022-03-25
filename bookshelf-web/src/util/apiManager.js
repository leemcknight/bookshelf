
const handleResponse = response => {
    console.log(response);
    return response;
}

const get = async (path, apiContext) => {

    const response = await fetch(apiContext.baseUrl + path, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${apiContext.session.idToken.jwtToken}`
        }
    });
    return response;
}

const post = async (path, data, apiContext) => {
    const response = await fetch(apiContext.baseUrl + path, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${apiContext.session.idToken.jwtToken}`
        },
        body: JSON.stringify(data)
    });
    return response;
}

const getLibrary = async apiContext => {
    console.log('getLibrary()');
    try {
        const response = await get(`/users/${apiContext.user.sub}/library`, apiContext);
        return handleResponse(response);
    } catch (error) {

    }
}

const getBooks = async (bookshelfId, apiContext) => {
    const response = await get(`/users/${apiContext.user.sub}/library/${bookshelfId}`, apiContext);
    return handleResponse(response);
}

const addBook = async (book, apiContext) => {
    const response = await post('/book', book, apiContext);
    return handleResponse(response);
}

const addBookshelf = async (bookshelf, apiContext) => {
    const response = await post(`/users/${apiContext.user.sub}/library`, bookshelf, apiContext);
    return handleResponse(response);
}

const addBookToBookshelf = async (bookshelfId, book, apiContext) => {
    const response = await post(`/users/${apiContext.user.sub}/library/bookshelf/${bookshelfId}`, book, apiContext);
    return handleResponse(response);
}

module.exports = {
    getLibrary,
    getBooks,
    addBookToBookshelf,
    addBookshelf,
    addBook
}
