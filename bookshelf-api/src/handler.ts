'use strict'
import {
    APIGatewayProxyEvent,
    APIGatewayProxyResult
} from "aws-lambda";
import { TAuthor, TBookshelf, TUser } from "./types";
import { getLibrary, getBooks, addBookToBookshelf, addBookshelf } from "./services/bookshelf";
import { getUserProfile, addUser, updateUserProfile, getAuthor } from "./services";

const BASE_HEADERS = {
    statusCode: 200,
    headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': true
    },
}

function buildResponse<T>(response: T): APIGatewayProxyResult {
    return {
        ...BASE_HEADERS,
        body: JSON.stringify({
            success: true,
            results: response
        })
    }
}

function buildSingletonResponse<T>(response: T): APIGatewayProxyResult {
    return {
        ...BASE_HEADERS,
        body: JSON.stringify({
            success: true,
            result: response
        })
    }
}

function buildErrorResponse(error: string): APIGatewayProxyResult {
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

function getCognitoId(event: APIGatewayProxyEvent) {
    return event?.requestContext?.authorizer?.claims?.sub
}

export async function getLibrary(event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> {
    const userId = getCognitoId(event)
    const response = await getLibrary(userId)
    try {
        return buildResponse<TBookshelf[]>(response)
    } catch (error) {
        return buildErrorResponse(error)
    }
}

export async function getBooks(event: APIGatewayProxyEvent) {
    const userId = getCognitoId(event)
    const bookshelfId = event!.pathParameters!.bookshelfId
    const response = await getBooks(userId, bookshelfId!)
    try {
        return buildSingletonResponse<TBookshelf>(response)
    } catch (error) {
        return buildErrorResponse(error)
    }
}

export async function addBookshelf(event: APIGatewayProxyEvent) {
    const body = JSON.parse(event.body!)
    const userId = getCognitoId(event)
    try {
        const response = await addBookshelf(userId, body)
        return buildResponse(response)
    } catch (e) {
        return buildErrorResponse(e)
    }
}

export async function addBookToBookshelf(event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> {
    const book = JSON.parse(event.body!)
    const userId = getCognitoId(event)
    const bookshelfId = event.pathParameters!.bookshelfId
    try {
        const response = await addBookToBookshelf(userId, bookshelfId!, book)
        return buildResponse(response)
    } catch (e) {
        return buildErrorResponse(e)
    }
}

export async function addUser(event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> {
    const userId = getCognitoId(event)
    const user = JSON.parse(event.body!)
    try {
        const response = await addUser(userId, user)
        return buildResponse(response);
    } catch (e) {
        return buildErrorResponse(e)
    }
}

export async function updateUserProfile(event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> {
    const userId = getCognitoId(event)
    const user = JSON.parse(event.body!)
    try {
        const response = await updateUserProfile(userId, user)
        return buildResponse(response)
    } catch (e) {
        return buildErrorResponse(e)
    }

}

export async function getUserProfile(event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> {
    const userId = getCognitoId(event)
    try {
        const response = await getUserProfile(userId)
        return buildSingletonResponse<TUser>(response)
    } catch (e) {
        return buildErrorResponse(e)
    }
}

export async function getAuthor(event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> {
    try {
        const authorId = event.pathParameters!.authorId;
        const response = await getAuthor(authorId!);
        return buildSingletonResponse<TAuthor>(response);
    } catch (e) {
        return buildErrorResponse(e)
    }
}
