import { Container } from "react-bootstrap"
import { useSelector } from "react-redux"
import { Redirect } from "react-router-dom"
import { rootState } from "../redux"

export const HomeScreen = () => {
  const { userInfo: user } = useSelector((state: rootState) => state.user)

  if (!user._id) {
    return <Redirect to="/login" />
  }

  return (
    <Container className="mt-4">
      <h1>Home</h1>
    </Container>
  )
}
