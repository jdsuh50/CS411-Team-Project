
import React from 'react';
import { Link } from "react-router-dom";

function WelcomePage() {
    return (
        <div>
            <h1> Welcome to FoodPal </h1> <br />
            <h2> Please Log In/Sign Up to Continue </h2> <br />
            <Link to="/logIn">Log In/Sign Up</Link>
        </div>
    );
}

export default WelcomePage;