import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import type { Profile } from '../../app/services/auth'
import type { RootState } from '../../app/store'

// initialize userToken from local storage
const token = localStorage.getItem('token')
  ? localStorage.getItem('token')
  : null

type AuthState = {
  user: Profile | null
  token: string | null
}


const slice = createSlice({
  name: 'auth',
  initialState: { user: null, token } as AuthState,
  reducers: {
    setCredentials: (
      state,
      {
        payload: { token },
      }: PayloadAction<{ token: string }>,
    ) => {
      state.token = token
      localStorage.setItem('token', token)
    },
    setUser: (
      state,
      {
        payload: { user },
      }: PayloadAction<{ user: Profile }>,
    ) => {
      state.user = user
    },
    logout: (state) => {
      localStorage.removeItem('token') // deletes token from storage
      state.user = null
      state.token = null
    },
  },
})

export const { setCredentials, setUser, logout } = slice.actions

export default slice

export const selectCurrentUser = (state: RootState) => state.auth.user
export const selectToken = (state: RootState) => state.auth.token
