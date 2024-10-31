import { createSlice } from '@reduxjs/toolkit'

export const adminSlice = createSlice({
    name: 'admin',
    initialState: {
        id: null,
        adminName:null,
        loginValue: false
    },
    reducers: {
        adminLogin: state => {  
            state.loginValue= true
        },
        adminLogout: state => {
            state.loginValue = false
        },
        setAdminId: (state, action) => {
             state.id = action.payload
        },
        setAdminName: (state, action) => {
            state.adminName = action.payload
        },
    }
})

export const { adminLogin, adminLogout, setAdminId, setAdminName } = adminSlice.actions

export default adminSlice.reducer