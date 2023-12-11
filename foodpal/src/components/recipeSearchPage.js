
//import frontEnd from './frontEnd'; // Assuming frontEnd.js is in the same directory as this component
import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import LogOutButton from './LogOutButton';

const cuisines = [
  "African", "Asian", "American", "British", "Cajun", "Caribbean", "Chinese",
  "Eastern European", "European", "French", "German", "Greek", "Indian", "Irish",
  "Italian", "Japanese", "Jewish", "Korean", "Latin American", "Mediterranean",
  "Mexican", "Middle Eastern", "Nordic", "Southern", "Spanish", "Thai", "Vietnamese"
];

function CuisineSelector() {
  const [selectedCuisines, setSelectedCuisines] = useState([]);

  const handleCuisineClick = (cuisine) => {
    // Toggle the selected state of the cuisine
    setSelectedCuisines((prevSelected) => {
      if (prevSelected.includes(cuisine)) {
        // If already selected, remove it
        return prevSelected.filter((selected) => selected !== cuisine);
      } else {
        // If not selected, add it
        return [...prevSelected, cuisine];
      }
    });
  };

  const logSelectedCuisines = () => {
    // Log the selected cuisines as a string
    console.log('Selected Cuisines:', selectedCuisines.join(', '));
  };

  return (
    <div>
      <h1>Cuisine Selector</h1>
      <div className="cuisine-grid">
        {cuisines.map((cuisine) => (
          <button
            key={cuisine}
            type="button"
            onClick={() => handleCuisineClick(cuisine)}
            style={{ backgroundColor: selectedCuisines.includes(cuisine) ? 'green' : 'gray' }}
          >
            {cuisine}
          </button>
        ))}
      </div>

      <button type="button" onClick={logSelectedCuisines}>
        Log Selected Cuisines
      </button>
    </div>
  );
}

function SearchRecipes() {
  const callAPI = () => {
    // Add your API call logic here using the frontEnd module
    // For example, frontEnd.callAPI();
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100vh', fontFamily: 'helvetica'}}>
      <head>
        <title>search For recipes.</title>
      </head>

      <body>
        <LogOutButton />
        <CuisineSelector />
        
      </body>
    </div>
  );
};

export default SearchRecipes;