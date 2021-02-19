import { useState, useEffect } from "react"
import { useQuery } from "react-query"
import { Container, Spinner, Row } from "react-bootstrap"
import { useSelector } from "react-redux"
import axios from "axios"
import { rootState } from "../redux"
import { Redirect } from "react-router-dom"
import { QuestionTable } from "../components"

const fetchUserQuestions = async (id: string, token: string) => {
  try {
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

export const QuestionsScreen = () => {
  const [enabled, setEnabled] = useState(false)
  const [questions, setQuestions] = useState<any[]>()

  const { token, _id } = useSelector((state: rootState) => state.user.userInfo)
  const {
    isLoading: questionLoading,
    isSuccess: questionSuccess,
    data: questionData,
    error: questionError,
  } = useQuery("fetchDetails", () => fetchUserQuestions(_id, token), {
    enabled,
  })

  useEffect(() => {
    if (questionSuccess) {
      setQuestions(questionData)
    }
  }, [questionData, questionSuccess])

  useEffect(() => {
    if (token) {
      setEnabled(true)
    }
  }, [token])

  if (!token) {
    return <Redirect to="/login" />
  }

  return (
    <Container className="mt-4">
      <h1>Questions</h1>

      <Row className="d-flex justify-content-center mt-4">
        {questionLoading && <Spinner animation="border" role="status" />}
        {!questionLoading && !questionError && questions && (
          <QuestionTable questions={questions!} />
        )}
      </Row>
    </Container>
  )
}
