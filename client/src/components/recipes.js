import React from "react";
import {Helmet} from "react-helmet";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Tabs from "react-bootstrap/Tabs";
import Tab from "react-bootstrap/Tab";

export default function () {
    return(
        <div>
            <Helmet>
                <title>EZ Beer: Recipe Manager</title>
            </Helmet>
            <Container fluid>
                <Row>
                    <Col>Make me a status bar "Recipe Name" "Recipe Version" "Style" Maybe some buttons</Col>
                </Row>
                <Row>
                    <Col>Recipe Control Panel</Col>
                    <Col md={8}><Tabs defaultActiveKey="profile" id="uncontrolled-tab-example">
                        <Tab eventKey="profile" title="Profile">
                            Profile Info
                        </Tab>
                        <Tab eventKey="Mash" title="Mash">
                            Some homie Info
                        </Tab>

                        <Tab eventKey="Water Calc" title="Water Calc">
                            Wut
                        </Tab>
                    </Tabs></Col>
                    <Col>Recipe functions</Col>
                </Row>
                <Row>
                    <Col>Recipe Infos, ABV, IBU, total weight</Col>
                </Row>
            </Container>
        </div>
    )

}