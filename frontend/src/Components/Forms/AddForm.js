import React, { useState } from 'react';
import { Form, Button, Row, Col } from 'react-bootstrap';
import FadeIn from 'react-fade-in';
import { BsCheckCircleFill } from 'react-icons/bs';
import df from '../../Datafunctions/Datafunctions';

function AddForm(props) {
  const [eng, setEng] = useState('');
  const [fi, setFi] = useState('');
  const [swe, setSwe] = useState('');
  const [ru, setRu] = useState('');
  const [tags, setTags] = useState('');
  const [canAdd, setCanAdd] = useState(false);
  const [success, setSuccess] = useState(false);

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
    df.postNewWord(word).then((res) => {
      if (res === 'success') {
        setSuccess(true);
        setTags('');
        setEng('');
        setFi('');
        setSwe('');
        setRu('');
        setTimeout(() => {
          setSuccess(false);
        }, 3000);
      }
    });
  };

  return (
    <Form id="form">
      <Form.Label>
        <h3>Add a word and at least one translation</h3>
      </Form.Label>
      <Form.Group className="mb-3" controlId="eng">
        <Form.Label>Tags:</Form.Label>
        <Form.Control
          onChange={(e) => handleChange(e, 'tags')}
          value={tags}
          type="text"
          placeholder="tags (must input)"
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="eng">
        <Form.Label>English:</Form.Label>
        <Form.Control
          onChange={(e) => handleChange(e, 'eng')}
          value={eng}
          type="text"
          placeholder="word (can be left empty)"
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="fi">
        <Form.Label>Finnish:</Form.Label>
        <Form.Control
          onChange={(e) => handleChange(e, 'fi')}
          value={fi}
          type="text"
          placeholder="sana (can be left empty)"
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="swe">
        <Form.Label>Swedish:</Form.Label>
        <Form.Control
          onChange={(e) => handleChange(e, 'swe')}
          value={swe}
          type="text"
          placeholder="ord (can be left empty)"
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="ru">
        <Form.Label>Russian:</Form.Label>
        <Form.Control
          onChange={(e) => handleChange(e, 'ru')}
          value={ru}
          type="text"
          placeholder="слово (can be left empty)"
        />
      </Form.Group>

      <Row>
        <Col xs={1}>
          <Button
            disabled={!canAdd}
            onClick={() => addWord()}
            variant="success"
          >
            Add
          </Button>
        </Col>
        <Col xs={3}>
          {success && (
            <FadeIn>
              <div>
                <BsCheckCircleFill id="addcheck" />
              </div>
            </FadeIn>
          )}
        </Col>
        <Col>
          <Button onClick={() => props.handleClose()} variant="primary">
            Go back
          </Button>
        </Col>
      </Row>
    </Form>
  );
}

export default AddForm;
