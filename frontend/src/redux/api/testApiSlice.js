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
    }),
})

export const { 
    useCreateTestMutation ,
     useGetRecentTestsQuery,
      useGetUpcomingTestsQuery,
       useDeleteTestByIdMutation,
        useFetchTestByIdQuery,
    } = testApiSlice;