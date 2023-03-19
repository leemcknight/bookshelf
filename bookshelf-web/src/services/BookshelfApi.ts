// @flow

// Need to use the React-specific entry point to import createApi
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { Auth } from 'aws-amplify';
import { TLibrary, TBookshelf, TUser, TBook } from '../types/';

const baseUrl = 'https://sr1evq3p4j.execute-api.us-west-2.amazonaws.com/dev';

type TSingletonApiResponse<T> = {
    success: boolean,
    result: T
}

type TListApiResponse<T> = {
    success: boolean,
    results: Array<T>
}

function singletonTransform<T>(rawResult: TSingletonApiResponse<T>): T {
    return rawResult.result;
}

function arrayTransform<T>(rawResult: TListApiResponse<T>): T[] {
    return rawResult.results;
}

// Define a service using a base URL and expected endpoints
export const BookshelfApi = createApi({
    reducerPath: 'bookshelfApi',
    baseQuery: fetchBaseQuery({
        baseUrl,
        prepareHeaders: async (headers) => {
            const jwtToken = (await Auth.currentSession()).getIdToken().getJwtToken();
            headers.set("Authorization", `Bearer ${jwtToken}`);
            return headers;
        }
    }),
    tagTypes: ['profile', 'library', 'bookshelf'],
    endpoints: (builder) => ({
        getLibrary: builder.query<TBookshelf[], any>({
            query: () => `users/library`,
            transformResponse: (response: TListApiResponse<TBookshelf>) => arrayTransform<TBookshelf>(response),
            providesTags: ['library']
        }),
        getBooks: builder.query<TBookshelf, string>({
            query: (bookshelfId: string) => `/users/library/bookshelf/${bookshelfId}`,
            transformResponse: (response: TSingletonApiResponse<TBookshelf>) => singletonTransform<TBookshelf>(response),
            providesTags: ["bookshelf"]
        }),
        addBook: builder.mutation<void, TBook>({
            query: book => ({
                url: `book`,
                method: 'POST',
                body: book,
            }),
        }),
        addBookshelf: builder.mutation<void, TBookshelf>({
            query: bookshelf => ({
                url: `users/library`,
                method: 'POST',
                body: bookshelf
            }),
            invalidatesTags: ['library']
        }),
        addBookToBookshelf: builder.mutation<void, { bookshelfId: string, book: TBook }>({
            query: (bookParams) => ({
                url: `/users/library/bookshelf/${bookParams.bookshelfId}`,
                method: 'POST',
                body: bookParams.book
            }),
            invalidatesTags: ["bookshelf"]
        }),
        getUserProfile: builder.query<TUser, any>({
            query: () => `/users/profile`,
            transformResponse: (response: TSingletonApiResponse<TUser>) => singletonTransform<TUser>(response),
            providesTags: ["profile"]
        }),
        updateUserProfile: builder.mutation<void, TUser>({
            query: patch => ({
                url: `/users/profile`,
                method: 'PATCH',
                body: patch,
            }),
            invalidatesTags: ["profile"]
        }),
    }),
})

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const {
    useGetLibraryQuery,
    useGetBooksQuery,
    useAddBookMutation,
    useAddBookshelfMutation,
    useAddBookToBookshelfMutation,
    useGetUserProfileQuery,
    useUpdateUserProfileMutation
} = BookshelfApi