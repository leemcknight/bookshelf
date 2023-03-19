import { APIGatewayProxyResult } from "aws-lambda"

const BASE_HEADERS = {
    statusCode: 200,
    headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': true
    },
}

export function buildResponse<T>(response: T): APIGatewayProxyResult {
    return {
        ...BASE_HEADERS,
        body: JSON.stringify({
            success: true,
            results: response
        })
    }
}

export function buildSingletonResponse<T>(response: T): APIGatewayProxyResult {
    return {
        ...BASE_HEADERS,
        body: JSON.stringify({
            success: true,
            result: response
        })
    }
}

export function buildErrorResponse(error: string): APIGatewayProxyResult {
    console.error(error)
    return {
        ...BASE_HEADERS,
        statusCode: 500,
        body: JSON.stringify({
            success: false,
            errror: error
        })
    }
}