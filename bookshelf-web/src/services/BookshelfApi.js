// Need to use the React-specific entry point to import createApi
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { Auth } from 'aws-amplify';

const baseUrl = 'https://sr1evq3p4j.execute-api.us-west-2.amazonaws.com/dev';

// Define a service using a base URL and expected endpoints
export const BookshelfApi = createApi({
    reducerPath: 'bookshelfApi',
    baseQuery: fetchBaseQuery({
        baseUrl,
        prepareHeaders: async (headers) => {
            const jwtToken = await (await Auth.currentSession()).getIdToken().getJwtToken();
            headers.set("Authorization", `Bearer ${jwtToken}`);
            return headers;
        }
    }),
    tagTypes: ['profile', 'library', 'bookshelf'],
    endpoints: (builder) => ({
        getLibrary: builder.query({
            query: () => `users/library`,
            providesTags: ['library']
        }),
        getBooks: builder.query({
            query: (bookshelfId) => `/users/library/bookshelf/${bookshelfId}`,
            providesTags: ["bookshelf"]
        }),
        addBook: builder.mutation({
            query: ({ id, ...patch }) => ({
                url: `book`,
                method: 'POST',
                body: patch,
            }),
        }),
        addBookshelf: builder.mutation({
            query: bookshelf => ({
                url: `users/library`,
                method: 'POST',
                body: bookshelf
            }),
            invalidatesTags: ['library']
        }),
        addBookToBookshelf: builder.mutation({
            query: ({ bookshelfId, ...book }) => ({
                url: `/users/library/bookshelf/${bookshelfId}`,
                method: 'POST',
                body: book
            }),
            invalidatesTags: ["bookshelf"]
        }),
        getUser: builder.query({
            query: () => `/users/`,
            providesTags: ["profile"]
        }),
        updateUserProfile: builder.mutation({
            query: ({ ...patch }) => ({
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
    useGetUserQuery,
    useUpdateUserProfileMutation
} = BookshelfApi