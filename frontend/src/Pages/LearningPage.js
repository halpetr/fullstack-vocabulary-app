import React, { useState } from 'react';
import { Dropdown, DropdownButton } from 'react-bootstrap';

function LearningPage() {
  const [lang, setLang] = useState('');
  return (
    <DropdownButton
      title="Languages"
      style={{ alignItems: 'center' }}
      id="button"
    >
      <Dropdown.Item> English - Finnish </Dropdown.Item>
      <Dropdown.Item> English - Russian </Dropdown.Item>
      <Dropdown.Item> English - Finnish </Dropdown.Item>
    </DropdownButton>
  );
}

export default LearningPage;
