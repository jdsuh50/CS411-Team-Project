
import { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import { Link, useNavigate } from "react-router-dom";

function LogInPage() {
  const [loggedIn, setLoggedIn] = useState(false);
  const navigate = useNavigate();

  // function handleCallbackResponse(response) {
  //   console.log("Encoded JWT ID Token: " + response.credential);
  //   let userObject = jwtDecode(response.credential);
  //   console.log(userObject);
  //   let email = userObject.email;
  //   console.log(email);
  // }

  // function to send data to SQL database
  function handleCallbackResponse(response) {
    console.log("Encoded JWT ID Token: " + response.credential);
    let userObject = jwtDecode(response.credential);
    console.log(userObject);
    let email = userObject.email;
    console.log(email);

    // Set loggedIn to true after successful login
    setLoggedIn(true);

    // Send only the email to your Flask server
    fetch('http://127.0.0.1:5000/store_user', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            first_name: userObject.given_name,
            last_name: userObject.family_name,
            email: userObject.email,
        }),
    })
    .then(response => response.text())
    .then(data => console.log(data));
  }

  useEffect(() => {
    /* global google */
    google.accounts.id.initialize({
      client_id: "692290108953-17o24fd8u4lnc7m2dtr8aafv3egjd953.apps.googleusercontent.com",
      callback: handleCallbackResponse,
      loggedIn: true
    });

    google.accounts.id.renderButton(
      document.getElementById("logInDiv"),
      { theme: "outline", size: "large" }
    )
  }, []);

  useEffect(() => {
    // Redirect to a new page after successful login
    if (loggedIn) {
      navigate('/yourProfile'); // Use navigate instead of useNavigate
    }
  }, [loggedIn, navigate]);

  return (
    <div className="LogInPage">
      <div id="logInDiv"></div>
      <Link to="/yourProfile">View Profile Preferences</Link>
    </div>
  );
}
  
  export default LogInPage;