import React, { useState, useEffect } from 'react';
import MyForm from '../Components/MyForm';
import { Button, Col, Form, Row } from 'react-bootstrap';
import FadeIn from 'react-fade-in/lib/FadeIn';
import { VscError } from 'react-icons/vsc';
import df from '../Datafunctions/Datafunctions';

function Admin(props) {
  const [optionSelected, setOptionSelected] = useState(false);
  const [isAdd, setIsAdd] = useState(false);
  const [isDel, setIsDel] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showX, setShowX] = useState(false);
  const [user, setUser] = useState('');
  const [pw, setPw] = useState('');

  console.log(isLoggedIn);

  const handleClick = (string) => {
    switch (string) {
      case 'Add':
        setIsAdd(true);
        break;
      case 'Delete':
        setIsDel(true);
        break;
      default:
        setIsAdd(false);
        break;
    }
    setOptionSelected(true);
  };

  const handleChange = (e, input) => {
    e.preventDefault();
    if (input === 'pw') {
      setPw(e.target.value);
    } else {
      setUser(e.target.value);
    }
  };

  const handleLogin = () => {
    let userinfo = { user: user, pw: pw };
    df.getUser(userinfo).then((res) => {
      if (res.data) {
        setIsLoggedIn(true);
      } else {
        setShowX(true);
        setTimeout(() => {
          setShowX(false);
        }, 3000);
      }
    });
  };

  if (isLoggedIn) {
    if (!optionSelected) {
      return (
        <div id="add">
          <h5
            style={{
              maxWidth: '40vw',
              marginLeft: 'auto',
              marginRight: 'auto',
              borderRadius: '10px',
              padding: '5px',
            }}
          >
            Select what you want to do:
          </h5>
          <div id="formbuttons">
            <Button variant="success" onClick={() => handleClick('Add')}>
              Add
            </Button>
            <Button variant="danger" onClick={() => handleClick('Delete')}>
              Delete / Modify
            </Button>
          </div>
        </div>
      );
    }
    if (optionSelected) {
      return (
        <MyForm
          isAdd={isAdd}
          setIsAdd={setIsAdd}
          setOptionSelected={setOptionSelected}
          isDel={isDel}
          setIsDel={setIsDel}
          columns={props.columns}
        />
      );
    }
  } else {
    return (
      <Form id="loginForm">
        <Form.Group className="mb-3" controlId="user">
          <Form.Label>Username:</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter user"
            onChange={(e) => handleChange(e, 'user')}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            onChange={(e) => handleChange(e, 'pw')}
          />
        </Form.Group>
        <Row>
          <Col xs={6}>
            <Button onClick={() => handleLogin()} variant="primary">
              Log In
            </Button>
          </Col>
          <Col>
            {showX && (
              <FadeIn>
                <VscError id="error" />
              </FadeIn>
            )}
          </Col>
        </Row>
      </Form>
    );
  }
}

export default Admin;
