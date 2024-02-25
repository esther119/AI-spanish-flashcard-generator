import { useEffect, useState } from "react";
import FlashCardList from "./flashCardList";
import SpanishInput from "./inputBar";

function App() {
  const [imageData, setImageData] = useState(null);
  const backendUrl = process.env.REACT_APP_BACKEND_URL;
  useEffect(() => {
    console.log("useEffect");
    fetch(`${backendUrl}/displayImages`)
      .then((res) => res.json())
      .then((data) => {
        // console.log("data", data);
        // Convert the object into an array of objects
        const updatedData = Object.keys(data).map((key) => {
          // Log each key and value
          // console.log(`display image word: ${key}, URL: ${data[key]}`);
          return {
            word: key,
            imageLink: data[key],
            isLoading: false,
          };
        });
        setImageData(updatedData);
      });
  }, []);

  return (
    <div className="App">
      <h1>App</h1>
      <SpanishInput imageData={imageData} setImageData={setImageData} />
      {imageData === undefined || imageData === null ? (
        <p>Loading...</p>
      ) : (
        <FlashCardList imageData={imageData} />
      )}
    </div>
  );
}

export default App;
