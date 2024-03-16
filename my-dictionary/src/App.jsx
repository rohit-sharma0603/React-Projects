import React, { useEffect, useState } from 'react';

function App() {
  const [word, setWord] = useState('');
  const [definitions, setDefinitions] = useState([]);
    
  useEffect(()=>{
  async function fetchDefinition() {
    try {
      const response = await fetch(`https://api.urbandictionary.com/v0/define?term=${word}`);
      if (!response.ok) {
        throw new Error('Failed to load data');
      }
      const data = await response.json();
      setDefinitions(data.list);
    } catch (error) {
      console.error('Error fetching definition:', error);
      setDefinitions([]);
    }
    console.log(word.list)
  }
  fetchDefinition();
 }, [word]);

  return (
    <div>
      <input
        type='text'
        value={word}
        onChange={(e) => setWord(e.target.value)}
      />
      <button >Search</button>
      <ul>
        {definitions.map((definition, index) => (
          <li key={index}>{definition.definition}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;
