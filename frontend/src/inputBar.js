import React, { useState } from "react";

function SpanishInput() {
  const [inputValue, setInputValue] = useState("");
  //   const [response, setResponse] = useState('');
  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent the default form submission behavior

    try {
      const response = await fetch("/spanishInput", {
        method: "POST",
        headers: {
          "Content-Type": "application/json", // Set the content type to JSON
        },
        body: JSON.stringify({ word: inputValue }), // Convert data to JSON string
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      // If you expect a JSON response from the server, you can parse it like this:
      const responseData = await response.json();
      console.log("Response from server:", responseData);
    } catch (error) {
      console.error("Error sending data to the backend:", error);
    }
  };
  // const response = await result.json()
  // console.log('response', response)
  //       .then((response) => {
  //         console.log('response', response.body);
  //         if (!response.ok) {
  //           console.error('Network response status:', response.status);
  //           throw new Error('Network response was not ok');
  //         }
  //         return response.json();
  //       })
  //       .then((data) => {
  //         // Handle the response from the backend
  //         setResponse(data);
  //       })
  //       .catch((error) => {
  //         // Handle errors, e.g., display an error message
  //         console.error('Error sending data to the backend:', error);
  //       });
  //   };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label htmlFor="spanishInput">Enter a Spanish word:</label>
        <input
          type="text"
          id="spanishInput"
          value={inputValue}
          onChange={handleInputChange}
          placeholder="Enter a Spanish word"
        />
        <button type="submit">Submit</button> {/* Add a submit button */}
      </form>
    </div>
  );
}

export default SpanishInput;
