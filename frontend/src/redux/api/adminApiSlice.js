import { apiSlice } from "./apiSlice.js";
import { ADMINS_URL } from "../constants.js";

export const adminApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        createAdmin: builder.mutation({
            query: (adminData) => ({
                url: `${ADMINS_URL}/register`,
                method: 'POST',
                body: adminData,
            }),
            invalidatesTags: ['Admin'],
        }),
        loginAdmin: builder.mutation({
            query: (adminData) => ({
                url: `${ADMINS_URL}/login`,
                method: 'POST',
                body: adminData,
            }),
            invalidatesTags: ['Admin'],
        }),
        logoutAdmin: builder.mutation({
            query: () => ({
                url: `${ADMINS_URL}/logout`,
                method: 'POST',
            }),
            invalidatesTags: ['Admin'],
        }),
    }),
})

export const { useCreateAdminMutation,
     useLoginAdminMutation, 
useLogoutAdminMutation
 } = adminApiSlice;