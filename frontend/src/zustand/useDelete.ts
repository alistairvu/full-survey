import create, { State } from "zustand"
import { devtools } from "zustand/middleware"
import axios from "axios"
import Cookies from "js-cookie"

export interface DeleteState extends State {
  deleteSuccess: boolean
  deleteProgress: boolean
  deleteError: string

  deleteQuestion: (id: string) => void
}

const initialState = {
  deleteSuccess: false,
  deleteProgress: false,
  deleteError: "",
}

const useDelete = create<DeleteState>(
  devtools(
    (set) => ({
      ...initialState,

      deleteQuestion: async (id: string) => {
        if (window.confirm("Are you sure?")) {
          try {
            set({ ...initialState, deleteProgress: true })
            const token = Cookies.get("token")
            const config = {
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
              },
            }

            await axios.delete(`/api/questions/${id}`, config)
            set({ ...initialState, deleteSuccess: true })
          } catch (err) {
            set({ ...initialState, deleteError: err.response.data.message })
          }
        }
      },
    }),
    "deleteQuestion"
  )
)

export default useDelete
