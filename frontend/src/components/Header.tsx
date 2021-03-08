import { Navbar, Nav, Container, NavDropdown } from "react-bootstrap"
import { LinkContainer } from "react-router-bootstrap"
import { useHistory } from "react-router-dom"
import { SearchBox } from "./SearchBox"
import useUserInfo from "../zustand/useUserInfo"

export const Header = () => {
  const [userInfo, logoutUser] = useUserInfo((state) => [
    state.userInfo,
    state.logoutUser,
  ])
  const history = useHistory()

  const logoutHandler = () => {
    logoutUser()
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
            {userInfo._id && <SearchBox />}
            <Nav className="ml-auto d-flex justify-content-center">
              {userInfo._id && (
                <>
                  <LinkContainer to="/ask">
                    <Nav.Link>
                      <i className="fas fa-question"></i> Ask
                    </Nav.Link>
                  </LinkContainer>

                  <LinkContainer to="/browse">
                    <Nav.Link>
                      <i className="fas fa-book-open"></i> Browse
                    </Nav.Link>
                  </LinkContainer>
                </>
              )}

              {userInfo._id ? (
                <NavDropdown title={userInfo.name} id="username">
                  <LinkContainer to="/questions">
                    <NavDropdown.Item>Questions</NavDropdown.Item>
                  </LinkContainer>

                  <LinkContainer to="/profile">
                    <NavDropdown.Item>Profile</NavDropdown.Item>
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
