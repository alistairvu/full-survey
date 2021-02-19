import { useState } from "react"
import axios from "axios"

export const useQuestion = () => {
  const [questionEnabled, setQuestionEnabled] = useState<boolean>(true)

  const fetchQuestion = async (token: string) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }

      const { data } = await axios.get(`/api/questions`, config)
      setQuestionEnabled(false)
      return data
    } catch (err) {
      setQuestionEnabled(false)
      throw new Error(err.response.data.message)
    }
  }

  return { fetchQuestion, questionEnabled, setQuestionEnabled }
}
