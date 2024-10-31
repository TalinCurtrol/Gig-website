import { createSlice } from '@reduxjs/toolkit'
import { isValidMotionProp } from 'framer-motion'

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    isLoggedIn: false,
    id: null,
    isBlocked: false,
  },
  reducers: {
    login: state => {
        state.isLoggedIn = true
    },
    logout: state => {
        state.isLoggedIn = false;
        state.id = null;
        state.isAdmin = false;
    },
    setUserId: (state, action) => {
        state.id = action.payload
    },
    setIsBlockedToTrue: state => {
        state.isBlocked =true
      },
      setIsBlockedToFalse: state => {
          state.isBlocked =false
      }
  }
})

// Action creators are generated for each case reducer function
export const { login, logout, setUserId, setIsBlockedToTrue, setIsBlockedToFalse } = userSlice.actions

export default userSlice.reducer