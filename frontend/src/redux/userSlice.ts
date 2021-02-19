import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "axios"

export const loginUser = createAsyncThunk(
  "user/login",
  async (
    { login, password }: { login: string; password: string },
    thunkApi
  ) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      }

      const { data } = await axios.post(
        "/api/users/login",
        { login, password },
        config
      )

      return data
    } catch (err) {
      return thunkApi.rejectWithValue(err.response.data.message)
    }
  }
)

export const registerUser = createAsyncThunk(
  "user/register",
  async (
    {
      name,
      username,
      email,
      password,
    }: { name: string; username: string; email: string; password: string },
    thunkApi
  ) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      }

      const { data } = await axios.post(
        "/api/users/register",
        { name, username, email, password },
        config
      )

      return data
    } catch (err) {
      return thunkApi.rejectWithValue(err.response.data.message)
    }
  }
)

const initialState = {
  loading: false,
  error: "",
  success: false,
  userInfo: {} as any,
}

const userSlice = createSlice({
  name: "user",
  initialState,

  reducers: {
    logoutUser: () => initialState,
  },

  extraReducers: (build) => {
    build.addCase(loginUser.pending, () => ({ ...initialState, loading: true }))
    build.addCase(loginUser.fulfilled, (_, action) => ({
      ...initialState,
      userInfo: action.payload,
      success: true,
    }))
    build.addCase(loginUser.rejected, (_, action) => ({
      ...initialState,
      error: action.payload as string,
    }))

    build.addCase(registerUser.pending, () => ({
      ...initialState,
      loading: true,
    }))
    build.addCase(registerUser.fulfilled, (_, action) => ({
      ...initialState,
      userInfo: action.payload,
      success: true,
    }))
    build.addCase(registerUser.rejected, (_, action) => ({
      ...initialState,
      error: action.payload as string,
    }))
  },
})

const { actions, reducer: userReducer } = userSlice
export const { logoutUser } = actions
export default userReducer
