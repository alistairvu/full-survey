import { Container, Spinner, Alert, Row, Col, Button } from "react-bootstrap"
import { useSelector } from "react-redux"
import { useHistory } from "react-router-dom"
import { rootState } from "../redux"
import { useQuery } from "react-query"
import { useVote, useQuestion } from "../utils"
import { LinkContainer } from "react-router-bootstrap"
import { useEffect } from "react"

export const HomeScreen = () => {
  const history = useHistory()
  const { questionEnabled, setQuestionEnabled, fetchQuestion } = useQuestion()
  const { userInfo: user } = useSelector((state: rootState) => state.user)
  const { voting, voted, error, createVote, setVoting, setVoted } = useVote()

  useEffect(() => {
    if (!user._id) {
      history.push("/login")
    } else {
      setQuestionEnabled(true)
    }
  }, [user, history, setQuestionEnabled])

  const {
    error: questionError,
    data: questionData,
    isFetching: questionFetching,
  } = useQuery("fetchQuestion", () => fetchQuestion(user.token), {
    enabled: questionEnabled,
    cacheTime: 0,
  })

  const voteHandler = (vote: "UP" | "DOWN") => {
    setVoting(true)
    createVote(user.token, questionData._id, vote)
  }

  const generateButtons = () => {
    if (voting) {
      return (
        <Container className="d-flex justify-content-center">
          <Spinner animation="border" role="status" />
        </Container>
      )
    }

    if (voted) {
      return (
        <Alert variant="success">
          Vote recorded! Click{" "}
          <LinkContainer to={`/questions/${questionData._id}`}>
            <Alert.Link>here</Alert.Link>
          </LinkContainer>{" "}
          to view the full results, and{" "}
          <Alert.Link
            onClick={() => {
              setQuestionEnabled(true)
              setVoted(false)
            }}
          >
            here
          </Alert.Link>{" "}
          to vote on another question.
        </Alert>
      )
    }

    if (error) {
      return (
        <Alert variant="danger">An error occurred. Please try again.</Alert>
      )
    }

    return (
      <Row className="my-3">
        <Col className="d-flex justify-content-sm-start justify-content-center col-3">
          <Button variant="success" onClick={() => voteHandler("UP")}>
            UP
          </Button>
        </Col>
        <Col className="d-flex flex-column col-6">
          <Row className="d-flex justify-content-center mb-1">
            <Button variant="primary" onClick={() => setQuestionEnabled(true)}>
              New question
            </Button>
          </Row>
          <Row className="d-flex justify-content-center mt-1">
            <LinkContainer to={`/questions/${questionData._id}`}>
              <Button variant="secondary">View results</Button>
            </LinkContainer>
          </Row>
        </Col>
        <Col className="d-flex justify-content-sm-end justify-content-center col-3">
          <Button variant="danger" onClick={() => voteHandler("DOWN")}>
            DOWN
          </Button>
        </Col>
      </Row>
    )
  }

  return (
    <Container className="mt-5">
      {questionFetching && (
        <Container className="d-flex justify-content-center">
          <Spinner animation="border" role="status" />
        </Container>
      )}
      {questionError && (
        <Alert variant="danger">{questionError as string}</Alert>
      )}

      {!questionFetching && questionData && (
        <div>
          <Row className="d-flex my-5 justify-content-center">
            <h2>{questionData.question}</h2>
          </Row>

          {generateButtons()}
        </div>
      )}
    </Container>
  )
}
