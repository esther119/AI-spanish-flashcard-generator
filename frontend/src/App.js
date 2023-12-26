import { useEffect, useState } from "react";

function App() {
  const [backendData, setBackendData] = useState(null);

  useEffect(() => {
    fetch("/test")
      .then((res) => res.json())
      .then((data) => {
        setBackendData(data);
      }, console.log(backendData));
  }, []);
  return (
    <div className="App">
      <h1>App</h1>
      {typeof backendData === "undefined" ? (
        <p>Loading...</p>
      ) : (
        <p>{backendData}</p>
      )}
    </div>
  );
}

export default App;
