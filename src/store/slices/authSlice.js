import { createSlice } from '@reduxjs/toolkit'

const authSlice = createSlice({
  name: 'authUser',
  initialState: [],
  isLogged: false,
  token: false,
  reducers: {
    setToken(state, action) {
        console.log(action);
        console.log(state.token);
        console.log(state.isLoged);
      state.push({
        token: action.payload.token,
      })
    },
    setLoggedInOrOut(state, action) {
        state.push({
            logged: action.payload.isLogged,
        })
    }
  }
})

export const { setToken, setLoggedInOrOut } = authSlice.actions
export default authSlice.reducer