import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    auth : false,
}
export const loginSlice = createSlice({
  name: 'login',
  initialState,
  reducers: {
    setLogin(state){
        return {
            ...state,
            auth : true
        }
    },
    setLogout(state){
        return {
            ...state,
            auth : false
        }
    }
    },
})

export const {setLogin,setLogout} = loginSlice.actions
export default loginSlice.reducer