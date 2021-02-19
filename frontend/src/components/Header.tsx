import { Navbar, Nav, Container, NavDropdown } from "react-bootstrap"
import { LinkContainer } from "react-router-bootstrap"
import { useSelector, useDispatch } from "react-redux"
import { useHistory } from "react-router-dom"
import { rootState } from "../redux"
import { logoutUser } from "../redux/userSlice"

export const Header = () => {
  const dispatch = useDispatch()
  const { userInfo } = useSelector((state: rootState) => state.user)
  const history = useHistory()

  const logoutHandler = () => {
    dispatch(logoutUser())
    history.push("/login")
  }

  return (
    <header>
      <Navbar variant="dark" bg="dark" expand="lg" collapseOnSelect>
        <Container>
          <LinkContainer to="/">
            <Navbar.Brand>askme!</Navbar.Brand>
          </LinkContainer>
          <Navbar.Toggle />

          <Navbar.Collapse>
            <Nav className="ml-auto">
              {userInfo._id && (
                <LinkContainer to="/ask">
                  <Nav.Link>Ask</Nav.Link>
                </LinkContainer>
              )}

              {userInfo._id ? (
                <NavDropdown title={userInfo.name} id="username">
                  <LinkContainer to="/questions">
                    <NavDropdown.Item>Questions</NavDropdown.Item>
                  </LinkContainer>

                  <NavDropdown.Item onClick={logoutHandler}>
                    Logout
                  </NavDropdown.Item>
                </NavDropdown>
              ) : (
                <LinkContainer to="/login">
                  <Nav.Link>
                    <i className="fas fa-user"></i> Sign In
                  </Nav.Link>
                </LinkContainer>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  )
}
