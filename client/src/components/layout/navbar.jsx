import React from 'react';
import Nav from 'react-bootstrap/Nav';
import { LinkContainer } from 'react-router-bootstrap';
import Button from 'react-bootstrap/Button';
import Navbar from 'react-bootstrap/Navbar';

const Navigation = () => {
  return (
    <Navbar bg="dark" expand="lg" variant="dark">
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav variant="pills" defaultActiveKey="/" className="mr-auto">
          <NavButton to="/" title="Home" />
          <NavButton to="/yeastcalc" title="Yeast Calculator" />
          <NavButton to="/dashboard" title="Dashboard" />
          <NavButton to="/recipelist" title="Recipe Manager" />
          <NavButton to="/about" title="About" />
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

const NavButton = (props) => {
  const { to, title } = props;
  return (
    <LinkContainer to={to}>
      <Nav.Link>
        <Button variant="primary">{title}</Button>
      </Nav.Link>
    </LinkContainer>
  );
};

export default Navigation;
