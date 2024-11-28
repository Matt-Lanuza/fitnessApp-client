import { useContext } from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import UserContext from '../context/UserContext';

export default function AppNavbar() {
  const { user } = useContext(UserContext);

  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container>
        <Navbar.Brand href="/" className="logo-name">FitnessPal</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <Nav.Link href="/" className="navbar-collapse">Home</Nav.Link>
            
            {user.id !== null ? (
              <>
                <Nav.Link href="/workout" className="navbar-collapse">My Workouts</Nav.Link>
                <Nav.Link href="/logout" className="navbar-collapse">Logout</Nav.Link>
              </>
            ) : (
              <>
                <Nav.Link href="/login" className="navbar-collapse">Login</Nav.Link>
                <Nav.Link href="/register" className="navbar-collapse">Register</Nav.Link>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
