
const { getUserProfile } = require('./profile');
const { getUserProfile: handlerProfile } = require('./handler');

jest.mock('./profile');

const BASE_EVENT = {
    requestContext: {
        authorizer: {
            claims: {
                sub: "372472398472389749823"
            }
        }
    }
}

test('singleton http response structured properly', async () => {
    getUserProfile.mockResolvedValue({
        displayName: "Frank"
    })
    const response = await handlerProfile(BASE_EVENT);
    console.log(response);
    expect(getUserProfile).toHaveBeenCalledTimes(1);
    expect(response.statusCode).toBe(200);
})