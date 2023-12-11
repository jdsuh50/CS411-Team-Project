
import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";

function DietCheckboxList() {
  // State to manage diet checkbox values
  const [diets, setDiets] = useState([
    { name: 'gluten free', label: 'gluten free', checked: false },
    { name: 'vegetarian', label: 'vegetarian', checked: false },
    { name: 'vegan', label: 'vegan', checked: false },
    { name: 'pescetarian', label: 'pescetarian', checked: false },
    { name: 'paleo', label: 'paleo', checked: false },
  ]);

  // State to manage selected diets as a string
  const [selectedDietsString, setSelectedDietsString] = useState('');

  // Event handler for diet checkbox changes
  const handleDietCheckboxChange = (index) => {
    setDiets((prevDiets) => {
      const newDiets = [...prevDiets];
      newDiets[index].checked = !newDiets[index].checked;
      return newDiets;
    });
  };

  // Update selectedDietsString based on the selected diets
  useEffect(() => {
    const selectedDiets = diets
      .filter((diet) => diet.checked)
      .map((diet) => diet.label)
      .join(', ');

    setSelectedDietsString(selectedDiets);
  }, [diets]);

  // Log selected diets to the console
  useEffect(() => {
    console.log('selected diets:', selectedDietsString);
  }, [selectedDietsString]);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100vh', fontFamily: 'helvetica'}}>
      <h1>visit the <Link to="/search">search</Link> page...</h1> 
        
      <h2>select your preferences.</h2>
      <form>
        {diets.map((diet, index) => (
          <div key={index}>
            <label>
              {diet.label}:
              <input
                type="checkbox"
                name={diet.name}
                checked={diet.checked}
                onChange={() => handleDietCheckboxChange(index)}
              />
            </label>
          </div>
        ))}
      </form>

      <div>
        <h3>preferences.</h3>
        <ul>
          {diets.map((diet) => (
            <li key={diet.name}>
              {diet.name}: {diet.checked ? 'yep' : 'nope'}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default DietCheckboxList;