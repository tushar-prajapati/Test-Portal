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
        sendOtp: builder.mutation({
            query: ({email}) => ({
                url: `${ADMINS_URL}/send-otp`,
                method: 'POST',
                body: { email },
            }),
            invalidatesTags: ['Admin'],
        }),
        verifyOtp: builder.mutation({
            query: ({email, otp}) => ({
                url: `${ADMINS_URL}/verify-otp`,
                method: 'POST',
                body: { email, otp },
            }),
            invalidatesTags: ['Admin'],
        }),
        updatePassword: builder.mutation({
            query: ({ email, password }) => ({
                url: `${ADMINS_URL}/updatepassword`,
                method: 'POST',
                body: { email, password },
            }),
            invalidatesTags: ['Admin'],
        }),
        updateAdmin: builder.mutation({
            query: ({ id, adminData }) => ({
                url: `${ADMINS_URL}/${id}`,
                method: 'PUT',
                body: adminData,
            }),
            invalidatesTags: ['Admin'],
        }),
        
    }),
})

export const { useCreateAdminMutation,
     useLoginAdminMutation, 
useLogoutAdminMutation,
        useSendOtpMutation,
        useVerifyOtpMutation,
        useUpdatePasswordMutation,
        useUpdateAdminMutation
 } = adminApiSlice;