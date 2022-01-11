import React, { useState, useEffect } from 'react';
import MyForm from '../Components/MyForm';
import { Form, Button } from 'react-bootstrap';

function AddWords() {
  const [optionSelected, setOptionSelected] = useState(false);
  const [buttonPressed, setButtonPressed] = useState('');
  const [isAdd, setIsAdd] = useState(false);
  const [isDel, setIsDel] = useState(false);
  const [isMod, setIsMod] = useState(false);

  const handleClick = (string) => {
    console.log(string);
    switch (string) {
      case 'Add':
        setIsAdd(true);
        break;
      case 'Delete':
        setIsDel(true);
        break;
      case 'Modify':
        setIsMod(true);
        break;
      default:
        setIsAdd(false);
        break;
    }
    setButtonPressed(string);
    setOptionSelected(true);
  };

  if (!optionSelected) {
    return (
      <div id="myform">
        <h5
          style={{
            backgroundColor: 'white',
            maxWidth: '40vw',
            marginLeft: 'auto',
            marginRight: 'auto',
            borderRadius: '10px',
          }}
        >
          Select what you want to do:
        </h5>
        <div id="formbuttons">
          <Button variant="success" onClick={() => handleClick('Add')}>
            Add a word
          </Button>
          <Button variant="danger" onClick={() => handleClick('Delete')}>
            Delete a word
          </Button>
          <Button variant="info" onClick={() => handleClick('Modify')}>
            Modify a word
          </Button>
        </div>
      </div>
    );
  }
  if (optionSelected) {
    return <MyForm buttonPressed={buttonPressed} />;
  }
}

export default AddWords;
