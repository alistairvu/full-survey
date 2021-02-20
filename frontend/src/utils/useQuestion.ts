import { useState } from "react"
import axios from "axios"

export const useQuestion = () => {
  const [questionEnabled, setQuestionEnabled] = useState<boolean>(false)

  const fetchQuestion = async () => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      }

      const { data } = await axios.get(`/api/questions/random`, config)
      setQuestionEnabled(false)
      return data
    } catch (err) {
      setQuestionEnabled(false)
      throw new Error(err.response.data.message)
    }
  }

  return { fetchQuestion, questionEnabled, setQuestionEnabled }
}
