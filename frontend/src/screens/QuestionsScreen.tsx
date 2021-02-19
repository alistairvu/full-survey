import { useState, useEffect } from "react"
import { useQuery } from "react-query"
import { Container, Spinner, Row, Alert } from "react-bootstrap"
import { useSelector } from "react-redux"
import { rootState } from "../redux"
import { useHistory } from "react-router-dom"
import { QuestionTable } from "../components"
import { useDelete, fetchUserQuestions } from "../utils"

export const QuestionsScreen = () => {
  const history = useHistory()
  const [enabled, setEnabled] = useState(false)
  const [questions, setQuestions] = useState<any[]>()
  const {
    deleteHandler,
    deleteError,
    deleteProgress,
    deleteSuccess,
  } = useDelete()

  const { token, _id } = useSelector((state: rootState) => state.user.userInfo)
  const {
    isLoading: questionLoading,
    isSuccess: questionSuccess,
    data: questionData,
    error: questionError,
  } = useQuery("fetchDetails", () => fetchUserQuestions(_id, token), {
    enabled,
    cacheTime: 0,
  })

  useEffect(() => {
    if (token) {
      setEnabled(true)
    } else {
      history.push("/login")
    }

    if (questionSuccess) {
      setQuestions(questionData)
    }
  }, [questionData, questionSuccess, token, history])

  return (
    <Container className="mt-4">
      <h1>Questions</h1>
      {deleteSuccess && <Alert variant="success">Question deleted!</Alert>}
      {deleteError && <Alert variant="danger">{deleteError}</Alert>}
      {deleteProgress && (
        <Row className="d-flex justify-content-center my-1">
          <Spinner animation="border" role="status" />
        </Row>
      )}

      <Row className="d-flex justify-content-center mt-4">
        {questionLoading && <Spinner animation="border" role="status" />}
        {!questionLoading && !questionError && questions && (
          <QuestionTable questions={questions!} deleteHandler={deleteHandler} />
        )}
      </Row>
    </Container>
  )
}
