import { useEffect, useState } from "react";
import FlashCardList from "./flashCardList";

function App() {
  const [imageData, setImageData] = useState(null);

  useEffect(() => {
    console.log("useEffect");
    fetch("/displayImages")
      .then((res) => res.json())
      .then((data) => {
        setImageData(data);
      });
  }, []);
  return (
    <div className="App">
      <h1>App</h1>
      {imageData === undefined || imageData === null ? (
        <p>Loading...</p>
      ) : (
        <FlashCardList imageData={imageData} />
      )} 
    </div>
  );
}

export default App;
