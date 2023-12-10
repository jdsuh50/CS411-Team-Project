import flask
from flask import Flask, Response, request, render_template, redirect, url_for
from flaskext.mysql import MySQL
import flask_login
from datetime import date

app = Flask(__name__)
app.config["MYSQL_DATABASE_USER"] = 'root'
app.config["MYSQL_DATABASE_PASSWORD"] = 'Zcl957324'
app.config["MYSQL_DATABASE_DB"] = 'FoodPal'
app.config["MYSQL_DATABASE_HOST"] = 'localhost'

mysql = MySQL(app)
@app.route('/')


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

@app.route('/store_user', methods=['POST'])
def store_user():
    user_data = request.json
    conn = mysql.connect()
    cursor = conn.cursor()
    cursor.execute("INSERT INTO users (username, email, ...) VALUES (%s, %s, ...)", 
                   (user_data['username'], user_data['email'], ...))
    conn.commit()
    return 'User data stored in database'

# Note: Replace ... with the appropriate fields and user_data keys.


if __name__ == '__main__':
    app.run(debug=True)
    
    