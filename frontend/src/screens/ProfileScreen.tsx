import { useState, useEffect } from "react"
import { Container, Card, Form, Spinner, Button, Alert } from "react-bootstrap"
import { useDispatch, useSelector } from "react-redux"
import { changeInfo, resetProfileChange } from "../redux/userSlice"
import { rootState } from "../redux"
import { Meta } from "../components"

interface ProfileInterface {
  name: string
  username: string
  email: string
}

export const ProfileScreen = () => {
  const dispatch = useDispatch()
  const {
    userInfo,
    loading: changeProfileLoading,
    error: changeProfileError,
    success: changeProfileSuccess,
  } = useSelector((state: rootState) => state.user)

  const [profileInfo, setProfileInfo] = useState<ProfileInterface>({
    name: userInfo.name,
    username: userInfo.username,
    email: userInfo.email,
  })

  const [password, setPassword] = useState<string>("")
  const [confirmPassword, setConfirmPassword] = useState<string>("")
  const [passwordError, setPasswordError] = useState<string>("")

  useEffect(() => {
    console.log("reset")
    dispatch(resetProfileChange())
  }, [dispatch])

  const formSubmitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setPasswordError("")

    if (password === confirmPassword) {
      if (password.trim()) {
        dispatch(changeInfo({ ...profileInfo, password }))
      } else {
        dispatch(changeInfo({ ...profileInfo }))
      }
    } else {
      setPasswordError("Passwords do not match")
    }
  }

  const formChangeHandler = (e: any) => {
    setProfileInfo((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  return (
    <Container className="d-flex justify-content-center">
      <Meta title="askme! | Your Profile" />
      <Card style={{ marginTop: 10 }} className="col-md-6 offset-col-md-3">
        <Card.Body>
          <Card.Title>Your Profile</Card.Title>

          <Form onSubmit={formSubmitHandler}>
            <Form.Group controlId="name">
              <Form.Label>Name:</Form.Label>
              <Form.Control
                type="text"
                name="name"
                value={profileInfo.name}
                onChange={formChangeHandler}
                required
              />
            </Form.Group>

            <Form.Group controlId="username">
              <Form.Label>Username:</Form.Label>
              <Form.Control
                type="text"
                name="username"
                value={profileInfo.username}
                onChange={formChangeHandler}
                required
              />
            </Form.Group>

            <Form.Group controlId="email">
              <Form.Label>Email:</Form.Label>
              <Form.Control
                type="email"
                name="email"
                value={profileInfo.email}
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
              />
            </Form.Group>

            <Form.Group controlId="confirmPassword">
              <Form.Label>Confirm Password:</Form.Label>
              <Form.Control
                type="password"
                name="confirmPassword"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </Form.Group>

            {changeProfileError && (
              <Alert variant="danger">{changeProfileError}</Alert>
            )}
            {passwordError && <Alert variant="danger">{passwordError}</Alert>}
            {changeProfileError && (
              <Alert variant="danger">{changeProfileError}</Alert>
            )}

            {changeProfileSuccess && (
              <Alert variant="success">Profile changed!</Alert>
            )}
            {changeProfileLoading ? (
              <Spinner animation="border" role="status" />
            ) : (
              <Button type="submit">Edit Profile</Button>
            )}
          </Form>
        </Card.Body>
      </Card>
    </Container>
  )
}
