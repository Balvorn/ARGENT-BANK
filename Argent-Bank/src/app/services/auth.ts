import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import type { RootState } from '../store'

export interface User {
    first_name: string
    last_name: string
}

export interface UserResponse {
    status: number
    message: string
    body: {
        token: string
    }
}

export interface LoginRequest {
    email: string
    password: string
}

export const api = createApi({
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://localhost:3001/api/v1/user/',
        prepareHeaders: (headers, { getState }) => {
            // By default, if we have a token in the store, let's use that for authenticated requests
            const token = (getState() as RootState).auth.token
            if (token) {
                headers.set('Authorization', `Bearer ${token}`)
            }
            return headers
        },
    }),
    endpoints: (builder) => ({
        login: builder.mutation<UserResponse, LoginRequest>({
            query: (credentials) => ({
                url: 'login',
                method: 'POST',
                body: credentials,
            }),
        }),
        protected: builder.mutation<{ message: string }, void>({
            query: () => ({
                url: 'profile',
                method: 'POST',
            })
        }),
    }),
})

export const { useLoginMutation, useProtectedMutation } = api
