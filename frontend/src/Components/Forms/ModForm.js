import React, { useEffect, useState } from 'react';
import { Form, Button, Modal, Dropdown, Table } from 'react-bootstrap';
import df from '../../Datafunctions/Datafunctions';

function ModForm(props) {
  const [wordData, setWordData] = useState([]);
  const [items, setItems] = useState([]);
  const [unUsed, setUnUsed] = useState([]);
  const [activeItem, setActiveItem] = useState('');
  const [isItemSelected, setIsItemSelected] = useState(false);
  const [tableItems, setTableItems] = useState([]);

  useEffect(() => {
    df.getById(props.wordId).then((res) => setWordData(res));
    setActiveItem('Select to modify');
  }, [props.wordId]);

  useEffect(() => {
    let res = [];
    for (const item of wordData) {
      for (let i in item) {
        if (i === 'tags') {
          res.push('Tags');
        } else if (i !== 'id') {
          res.push(i + ' word');
        }
      }
    }
    let arr = [];
    arr = wordData.map((wd) => {
      let k = [];
      Object.keys(wd).forEach((key) => {
        let value = wd[key];
        if (key !== 'id') {
          k.push(
            <tr key={key}>
              <td>{key}</td>
              <td>{value}</td>
            </tr>
          );
        }
      });
      return k;
    });
    setTableItems(arr);
    setItems(res);
  }, [wordData]);

  const handleSelect = (item) => {
    let it = items.filter((i) => item !== i);
    setUnUsed(it);
    setActiveItem(item);
    if (it.length !== items.length) {
      setIsItemSelected(true);
    }
  };

  const closeMod = () => {
    props.setShowMod(false);
  };

  return (
    <Modal id="modal" show={props.showMod}>
      <Modal.Body>
        <Form id="modform">
          <Form.Label>
            <h5> Select what to modify:</h5>
          </Form.Label>
          <Form.Group className="mb-3" controlId="table-dropmenu">
            <Form.Label>
              Word selected is: <b>{props.word}</b>
            </Form.Label>

            <Table striped bordered style={{ textAlign: 'center' }}>
              <thead>
                <tr>
                  <th>Word:</th>
                  <th>Data:</th>
                </tr>
              </thead>
              <tbody>{tableItems.map((ti) => ti)}</tbody>
            </Table>

            <Dropdown className="mb-3">
              <Dropdown.Toggle>{activeItem}</Dropdown.Toggle>
              <Dropdown.Menu variant="dark">
                {!isItemSelected &&
                  items.map((item, index) => {
                    return (
                      <Dropdown.Item
                        onClick={() => handleSelect(item)}
                        key={index}
                      >
                        {item}
                      </Dropdown.Item>
                    );
                  })}
                {isItemSelected &&
                  unUsed.map((uitem, index) => {
                    return (
                      <Dropdown.Item
                        onClick={() => handleSelect(uitem)}
                        key={index}
                      >
                        {uitem}
                      </Dropdown.Item>
                    );
                  })}
              </Dropdown.Menu>
            </Dropdown>
            {isItemSelected && <Form.Label>{activeItem}:</Form.Label>}
            <Form.Control
              type="text"
              disabled={isItemSelected}
              placeholder="new value"
            />
          </Form.Group>

          <Button variant="primary" type="submit">
            Submit
          </Button>
          <Button onClick={() => closeMod()} variant="primary">
            Close
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
}

export default ModForm;
