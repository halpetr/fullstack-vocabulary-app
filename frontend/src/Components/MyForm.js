import React, { useState, useEffect } from 'react';
import { Form, Button, Nav, Row, Col, Dropdown } from 'react-bootstrap';
import df from '../Datafunctions/Datafunctions';
import AddForm from './Forms/AddForm';
import DelForm from './Forms/DelForm';

function MyForm(props) {
  const [langs, setLangs] = useState([]);
  const [dbTags, setDbTags] = useState([]);
  console.log(props.columns);
  console.log(dbTags);

  useEffect(() => {
    df.getAllDifferentTags().then((res) => setDbTags(res));
  }, []);

  const getLanguages = () => {
    let n = [];
    props.columns.forEach((col) => {
      if (
        col['column_name'].includes('ish') ||
        col['column_name'].includes('ian')
      ) {
        let m = col['column_name'].split('_');
        n.push(m[0]);
      }
    });
    setLangs(n);
  };

  const handleClose = () => {
    props.setOptionSelected(false);
    props.setIsAdd(false);
    props.setIsDel(false);
  };

  // If props.isAdd is true, then return this form and on
  // Add button click post the data to database.
  if (props.isAdd) {
    return <AddForm handleClose={handleClose} />;
  }

  // If props.isDel is true, then return this form
  if (props.isDel) {
    return (
      <DelForm
        getLanguages={getLanguages}
        langs={langs}
        dbTags={dbTags}
        handleClose={handleClose}
      />
    );
  }
}

export default MyForm;
