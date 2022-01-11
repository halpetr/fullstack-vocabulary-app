import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';

function MyForm(props) {
  return (
    <Form id="form">
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>{props.buttonPressed}</Form.Label>
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
    </Form>
  );
}

export default MyForm;
