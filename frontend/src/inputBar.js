import React, { useState } from 'react';

function SpanishInput() {
  const [inputValue, setInputValue] = useState('');

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  return (
    <div>
      <label htmlFor="spanishInput">Enter a Spanish word:</label>
      <input
        type="text"
        id="spanishInput"
        value={inputValue}
        onChange={handleInputChange}
        placeholder="Enter a Spanish word"
      />
      <p>You entered: {inputValue}</p>
    </div>
  );
}

export default SpanishInput;
