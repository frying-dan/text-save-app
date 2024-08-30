import React from 'react';
import { Input } from '../styles/styledComponents';

const TextInput = ({ value, onChange, wordCount }) => {
  return (
    <div>
      <Input
        value={value}
        onChange={onChange}
        placeholder="Type your text here..."
      />
      <p>Word count: {wordCount}</p>
    </div>
  );
};

export default TextInput;