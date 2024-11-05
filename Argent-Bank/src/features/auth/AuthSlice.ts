import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import type { Profile } from '../../app/services/auth'
import type { RootState } from '../../app/store'

type AuthState = {
  user: Profile | null
  token: string | null
}

const slice = createSlice({
  name: 'auth',
  initialState: { user: null, token: null } as AuthState,
  reducers: {
    setCredentials: (
      state,
      {
        payload: { token },
      }: PayloadAction<{token: string }>,
    ) => {
      console.log(token)
      state.token = token
    },
  },
})

export const { setCredentials } = slice.actions

export default slice

export const selectCurrentUser = (state: RootState) => state.auth.user
