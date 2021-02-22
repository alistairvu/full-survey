import { useState, useEffect } from "react"
import { Container, Card, Form, Spinner, Button, Alert } from "react-bootstrap"
import { Meta } from "../components"
import useUserInfo from "../zustand/useUserInfo"

interface ProfileInterface {
  name: string
  username: string
  email: string
}

export const ProfileScreen = () => {
  const [
    userInfo,
    changeProfileLoading,
    changeProfileError,
    changeProfileSuccess,
  ] = useUserInfo((state) => [
    state.userInfo,
    state.loading,
    state.error,
    state.success,
  ])
  const [resetProfileChange, changeInfo] = useUserInfo((state) => [
    state.resetProfileChange,
    state.changeInfo,
  ])

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
    resetProfileChange()
  }, [resetProfileChange])

  const formSubmitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setPasswordError("")
    const { name, username, email } = profileInfo

    if (password === confirmPassword) {
      if (password.trim()) {
        changeInfo(name, username, email, password)
      } else {
        changeInfo(name, username, email)
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
