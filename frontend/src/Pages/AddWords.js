import React, { useState, useEffect } from 'react';
import MyForm from '../Components/MyForm';
import { Button } from 'react-bootstrap';

function AddWords(props) {
  const [optionSelected, setOptionSelected] = useState(false);
  const [isAdd, setIsAdd] = useState(false);
  const [isDel, setIsDel] = useState(false);

  const handleClick = (string) => {
    console.log(string);
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
}

export default AddWords;
