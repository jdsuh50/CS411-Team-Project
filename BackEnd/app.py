import flask
from flask import Flask, Response, request, render_template, redirect, url_for
from flaskext.mysql import MySQL
import flask_login
from datetime import date
from flask_cors import CORS

app = Flask(__name__)
CORS(app, resources={r"/store_user": {"origins": "http://localhost:3000"}})
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

@app.route('/insert')
def insert_user():
    conn = mysql.connect()
    cursor = conn.cursor()
    cursor.execute("INSERT INTO users (user_id, password) VALUES (123, 'test_password')")
    conn.commit()
    return 'User inserted'
@app.route('/display')

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
# @app.route('/store_user', methods=['POST'])
# def store_user():
#     user_data = request.json
#     first_name = user_data['first_name']
#     last_name = user_data['last_name']
#     email = user_data['email']
#     conn = mysql.connect()
#     cursor = conn.cursor()
#     cursor.execute("INSERT INTO Users (first_name, last_name, email, dateOfBirth, hometown, gender, password) VALUES (%s, %s, %s, %s, %s, %s, %s)", 
#                    (first_name, last_name, email, None, '', '', 'default_password'))
#     conn.commit()
#     return 'User email stored in database'

# Testing again: 
@app.route('/store_user', methods=['POST'])
def store_user():
    user_data = request.json
    first_name = user_data['first_name']
    last_name = user_data['last_name']
    email = user_data['email']
    conn = mysql.connect()
    cursor = conn.cursor()
    
    # Check if email already exists
    cursor.execute("SELECT * FROM Users WHERE email = %s", (email,))
    existing_user = cursor.fetchone()
    
    if existing_user:
        return 'Email already in use'
    else:
        cursor.execute("INSERT INTO Users (first_name, last_name, email, dateOfBirth, hometown, gender, password) VALUES (%s, %s, %s, %s, %s, %s, %s)", 
                       (first_name, last_name, email, None, '', '', 'default_password'))
        conn.commit()
        return 'User email stored in database'


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
    
