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
  const [modAll, setModAll] = useState(false);
  const [modItem, setModItem] = useState({});
  const [singleItem, setSingleItem] = useState('');
  const [eng, setEng] = useState('');
  const [fi, setFi] = useState('');
  const [swe, setSwe] = useState('');
  const [ru, setRu] = useState('');
  const [tags, setTags] = useState('');

  useEffect(() => {
    df.getById(props.wordId).then((res) => setWordData(res));
    setActiveItem('Select to modify');
  }, [props.wordId]);

  useEffect(() => {
    let res = [];
    res.push('Modify All');
    for (const item of wordData) {
      for (let i in item) {
        if (i === 'tags') {
          res.push('Tags');
        } else if (i !== 'id') {
          res.push(i);
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
        switch (key) {
          case 'English':
            setEng(value);
            break;
          case 'Finnish':
            setFi(value);
            break;
          case 'Swedish':
            setSwe(value);
            break;
          case 'Russian':
            setRu(value);
            break;
          case 'tags':
            setTags(value);
            break;
          default:
            break;
        }
      });
      return k;
    });
    setTableItems(arr);
    setItems(res);
  }, [wordData]);

  const handleSelect = (item) => {
    let it = items.filter((i) => item !== i);
    if (item === 'Modify All') {
      setModAll(true);
    } else {
      setModAll(false);
    }
    setUnUsed(it);
    setActiveItem(item);
    if (it.length !== items.length) {
      setIsItemSelected(true);
    }
  };

  const closeMod = () => {
    props.setShowMod(false);
  };

  const handleSingleChange = (e) => {
    e.preventDefault();
    setSingleItem(e.target.value);
    if (activeItem === 'Tags') {
      setModItem({
        id: props.wordId,
        column: 'tags',
        value: e.target.value,
      });
    } else {
      setModItem({
        id: props.wordId,
        column: activeItem,
        value: e.target.value,
      });
    }
  };

  const handleModAllChange = (e, lang) => {
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
        break;
      default:
        break;
    }
  };

  const handleModify = () => {
    if (activeItem === 'Modify All') {
      let body = {
        id: props.wordId,
        tags: tags,
        English: eng,
        Finnish: fi,
        Swedish: swe,
        Russian: ru,
      };
      df.modifyAllValues(body).then((res) => {
        let newWD = [res];
        setWordData(newWD);
      });
    } else {
      df.modifyOneValue(modItem.id, modItem.column, modItem.value).then(
        (res) => {
          let { column, value } = res;
          wordData[0][column] = value;
          let newData = [wordData[0]];
          setWordData(newData);
        }
      );
      setSingleItem('');
    }
  };

  return (
    <Modal id="modal" show={props.showMod}>
      <Modal.Body>
        <Form id="modform">
          <Form.Group className="mb-3" controlId="table-dropmenu">
            <Form.Label>
              Word to modify is: <b>{props.word}</b>
            </Form.Label>

            <Table
              striped
              bordered
              style={{ textAlign: 'center', fontSize: '90%' }}
            >
              <thead>
                <tr>
                  <th>Title:</th>
                  <th>Data:</th>
                </tr>
              </thead>
              <tbody>{tableItems.map((ti) => ti)}</tbody>
            </Table>
            <Form.Label>
              <h5> Select part to modify:</h5>
            </Form.Label>
            <Dropdown className="mb-3">
              <Dropdown.Toggle variant="info">{activeItem}</Dropdown.Toggle>
              <Dropdown.Menu variant="info">
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
            {!modAll && (
              <Form.Control
                type="text"
                disabled={!isItemSelected}
                placeholder="new value"
                value={singleItem}
                onChange={(e) => handleSingleChange(e)}
              />
            )}
            {modAll && (
              <>
                <Form.Group className="mb-1" controlId="eng">
                  <Form.Label>Tags:</Form.Label>
                  <Form.Control
                    onChange={(e) => handleModAllChange(e, 'tags')}
                    value={tags}
                    type="text"
                    placeholder="tags"
                  />
                </Form.Group>

                <Form.Group className="mb-1" controlId="eng">
                  <Form.Label>English:</Form.Label>
                  <Form.Control
                    onChange={(e) => handleModAllChange(e, 'eng')}
                    value={eng}
                    type="text"
                    placeholder="word"
                  />
                </Form.Group>

                <Form.Group className="mb-1" controlId="fi">
                  <Form.Label>Finnish:</Form.Label>
                  <Form.Control
                    onChange={(e) => handleModAllChange(e, 'fi')}
                    value={fi}
                    type="text"
                    placeholder="sana"
                  />
                </Form.Group>

                <Form.Group className="mb-1" controlId="swe">
                  <Form.Label>Swedish:</Form.Label>
                  <Form.Control
                    onChange={(e) => handleModAllChange(e, 'swe')}
                    value={swe}
                    type="text"
                    placeholder="ord"
                  />
                </Form.Group>

                <Form.Group className="mb-1" controlId="ru">
                  <Form.Label>Russian:</Form.Label>
                  <Form.Control
                    onChange={(e) => handleModAllChange(e, 'ru')}
                    value={ru}
                    type="text"
                    placeholder="слово"
                  />
                </Form.Group>
              </>
            )}
          </Form.Group>

          <Button onClick={() => handleModify()} id="mod-btn" variant="info">
            Modify
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
