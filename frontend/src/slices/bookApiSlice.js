import { apiSlice } from './apiSlice';
import { BOOKS_URL } from '../constants';

export const bookApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getBooks: builder.query({
            query: () => ({
                url: BOOKS_URL,
            }),
            keepUnusedDataFor: 5,
        }),
    }),
});

export const { useGetBooksQuery } = bookApiSlice;