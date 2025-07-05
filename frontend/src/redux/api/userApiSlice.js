import { apiSlice } from "./apiSlice.js";
import { USERS_URL } from "../constants.js";

export const userApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        createUser: builder.mutation({
            query: (studentData) => ({
                url: `${USERS_URL}/register`,
                method: 'POST',
                body: studentData,
            }),
            invalidatesTags: ['User'],
        }),
        getUser : builder.mutation({
            query: ({roll}) => ({
                url: `${USERS_URL}/getUser`,
                method: 'POST',
                body: {roll},
            }),
            providesTags: ['User'],
        }),
        updateUser: builder.mutation({
            query: ({ id, userData }) => ({
                url: `${USERS_URL}/update/${id}`,
                method: 'PUT',
                body: userData,
            }),
            invalidatesTags: ['User'],
        }),
        deleteUser: builder.mutation({
            query: (id) => ({
                url: `${USERS_URL}/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['User'],
        }),
        getAllUsers: builder.query({
            query: () => ({
                url: `${USERS_URL}/`,        
            }),
            providesTags: ['User'],
        }),
        toggleUser: builder.mutation({
            query: (id) => ({
                url: `${USERS_URL}/toggle/${id}`,
                method: 'PUT',
            }),
            invalidatesTags: ['User'],
        }),
        loginUser: builder.mutation({
            query: ({roll, dob}) => ({
                url: `${USERS_URL}/login`,
                method: 'POST',
                body: {roll, dob},
            }),
            invalidatesTags: ['User'],
        }),
        logoutUser: builder.mutation({
            query: () => ({
                url: `${USERS_URL}/logout`,
                method: 'POST',
            }),
            invalidatesTags: ['User'],
        }),
        addTest: builder.mutation({
            query: ({testCode, userId}) =>({
                url: `${USERS_URL}/addTest/${userId}`,
                method: 'PUT',
                body: {testCode},
            }),
            invalidatesTags: ['User'],
        }),
    }),
})

export const { 
    useCreateUserMutation,
    useGetUserMutation,
    useUpdateUserMutation,
    useDeleteUserMutation,
    useGetAllUsersQuery,
    useToggleUserMutation,
    useLoginUserMutation,
    useLogoutUserMutation,
    useAddTestMutation,
 } = userApiSlice;