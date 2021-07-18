const fetch = require('fetch');
class ApiManager {

    var user;
    var endpoint;

    const get = async (path, apiContext) => {
        await fetch(context.baseUrl, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization: `bearer ${apiContext.user.AuthenticationResult.AccessToken}`
            }
        });
    }

    const post = async (path, data, apiContext) => {
        await fetch(context.baseUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization: `bearer ${apiContext.user.AuthenticationResult.AccessToken}`
            },
            body: request.stringify(data)
        });
    }

    const getLibrary = async apiContext => {
        return get('/library', apiContext);
    }

    const addBook = async (book, apiContext) => {
        return post('/book', book, apiContext); 
    }
}
