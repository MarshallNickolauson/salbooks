import { apiSlice } from './apiSlice';
import { BOOKS_URL } from '../utils/constants';

export const bookApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getBookById: builder.query({
            query: (id) => ({
                url: `${BOOKS_URL}/${id}`,
                credentials: 'include',
            }),
        }),
        createBook: builder.mutation({
            query: (book) => ({
                url: BOOKS_URL,
                method: 'POST',
                body: book,
                credentials: 'include',
            }),
        }),
        updateBook: builder.mutation({
            query: ({id, book}) => ({
                url: `${BOOKS_URL}/${id}`,
                method: 'PUT',
                body: book,
                credentials: 'include',
            }),
        }),
        getBooks: builder.query({
            query: () => ({
                url: BOOKS_URL,
            }),
            keepUnusedDataFor: 5,
        }),
        getBookIntroductionByTitle: builder.query({
            query: (bookTitle) => ({
                url: `${BOOKS_URL}/${bookTitle}/introduction`,
            }),
            keepUnusedDataFor: 5,
        }),
        getBookPrefaceByTitle: builder.query({
            query: (bookTitle) => ({
                url: `${BOOKS_URL}/${bookTitle}/preface`,
            }),
            keepUnusedDataFor: 5,
        }),
        getPartPrefaceByTitleAndNumber: builder.query({
            query: ({bookTitle, partNumber}) => ({
                url: `${BOOKS_URL}/${bookTitle}/parts/${partNumber}/preface`,
            }),
            keepUnusedDataFor: 5,
        }),
        getChapterContentByTitleAndPartAndNumber: builder.query({
            query: ({bookTitle, partNumber, chapterNumber}) => ({
                url: `${BOOKS_URL}/${bookTitle}/parts/${partNumber}/chapters/${chapterNumber}/content`,
            }),
            keepUnusedDataFor: 5,
        }),
        updateBookIntroductionByTitle: builder.mutation({
            query: ({bookTitle, introduction}) => ({
                url: `${BOOKS_URL}/${bookTitle}/introduction`,
                method: 'PUT',
                body: { introduction },
                credentials: 'include',
            }),
        }),
        updateBookPrefaceByTitle: builder.mutation({
            query: ({bookTitle, preface}) => ({
                url: `${BOOKS_URL}/${bookTitle}/preface`,
                method: 'PUT',
                body: { preface },
                credentials: 'include',
            }),
        }),
        updatePartPrefaceByTitleAndNumber: builder.mutation({
            query: ({bookTitle, partNumber, preface}) => ({
                url: `${BOOKS_URL}/${bookTitle}/parts/${partNumber}/preface`,
                method: 'PUT',
                body: { preface },
                credentials: 'include',
            }),
        }),
        updateChapterContentByTitleAndPartAndNumber: builder.mutation({
            query: ({bookTitle, partNumber, chapterNumber, content}) => ({
                url: `${BOOKS_URL}/${bookTitle}/parts/${partNumber}/chapters/${chapterNumber}/content`,
                method: 'PUT',
                body: { content },
                credentials: 'include',
            }),
        }),
    }),
});

export const {
    useGetBookByIdQuery,
    useCreateBookMutation,
    useUpdateBookMutation,
    useGetBooksQuery,
    useGetBookIntroductionByTitleQuery,
    useGetBookPrefaceByTitleQuery,
    useGetPartPrefaceByTitleAndNumberQuery,
    useGetChapterContentByTitleAndPartAndNumberQuery,
    useUpdateBookIntroductionByTitleMutation,
    useUpdateBookPrefaceByTitleMutation,
    useUpdatePartPrefaceByTitleAndNumberMutation,
    useUpdateChapterContentByTitleAndPartAndNumberMutation,
} = bookApiSlice;
