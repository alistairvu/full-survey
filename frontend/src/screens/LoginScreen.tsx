import { useState, useEffect } from "react"
import { Container, Card, Form, Spinner, Button, Alert } from "react-bootstrap"
import { useDispatch, useSelector } from "react-redux"
import { useHistory, Link } from "react-router-dom"
import { loginUser, logoutUser } from "../redux/userSlice"
import { rootState } from "../redux"

interface LoginInterface {
  login: string
  password: string
}

export const LoginScreen = () => {
  const [loginInfo, setLoginInfo] = useState<LoginInterface>({
    login: "",
    password: "",
  })

  const dispatch = useDispatch()
  const { loading, success, error, userInfo } = useSelector(
    (state: rootState) => state.user
  )

  const history = useHistory()

  useEffect(() => {
    if (!userInfo._id) {
      dispatch(logoutUser())
    }
  }, [dispatch, userInfo])

  useEffect(() => {
    if (success) {
      history.push("/")
    }
  }, [success, history])

  const formSubmitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    dispatch(loginUser(loginInfo))
  }

  const formChangeHandler = (e: any) => {
    setLoginInfo((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  return (
    <Container className="d-flex justify-content-center">
      <Card
        style={{ marginTop: 10, paddingBottom: 0 }}
        className="col-md-6 offset-col-md-3"
      >
        <Card.Body>
          <Card.Title>Log In</Card.Title>

          <Form onSubmit={formSubmitHandler}>
            <Form.Group controlId="login">
              <Form.Label>Username or Email:</Form.Label>
              <Form.Control
                type="text"
                name="login"
                value={loginInfo.login}
                onChange={formChangeHandler}
                required
              />
            </Form.Group>

            <Form.Group controlId="password">
              <Form.Label>Password:</Form.Label>
              <Form.Control
                type="password"
                name="password"
                value={loginInfo.password}
                onChange={formChangeHandler}
                required
              />
            </Form.Group>

            {error && <Alert variant="danger">{error}</Alert>}

            {loading ? (
              <Spinner animation="border" role="status" />
            ) : (
              <Button type="submit">Log In</Button>
            )}
          </Form>

          <p className="pt-3">
            New customer?{" "}
            <strong>
              <Link to="/register">Click here to sign up.</Link>
            </strong>
          </p>
        </Card.Body>
      </Card>
    </Container>
  )
}
