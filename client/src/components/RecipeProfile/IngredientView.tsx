import React from 'react';
import { Row, Col, Button } from 'react-bootstrap';
import { IngredientViewProps } from './types';

export const IngredientView = (props: IngredientViewProps) => {
  const { quantity, name, type } = props;
  return (
    <Row>
      <Col>
        <Button>View</Button>
      </Col>
      <Col>{name}</Col>
      <Col>{quantity}</Col>

      <Col>{type}</Col>
      <Col />
      <Col />
      <Col />
      <Col />
    </Row>
  );
};
