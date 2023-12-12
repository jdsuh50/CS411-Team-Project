
import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import LogOutButton from './LogOutButton';
import axios from 'axios';

function DietCheckboxList({ selectedDiets, setSelectedDiets }) {
  const [diets, setDiets] = useState([
    { name: 'gluten free', label: 'gluten free', checked: false },
    { name: 'vegetarian', label: 'vegetarian', checked: false },
    { name: 'vegan', label: 'vegan', checked: false },
    { name: 'pescetarian', label: 'pescetarian', checked: false },
    { name: 'paleo', label: 'paleo', checked: false },
  ]);

  const handleDietCheckboxChange = (index) => {
    setDiets((prevDiets) => {
      const newDiets = [...prevDiets];
      newDiets[index].checked = !newDiets[index].checked;
      return newDiets;
    });
  };

  useEffect(() => {
    const selectedDietsString = diets
      .filter((diet) => diet.checked)
      .map((diet) => diet.label)
      .join(', ');

    setSelectedDiets(selectedDietsString);
  }, [diets, setSelectedDiets]);

  return (
    <div>
      <h2>Select Your Diets</h2>
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

  const handleIntoleranceCheckboxChange = (index) => {
    setIntolerances((prevIntolerances) => {
      const newIntolerances = [...prevIntolerances];
      newIntolerances[index].checked = !newIntolerances[index].checked;
      return newIntolerances;
    });
  };

  useEffect(() => {
    const selectedIntolerancesString = intolerances
      .filter((intolerance) => intolerance.checked)
      .map((intolerance) => intolerance.label)
      .join(', ');

    setSelectedIntolerances(selectedIntolerancesString);
  }, [intolerances, setSelectedIntolerances]);

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
    </div>
  );
}

function AddressForm({ onSaveAddress }) {
  const [addressData, setAddressData] = useState({
    address: '',
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setAddressData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSaveAddress = () => {
    onSaveAddress(addressData.address);
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
  const [selectedDiets, setSelectedDiets] = useState('');
  const [selectedIntolerances, setSelectedIntolerances] = useState('');
  const [selectedAddress, setSelectedAddress] = useState('');

  const handleSaveAddress = (address) => {
    setSelectedAddress(address);
  };

  const handleSaveChanges = () => {
    const userId = 130 /* retrieve the user's ID */;
    const email = "albertz@bu.edu" /* retrieve the user's email */;
  
    const userData = {
      userId: userId,
      email: email,
      diets: selectedDiets ? selectedDiets.split(", ") : [],
      //intolerances: selectedIntolerances ? selectedIntolerances.split(", ") : [],
      address: selectedAddress || 'None'
    };
    console.log(userData);
  
    // Make HTTP POST request to Flask server
    axios.post('http://127.0.0.1:5000/store_preferences', userData)
    .then(response => {
      console.log('Response from server:', response.data);
    })
    .catch(error => {
      console.error('Error:', error);
    });
  };
  

  return (
    <div className="YourProfilePage" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100vh', fontFamily: 'helvetica' }}>
      <LogOutButton />
      <DietCheckboxList selectedDiets={selectedDiets} setSelectedDiets={setSelectedDiets} />
      <IntoleranceCheckboxList selectedIntolerances={selectedIntolerances} setSelectedIntolerances={setSelectedIntolerances} />
      <AddressForm onSaveAddress={handleSaveAddress} />
      <button type="button" onClick={handleSaveChanges}>
        Save Changes
      </button>
    </div>
  );
}

// Added by Albert
// function to send user preferences to SQL database
function sendUserPreferences(userId, email, diets, intolerances, address) {
  console.log('Sending user preferences:', { userId, email, diets, intolerances, address });
  
  axios.post('http://127.0.0.1:5000/store_preferences', {
    userId,
    email,
    diets,
    intolerances,
    address,
  })
  .then(response => {
    console.log('Response from server:', response.data);
  })
  .catch(error => {
    console.error('Error:', error);
  });
}

export default YourProfilePage;