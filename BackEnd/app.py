# NEW BRANCH NEW WORKING CODE 6:56pm
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
    print(data) 
    return 'data received'
    
    
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

if __name__ == '__main__':
    app.run(debug=True)


if __name__ == '__main__':
    app.run(debug=True)