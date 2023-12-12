import React, { useEffect, useState } from 'react';
import axios from 'axios';
import LogOutButton from './LogOutButton'; // Assuming you have a LogOutButton component


function CuisineCheckboxList({ selectedcuisines, setSelectedcuisines }) {
  const [cuisines, setcuisines] = useState([
      { name: 'african', label: 'African', checked: false },
      { name: 'asian', label: 'Asian', checked: false },
      { name: 'american', label: 'American', checked: false },
      { name: 'british', label: 'British', checked: false },
      { name: 'cajun', label: 'Cajun', checked: false },
      { name: 'caribbean', label: 'Caribbean', checked: false },
      { name: 'chinese', label: 'Chinese', checked: false },
      { name: 'eastern_european', label: 'Eastern European', checked: false },
      { name: 'european', label: 'European', checked: false },
      { name: 'french', label: 'French', checked: false },
      { name: 'german', label: 'German', checked: false },
      { name: 'greek', label: 'Greek', checked: false },
      { name: 'indian', label: 'Indian', checked: false },
      { name: 'irish', label: 'Irish', checked: false },
      { name: 'italian', label: 'Italian', checked: false },
      { name: 'japanese', label: 'Japanese', checked: false },
      { name: 'jewish', label: 'Jewish', checked: false },
      { name: 'korean', label: 'Korean', checked: false },
      { name: 'latin_american', label: 'Latin American', checked: false },
      { name: 'mediterranean', label: 'Mediterranean', checked: false },
      { name: 'mexican', label: 'Mexican', checked: false },
      { name: 'middle_eastern', label: 'Middle Eastern', checked: false },
      { name: 'nordic', label: 'Nordic', checked: false },
      { name: 'southern', label: 'Southern', checked: false },
      { name: 'spanish', label: 'Spanish', checked: false },
      { name: 'thai', label: 'Thai', checked: false },
      { name: 'vietnamese', label: 'Vietnamese', checked: false },
  ]);

  const handleButtonClick = (index) => {
    const updatedCuisines = [...cuisines];
    updatedCuisines[index].active = !updatedCuisines[index].active;
    setcuisines(updatedCuisines);

    // Update the selectedCuisines state based on the active cuisines
    const selected = updatedCuisines.filter((cuisine) => cuisine.active).map((cuisine) => cuisine.name);
    setSelectedcuisines(selected);
  };

  useEffect(() => {
    const selectedcuisinesString = cuisines
      .filter((cuisine) => cuisine.checked)
      .map((cuisine) => cuisine.label)
      .join(', ');

    setSelectedcuisines(selectedcuisinesString);
  }, [cuisines, setSelectedcuisines]);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100vh', fontFamily: 'helvetica' }}>
      <h2>Choose Cuisines</h2>
      <div>
        {cuisines.map((cuisine, index) => (
          <button
            key={index}
            onClick={() => handleButtonClick(index)}
            style={{ margin: '5px', backgroundColor: cuisine.active ? 'lightblue' : 'white' }}
          >
            {cuisine.label}
          </button>
        ))}
      </div>
    </div>
  );
}


function SearchPage() {

  const [recipes, setRecipes] = useState([]);
  const [selectedcuisines, setSelectedcuisines] = useState('');

  

  useEffect(() => {
    // Make a GET request to the Flask backend
    axios.get('http://localhost:5000/get_spoonacular_recipes')
      .then(response => {
        // Update the state with the fetched recipes
        setRecipes(response.data.recipes);
      })
      .catch(error => {
        console.error('Error fetching recipes:', error);
      });
  }, []);

  return (
  <div style={{ margin: '0', padding: '0', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100vh', fontFamily: 'helvetica' }}>
    <LogOutButton />
    <h1>Search For Recipes</h1>
    <CuisineCheckboxList selectedcuisines={selectedcuisines} setSelectedcuisines={setSelectedcuisines} />
    <form>
      <input type="text" name="searchFor" id="searchFor" />
      {/* <input type="button" id="searchBtn" value="Search" /> */}
    </form>
    <div id="recipeImages"> </div>
    {/* Call to back end to access Spoonacular API */}
  </div>
);
};

export default SearchPage;