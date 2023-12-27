import React, { useState } from 'react';

function SpanishInput() {
  const [inputValue, setInputValue] = useState('');
  const [response, setResponse] = useState('');

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleSendToBackend = () => {
    // Create a new FormData object and append the input value to it
    const formData = new FormData();
    formData.append('spanishWord', inputValue);
    console.log('formData', formData);

    // Make an HTTP POST request to the backend using the fetch API
    fetch('/spanishInput', {
      method: 'POST',
      body: formData,
    })
      .then((response) => {
        console.log('response', response);
        if (!response.ok) {
          console.error('Network response status:', response.status);
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => {
        // Handle the response from the backend
        setResponse(data.translation);
      })
      .catch((error) => {
        // Handle errors, e.g., display an error message
        console.error('Error sending data to the backend:', error);
      });
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
      <button onClick={handleSendToBackend}>Send to Backend</button>
      <p>You entered: {inputValue}</p>
      {response && <p>Translation: {response}</p>}
    </div>
  );
}

export default SpanishInput;
