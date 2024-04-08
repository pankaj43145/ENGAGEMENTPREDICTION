import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState(null); // State to track login error
  const navigate = useNavigate();

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      if (email === "admin@gmail.com" && password === "admin54321") {
        // Redirect to "/admin" route if credentials match admin
        navigate("/adminhome");
      } else {
        throw new Error("Invalid credentials");
      }
    } catch (error) {
      console.error("Login failed:", error.message);
      // Set login error state if login fails
      setLoginError("Invalid email or password. Please try again.");
    }

    // Clear input fields
    setEmail("");
    setPassword("");
  };

  return (
    <div className="logincontainer">
      <div className="login">
        <header> Admin Login </header>{" "}
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="email"> Email: </label>{" "}
            <input
              type="email"
              id="email"
              className="login-input"
              value={email}
              onChange={handleEmailChange}
              required
            />
          </div>{" "}
          <div>
            <label htmlFor="password"> Password: </label>{" "}
            <input
              type="password"
              id="password"
              className="login-input"
              value={password}
              onChange={handlePasswordChange}
              required
            />
          </div>{" "}
          {loginError && <p className="login-error"> {loginError} </p>}{" "}
          {/* Display login error */}{" "}
          <button type="submit" className="login-button">
            Login{" "}
          </button>{" "}
        </form>{" "}
      </div>{" "}
    </div>
  );
};

export default LoginPage;
