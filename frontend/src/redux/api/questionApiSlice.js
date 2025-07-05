import { QUESTIONS_URL } from "../constants.js";
import { apiSlice } from "./apiSlice.js";

export const questionApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) =>({
        getQuestionById: builder.query({
            query: (quesId) => ({
                url: `${QUESTIONS_URL}/${quesId}`,
            }),
            invalidatesTags: ["Question"],
        }),
        updateQuestionById: builder.mutation({
            query: ({quesId, quesData}) =>({
                url: `${QUESTIONS_URL}/${quesId}`,
                method: "PUT",
                body: quesData,

            }),
            invalidatesTags: ["Question"],
        }),
        getQuestionsByTestId: builder.query({
            query: (testId) => ({
                url: `${QUESTIONS_URL}/test/${testId}`,
            }),
            invalidatesTags: ["Question"],
        }),
        deleteQuestionById: builder.mutation({
            query: (quesId) =>({
                url: `${QUESTIONS_URL}/${quesId}`,
                method: "DELETE",
            }),
            invalidatesTags: ["Question"],
        }),
        
    })
})

export const {
    useGetQuestionByIdQuery,
    useUpdateQuestionByIdMutation,
    useGetQuestionsByTestIdQuery,
    useDeleteQuestionByIdMutation
} = questionApiSlice;  