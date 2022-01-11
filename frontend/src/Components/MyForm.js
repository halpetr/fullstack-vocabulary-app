import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import df from '../Datafunctions/Datafunctions';

function MyForm(props) {
  const [eng, setEng] = useState('');
  const [fi, setFi] = useState('');
  const [swe, setSwe] = useState('');
  const [ru, setRu] = useState('');
  const [tags, setTags] = useState('');
  const [canAdd, setCanAdd] = useState(false);

  const handleChange = (e, lang) => {
    switch (lang) {
      case 'eng':
        setEng(e.target.value);
        break;
      case 'fi':
        setFi(e.target.value);
        break;
      case 'swe':
        setSwe(e.target.value);
        break;
      case 'ru':
        setRu(e.target.value);
        break;
      case 'tags':
        setTags(e.target.value);
        setCanAdd(true);
        if (e.target.value === '') {
          setCanAdd(false);
        }
        break;
      default:
        break;
    }
  };

  const addWord = () => {
    let word = {
      tags: tags,
      English: eng,
      Finnish: fi,
      Swedish: swe,
      Russian: ru,
    };
    console.log(word);
    df.postNewWord(word);
  };

  // If props.isAdd is true, then return this form and on
  // Add button click post the data to database.
  if (props.isAdd) {
    return (
      <Form id="form">
        <Form.Label>
          <h3>Add a word and at least one translation</h3>
        </Form.Label>
        <Form.Group className="mb-3" controlId="eng">
          <Form.Label>Tags:</Form.Label>
          <Form.Control
            onChange={(e) => handleChange(e, 'tags')}
            type="text"
            placeholder="tags (must input)"
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="eng">
          <Form.Label>English:</Form.Label>
          <Form.Control
            onChange={(e) => handleChange(e, 'eng')}
            type="text"
            placeholder="word (can be left empty)"
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="fi">
          <Form.Label>Finnish:</Form.Label>
          <Form.Control
            onChange={(e) => handleChange(e, 'fi')}
            type="text"
            placeholder="sana (can be left empty)"
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="swe">
          <Form.Label>Swedish:</Form.Label>
          <Form.Control
            onChange={(e) => handleChange(e, 'swe')}
            type="text"
            placeholder="ord (can be left empty)"
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="ru">
          <Form.Label>Russian:</Form.Label>
          <Form.Control
            onChange={(e) => handleChange(e, 'ru')}
            type="text"
            placeholder="слово (can be left empty)"
          />
        </Form.Group>
        <Button disabled={!canAdd} onClick={() => addWord()} variant="success">
          Add
        </Button>
      </Form>
    );
  }

  // If props.isDel is true, then return this form
  if (props.isDel) {
    return (
      <Form id="form">
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Delete</Form.Label>
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
  if (props.isMod) {
    return (
      <Form id="form">
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
      </Form>
    );
  }
}

export default MyForm;
