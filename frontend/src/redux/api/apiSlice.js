import {fetchBaseQuery, createApi} from '@reduxjs/toolkit/query/react'
import { BASE_URL } from '../constants.js'

const baseQuery = fetchBaseQuery({baseUrl: BASE_URL,
    credentials: 'include',

})

export const apiSlice = createApi({
    baseQuery,
    tagTypes: ['Admin', 'User', 'Test', 'Question','Result'],
    endpoints: ()=>({})
})