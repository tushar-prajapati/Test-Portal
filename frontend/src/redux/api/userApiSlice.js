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
            invalidatesTags: ['Admin'],
        }),
    }),
})

export const { 
    useCreateUserMutation,
 } = userApiSlice;