import axios from "axios"
import { useState } from "react"
import { useSelector } from "react-redux"
import { rootState } from "../redux"

export const useDelete = () => {
  const [deleteSuccess, setDeleteSuccess] = useState(false)
  const [deleteProgress, setDeleteProgress] = useState(false)
  const [deleteError, setDeleteError] = useState("")

  const { token } = useSelector((state: rootState) => state.user.userInfo)

  const deleteQuestion = async (id: string) => {
    try {
      setDeleteProgress(true)
      setDeleteSuccess(false)
      setDeleteError("")
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }

      await axios.delete(`/api/questions/${id}`, config)
      setDeleteSuccess(true)
    } catch (err) {
      setDeleteError(err.response.data.message as string)
    } finally {
      setDeleteProgress(false)
    }
  }

  const deleteHandler = (id: string) => {
    if (window.confirm("Are you sure?")) {
      deleteQuestion(id)
    }
  }

  return { deleteSuccess, deleteProgress, deleteError, deleteHandler }
}
