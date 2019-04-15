import React, { useState } from "react";

function App() {
  const [phrase, setPhrase] = useState("");
  const [result, setResult] = useState(null);

  function handleSubmit(e) {
    e.preventDefault();

    setResult(
      phrase
        .toUpperCase()
        .trim()
        .split(" ")
        .join("👏")
    );
  }

  async function copyResult() {
    await navigator.clipboard.writeText(result);

    alert("Copied text to clipboard");
  }

  return (
    <div className="app">
      <h1>Clapify</h1>

      <form onSubmit={handleSubmit}>
        <div>
          <input
            type="text"
            name="phrase"
            placeholder="Enter some stuff to clapify"
            value={phrase}
            onChange={e => setPhrase(e.target.value)}
          />
        </div>

        <div>
          <input type="submit" value="Clapify me, Cap'n" />
        </div>
      </form>

      {result ? (
        <>
          <p>{result}</p>
          <button onClick={copyResult}>Copy Text</button>
        </>
      ) : null}
    </div>
  );
}

export default App;
