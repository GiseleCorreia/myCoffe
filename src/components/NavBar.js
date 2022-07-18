import React from 'react'
import Container from 'react-bootstrap/Container'
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'
import { FiCoffee } from 'react-icons/fi'

const Header = () => {
  return (
    <div className="NavBar">
      <Navbar bg="light" expand="lg">
        <Container>
          <Navbar.Brand href="/home">
            <FiCoffee /> myCoffe
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link href="/home">Home</Nav.Link>
              <Nav.Link href="/pedido">Pedido</Nav.Link>
              <Nav.Link href="/cozinha">Cozinha</Nav.Link>
              <Nav.Link href="/retirada">Retirada</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  )
}

export default Header
