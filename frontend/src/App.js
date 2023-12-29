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
        setImageData(data);
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
