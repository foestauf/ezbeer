import React from "react";
import { Row, Col } from "react-bootstrap";
import { IngredientViewProps } from "./types";

export const IngredientView = (props: IngredientViewProps) => {
    const { quantity, name, type } = props;
    return (
        <Row>
            <Col>{quantity}</Col>

            <Col>{name}</Col>
            <Col>{type}</Col>
            <Col></Col>
            <Col />
            <Col />
            <Col />
        </Row>
    );
};
