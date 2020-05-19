import React from "react";
import {Container} from "react-bootstrap";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";

const yeastCalculator = () => {
    return (
        <Container style={{marginTop: "30px"}} id="yeast-calc">
            <Row>
                <Col className="input">Yellow Cells are inputs</Col>
                <Col className="output">Blue Cells are calculated</Col>
            </Row>
            <Row>
                <Col className="leftAnchor-col">
                    <Row className="topRow">Fermentation Volume (in BBL)</Row>
                    <Row className="input btmCol"><Form.Control size="sm" type="text"/></Row>
                </Col>
                <Col>This is size of equipment</Col>
                <InfoCell title="Cell Count (Cells/ML)"/>
                <InfoCell title="Fermentation Volume"/>
                <InfoCell title="Fermentation Volume (mL)"/>
                <InfoCell title="Desired Cell Concentration (Cells/Ml-P)"/>
                <InfoCell title="Desired Cell Concentration (Cells/mL)"/>
                <InfoCell title="Total # Cells for Pitch"/>
            </Row>
            <Row>
                <Col className="leftAnchor-col">
                    <Row className="topRow">Desired Gravity</Row>
                    <Row className="input"><Form.Control size="sm" type="text"/></Row>
                </Col>
                <Col>This is the expected gravity of the beer being pitched into</Col>
                <InfoCell title="Volume of Slurry Needed (mL)"/>
                <InfoCell title="Volume of Slurry needed (L)"/>
                <InfoCell title="Volume of Slurry Needed (Gal)"/>
                <InfoCell title="Mass of slurry Needed(g)"/>
                <InfoCell title="Mass of slurry needed (KG)"/>
                <InfoCell title="Mass of slurry needed (lb)"/>
            </Row>
            <Row>
                <Col className="leftAnchor-col">
                    <Row className="topRow">Desired Cell concentration (Cells/mL x 1E6)</Row>
                    <Row className="input"><Form.Control size="sm" type="text"/></Row>
                </Col>
                <Col>This is the desired concentration of cells/mL</Col>
                <Col className="leftAnchor-col" md={9}>
                    <Row className="topRow"></Row>
                    <Row style={{display: "inline"}}>Hemocytometer cell count</Row>
                </Col>
            </Row>
            <Row>
                <Col className="leftAnchor-col">
                    <Row className="topRow">Density of Slurry (g/mL)</Row>
                    <Row className="input"><Form.Control size="sm" type="text"/></Row>
                </Col>
                <Col>
                    <Row>This is the density of the slury being pitched. This can be measured of if unknown go with
                        1.1g/mL</Row>
                </Col>
                <InfoCell title="Total Cells Counted"/>
                <Col>
                    <Row className="topRow"># of Squared Counted</Row>
                    <Row className="input"><Form.Control size="sm" type="text"/></Row>
                </Col>
                <Col>
                    <Row className="topRow">Dilution</Row>
                    <Row className="input"><Form.Control size="sm" type="text"/></Row>
                </Col>
                <Col>
                    <Row className="topRow">Live Cells Counted</Row>
                    <Row className="input"><Form.Control size="sm" type="text"/></Row>
                </Col>
                <Col>
                    <Row className="topRow">Dead Cells Counted</Row>
                    <Row className="input"><Form.Control size="sm" type="text"/></Row>
                </Col>
                <InfoCell title="% Viability (Do not pitch under 90%)" calc="0"/>
            </Row>
        </Container>
    )
}

const InfoCell = (props) => {
    return (
        <Col>
            <Row className="topRow">{props.title}</Row>
            <Row className="output"><Form.Control size="sm" type="text" disabled={true} placeHolder={props.calc}/></Row>
        </Col>
    )
}

export default yeastCalculator;