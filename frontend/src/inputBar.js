import React, { useState, useEffect } from "react";

function SpanishInput({imageData, setImageData}) {
  const [inputValue, setInputValue] = useState("");
  //   const [response, setResponse] = useState('');
  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };
  // useEffect(() => {
  //   // This effect will run whenever imageData changes
  //   console.log("Updated imageData:", imageData);
  // }, [imageData]); // Only run the effect when imageData changes

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent the default form submission behavior

    try {
      const response = await fetch("/addSpanishWord", {
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
      console.log("new flahscard data", responseData);
      const spanishWord = responseData.flashcard.originalSpanishWord;
      const imageLink = responseData.flashcard.finalImageLink;

      // Update the state
      const updatedData = { ...imageData };
      updatedData[spanishWord] = imageLink;
      setImageData(updatedData);

      // console.log("updated imageData", imageData);      
    } catch (error) {
      console.error("Error sending data to the backend:", error);
    }
  }
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label htmlFor="spanishInput">Add a Spanish word flashcard:</label>
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
