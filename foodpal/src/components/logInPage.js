
const LogInButton = () => {
    const handleClick = () => {
      // Add your login logic here
      console.log('Login button clicked!');
    };
  
    return (
      <button onClick={handleClick}>
        Log In
      </button>
    );
};

function LogInPage() {
    return (
      <div className="LogInPage">
        <h1>Please Log In</h1> <br />
  
        <form action="recipeSearch.html">
          <label for="username">Enter Username:</label> <br />
          <input type="text" name="username" id="username" /> <br />
          <label for="password">Enter Password:</label> <br />
          <input type="password" name="password" id="password" /> <br />
      
          <LogInButton />
        </form> 
  
        <p> Don't have an account? Sign up here: </p>
        <a href="../../signUp.html">
          <button>Click Me</button>
        </a>
      </div>
    );
  }
  
  export default LogInPage;