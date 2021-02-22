import { useState, useEffect } from "react"
import { Container, Card, Form, Spinner, Button, Alert } from "react-bootstrap"
import { useHistory, Link } from "react-router-dom"
import { Meta } from "../components"
import useUserInfo from "../zustand/useUserInfo"

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

  const [
    registerLoading,
    registerSuccess,
    registerError,
    userInfo,
  ] = useUserInfo((state) => [
    state.loading,
    state.success,
    state.error,
    state.userInfo,
  ])
  const [registerUser, logoutUser] = useUserInfo((state) => [
    state.registerUser,
    state.logoutUser,
  ])

  const history = useHistory()

  useEffect(() => {
    if (!userInfo._id) {
      logoutUser()
    }
  }, [logoutUser, userInfo])

  useEffect(() => {
    if (registerSuccess) {
      history.push("/")
    }
  }, [registerSuccess, history])

  const formSubmitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setPasswordError("")

    if (password === confirmPassword) {
      const { name, username, email } = registerInfo
      registerUser(name, username, email, password)
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
