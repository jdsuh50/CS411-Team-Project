import React from 'react';
import frontEnd from './frontEnd'; // Assuming frontEnd.js is in the same directory as this component

function SearchRecipes() {
  const callAPI = () => {
    // Add your API call logic here using the frontEnd module
    // For example, frontEnd.callAPI();
  };

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
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100vh', fontFamily: 'helvetica' }}>
      <head>
        <title>search For recipes.</title>
      </head>

      <body>
        <LogOutButton />
        <h1>Search For Recipes</h1>

        <form>
          <input type="text" name="searchFor" id="searchFor" />
          <input type="button" onClick={callAPI} id="searchBtn" value="Search" />
        </form>

        <div id="recipeImages"> </div>
        {/* Call to back end to access Spoonacular API */}
      </body>
    </div>
  );
};

export default SearchRecipes;