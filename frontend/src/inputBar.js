import React from "react";
import SearchBar from "./SearchBar";

function SpanishInput({ imageData, setImageData }) {
  const callBackend = async (inputValue) => {
    const backendUrl = process.env.REACT_APP_BACKEND_URL;

    try {
      const oldSpanishWord = inputValue;
      console.log("oldSpanishWord", oldSpanishWord);
      const updatedData = { ...imageData };
      updatedData[inputValue] = {
        word: oldSpanishWord,
        imageLink: "",
        isLoading: true,
      };
      setImageData(updatedData);
      const response = await fetch(`${backendUrl}/addSpanishWord`, {
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
      console.log("fininish generation, is loading is false now");
      // Update the state
      setImageData((prevData) => ({
        ...prevData,
        [inputValue]: {
          word: spanishWord,
          imageLink: imageLink,
          isLoading: false,
        },
      }));

      // console.log("updated imageData", imageData);
    } catch (error) {
      console.error("Error sending data to the backend:", error);
    }
  };
  return (
    <div>
      <SearchBar submission={callBackend} />
    </div>
  );
}

export default SpanishInput;
