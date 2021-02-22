import create, { State } from "zustand"
import { persist, devtools } from "zustand/middleware"
import axios from "axios"

interface UserInterface {
  _id: string
  name: string
  email: string
  username: string
  isAdmin: boolean
  token: string
}

interface UserInfoState extends State {
  loading: boolean
  error: string
  success: boolean
  userInfo: UserInterface

  logoutUser: () => void
  resetProfileChange: () => void
  loginUser: (login: string, password: string) => void
  registerUser: (
    name: string,
    username: string,
    email: string,
    password: string
  ) => void
  changeInfo: (
    name: string,
    username: string,
    email: string,
    password?: string
  ) => void
}

const initialState = {
  loading: false,
  error: "",
  success: false,
  userInfo: {} as UserInterface,
}

const useUserInfo = create<UserInfoState>(
  devtools(
    persist(
      (set, get) => ({
        ...initialState,

        logoutUser: () => set(initialState),

        resetProfileChange: () =>
          set((state) => ({
            ...state,
            loading: false,
            error: "",
            success: false,
          })),

        loginUser: async (login: string, password: string) => {
          try {
            set(() => ({ ...initialState, loading: true }))
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

            set(() => ({ ...initialState, success: true, userInfo: data }))
          } catch (err) {
            set(() => ({ ...initialState, error: err.response.data.message }))
          }
        },

        registerUser: async (
          name: string,
          username: string,
          email: string,
          password: string
        ) => {
          try {
            set(() => ({ ...initialState, loading: true }))
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

            set(() => ({ ...initialState, success: true, userInfo: data }))
          } catch (err) {
            set(() => ({ ...initialState, error: err.response.data.message }))
          }
        },

        changeInfo: async (
          name: string,
          username: string,
          email: string,
          password?: string
        ) => {
          try {
            set((state) => ({
              ...initialState,
              userInfo: state.userInfo,
              loading: true,
            }))

            const userInfo = get().userInfo
            const { token, isAdmin, _id } = userInfo

            const config = {
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
              },
            }

            const { data } = await axios.put(
              "/api/users",
              { id: _id, name, username, email, password, isAdmin },
              config
            )

            set(() => ({ ...initialState, success: true, userInfo: data }))
          } catch (err) {
            set((state) => ({
              ...initialState,
              userInfo: state.userInfo,
              error: err.response.data.message,
            }))
          }
        },
      }),
      { name: "userInfo" }
    ),
    "userInfo"
  )
)

export default useUserInfo
