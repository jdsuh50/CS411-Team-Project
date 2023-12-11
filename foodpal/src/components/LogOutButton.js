
import React from 'react';
import { Link } from "react-router-dom";

function LogOutButton() {
    return (
        <button>
            <Link to="/">Log Out</Link>
        </button>
    );
}

export default LogOutButton;