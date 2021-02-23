import axios from "axios"
import Cookies from "js-cookie"

export const fetchQuestionById = async (id: string) => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    }

    const { data } = await axios.get(`/api/questions/${id}`, config)
    return data
  } catch (err) {
    throw new Error(err.response.data.message)
  }
}

export const fetchUserQuestions = async (id: string) => {
  try {
    const token = Cookies.get("token")
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }

    const { data } = await axios.get(`/api/users/${id}`, config)
    const { questions } = data

    return questions
  } catch (err) {
    throw new Error(err.response.data.message)
  }
}

export const fetchQuestionsByPage = async (page: string = "") => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    }

    const { data } = await axios.get(`/api/questions?page=${page}`, config)
    return data
  } catch (err) {
    throw new Error(err.response.data.message)
  }
}

export const searchQuestion = async (
  keyword: string = "",
  page: string = ""
) => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    }

    const { data } = await axios.get(
      `/api/questions?keyword=${keyword}&page=${page}`,
      config
    )
    return data
  } catch (err) {
    throw new Error(err.response.data.message)
  }
}
