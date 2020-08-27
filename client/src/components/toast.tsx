import React, { ReactElement } from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Toast from 'react-bootstrap/Toast';

const Toaster = (props: any): ReactElement => {
  const { onHide, recipeName, show } = props;
  return (
    <div
      aria-live="polite"
      aria-atomic="true"
      style={{
        position: 'absolute',
        bottom: '1%',
        right: '1%',
      }}
    >
      <Row>
        <Col>
          <Toast show={show} onClose={onHide} delay={3000} autohide animation>
            <Toast.Header>
              <img src="" className="rounded mr-2" alt="" />
              <strong className="mr-auto">Bootstrap</strong>
            </Toast.Header>
            <Toast.Body>Recipe &quot;{recipeName}&quot; update complete</Toast.Body>
          </Toast>
        </Col>
      </Row>
    </div>
  );
};

export default Toaster;
