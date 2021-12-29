import React from 'react';
import { Container } from 'react-bootstrap';

function List(props) {
  return (
    <div>
      {props.selectedLangs.map((word, index) => (
        <Container key={index}>
          <ul id="list">
            Russian
            <li>{word.ru_word}</li>
            Swedish
            <li>{word.sv_word}</li>
          </ul>
        </Container>
      ))}
    </div>
  );
}

export default List;
