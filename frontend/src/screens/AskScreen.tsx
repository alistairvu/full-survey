import { useState } from "react"
import { Container, Card, Form, Spinner, Alert, Button } from "react-bootstrap"
import { useQuery } from "react-query"
import { Redirect } from "react-router-dom"
import axios from "axios"
import { Meta } from "../components"
import useUserInfo from "../zustand/useUserInfo"

export const AskScreen = () => {
  const [question, setQuestion] = useState<string>("")
  const [asking, setAsking] = useState<boolean>(false)
  const token = useUserInfo((state) => state.userInfo.token)

  const askQuestion = async () => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }

      const { data } = await axios.post(`/api/questions`, { question }, config)
      return data
    } catch (err) {
      throw new Error(err.response.data.message)
    } finally {
      setAsking(false)
      setQuestion("")
    }
  }

  const {
    isLoading: askLoading,
    isSuccess: askSuccess,
    error: askError,
  } = useQuery("askQuestion", askQuestion, { enabled: asking, cacheTime: 0 })

  const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setAsking(true)
  }

  if (!token) {
    return <Redirect to="/login" />
  }

  return (
    <Container className="mt-4">
      <Meta title="askme! | Ask" />
      <h1>Ask</h1>

      <div className="d-flex justify-content-center">
        <Card className="col-md-6 offset-col-md-3">
          <Card.Body>
            <p className={200 - question.length <= 10 ? "text-danger" : ""}>
              Characters left: {200 - question.length}
            </p>

            <Form onSubmit={submitHandler}>
              <Form.Group controlId="question">
                <Form.Control
                  type="text"
                  maxLength={200}
                  rows={5}
                  as="textarea"
                  style={{ resize: "none" }}
                  name="login"
                  value={question}
                  onChange={(e) => setQuestion(e.target.value)}
                  required
                />
              </Form.Group>

              {askSuccess && (
                <Alert variant="success">Question submitted!</Alert>
              )}
              {askError && <Alert variant="danger">{askError as string}</Alert>}

              {askLoading ? (
                <Spinner animation="border" role="status" />
              ) : (
                <Button type="submit">Ask</Button>
              )}
            </Form>
          </Card.Body>
        </Card>
      </div>
    </Container>
  )
}
