import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import type { RootState } from '../store'

export interface Profile {
    id: string,
    email: string
    firstName: string,
    lastName: string
}

export interface LoginResponse {
    token: string
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
                return headers
            }
        },
    }),
    endpoints: (builder) => ({
        login: builder.mutation<LoginResponse, LoginRequest>({
            query: (credentials) => ({
                url: 'login',
                method: 'POST',
                body: credentials,
            }),

            transformResponse: (data: { body: LoginResponse }, meta) => {
                // store user's token in local storage
                return data.body
            }

        }),
        getProfile: builder.query<Profile, void>({
            query: () => ({
                url: 'profile',
                method: 'POST',
            }),
            transformResponse: (data: { body: Profile }, meta) => {
                return data.body
            },
            transformErrorResponse: (
                response: { status: string | number, data? : Error | unknown},
                meta,
                arg
              ) => response.data,
        }),
    }),
})

export const { useLoginMutation, useGetProfileQuery } = api
