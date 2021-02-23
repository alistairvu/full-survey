import { useState, useEffect } from "react"
import { useQuery } from "react-query"
import { Container, Spinner, Row, Alert } from "react-bootstrap"
import { useHistory } from "react-router-dom"
import { QuestionTable, Meta } from "../components"
import { fetchUserQuestions } from "../utils"
import useDelete from "../zustand/useDelete"
import useUserInfo from "../zustand/useUserInfo"

export const QuestionsScreen = () => {
  const history = useHistory()
  const [enabled, setEnabled] = useState(false)
  const [questions, setQuestions] = useState<any[]>()
  const [
    deleteQuestion,
    deleteError,
    deleteProgress,
    deleteSuccess,
  ] = useDelete((state) => [
    state.deleteQuestion,
    state.deleteError,
    state.deleteProgress,
    state.deleteSuccess,
  ])

  const [id] = useUserInfo((state) => [state.userInfo._id])
  const {
    isLoading: questionLoading,
    isSuccess: questionSuccess,
    data: questionData,
    error: questionError,
  } = useQuery("fetchDetails", () => fetchUserQuestions(id), {
    enabled,
    cacheTime: 0,
  })

  useEffect(() => {
    if (id) {
      setEnabled(true)
    } else {
      history.push("/login")
    }

    if (questionSuccess) {
      setQuestions(questionData)
    }
  }, [questionData, questionSuccess, id, history])

  return (
    <Container className="mt-4">
      <Meta title="askme! | Your Questions" />
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
          <QuestionTable
            questions={questions!}
            deleteHandler={deleteQuestion}
          />
        )}
      </Row>
    </Container>
  )
}
