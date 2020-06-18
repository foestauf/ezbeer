import React from "react";
import {Helmet} from "react-helmet";
import { useSelector } from 'react-redux';
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Tabs from "react-bootstrap/Tabs";
import Tab from "react-bootstrap/Tab";
import "../css/recipes.scss";
import InputGroup from "react-bootstrap/InputGroup";
import FormControl from "react-bootstrap/FormControl";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";


export default function () {
    const recipe = useSelector(state => state.recipe)
    console.log(recipe)
    return(
        <div>
            <Helmet>
                <title>EZ Beer: Recipe Manager</title>
            </Helmet>
            <Container fluid>
                <Row>
                    <Col className="statusBar">
                        <Row>
                            <InputGroup size="sm">
                                <InputGroup.Prepend>
                                    <InputGroup.Text>Name</InputGroup.Text>
                                </InputGroup.Prepend>
                                <FormControl readOnly size="sm" placeholder={recipe.name} />
                                <InputGroup.Prepend>
                                    <InputGroup.Text>Style</InputGroup.Text>
                                </InputGroup.Prepend>
                                <FormControl readOnly size="sm" placeholder={recipe.style} />
                            </InputGroup>

                        </Row>
                    </Col>
                </Row>
                <Row>
                    <Col>Recipe Control Panel
                    <div>INSERT ICONS</div></Col>
                    <Col md={8}><Tabs defaultActiveKey="profile" id="uncontrolled-tab-example">
                        <Tab eventKey="profile" title="Profile">
                            Profile Info
                            <InputGroup>
                                <InputGroup.Prepend>
                                    <InputGroup.Text>Name</InputGroup.Text>
                                </InputGroup.Prepend>
                                <FormControl placeholder="Beer Name" aria-label="BeerName"/>
                                <InputGroup.Prepend>
                                    <InputGroup.Text>Brewer</InputGroup.Text>
                                </InputGroup.Prepend>
                                <FormControl placeholder="Brewer Name" aria-label="BrewerName"/>
                            </InputGroup>
                            <InputGroup>
                                <InputGroup.Prepend>
                                    <InputGroup.Text>Batch Size</InputGroup.Text>
                                </InputGroup.Prepend>
                                <FormControl placeholder="Size in Gallons" aria-label="BatchSize"/>
                                <InputGroup.Prepend>
                                    <InputGroup.Text>Boil Time</InputGroup.Text>
                                </InputGroup.Prepend>
                                <FormControl placeholder="60" aria-label="BoilTime"/>
                                <InputGroup.Prepend>
                                    <InputGroup.Text>Efficiency</InputGroup.Text>
                                <FormControl placeholder="80" aria-label="efficiency"/>
                                </InputGroup.Prepend>
                                <InputGroup.Append>
                                    <InputGroup.Text>%</InputGroup.Text>
                                </InputGroup.Append>
                            </InputGroup>
                            <div id="ingredients">
                                <Table striped bordered hover>
                                    <thead>
                                    <tr>
                                        <th>Amount</th>
                                        <th>Name</th>
                                        <th>Type</th>
                                        <th>%</th>
                                        <th>IBU</th>
                                        <th>Inventory</th>
                                        <th>Cost</th>
                                    </tr>
                                    </thead>
                                </Table>
                            </div>
                        </Tab>
                        <Tab eventKey="Mash" title="Mash">
                            Some homie Info
                        </Tab>

                        <Tab eventKey="Water Calc" title="Water Calc">
                            Wut
                        </Tab>
                    </Tabs></Col>
                    <Col>
                        <Button size="sm" block>Add Grain</Button>
                        <Button size="sm" block>Add Hops</Button>
                        <Button size="sm" block>Add Misc</Button>
                        <Button size="sm" block>Add Yeast</Button>
                        <Button size="sm" block>Add Water</Button>
                        <Button size="sm" block>Edit</Button>
                        <Button size="sm" block>Delete</Button>
                        <Button size="sm" block>I don't know</Button>
                    </Col>
                </Row>
                <Row>
                    <Col>Recipe Infos, ABV, IBU, total weight</Col>
                </Row>
            </Container>
        </div>
    )

}