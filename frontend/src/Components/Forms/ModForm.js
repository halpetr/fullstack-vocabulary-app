import React from 'react';
import {
  Form,
  Button,
  Nav,
  Row,
  Col,
  Dropdown,
  Table,
  Modal,
} from 'react-bootstrap';

function ModForm(props) {
  const closeMod = () => {
    props.handleClose();
    props.setShowMod(false);
  };

  console.log(props.showMod);

  return (
    <Modal show={props.showMod}>
      <Modal.Body>
        <Form id="modform">
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Modify</Form.Label>
            <Form.Control type="text" placeholder="intial" />
            <Form.Text className="text-muted">
              We'll never share your email with anyone else.
            </Form.Text>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" placeholder="Password" />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicCheckbox">
            <Form.Check type="checkbox" label="Check me out" />
          </Form.Group>
          <Button variant="primary" type="submit">
            Submit
          </Button>
          <Button onClick={() => closeMod()} variant="primary">
            Go back
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
}

export default ModForm;
