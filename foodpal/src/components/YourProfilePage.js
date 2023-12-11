
import React, { useState, useEffect } from 'react';

function DietCheckboxList() {
  // State to manage diet checkbox values
  const [diets, setDiets] = useState([
    { name: 'glutenFree', label: 'Gluten Free', checked: false },
    { name: 'vegetarian', label: 'Vegetarian', checked: false },
    { name: 'vegan', label: 'Vegan', checked: false },
    { name: 'pescetarian', label: 'Pescetarian', checked: false },
    { name: 'paleo', label: 'Paleo', checked: false },
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
    console.log('Selected Diets:', selectedDietsString);
  }, [selectedDietsString]);

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

function IntoleranceCheckboxList() {
  // State to manage intolerance checkbox values
  const [intolerances, setIntolerances] = useState([
    { name: 'dairy', label: 'Dairy', checked: false },
    { name: 'egg', label: 'Egg', checked: false },
    { name: 'gluten', label: 'Gluten', checked: false },
    { name: 'grain', label: 'Grain', checked: false },
    { name: 'peanut', label: 'Peanut', checked: false },
    { name: 'seafood', label: 'Seafood', checked: false },
    { name: 'sesame', label: 'Sesame', checked: false },
    { name: 'shellfish', label: 'Shellfish', checked: false },
    { name: 'soy', label: 'Soy', checked: false },
    { name: 'sulfite', label: 'Sulfite', checked: false },
    { name: 'treeNut', label: 'Tree Nut', checked: false },
    { name: 'wheat', label: 'Wheat', checked: false },
  ]);

  // State to manage selected diets as a string
  const [selectedIntolerancesString, setSelectedIntolerancesString] = useState('');

  // Event handler for diet checkbox changes
  const handleIntoleranceCheckboxChange = (index) => {
    setIntolerances((prevIntolerances) => {
      const newIntolerances = [...prevIntolerances];
      newIntolerances[index].checked = !newIntolerances[index].checked;
      return newIntolerances;
    });
  };

  // Update selectedDietsString based on the selected diets
  useEffect(() => {
    const selectedIntolerances = intolerances
      .filter((intolerance) => intolerance.checked)
      .map((intolerance) => intolerance.label)
      .join(', ');

    setSelectedIntolerancesString(selectedIntolerances);
  }, [intolerances]);

  // Log selected diets to the console
  useEffect(() => {
    console.log('Selected Intolerances:', selectedIntolerancesString);
  }, [selectedIntolerancesString]);

  return (
    <div>
      <h2>Select Your Intolerance(s)</h2>
      <form>
        {intolerances.map((intolerance, index) => (
          <div key={index}>
            <label>
              {intolerance.label}:
              <input
                type="checkbox"
                name={intolerance.name}
                checked={intolerance.checked}
                onChange={() => handleIntoleranceCheckboxChange(index)}
              />
            </label>
          </div>
        ))}
      </form>

      <div>
        <h3>Selected Intolerances:</h3>
        <ul>
          {intolerances.map((intolerance) => (
            <li key={intolerance.name}>
              {intolerance.name}: {intolerance.checked ? 'Selected' : 'Not Selected'}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

function AddressForm() {
  // State to manage form data
  const [addressData, setAddressData] = useState({
    address: '',
  });

  // Event handler for input changes
  const handleChange = (event) => {
    const { name, value } = event.target;
    setAddressData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Event handler for "Save Address" button click
  const handleSaveAddress = () => {
    // Log the address to the console
    console.log('Address:', addressData.address);
  };

  return (
    <div>
      <h2>Enter your Address:</h2>
      <form>
        <label>
          <input
            type="text"
            name="address"
            value={addressData.address}
            onChange={handleChange}
            placeholder="Enter your address"
          />
        </label>

        <br />

        <button type="button" onClick={handleSaveAddress}>
          Save Address
        </button>
      </form>
    </div>
  );
}

function YourProfilePage() {
  return (
    <div className="YourProfilePage">
      <DietCheckboxList />
      <IntoleranceCheckboxList />
      <AddressForm />
    </div>
  )
}

export default YourProfilePage;