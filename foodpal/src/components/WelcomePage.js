
import React from 'react';
import { Link } from "react-router-dom";

function WelcomePage() {
    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100vh', fontFamily: 'helvetica' }}>
            <h1> welcome to foodpal. </h1> <br />
            <h2> please log in/sign up to continue </h2> <br />
            <Link to="/logIn">log in/sign up</Link>
        </div>
    );
}

export default WelcomePage;