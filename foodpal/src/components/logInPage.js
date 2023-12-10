
import { useEffect } from "react";
import { jwtDecode } from "jwt-decode";

/*const LogInButton = () => {
    const handleClick = () => {
      // Add your login logic here
      console.log('Login button clicked!');
    };
  
    return (
      <button onClick={handleClick}>
        Log In
      </button>
    );
};*/

function LogInPage() {

  function handleCallbackResponse(response) {
    console.log("Encoded JWT ID Token: " + response.credential);
    let userObject = jwtDecode(response.credential);
    console.log(userObject);
    let email = userObject.email;
    console.log(email);
  }

  useEffect(() => {
    /* global google */
    google.accounts.id.initialize({
      client_id: "692290108953-17o24fd8u4lnc7m2dtr8aafv3egjd953.apps.googleusercontent.com",
      callback: handleCallbackResponse
    });

    google.accounts.id.renderButton(
      document.getElementById("logInDiv"),
      { theme: "outline", size: "large" }
    )
  }, []);

  return (
    <div className="LogInPage">
      <div id="logInDiv"></div>
    </div>
  );
}
  
  export default LogInPage;