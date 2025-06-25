import React, { useState } from 'react';
import axios from 'axios';
import './DictionaryApp.css';

const DictionaryApp = () => {
  const [word, setWord] = useState('');
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');

  const fetchDefinition = async () => {
    if (!word) return;
    setError('');
    setResult(null);

    try {
      const res = await axios.get(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`);
      setResult(res.data[0]);
    } catch (err) {
      setError('Word not found. Please try another one.');
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    fetchDefinition();
  };

  return (
    <div className="dictionary-app">
      <h2>📘 Dictionary App</h2>
      <form onSubmit={handleSearch} className="dictionary-form">
        <input
          type="text"
          placeholder="Enter a word..."
          value={word}
          onChange={(e) => setWord(e.target.value)}
        />
        <button type="submit">Search</button>
      </form>

      {error && <p className="error">{error}</p>}

      {result && (
        <div className="definition-card">
          <h3>{result.word}</h3>
          {result.phonetics[0]?.text && <p>🔊 {result.phonetics[0].text}</p>}

          {result.meanings.map((meaning, idx) => (
            <div key={idx} className="meaning">
              <h4>{meaning.partOfSpeech}</h4>
              <ul>
                {meaning.definitions.map((def, i) => (
                  <li key={i}>
                    {def.definition}
                    {def.example && <div className="example">💬 {def.example}</div>}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default DictionaryApp;
