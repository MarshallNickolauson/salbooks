import { apiSlice } from './apiSlice';
import { USERS_URL } from '../utils/constants';

export const userApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        loginUser: builder.mutation({
            query: (credentials) => ({
                url: `${USERS_URL}/login`,
                method: 'POST',
                body: credentials,
                credentials: 'include',
            }),
        }),
        logoutUser: builder.mutation({
            query: () => ({
                url: `${USERS_URL}/logout`,
                method: 'POST',
                credentials: 'include',
            }),
        }),
        registerUser: builder.mutation({
            query: (newUser) => ({
                url: `${USERS_URL}`,
                method: 'POST',
                body: newUser,
                credentials: 'include',
            }),
        }),
        getUserProfile: builder.query({
            query: () => ({
                url: `${USERS_URL}/profile`,
                method: 'GET',
                credentials: 'include',
            }),
        }),
        updateUserProfile: builder.mutation({
            query: (updatedUser) => ({
                url: `${USERS_URL}/profile`,
                method: 'PUT',
                body: updatedUser,
                credentials: 'include',
            }),
        }),
        getAllUsers: builder.query({
            query: () => ({
                url: `${USERS_URL}`,
                method: 'GET',
                credentials: 'include',
            }),
        }),
        getUserById: builder.query({
            query: (userId) => ({
                url: `${USERS_URL}/${userId}`,
                method: 'GET',
                credentials: 'include',
            }),
        }),
        updateUserById: builder.mutation({
            query: (updatedUser) => ({
                url: `${USERS_URL}/${updatedUser._id}`,
                method: 'PUT',
                body: updatedUser,
                credentials: 'include',
            }),
        }),
        deleteUserById: builder.mutation({
            query: (userId) => ({
                url: `${USERS_URL}/${userId}`,
                method: 'DELETE',
                credentials: 'include',
            }),
        }),
    }),
});

export const {
    useLoginUserMutation,
    useLogoutUserMutation,
    useRegisterUserMutation,
    useGetUserProfileQuery,
    useUpdateUserProfileMutation,
    useGetAllUsersQuery,
    useGetUserByIdQuery,
    useUpdateUserByIdMutation,
    useDeleteUserByIdMutation,
} = userApiSlice;