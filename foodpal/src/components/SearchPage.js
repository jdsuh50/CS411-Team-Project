import React, { useEffect, useState } from 'react';
import axios from 'axios';
import LogOutButton from './LogOutButton'; // Assuming you have a LogOutButton component


function CuisineCheckboxList({ selectedcuisines, setSelectedcuisines }) {
  const [cuisines, setcuisines] = useState([
    { name: 'african', label: 'African', active: false },
    { name: 'asian', label: 'Asian', active: false },
    { name: 'american', label: 'American', active: false },
    { name: 'british', label: 'British', active: false },
    { name: 'cajun', label: 'Cajun', active: false },
    { name: 'caribbean', label: 'Caribbean', active: false },
    { name: 'chinese', label: 'Chinese', active: false },
    { name: 'eastern_european', label: 'Eastern European', active: false },
    { name: 'european', label: 'European', active: false },
    { name: 'french', label: 'French', active: false },
    { name: 'german', label: 'German', active: false },
    { name: 'greek', label: 'Greek', active: false },
    { name: 'indian', label: 'Indian', active: false },
    { name: 'irish', label: 'Irish', active: false },
    { name: 'italian', label: 'Italian', active: false },
    { name: 'japanese', label: 'Japanese', active: false },
    { name: 'jewish', label: 'Jewish', active: false },
    { name: 'korean', label: 'Korean', active: false },
    { name: 'latin_american', label: 'Latin American', active: false },
    { name: 'mediterranean', label: 'Mediterranean', active: false },
    { name: 'mexican', label: 'Mexican', active: false },
    { name: 'middle_eastern', label: 'Middle Eastern', active: false },
    { name: 'nordic', label: 'Nordic', active: false },
    { name: 'southern', label: 'Southern', active: false },
    { name: 'spanish', label: 'Spanish', active: false },
    { name: 'thai', label: 'Thai', active: false },
    { name: 'vietnamese', label: 'Vietnamese', active: false },
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
      .filter((cuisine) => cuisine.active)
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

  // handle Image Click:
  const handleImageClick = (recipeId) => {
    // Make HTTP POST request to your server
    axios.post('http://127.0.0.1:5000/recipe_click', { id: recipeId })
      .then(response => {
        console.log('Response from server:', response.data);
      })
      .catch(error => {
        console.error('Error:', error);
      });
  };

  const [recipes, setRecipes] = useState([]);
  const [selectedcuisines, setSelectedcuisines] = useState('');

  const recipeRequest = () => {
    const userData = {
      cuisines: selectedcuisines.split(", "),
    };
    console.log(userData);

    // Make HTTP POST request to Flask server
    axios.post('http://127.0.0.1:5000/get_spoonacular_recipes', userData)
      .then(response => {
        console.log('Response from server:', response.data);
        setRecipes(response.data.recipes);
        console.log('Recipes: ', recipes);
      })
      .catch(error => {
        console.error('Error:', error);
      });
  };

  return (
    <div style={{ margin: '0', padding: '0', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100vh', fontFamily: 'helvetica' }}>
      <LogOutButton />
      <h1>Search For Recipes</h1>
      <CuisineCheckboxList selectedcuisines={selectedcuisines} setSelectedcuisines={setSelectedcuisines} />
      <button type="button" onClick={recipeRequest}>
        let's eat.
      </button>
      {/* <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '10px' }}>
        {recipes.map((recipe, index) => (
          <img key={index} src={recipe.image} alt={recipe.title} />
        ))}
      </div> */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px', padding: '20px' }}>
        {recipes.map((recipe, index) => (
          <button key={index} onClick={() => handleImageClick(recipe.id)} style={{ border: 'none', background: 'none', textAlign: 'center' }}>
            <img src={recipe.image} alt={recipe.title} style={{ width: '100%', height: 'auto', borderRadius: '10px', boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)' }} />
            <p>{recipe.title}</p>
          </button>
        ))}
      </div>
    </div>
  );
};

export default SearchPage;