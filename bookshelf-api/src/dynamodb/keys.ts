
/*
    DynamoDB Key Structure

    We use a single dynamo table to store multiple record types, and use different 
    key structures to distinguish them.  
    
    Each user has 1 library, each library has 1 to many bookshelves.
    Each bookshelf has 1 to many books.  

    dynamo keys:

    1.  Library (bookshelves)
        user-{userId}-library
    2.  Bookshelf (books)
        Partition Key: user-{userId}-bookshelf-{bookshelfId}
        Range Key: bookId
    3.  User Profile
        Partition Key: user-{userId}
        Range Key: "profile"
    4.  Author
        Partition Key: author-{authorId}
        Range Key: "profile"
    5.  Books by Author
        Parition Key: author-{authorId}
        Range Key: {isbn}
*/

import { TDynamoKey } from "../types";

export function buildAuthorKey(authorId: string): TDynamoKey {
    return {
        partitionKey: `author-${authorId}`
    }
}
export function buildUserKey(userId: string): TDynamoKey {
    return {
        partitionKey: `user-${userId}`,
        sortKey: 'profile'
    }
}

export function buildLibraryKey(userId: string, bookshelfId?: string): TDynamoKey {
    var key: TDynamoKey = {
        partitionKey: `user-${userId}-library`,

    }

    if (bookshelfId) {
        key.sortKey = bookshelfId
    }

    return key
};


export function buildBookshelfKey(userId: string, bookshelfId: string): TDynamoKey {
    return {
        partitionKey: `user-${userId}-bookshelf-${bookshelfId}`
    }
};

export function buildBookKey(isbn: string) {
    return {
        partitionKey: `book-${isbn}`
    }
}
