import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Link } from "react-router-dom"; // Import Link for the admin button
import "./Register.css";

const RegisterPage = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [residence, setResidence] = useState("");
  const [registrationMessage, setRegistrationMessage] = useState("");
  const navigate = useNavigate(); // Initialize useNavigate

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleAgeChange = (event) => {
    setAge(event.target.value);
  };

  const handleResidenceChange = (event) => {
    setResidence(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      // Fetch current temp string
      const getStringResponse = await axios.get(
        "https://btpbackend.onrender.com/LoginData/getstring"
      );
      const currentTempString = getStringResponse.data[0].temp;
      console.log(currentTempString);

      // Check if the current temp string is undefined
      if (typeof currentTempString !== "string") {
        console.error("Invalid temp string:", currentTempString);
        return;
      }

      localStorage.setItem("tempstring", currentTempString);

      // Determine new temp string based on current temp string
      let newTempString;
      switch (currentTempString) {
        case "123456":
          newTempString = "345612";
          break;
        case "345612":
          newTempString = "561234";
          break;
        case "561234":
          newTempString = "123456";
          break;
        default:
          // If the current temp string is not one of the specified values, do nothing
          console.log("Invalid temp string:", currentTempString);
          return;
      }

      // Update temp string using updatedata API
      const updateDataResponse = await axios.post(
        "https://btpbackend.onrender.com/LoginData/updatedata",
        {
          temp: newTempString,
        }
      );

      console.log("Update successful:", updateDataResponse.data);

      // Proceed with user registration
      const registerResponse = await axios.post(
        "https://btpbackend.onrender.com/Logindata/create",
        {
          email,
          name,
          age,
          residence,
        }
      );

      console.log("Registration successful:", registerResponse.data);
      localStorage.setItem("userMail", email);
      setRegistrationMessage("Registration successful");

      // Redirect to /home after successful registration
      navigate("/home");
    } catch (error) {
      console.error("Registration failed:", error.response.data);
    }
  };

  return (
    <div className="registerpage">
      {" "}
      {/* Add the admin button at the top right corner */}{" "}
      <Link to="/login" className="admin-button">
        Admin{" "}
      </Link>{" "}
      <div className="register">
        <header> UserInfo </header>{" "}
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="email"> Email: </label>{" "}
            <input
              type="email"
              id="email"
              className="register-input"
              value={email}
              onChange={handleEmailChange}
              required
            />
          </div>{" "}
          <div>
            <label htmlFor="name"> Name: </label>{" "}
            <input
              type="text"
              id="name"
              className="register-input"
              value={name}
              onChange={handleNameChange}
              required
            />
          </div>{" "}
          <div>
            <label htmlFor="age"> Age: </label>{" "}
            <input
              type="number"
              id="age"
              className="register-input"
              value={age}
              onChange={handleAgeChange}
              required
            />
          </div>{" "}
          <div>
            <label htmlFor="residence"> Place of Residence: </label>{" "}
            <input
              type="text"
              id="residence"
              className="register-input"
              value={residence}
              onChange={handleResidenceChange}
              required
            />
          </div>{" "}
          <button type="submit" className="next-button">
            Next{" "}
          </button>{" "}
        </form>{" "}
        {registrationMessage && (
          <div className="registration-message"> {registrationMessage} </div>
        )}{" "}
      </div>{" "}
    </div>
  );
};

export default RegisterPage;
