import React from "react";
import { Link } from "react-router-dom";
import "./Home.css";

const HomePage = () => {
  return (
    <div className="home-page">
      <h1> Welcome to Our Platform </h1> <p> Please go with all videos: </p>{" "}
      <div className="button-container">
        <div className="homebutton">
          <h2> Avatar Videos </h2>{" "}
          <p>
            Engaging animated lectures delivered by colorful avatars.Perfect for
            visual learners and those who enjoy interactive content.{" "}
          </p>{" "}
          <Link to="/avatar-videos">
            <button> Explore Avatar Videos </button>{" "}
          </Link>{" "}
        </div>{" "}
        <div className="homebutton">
          <h2> Real Teacher Videos </h2>{" "}
          <p>
            Immersive video lectures presented by real teachers.Gain insights
            from experienced educators and connect on a personal level.{" "}
          </p>{" "}
          <Link to="/Real-teacher">
            <button> Explore Real Teacher Videos </button>{" "}
          </Link>{" "}
        </div>{" "}
        <div className="homebutton">
          <h2> Voice - over Videos </h2>{" "}
          <p>
            Audio - based lectures without visual distractions.Ideal for
            auditory learners and on - the - go studying.{" "}
          </p>{" "}
          <Link to="/voice-over-videos">
            <button> Explore Voice - over Videos </button>{" "}
          </Link>{" "}
        </div>{" "}
      </div>{" "}
    </div>
  );
};

export default HomePage;
