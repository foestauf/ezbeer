import React from 'react';
import './css/App.scss';
import {Switch, BrowserRouter, Route} from "react-router-dom";
import {LinkContainer} from "react-router-bootstrap";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Button from "react-bootstrap/Button";
import about from "./components/about";
import home from "./components/home";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar bg="dark" expand="lg" variant="dark">
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav variant="pills" defaultActiveKey="/" className="mr-auto">
              <LinkContainer to="/"><Nav.Link><Button>Home</Button></Nav.Link></LinkContainer>{' '}
              <LinkContainer to="/about"><Nav.Link><Button>About</Button></Nav.Link></LinkContainer>{' '}
            </Nav>
          </Navbar.Collapse>
        </Navbar>
        <Switch>
          <Route path="/about" component={about}/>
          <Route exact path="/" component={home}/>
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
