import React, { Component } from "react";
import Nav from "react-bootstrap/Nav";
import {LinkContainer} from "react-router-bootstrap";
import Button from "react-bootstrap/Button";
import Navbar from "react-bootstrap/Navbar";

class Navigation extends Component {
    render() {
        return (
            <Navbar bg="dark" expand="lg" variant="dark">
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav variant="pills" defaultActiveKey="/" className="mr-auto">
                        <LinkContainer to="/"><Nav.Link><Button variant="primary">Home</Button></Nav.Link></LinkContainer>
                        <LinkContainer to="/recipes"><Nav.Link><Button variant="primary">Recipes</Button></Nav.Link></LinkContainer>
                        <LinkContainer to="/about"><Nav.Link><Button variant="primary">About</Button></Nav.Link></LinkContainer>
                        <LinkContainer to="/dashboard"><Nav.Link><Button variant="primary">Dashboard</Button> </Nav.Link></LinkContainer>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>

        );
    }
}
export default Navigation;