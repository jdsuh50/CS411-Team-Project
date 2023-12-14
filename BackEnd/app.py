# NEW BRANCH NEW WORKING CODE 6:56pm
# NEW NEW BRANCH NEW NEW WORKING CODE 8:12pm
import flask
from flask import Flask, Response, request, render_template, redirect, url_for
from flask.json import jsonify
from flaskext.mysql import MySQL
import flask_login
from datetime import date
from flask_cors import CORS
import requests

app = Flask(__name__)
# CORS(app, resources={
#     r"/store_user": {"origins": "http://localhost:3000"},
#     r"/store_preferences": {"origins": "http://localhost:3000"},
#     r"/get_spoonacular_recipes": {"origins": "http://localhost:3000"}})
CORS(app)
app.config["MYSQL_DATABASE_USER"] = 'root'
app.config["MYSQL_DATABASE_PASSWORD"] = 'Zcl957324'
app.config["MYSQL_DATABASE_DB"] = 'FoodPal'
app.config["MYSQL_DATABASE_HOST"] = 'localhost'

mysql = MySQL(app)

@app.route('/')
def home():
    conn = mysql.connect()
    cursor = conn.cursor()
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS users (
            id INT AUTO_INCREMENT PRIMARY KEY,
            username VARCHAR(50),
            password VARCHAR(50)
        )
    ''')
    conn.commit()
    return "Home Page"

@app.route('/get_spoonacular_recipes', methods=['POST'])
def get_spoonacular_recipes():
    data = request.json
    cuisines = ', '.join(data['cuisines'])

    conn = mysql.connect()
    cur = conn.cursor()
    # Fetch user diet and intolerances from SQL database:
    user_id = 5 # replace User_ID
    # Fetch diet
    cur.execute("SELECT diet FROM Preferences WHERE preference_id = %s", (user_id,))
    diet = cur.fetchone()
    # Fetch intolerances
    cur.execute("SELECT intolerance FROM Intolerances WHERE intolerance_id = %s", (user_id,))
    intolerances = cur.fetchone()
    
    # for Spoonacular API:
    api_key = '05d99aa28b05468aaa13ff6cb36e2412'
    # Specify the number of recipes to retrieve
    number_of_recipes = 3
    # Define the Spoonacular API endpoint
    api_url = f'https://api.spoonacular.com/recipes/complexSearch'
    # Specify parameters for the Spoonacular API request
    params = {
        'apiKey': api_key,
        'cuisine': cuisines,
        'diet': diet,
        'intolerances': intolerances,
        'number': number_of_recipes
    }
    
    # Make the API request to Spoonacular
    response = requests.get(api_url, params=params)
    response.raise_for_status()  # Check for errors
    
    # Extract and return the recipes from the response
    recipes = response.json()['results']
    return jsonify({'recipes': recipes})


@app.route('/recipe_click', methods=['POST'])
def recipe_click():
    data = request.get_json() # recipe ID
    print('HELLLLLLLLLLLLLLLLLLLLLL')
    print(data)
    instructions_ingredients = parse_recipe_instructions_and_ingredients(data['id'])
    ingredients = instructions_ingredients[0]
    # instructions = instructions_ingredients[1]
    return jsonify(instructions_ingredients)
    return data
    
    
@app.route('/insert')
def insert_user():
    conn = mysql.connect()
    cursor = conn.cursor()
    cursor.execute("INSERT INTO Users (user_id, password) VALUES (123, 'test_password')")
    conn.commit()
    return 'User inserted'


@app.route('/display')
def display_users():
    conn = mysql.connect()
    cursor = conn.cursor()
    cursor.execute("SELECT * FROM Users")
    data = cursor.fetchall()

    output = ''
    for row in data:
        user_id, first_name, last_name, email, dateOfBirth, hometown, gender, password = row
        output += f'User ID: {user_id}, First Name: {first_name}, Last Name: {last_name}, Email: {email}, Date of Birth: {dateOfBirth}, Hometown: {hometown}, Gender: {gender}, Password: {password}<br>'

    return output  # Return the processed data

@app.route('/displaypi')
def displaypi():
    conn = mysql.connect()
    cursor = conn.cursor()

    # Fetch and display data from the Preferences table
    cursor.execute("SELECT * FROM Preferences")
    preferences_data = cursor.fetchall()
    preferences_output = 'Preferences:<br>'
    for row in preferences_data:
        preferences_output += str(row) + '<br>'

    # Fetch and display data from the Intolerances table
    cursor.execute("SELECT * FROM Intolerances")
    intolerances_data = cursor.fetchall()
    intolerances_output = 'Intolerances:<br>'
    for row in intolerances_data:
        intolerances_output += str(row) + '<br>'

    return preferences_output + '<br>' + intolerances_output

# @app.route('/store_user', methods=['POST'])
# def store_user():
#     user_data = request.json
#     conn = mysql.connect()
#     cursor = conn.cursor()
#     cursor.execute("INSERT INTO users (username, email, ...) VALUES (%s, %s, ...)", 
#                    (user_data['username'], user_data['email'], ...))
#     conn.commit()
#     return 'User data stored in database'

# Testing: 
@app.route('/store_user', methods=['POST'])
def store_user():
    user_data = request.json
    first_name = user_data['first_name']
    last_name = user_data['last_name']
    email = user_data['email']
    conn = mysql.connect()
    cursor = conn.cursor()
    cursor.execute("INSERT INTO Users (first_name, last_name, email, dateOfBirth, hometown, gender, password) VALUES (%s, %s, %s, %s, %s, %s, %s)", 
                   (first_name, last_name, email, None, '', '', 'default_password'))
    conn.commit()
    return 'User email stored in database'

# Testing again: 
# @app.route('/store_user', methods=['POST'])
# def store_user():
#     user_data = request.json
#     first_name = user_data['first_name']
#     last_name = user_data['last_name']
#     email = user_data['email']
#     conn = mysql.connect()
#     cursor = conn.cursor()
    
#     # Check if email already exists
#     cursor.execute("SELECT * FROM Users WHERE email = %s", (email,))
#     existing_user = cursor.fetchone()
    
#     if existing_user:
#         return 'Email already in use'
#     else:
#         cursor.execute("INSERT INTO Users (first_name, last_name, email, dateOfBirth, hometown, gender, password) VALUES (%s, %s, %s, %s, %s, %s, %s)", 
#                        (first_name, last_name, email, None, '', '', 'default_password'))
#         conn.commit()
#         return 'User email stored in database'


# Note: Replace ... with the appropriate fields and user_data keys.

# For user preferences: 
@app.route('/store_preferences', methods=['POST'])
def store_preferences():
    user_data = request.json
    user_id = user_data['userId']
    email = user_data['email']
    diets = user_data['diets']
    intolerances = user_data['intolerances']
    address = user_data['address']
    conn = mysql.connect()
    cursor = conn.cursor()
    
    # Insert diets into Preferences table
    for diet in diets:
        cursor.execute("INSERT INTO Preferences (user_id, diet) VALUES (%s, %s)", 
                       (user_id, diet))
    
    # Insert intolerances into Intolerances table
    for intolerance in intolerances:
        cursor.execute("INSERT INTO Intolerances (user_id, intolerance) VALUES (%s, %s)", 
                       (user_id, intolerance))
    
    conn.commit()
    return 'User preferences and intolerances stored in database'

# Clear Data: 
@app.route('/clear_data', methods=['POST'])
def clear_data():
    conn = mysql.connect()
    cursor = conn.cursor()
    
    # Replace 'Users' with your table name
    cursor.execute("DELETE FROM Users")
    conn.commit()
    
    return 'All data cleared from the table'


def parse_recipe_instructions_and_ingredients(recipe_id):
    api_key = "5416db2b15e948ee9fe635cd660aeadf"


    # URL to get ingredient details from a specific recipe
    ingredients_url = f"https://api.spoonacular.com/recipes/{recipe_id}/ingredientWidget.json?apiKey={api_key}"
    # Making a GET request to the API
    ingredients_response = requests.get(ingredients_url)
    # Check if the request was successful
    ingredients = []
    # Parsing the JSON response
    ingredients_json = ingredients_response.json()


    # Iterating through each ingredient
    for ingredient in ingredients_json['ingredients']:
        # Extracting the ingredient name
        ingredient_name = ingredient['name']
        quantity = ingredient['amount']['us']['value']
        unit = ingredient['amount']['us']['unit']
        ingredients += [ingredient_name, quantity, unit]


    instructions_url = f"https://api.spoonacular.com/recipes/{recipe_id}/analyzedInstructions?apiKey={api_key}"
    instructions_response = requests.get(instructions_url)
    recipe_sections = instructions_response.json()
    parsed_data = {}
    # Iterate through each section in the recipe
    section_number = 1
    for section in recipe_sections:
        section_steps = section['steps']
       
        # Process each step in the current section
        for step in range(len(section_steps)):
            step_dic = section_steps[step]
            step_number = f"{section_number}.{step_dic['number']}"
            parsed_data[step_number] = step_dic['step']


            # Add the step number and instruction to the dictionary
        section_number+=1

    print(ingredients)
    print(parsed_data)
    return ingredients, parsed_data

if __name__ == '__main__':
    app.run(debug=True)



# Example usage
# id = "324694"
# parsed_recipe = parse_recipe_instructions_and_ingredients(id)
# print(parsed_recipe)

#This is the section for making delivery after user has selected recipe


#import dependencies
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.common.exceptions import NoSuchElementException
from selenium.common.exceptions import TimeoutException
import matplotlib.pyplot as plt
from IPython.display import Image, display
import requests
import googlemaps
import random
import time
import json
import re
import spacy
import jwt.utils
import math


#function for removing adjective names for specific ingredients, so that the broader product name can be matched to an id
nlp = spacy.load("en_core_web_sm")


def remove_adjectives(sentance):
    words = sentance.split(" ")
    cleaned_sentance = ""
    for word in words:
        # Process the text
        doc = nlp(word)
        # Generate list of words that are not adjectives
        if ((doc[0].pos_ != "ADJ") & (doc[0].pos_ != "VERB")):
            cleaned_sentance += f"{word} "
           
        # Join words back into string
    return cleaned_sentance




#function for mapping spoonacular categories to doordash categories
def match_aisle_to_category(aisle):
    categories = {
        "Baking": "pantry-963",
        "Health Foods": "pantry-963",
        "Spices and Seasonings": "pantry-963",
        "Pasta and Rice": "pantry-963",
        "Bakery/Bread": "bakery-958",
        "Refrigerated": "ambiguous-category",
        "Canned and Jarred": "pantry-963",
        "Frozen": "frozen-961",
        "Nut butters, Jams, and Honey": "pantry-963",
        "Oil, Vinegar, Salad Dressing": "pantry-963",
        "Condiments": "pantry-963",
        "Savory Snacks": "snacks-758",
        "Milk, Eggs, Other Dairy": "dairy & eggs-960",
        "Ethnic Foods": "pantry-963",
        "Tea and Coffee": "drinks-751",
        "Meat": "meat & fish-962",
        "Gourmet": "ambiguous-category",
        "Sweet Snacks": "snacks-758",
        "Gluten Free": "pantry-963",
        "Alcoholic Beverages": "alcohol-1024",
        "Cereal": "pantry-963",
        "Nuts": "pantry-963",
        "Beverages": "drinks-751",
        "Produce": "produce-964",
        "Not in Grocery Store/Homemade": "ambiguous-category",
        "Seafood": "meat & fish-962",
        "Cheese": "dairy & eggs-960",
        "Dried Fruits": "pantry-963",
        "Online": "ambiguous-category",
        "Grilling Supplies": "pantry-963",
        "Bread": "bakery-958",
    }


    tags = aisle.split(';')


    # Match each tag to a category, if possible
    matched_categories = [categories.get(tag.strip(), None) for tag in tags]


    # Remove None values and duplicates
    matched_categories = list(set([category for category in matched_categories if category]))


    # Return the list of matched categories or 'unknown-category' if none matched
    return matched_categories if matched_categories else ["unknown-category"]




#function that takes recipe id, and matches each product to a doordash category
def match_ingredients_to_categories(recipe_id):
    # API key for accessing the Spoonacular API
    api_key = "797d74d69b254775b988e23156590fc8"


    # URL to get ingredient details from a specific recipe
    url = f"https://api.spoonacular.com/recipes/{recipe_id}/ingredientWidget.json?apiKey={api_key}"


    # Making a GET request to the API
    response = requests.get(url)


    # Check if the request was successful
    if response.status_code == 200:
        categories_and_ingredients = {}
        full_product_info = {}


        # Parsing the JSON response
        ingredients = response.json()


        # Iterating through each ingredient
        for ingredient in ingredients['ingredients']:
            # Extracting the ingredient name
            ingredient_name = ingredient['name']


            # Cleaning the ingredient name to remove adjectives
            cleaned_ingredient_name = remove_adjectives(ingredient_name)


            # Extracting quantity and unit of the ingredient
            quantity = ingredient['amount']['us']['value']
            unit = ingredient['amount']['us']['unit']


            # Storing the cleaned ingredient name and its details
            full_product_info[cleaned_ingredient_name] = [ingredient_name, quantity, unit]


            # URL to search for ingredient details
            url = f"https://api.spoonacular.com/food/ingredients/search?query={cleaned_ingredient_name}&apiKey={api_key}&number=1"
            ingredient_name_response = requests.get(url)


            # Check if the ingredient search was successful
            if ingredient_name_response.status_code == 200:
                ingredient_name_search = ingredient_name_response.json()


                # Check if there are any results from the search
                if ingredient_name_search['results']:
                    ingredient_id = ingredient_name_search['results'][0]['id']


                    # URL to get detailed information about the ingredient
                    ingredient_id_url = f"https://api.spoonacular.com/food/ingredients/{ingredient_id}/information?amount=1&apiKey={api_key}"
                    ingredient_id_response = requests.get(ingredient_id_url)


                    # Check if the detailed information request was successful
                    if ingredient_id_response.status_code == 200:
                        ingredient_info = ingredient_id_response.json()


                        # Check if aisle information is available
                        if ingredient_info["aisle"]:
                            aisle_name = ingredient_info["aisle"]


                            # Matching the aisle to its category
                            categories = match_aisle_to_category(aisle_name)
                            for cat in categories:
                                # Storing the ingredient under the appropriate category
                                if cat not in categories_and_ingredients:
                                    categories_and_ingredients[cat] = [cleaned_ingredient_name]
                                else:
                                    categories_and_ingredients[cat].append(cleaned_ingredient_name)
                        else:
                            print(ingredient_info)
                    else:
                        print(ingredient_id_response.status_code)
                        print("ingredient_id_response")
                else:
                    categories_and_ingredients["ambiguous-category"] = ingredient_name
            else:
                print(ingredient_name_response.status_code)
                print("ingredient_name_response")


    else:
        print(response.status_code)


    # Printing and returning the full product information and categorized ingredients
    print(full_product_info)
    return categories_and_ingredients, full_product_info








#function for finding stores near your location using webdriver on Doordash, returns dictionary of store id's and locations
def find_stores(address):
    # Initialize a Chrome WebDriver
    driver = webdriver.Chrome()


    # Navigate to DoorDash's grocery section
    driver.get("https://www.doordash.com/tabs/grocery")


    # Find and click the button (assumed to be for location input)
    button = driver.find_element(By.CSS_SELECTOR, ".styles__StyledButtonRoot-sc-1ldytso-0.cfbzkB")
    button.click()
    time.sleep(5)  # Wait for the next page elements to load


    # Input the address into the address field and submit
    address_input = driver.find_element(By.ID, "FieldWrapper-1")
    address_input.send_keys(address)
    time.sleep(3)  # Wait for autocomplete suggestions
    address_input.send_keys(Keys.ENTER)  # Submit the address


    # Try to find and click the 'Save Address' button
    try:
        save_address_button = WebDriverWait(driver, 5).until(
            EC.element_to_be_clickable((By.CSS_SELECTOR, "[data-anchor-id='AddressEditSave']"))
        )
        save_address_button.click()
    except TimeoutException:
        # Fallback for a different 'Save Address' button if the first one is not found
        save_address_button = driver.find_element(By.CSS_SELECTOR, "[data-testid='AddressModalFooterSubmitButton']")
        save_address_button.click()


    time.sleep(3)  # Wait for stores to load


    # Find all elements containing store information
    store_info_elements = driver.find_elements(By.XPATH, "//div[starts-with(@id, 'store-info-') and translate(substring-after(@id, 'store-info-'), '0123456789', '') = '']")


    # Dictionary to store store names and their IDs
    store_name_id_dic = {}


    # Iterate over each element containing store information
    for element in store_info_elements:
        # Extract the numeric part of the element's ID which is assumed to be the store's ID
        id_attribute = element.get_attribute('id')
        numeric_part = id_attribute.split('store-info-')[-1]  # Assumes format 'store-info-<numbers>'


        # Split the text content of the element by line breaks
        full_text_lines = element.text.split('\n')


        # Determine the store name based on the text content
        if full_text_lines and full_text_lines[0].startswith("Accepting orders until"):
            # If the first line is "Accepting orders until", the store name should be on the second line
            store_name = full_text_lines[1] if len(full_text_lines) > 1 else "Name not found"
        else:
            # Otherwise, the store name is on the first line
            store_name = full_text_lines[0] if full_text_lines else "Name not found"


        # Print the store ID and name, and add them to the dictionary
        print(f"Store ID: {numeric_part}, Store Name: {store_name}")
        store_name_id_dic[store_name] = numeric_part


    # Close the WebDriver
    driver.close()


    # Return the dictionary containing store names and IDs
    return store_name_id_dic






#function for finding items in grocery store
def scroll_and_print_items(driver, timeout=90):
    start_time = time.time()
    seen_titles = set()
    price_item_list = []
    last_height = driver.execute_script("return document.body.scrollHeight")


    while True:
        # Check for timeout
        if time.time() - start_time > timeout:
            print("Timeout reached, stopping the scroll.")
            break


        # Scroll down incrementally
        driver.execute_script("window.scrollBy(0, 1000);")


        # Wait for new elements to load
        time.sleep(1)


        # Find elements and print their titles
        elements = driver.find_elements(By.CSS_SELECTOR, '[data-telemetry-id="convenienceItem.description"]')
        prices = driver.find_elements(By.CSS_SELECTOR, '[data-anchor-id="ItemPriceLabel"]')
        new_items = False
        for index in range(len(elements)):
            element = elements[index]
            price = prices[index]
            item_title = element.get_attribute("title")
            if item_title and item_title not in seen_titles:
                price_item_list.append([item_title, price.text])
                seen_titles.add(item_title)
                new_items = True


        # Calculate new scroll height and compare with last scroll height
        new_height = driver.execute_script("return document.body.scrollHeight")
        if new_height == last_height and not new_items:
            break
        last_height = new_height


    return price_item_list




#function for finding items in specific store on Doordash, returns dictionary with categories and items
def find_items_in_store(store, timeout=90):
    doordash_category_items = {}
    for key in categories_and_ingredients:
        if key != "ambiguous-category":
            store_url = f"https://www.doordash.com/convenience/store/{store}/category/{key}"
            driver = webdriver.Chrome()
            driver.get(store_url)
            # Call the function to start scrolling and printing
            items = scroll_and_print_items(driver, timeout)
            doordash_category_items[key] = items
        else:
            doordash_category_items[key] = []


    return doordash_category_items
   




#function for matching ingredients to doordash items
def match_ingredients(categories_and_ingredients, doordash_category_items):
    # Dictionary to store matched products
    product_matches = {}


    # Set to keep track of ingredients that have already been processed
    seen_ingredients = set()


    # Iterate through each category in the categories_and_ingredients dictionary
    for key in categories_and_ingredients:
        # List of ingredients for the current category
        recipe_ingredient_list = categories_and_ingredients[key]


        # Iterate through each item in the corresponding category from doordash_category_items
        for doordash_list in doordash_category_items[key]:
            # Name of the ingredient/item from DoorDash
            doordash_ingredient_name = doordash_list[0]


            # Iterate through each recipe ingredient
            for recipe_ingredient in recipe_ingredient_list:
                # Check if the ingredient has not been processed before
                if recipe_ingredient not in seen_ingredients:
                    # Initialize a list for the ingredient in product_matches and mark it as seen
                    product_matches[recipe_ingredient] = []
                    seen_ingredients.add(recipe_ingredient)


                # Strip and split the ingredient name for further processing
                striped_name = str.strip(recipe_ingredient)
                split_ingredient_name = str.split(striped_name, " ")


                # Check if the whole recipe ingredient name matches with any DoorDash ingredient name
                if str.lower(recipe_ingredient) in str.lower(doordash_ingredient_name):
                    product_matches[recipe_ingredient].append(doordash_ingredient_name)


                # Iterate through each word in the split ingredient name
                for single_name in split_ingredient_name:
                    # Check if any part of the ingredient name matches with the DoorDash ingredient name
                    if str.lower(single_name) in str.lower(doordash_ingredient_name):
                        product_matches[recipe_ingredient].append(doordash_ingredient_name)


    # Return the dictionary containing matched products
    return product_matches








#function for selecting best ingredients and return list formatted for doordash api call
def best_matches(full_product_info, product_matches):
    def normalize(text):
        """
        Normalize text by converting to lowercase and removing non-alphanumeric characters.
        """
        return re.sub(r'\W+', ' ', text.lower())
   
    def extract_key_terms(text):
        """
        Extract key terms from the text by normalizing and then splitting it into a set of words.
        """
        return set(normalize(text).split())
   
    def match_products(ingredient, products):
        """
        Match a given ingredient with a list of products, returning the best match based on common terms.
        """
        ingredient_terms = extract_key_terms(ingredient)
        best_match = None
        highest_score = 0
   
        for product in products:
            product_terms = extract_key_terms(product)
            common_terms = ingredient_terms.intersection(product_terms)
            score = len(common_terms)
   
            # Update best match if a higher score is found
            if score > highest_score:
                highest_score = score
                best_match = product
   
        return best_match
   
    items = []


    # Iterate through each ingredient in full_product_info
    for key in full_product_info:
        # Check if there is a matching product
        if key in product_matches:
            info = full_product_info[key]
            full_name = info[0]
            name_and_quantity_string = info[0] + " " + str(info[1]) + " " + info[2]
            best_match = match_products(full_name, product_matches[key])


            # Add the ingredient with its best match (if found) to the items list
            if best_match is not None:
                items.append({"name": name_and_quantity_string,
                              "description": f"Suggested Product: {best_match}",
                              "quantity": 1
                             })
            else:
                # Add the ingredient without a match to the items list
                items.append({"name": name_and_quantity_string,
                              "quantity": 1
                             })
               
    return items




#function that uses google maps api to find closest store to your address with store name
def find_store_address(address, store_name):
    # Initialize the Google Maps client
    gmaps = googlemaps.Client(key='AIzaSyAGmt2F8WbYwWI1ysWNNm8E-4xi9KM0740')
   
    # Geocoding the address to get latitude and longitude
    geocode_result = gmaps.geocode(address)
    if not geocode_result:
        raise ValueError("Geocoding failed for the address")
   
    lat, lng = geocode_result[0]['geometry']['location'].values()
   
    # Searching for stores named 'store_name' within a 5000-meter radius
    places_result = gmaps.places_nearby(location=(lat, lng), radius=5000, name=store_name, type='store')
    if not places_result['results']:
        raise ValueError("No stores found nearby")
   
    # Calculating distances to each store
    destinations = [(place['geometry']['location']['lat'], place['geometry']['location']['lng']) for place in places_result['results']]
    distance_result = gmaps.distance_matrix(origins=(lat, lng), destinations=destinations, units='imperial')
   
    # Finding the closest store
    closest_store = min(distance_result['rows'][0]['elements'], key=lambda x: x['distance']['value'])
    closest_store_index = distance_result['rows'][0]['elements'].index(closest_store)
    closest_store_info = places_result['results'][closest_store_index]
   
    # Outputting the result
    print(f"Closest Store: {closest_store_info['name']}")
    print(f"Address: {closest_store_info['vicinity']}")
    print(f"Distance: {closest_store['distance']['text']}")
    return closest_store_info['vicinity']






#function that makes api token with api access key
def make_token():
    # The key identifier, used for identifying the key used to sign the token
    accessKey = "8db4fa35-eabd-4a9b-aac2-bb058b4fff81"
   
    # Encoding a JWT (JSON Web Token)
    token = jwt.encode(
        {
            # 'aud' (Audience): Intended recipient of the JWT, here it's 'doordash'
            "aud": "doordash",


            # 'iss' (Issuer): Identifies the principal that issued the JWT
            "iss": "c6b30377-3bbe-4ab3-b2d6-0fd3d9e352db",


            # 'kid' (Key ID): Identifier for the key used to sign the token
            "kid": accessKey,


            # 'exp' (Expiration Time): Time after which the JWT expires (here, 300 seconds from the current time)
            "exp": str(math.floor(time.time() + 300)),


            # 'iat' (Issued At): Time at which the JWT was issued (current time)
            "iat": str(math.floor(time.time())),
        },
        # The secret key used for signing the token, decoded from Base64URL
        jwt.utils.base64url_decode("hCeyyH77LOpvrMAwfwOgJtAyAQ_b5_o3RA7zWKce8Wg"),


        # Algorithm used for signing the JWT
        algorithm="HS256",


        # Additional headers, here specifying the DoorDash JWT version
        headers={"dd-ver": "DD-JWT-V1"})


    # Return the generated JWT
    return token




#function that submits doordash order through doordash api returns link for tracking order
def make_order(token, user_address, user_phone, store_address, store_name, dropoff_instructions, items):
    delivery_id = random.randint(100000, 999999)
    endpoint = "https://openapi.doordash.com/drive/v2/deliveries/"
   
    headers = {"Accept-Encoding": "application/json",
               "Authorization": "Bearer " + token,
               "Content-Type": "application/json"}
   
    request_body = { # Modify pickup and drop off addresses below
        "external_delivery_id": delivery_id,
        "pickup_address": store_address,
        "pickup_business_name": store_name,
        "pickup_phone_number": "+16505555555",
        "pickup_instructions": "Enter gate code 1234 on the callbox.",
        "dropoff_address": user_address,
        "dropoff_business_name": "Wells Fargo SF Downtown",
        "dropoff_phone_number": user_phone,
        "dropoff_instructions": dropoff_instructions,
        "order_value": 1999,
        "items": items
    }
   
    create_delivery = requests.post(endpoint, headers=headers, json=request_body) # Create POST request
   
   
    print(create_delivery.status_code)
    print(create_delivery.text)
    print(create_delivery.reason)
    delivery_text = create_delivery.text
    delivery_dict = json.loads(delivery_text)
   
    return delivery_dict["tracking_url"]




#final function that connects all of the above functionality
def all_together(user_phone, user_address, dropoff_instructions, recipe_id):
    # user_phone = "+18476481332"
    # user_address = "72 Gardner Ct, apt D3 Allston MA 02134"
    # dropoff_instructions = "fuck you"
    # recipe_id = 716429
    cats_info = match_ingredients_to_categories(recipe_id)
    categories_and_ingredients = cats_info[0]
    full_product_info = cats_info[1]
    nearby_stores_dic = find_stores(user_address)
    store_name = next(iter(nearby_stores_dic))
    store_id = nearby_stores_dic[store_name]
    doordash_category_items = find_items_in_store(store_id)
    matched_ingredients = match_ingredients(categories_and_ingredients, doordash_category_items)
    items = best_matches(full_product_info, matched_ingredients)
    store_address = find_store_address(user_address, store_name)
    token = make_token()
    tracking_url = make_order(token, user_address, user_phone, store_address, store_name, dropoff_instructions, items)
    return tracking_url
