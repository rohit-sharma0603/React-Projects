import React, { useState } from "react";
import "./App.css"; 

export default function App() {
  const [name, setName] = useState("");
  const [gender, setGender] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  async function genderPrediction() {
    setIsLoading(true);
    setGender(null)
    try {
      const response = await fetch(`https://api.genderize.io/?name=${name}`);
      const data = await response.json();
      setGender(data.gender);
    } catch (error) {
      console.error('Error fetching gender prediction:', error);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="container">
      <div className="input-container">
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Please enter your first name"
        />
        <button onClick={genderPrediction}>Let's Try</button>
      </div>
      {isLoading && <p className="loading-message">I am predicting...</p>}
      {gender && <p className="gender-message">Gender: <span>{gender}</span></p>}
    </div>
  );
}
