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
        getBookIntroductionByTitle: builder.query({
            query: (bookTitle) => ({
                url: `${BOOKS_URL}/${bookTitle}/introduction`,
            }),
        }),
        getBookPrefaceByTitle: builder.query({
            query: (bookTitle) => ({
                url: `${BOOKS_URL}/${bookTitle}/preface`,
            }),
        }),
        getPartPrefaceByTitleAndNumber: builder.query({
            query: ({bookTitle, partNumber}) => ({
                url: `${BOOKS_URL}/${bookTitle}/parts/${partNumber}/preface`,
            }),
        }),
        getChapterContentByTitleAndPartAndNumber: builder.query({
            query: ({bookTitle, partNumber, chapterNumber}) => ({
                url: `${BOOKS_URL}/${bookTitle}/parts/${partNumber}/chapters/${chapterNumber}/content`,
            }),
        }),
    }),
});

export const {
    useGetBooksQuery,
    useGetBookIntroductionByTitleQuery,
    useGetBookPrefaceByTitleQuery,
    useGetPartPrefaceByTitleAndNumberQuery,
    useGetChapterContentByTitleAndPartAndNumberQuery,
} = bookApiSlice;
