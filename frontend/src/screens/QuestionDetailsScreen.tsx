import { useHistory, useParams } from "react-router-dom"
import { useQuery } from "react-query"
import { fetchQuestionById } from "../utils"
import { useSelector } from "react-redux"
import { rootState } from "../redux"
import { Spinner, Alert, Container, Button, Col } from "react-bootstrap"
import { useEffect, useState } from "react"
import { QuestionResult } from "../components"

export const QuestionDetailsScreen = () => {
  const [enabled, setEnabled] = useState(false)
  const history = useHistory()
  const { id } = useParams<{ id: string }>()
  const { token } = useSelector((state: rootState) => state.user.userInfo)

  const {
    isLoading: questionLoading,
    error: questionError,
    data: questionData,
  } = useQuery("fetchQuestionById", () => fetchQuestionById(token, id), {
    cacheTime: 0,
    enabled,
  })

  useEffect(() => {
    setEnabled(true)
  }, [])

  if (questionLoading) {
    return (
      <Container className="my-5">
        <Button variant="dark" onClick={() => history.goBack()}>
          Return
        </Button>
        <div className="d-flex justify-content-center my-1">
          <Spinner animation="border" role="status" />{" "}
        </div>
      </Container>
    )
  }

  if (questionError) {
    return (
      <Container className="my-5">
        <Button variant="dark" onClick={() => history.goBack()}>
          Return
        </Button>
        <div className="d-flex justify-content-center my-1">
          <Alert variant="danger">{questionError as string}</Alert>
        </div>
      </Container>
    )
  }

  return (
    <Container className="my-5">
      <Button variant="dark" onClick={() => history.goBack()}>
        Return
      </Button>

      <Col className="my-5 d-flex flex-column align-items-center">
        <h2>{questionData?.question}</h2>
        <p>
          Asked by <strong>{questionData?.user.name}</strong>.
        </p>
      </Col>

      <QuestionResult
        upVotes={questionData?.upVotes}
        downVotes={questionData?.downVotes}
      />
    </Container>
  )
}
