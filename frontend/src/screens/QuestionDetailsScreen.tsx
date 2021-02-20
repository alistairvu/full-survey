import { useHistory, useParams } from "react-router-dom"
import { useQuery } from "react-query"
import { fetchQuestionById, useVote } from "../utils"
import { useSelector } from "react-redux"
import { rootState } from "../redux"
import { Spinner, Alert, Container, Button, Col } from "react-bootstrap"
import { useEffect } from "react"
import { QuestionResult } from "../components"

export const QuestionDetailsScreen = () => {
  const history = useHistory()
  const { id } = useParams<{ id: string }>()
  const { token } = useSelector((state: rootState) => state.user.userInfo)
  const { voting, voted, error: voteError, createVote } = useVote()

  const {
    isLoading: questionLoading,
    error: questionError,
    data: questionData,
    refetch: questionRefetch,
  } = useQuery("fetchQuestionById", () => fetchQuestionById(token, id), {
    cacheTime: 0,
  })

  useEffect(() => {
    questionRefetch()
  }, [questionRefetch, id, voting])

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

      <Col className="my-3 d-flex flex-column align-items-center">
        <h2>{questionData?.question}</h2>
        <p>
          Asked by <strong>{questionData?.user.name}</strong>.
        </p>
      </Col>

      {voteError && <Alert variant="danger">{voteError as string}</Alert>}

      {voted ? (
        voting ? (
          <Spinner animation="border" role="status" />
        ) : (
          <Alert variant="success">Vote recorded!</Alert>
        )
      ) : (
        <Container className="d-flex justify-content-center mb-2">
          <Button variant="success" onClick={() => createVote(token, id, "UP")}>
            UPVOTE
          </Button>
          <Button
            variant="danger"
            onClick={() => createVote(token, id, "DOWN")}
          >
            DOWNVOTE
          </Button>
        </Container>
      )}

      <QuestionResult
        upVotes={questionData?.upVotes}
        downVotes={questionData?.downVotes}
      />
    </Container>
  )
}
