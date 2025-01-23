import React, { useState } from 'react';
import './App.css';

const App = () => {
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");
  const [bmiValue, setBmiValue] = useState("");
  const [bmiResult, setBmiResult] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [gender, setGender] = useState("male");
  const [savedResults, setSavedResults] = useState([]);

  const calculateBMI = () => {
    const heightNum = parseFloat(height);
    const weightNum = parseFloat(weight);

    if (isNaN(heightNum) || isNaN(weightNum) || heightNum <= 0 || weightNum <= 0) {
      setErrorMessage("Please enter valid height and weight!");
      setBmiValue("");
      setBmiResult("");
      return;
    }

    setErrorMessage("");
    const bmi = (weightNum / ((heightNum / 100) * (heightNum / 100))).toFixed(2);
    setBmiValue(bmi);

    if (bmi < 19) {
      setBmiResult("Underweight");
    } else if (bmi >= 19 && bmi <= 25) {
      setBmiResult("Normal");
    } else {
      setBmiResult("Overweight");
    }
  };

  const resetForm = () => {
    setHeight("");
    setWeight("");
    setBmiValue("");
    setBmiResult("");
    setErrorMessage("");
  };

  const saveResult = () => {
    if (bmiValue) {
      const newResult = {
        bmiValue,
        bmiResult,
        height,
        weight,
        gender,
        date: new Date().toLocaleString(),
      };
      setSavedResults([...savedResults, newResult]);
    }
  };

  // Function to delete a specific saved result
  const deleteResult = (indexToDelete) => {
    const updatedResults = savedResults.filter((_, index) => index !== indexToDelete);
    setSavedResults(updatedResults);
  };

  return (
    <div className="container">
      <h2>BMI Calculator</h2>

      {errorMessage && <p className="error-message">{errorMessage}</p>}

      <div className="input-group">
        <label htmlFor="gender">Gender:</label>
        <select
          id="gender"
          value={gender}
          onChange={(e) => setGender(e.target.value)}
        >
          <option value="male">Male</option>
          <option value="female">Female</option>
        </select>
      </div>

      <div className="input-group">
        <label htmlFor="height">Height (cm):</label>
        <input
          type="number"
          id="height"
          value={height}
          placeholder="Enter your height"
          onChange={(e) => setHeight(e.target.value)}
        />
      </div>

      <div className="input-group">
        <label htmlFor="weight">Weight (kg):</label>
        <input
          type="number"
          id="weight"
          value={weight}
          placeholder="Enter your weight"
          onChange={(e) => setWeight(e.target.value)}
        />
      </div>

      <div className="button-group">
        <button onClick={calculateBMI}>Calculate</button>
        <button onClick={saveResult}>Save Result</button>
        <button className="reset-button" onClick={resetForm}>
          Reset
        </button>
      </div>

      <div className="result-section">
        {bmiValue && <p>Your BMI Value: {bmiValue}</p>}
        {bmiResult && <p>Result: {bmiResult}</p>}
      </div>

      <div className="bmi-chart">
        <h3>BMI Ranges</h3>
        <ul>
          <li>Underweight: Less than 19</li>
          <li>Normal: 19 - 25</li>
          <li>Overweight: Greater than 25</li>
        </ul>
      </div>

      {savedResults.length > 0 && (
        <div className="saved-results">
          <h3>Saved Results</h3>
          <ul>
            {savedResults.map((result, index) => (
              <li key={index}>
                <p>
                  <strong>{result.date}</strong>: BMI {result.bmiValue} ({result.bmiResult}) -{" "}
                  {result.gender}, Height: {result.height} cm, Weight: {result.weight} kg
                </p>
                <button onClick={() => deleteResult(index)}>Delete</button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default App;
