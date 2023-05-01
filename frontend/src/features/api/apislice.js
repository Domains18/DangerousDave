import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const apiSlice = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:5000' }),
    tagTypes: ['books'],
    endpoints: (builder) => ({
        getBooks: builder.query({
            query: () => '/api/books'
        })
    })
});
