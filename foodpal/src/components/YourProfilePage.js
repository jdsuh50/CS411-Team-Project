
import React, { useState } from 'react';

function DietCheckboxList() {
  // State to manage diet checkbox values
  const [diets, setDiets] = useState([
    { name: 'glutenFree', label: 'Gluten Free', checked: false },
    { name: 'vegetarian', label: 'Vegetarian', checked: false },
    { name: 'vegan', label: 'Vegan', checked: false },
    { name: 'pescetarian', label: 'Pescetarian', checked: false },
    { name: 'paleo', label: 'Paleo', checked: false },
  ]);

  // Event handler for diet checkbox changes
  const handleDietCheckboxChange = (index) => {
    setDiets((prevDiets) => {
      const newDiets = [...prevDiets];
      newDiets[index].checked = !newDiets[index].checked;
      return newDiets;
    });
  };

  return (
    <div>
      <h2>Select your Diet(s)</h2>
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
        <h3>Selected Diets:</h3>
        <ul>
          {diets.map((diet) => (
            <li key={diet.name}>
              {diet.name}: {diet.checked ? 'Selected' : 'Not Selected'}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default DietCheckboxList;