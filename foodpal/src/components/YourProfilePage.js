
import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import LogOutButton from './LogOutButton';

function DietCheckboxList({ selectedDiets, setSelectedDiets }) {
  // State to manage diet checkbox values
  const [diets, setDiets] = useState([
    { name: 'gluten free', label: 'Gluten Free', checked: false },
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

  useEffect(() => {
    // Update selectedDietsString based on the selected diets
    const selectedDietsString = diets
      .filter((diet) => diet.checked)
      .map((diet) => diet.label)
      .join(', ');

    setSelectedDiets(selectedDietsString);
  }, [diets, setSelectedDiets]);

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
    </div>
  );
}

function IntoleranceCheckboxList({ selectedIntolerances, setSelectedIntolerances }) {
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

  /// Event handler for intolerance checkbox changes
  const handleIntoleranceCheckboxChange = (index) => {
    setIntolerances((prevIntolerances) => {
      const newIntolerances = [...prevIntolerances];
      newIntolerances[index].checked = !newIntolerances[index].checked;
      return newIntolerances;
    });
  };

  useEffect(() => {
    // Update selectedIntolerancesString based on the selected intolerances
    const selectedIntolerancesString = intolerances
      .filter((intolerance) => intolerance.checked)
      .map((intolerance) => intolerance.label)
      .join(', ');

    setSelectedIntolerances(selectedIntolerancesString);
  }, [intolerances, setSelectedIntolerances]);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100vh', fontFamily: 'helvetica'}}>
      <h2>select your intolerances.</h2>
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
    </div>
  );
}

function AddressForm({ onSaveAddress }) {
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

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100vh', fontFamily: 'helvetica' }}>
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
      </form>
    </div>
  );
}

function YourProfilePage() {
  const [selectedDiets, setSelectedDiets] = useState('');
  const [selectedIntolerances, setSelectedIntolerances] = useState('');
  const [selectedAddress, setSelectedAddress] = useState('');

  // Callback function to handle saving address data
  const handleSaveAddress = (address) => {
    setSelectedAddress(address);
  };

  const handleSaveChanges = () => {
    const logMessage = `Diets: ${selectedDiets || 'None'}, Intolerances: ${selectedIntolerances || 'None'}, Address: ${selectedAddress || 'None'}`;
    console.log(logMessage);
  };

  return (
    <div className="YourProfilePage" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100vh', fontFamily: 'helvetica' }}>
      <LogOutButton />
      <DietCheckboxList setSelectedDiets={setSelectedDiets} />
      <IntoleranceCheckboxList setSelectedIntolerances={setSelectedIntolerances} />
      <AddressForm onSaveAddress={handleSaveAddress} />
      <button type="button" onClick={handleSaveChanges}>
        Save Changes
      </button>
    </div>
  );
}

export default YourProfilePage;