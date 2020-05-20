import React, {useReducer, useState} from "react";
import {Container} from "react-bootstrap";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";

const initialState = {
    fermVol: 10,
    dillution: 200,
    cellConc: 1.0,
    densSlurry: 1.1
}

const yeastReducer = (state, action) => {
    switch (action.type) {
        case 'FERMVOL':
            return {...state, fermVol: action.payload};
        case 'GRAVITY':
            return {...state, gravity: action.payload};
        case 'CELLCONC':
            return {...state, cellConc: action.payload};
        case 'DENSSLURRY':
            return {...state, densSlurry: action.payload};
        case 'NUMSQUARES':
            return {...state, numSquares: action.payload};
        case 'DILLUTION':
            return {...state, dillution: action.payload};
        case 'LIVECELLS':
            return {...state, liveCells: action.payload, cellsCounted: action.payload * state.deadCells}
        case 'DEADCELLS':
            return {...state, deadCells: action.payload, cellsCounted: action.payload * state.liveCells}
        default:
            throw new Error('WTF OVER')
    }
}

const YeastCalculator = () => {
    const [state, dispatch] = useReducer(yeastReducer, initialState);
    return (
        <Container style={{marginTop: "30px"}} id="yeast-calc">
            <Row>
                <Col className="input">Yellow Cells are inputs</Col>
                <Col className="output">Blue Cells are calculated</Col>
            </Row>
            <Row>
                <Col className="leftAnchor-col">
                    <Row className="topRow">Fermentation Volume (in BBL)</Row>
                    <Row className="input btmCol">
                        <Form.Control value={state.fermVol}
                                      onChange={e => dispatch({
                                          type: 'FERMVOL',
                                          payload: Number(e.target.value)
                                      })} size="sm" type="text"/></Row>
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
                    <Row className="input">
                        <Form.Control onChange={e => dispatch({
                            type: 'GRAVITY',
                            payload: Number(e.target.value)
                        })} size="sm"
                                      type="text"/></Row>
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
                    <Row className="input">
                        <Form.Control value={state.cellConc}
                                      onChange={e => dispatch({
                                              type: 'CELLCONC',
                                              payload: Number(e.target.value)
                                          }
                                      )} size="sm"
                                      type="text"/></Row>
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
                    <Row className="input">
                        <Form.Control value={state.densSlurry}
                                      onChange={e => dispatch({
                                          type: 'DENSSLURRY',
                                          payload: Number(e.target.value)
                                      })} size="sm"
                                      type="text"/></Row>
                </Col>
                <Col>
                    <Row>This is the density of the slury being pitched. This can be measured of if unknown go with
                        1.1g/mL</Row>
                </Col>
                <InfoCell title="Total Cells Counted" value={state.cellsCounted}/>
                <Col>
                    <Row className="topRow"># of Squares Counted</Row>
                    <Row className="input">
                        <Form.Control value={state.numSquares} onChange={e => dispatch({
                            type: 'NUMSQUARES',
                            payload: Number(e.target.value)
                        })} size="sm"
                                                         type="text"/></Row>
                </Col>
                <Col>
                    <Row className="topRow">Dilution</Row>
                    <Row className="input">
                        <Form.Control value={state.dillution}
                                      onChange={e => dispatch({
                                          type: 'DILLUTION',
                                          payload: Number(e.target.value)
                                      })} size="sm"
                                                         type="text"/></Row>
                </Col>
                <Col>
                    <Row className="topRow">Live Cells Counted</Row>
                    <Row className="input">
                        <Form.Control value={state.liveCells}
                                      onChange={e => dispatch({
                                          type: 'LIVECELLS',
                                          payload: Number(e.target.value)
                                      })} size="sm"
                                                         type="text"/></Row>
                </Col>
                <Col>
                    <Row className="topRow">Dead Cells Counted</Row>
                    <Row className="input">
                        <Form.Control value={state.deadCells}
                                      onChange={e => dispatch({
                                          type: 'DEADCELLS',
                                          payload: Number(e.target.value)
                                      })} size="sm"
                                                         type="text"/></Row>
                </Col>
                <InfoCell title="% Viability (Do not pitch under 90%)"/>
            </Row>
        </Container>
    )
}

const InfoCell = (props) => {
    return (
        <Col>
            <Row className="topRow">{props.title}</Row>
            <Row className="output">
                <Form.Control size="sm" type="text" readOnly placeHolder="-"
                                                  value={props.value}/></Row>
        </Col>
    )
}

export default YeastCalculator;