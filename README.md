Video Demenstration: https://drive.google.com/file/d/1zeMIkrjqBAdM5yYN20H53iyx9Is_Hw96/view?usp=sharing

WELCOME TO FOODPAL!
This repository contains all the files for our project. Here are some pointers to help you find your way as you look around. 
1. The frontend is entirely housed in the foodpal folder. The pages themselves are in foodpal/src/components.
2. The BackEnd folder contains a file called app.py. This houses all of our api calls, as well as functions that write and read information to the database.
4. FoodPal.sql in BackEnd houses our schema for the database. It has tables for user accounts and recipes.



RUNNING THE SOFTWARE
Start by running the app.py on a localhost/root/5000, then use the npm start command to boot up the front end. Finally, use sql workbench to run the schema.


BACKEND PROCESSES
1. after the user selects their desired cuisines and their dietary restrictions, the frontend sends those query parameters to the backend
2. the backend uses Spoonacular API to search for recipes based on the user prefrences and returns matching recipes to frontend
3. frontend displays recipe images and names and the user selects one they like
4. once the user selects a recipe they like the backend runs another Spoonacular call to get the instructions and ingredients and displays them on the frontend
5. if the user clicks on the place their order button, the recipe ID is sent to the backend
6. the backend then uses a webdriver and the users address to find a list of stores that are on doordash's website and close to the addresss
7. another webdriver is then opened to search for the ingredients in the recipe at the closest store near them
8. before doing this there is a function to match each spoonacular category to a doordash category because each store has a specific url for the categories (i.e. "produce", "meat and fish")
9. once the webdriver completes matching each item in the recipe to an item in the store, the doordash api is used to place the order
10. also, we use a google maps api to get the address of the closest store with the stores name because that information is not publicly availible on doordash
11. once the order is placed, the tracking order url is then sent back to the front end in the form of a hyperlink
