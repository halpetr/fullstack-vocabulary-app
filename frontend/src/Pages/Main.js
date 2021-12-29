import React, { useState, useEffect } from 'react';
import { Container } from 'react-bootstrap';

function Main(props) {
  return (
    <div id="main">
      {props.vocab.map((voc, index) => (
        <Container key={index}>
          <ul>
            <li>
              word: {voc.fi_word} - tags: {voc.tags}
            </li>
          </ul>
        </Container>
      ))}
    </div>
  );
}

export default Main;
