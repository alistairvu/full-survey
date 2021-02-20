import { useState, useEffect } from "react"
import { Container, Card, Form, Spinner, Button, Alert } from "react-bootstrap"
import { useDispatch, useSelector } from "react-redux"
import { useHistory, Link } from "react-router-dom"
import { registerUser, logoutUser } from "../redux/userSlice"
import { rootState } from "../redux"
import { Meta } from "../components"

interface RegisterInterface {
  name: string
  username: string
  email: string
}

export const RegisterScreen = () => {
  const [registerInfo, setRegisterInfo] = useState<RegisterInterface>({
    name: "",
    username: "",
    email: "",
  })

  const [password, setPassword] = useState<string>("")
  const [confirmPassword, setConfirmPassword] = useState<string>("")
  const [passwordError, setPasswordError] = useState<string>("")

  const dispatch = useDispatch()
  const {
    loading: registerLoading,
    success: registerSuccess,
    error: registerError,
    userInfo,
  } = useSelector((state: rootState) => state.user)

  const history = useHistory()

  useEffect(() => {
    if (!userInfo._id) {
      dispatch(logoutUser())
    }
  }, [dispatch, userInfo])

  useEffect(() => {
    if (registerSuccess) {
      history.push("/")
    }
  }, [registerSuccess, history])

  const formSubmitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setPasswordError("")

    if (password === confirmPassword) {
      dispatch(registerUser({ ...registerInfo, password }))
    } else {
      setPasswordError("Passwords do not match")
    }
  }

  const formChangeHandler = (e: any) => {
    setRegisterInfo((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  return (
    <Container className="d-flex justify-content-center">
      <Meta title="askme! | Register" />
      <Card style={{ marginTop: 10 }} className="col-md-6 offset-col-md-3">
        <Card.Body>
          <Card.Title>Sign Up</Card.Title>

          <Form onSubmit={formSubmitHandler}>
            <Form.Group controlId="name">
              <Form.Label>Name:</Form.Label>
              <Form.Control
                type="text"
                name="name"
                value={registerInfo.name}
                onChange={formChangeHandler}
                required
              />
            </Form.Group>

            <Form.Group controlId="username">
              <Form.Label>Username:</Form.Label>
              <Form.Control
                type="text"
                name="username"
                value={registerInfo.username}
                onChange={formChangeHandler}
                required
              />
            </Form.Group>

            <Form.Group controlId="email">
              <Form.Label>Email:</Form.Label>
              <Form.Control
                type="email"
                name="email"
                value={registerInfo.email}
                onChange={formChangeHandler}
                required
              />
            </Form.Group>

            <Form.Group controlId="password">
              <Form.Label>Password:</Form.Label>
              <Form.Control
                type="password"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </Form.Group>

            <Form.Group controlId="confirmPassword">
              <Form.Label>Confirm Password:</Form.Label>
              <Form.Control
                type="password"
                name="confirmPassword"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </Form.Group>

            {registerError && <Alert variant="danger">{registerError}</Alert>}
            {passwordError && <Alert variant="danger">{passwordError}</Alert>}

            {registerLoading ? (
              <Spinner animation="border" role="status" />
            ) : (
              <Button type="submit">Sign Up</Button>
            )}
          </Form>

          <p className="pt-3">
            Returning customer?{" "}
            <strong>
              <Link to="/login">Click here to log in.</Link>
            </strong>
          </p>
        </Card.Body>
      </Card>
    </Container>
  )
}
