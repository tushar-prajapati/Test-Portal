import { apiSlice } from "./apiSlice.js";
import { TESTS_URL } from "../constants.js";

export const testApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        createTest: builder.mutation({
            query: ({testData}) => ({
                url: `${TESTS_URL}/createTest`,
                method: 'POST',
                body: testData,
            }),
            invalidatesTags: ['Test'],
        }),
        getUpcomingTests: builder.query({
            query: (id) => ({
                url: `${TESTS_URL}/upcoming/${id}`,
                }),
            providesTags: ['Test'],
        }),
        getRecentTests: builder.query({
            query: (id) => ({
                url: `${TESTS_URL}/recent/${id}`,
                }),
            providesTags: ['Test'],
        }),
        deleteTestById: builder.mutation({
            query: (testId) => ({
                url: `${TESTS_URL}/${testId}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['Test'],
        }),
        fetchTestById: builder.query({
            query: (testId) => ({
                url: `${TESTS_URL}/${testId}`,
            }),
            providesTags: ['Test'],
        }),
        updateTest: builder.mutation({
            query: ({testId, test}) =>({
                url: `${TESTS_URL}/${testId}`,
                method: 'PUT',
                body: test,
            }),
            invalidatesTags: ['Test'],
        }),
        getAllowedLiveTestsForUser: builder.query({
            query: (userId)=>({
                url: `${TESTS_URL}/live/${userId}`,
            }),
            providesTags: ['Test'],
        }),
        getAllowedUpcomingTestsForUser: builder.query({
            query: (userId) => ({
                url: `${TESTS_URL}/users/upcoming/${userId}`,
            }),
            providesTags: ['Test'],
        }),
        getAllowedRecentTestsForUser: builder.query({
            query: (userId) => ({
                url: `${TESTS_URL}/users/recent/${userId}`,
            }),
            providesTags: ['Test'],
        }),
        deleteTestForUser: builder.mutation({
            query: ({userId, testId}) => ({
                url: `${TESTS_URL}/users/delete`,
                method: 'POST',
                body: {userId, testId},
            }),
            invalidatesTags: ['Test'],
        }),
    }),
})

export const { 
    useCreateTestMutation ,
     useGetRecentTestsQuery,
      useGetUpcomingTestsQuery,
       useDeleteTestByIdMutation,
        useFetchTestByIdQuery,
        useUpdateTestMutation,
        useGetAllowedLiveTestsForUserQuery,
        useGetAllowedUpcomingTestsForUserQuery,
        useGetAllowedRecentTestsForUserQuery,
        useDeleteTestForUserMutation,
    } = testApiSlice;