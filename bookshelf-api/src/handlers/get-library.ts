import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda"

export async function getLibraryHandler(event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> {
    const userId = getCognitoId(event)
    const response = await getLibrary(userId)
    try {
        return buildResponse<TBookshelf[]>(response)
    } catch (error) {
        return buildErrorResponse(error)
    }
}