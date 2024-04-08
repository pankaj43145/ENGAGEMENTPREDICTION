import React, { useState, useEffect } from "react";
import ReactPlayer from "react-player";
import axios from "axios";
import "./Voiceover.css";

const VoiceOverPage = () => {
  const [voiceOverData, setVoiceOverData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [engagements, setEngagements] = useState([]);
  const [selectedOptions, setSelectedOptions] = useState([]);
  const userMail = localStorage.getItem("userMail");
  const tempstring = localStorage.getItem("tempstring");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://btpbackend.onrender.com/LoginData/getvoice"
        );
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const data = await response.json();
        setVoiceOverData(data);
        setEngagements(new Array(data.length).fill(""));
        setSelectedOptions(new Array(data.length).fill(""));
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleOptionChange = (index, option) => {
    const newSelectedOptions = [...selectedOptions];
    newSelectedOptions[index] = option;
    setSelectedOptions(newSelectedOptions);
  };

  const handleSubmit = async (index) => {
    try {
      const response = await axios.post(
        "https://btpbackend.onrender.com/user/createdata",
        {
          email: userMail,
          engagement: selectedOptions[index],
          videoNumber: voiceOverData[index].videoNumber,
          videoType: "voice-over",
          videostring: voiceOverData[index].videoLink,
        }
      );

      console.log("Data submitted successfully:", response.data);
      window.alert("Data submitted successfully");
      // You can add any further logic here upon successful submission
    } catch (error) {
      console.error("Failed to submit data:", error.response.data);
    }
  };

  return (
    <div className="voiceover-page">
      {" "}
      {loading && <p className="voiceover-loading"> Loading... </p>}{" "}
      {error && <p className="voiceover-error"> Error: {error} </p>}{" "}
      {!loading && !error && (
        <div className="voiceover-data">
          {" "}
          {voiceOverData.length === 0 ? (
            <p className="voiceover-no-data"> No data available </p>
          ) : (
            voiceOverData.map((video, index) => {
              if (
                video.videoNumber === tempstring[4] ||
                video.videoNumber === tempstring[5]
              ) {
                return (
                  <div key={video._id} className="voiceover-item">
                    <p className="voiceover-video-description">
                      Video Description: {video.videoDescription}{" "}
                    </p>{" "}
                    <div className="voiceover-video">
                      <ReactPlayer
                        url={video.videoLink}
                        width="800px"
                        height="550px"
                      />
                    </div>{" "}
                    <p className="voiceover-engagement">
                      Please select engagement after watching video:
                    </p>{" "}
                    <div className="options-container">
                      <div className="option">
                        <label>
                          <input
                            type="radio"
                            name={`engagement-${index}`}
                            value="Not Engaged"
                            checked={selectedOptions[index] === "Not Engaged"}
                            onChange={() =>
                              handleOptionChange(index, "Not Engaged")
                            }
                          />
                          Not Engaged(Rarely interested){" "}
                        </label>{" "}
                        <img src="/image1.png" alt="Not Engaged" />
                      </div>{" "}
                      <div className="option">
                        <label>
                          <input
                            type="radio"
                            name={`engagement-${index}`}
                            value="Barely Engaged"
                            checked={
                              selectedOptions[index] === "Barely Engaged"
                            }
                            onChange={() =>
                              handleOptionChange(index, "Barely Engaged")
                            }
                          />
                          Barely Engaged(Little interest){" "}
                        </label>{" "}
                        <img src="/image2.png" alt="Barely Engaged" />
                      </div>{" "}
                      <div className="option">
                        <label>
                          <input
                            type="radio"
                            name={`engagement-${index}`}
                            value="Engaged"
                            checked={selectedOptions[index] === "Engaged"}
                            onChange={() =>
                              handleOptionChange(index, "Engaged")
                            }
                          />
                          Engaged(Regularly interacts){" "}
                        </label>{" "}
                        <img src="/image3.png" alt="Engaged" />
                      </div>{" "}
                      <div className="option">
                        <label>
                          <input
                            type="radio"
                            name={`engagement-${index}`}
                            value="Highly Engaged"
                            checked={
                              selectedOptions[index] === "Highly Engaged"
                            }
                            onChange={() =>
                              handleOptionChange(index, "Highly Engaged")
                            }
                          />
                          Highly Engaged(Actively involved){" "}
                        </label>{" "}
                        <img src="/image4.png" alt="Highly Engaged" />
                      </div>{" "}
                    </div>{" "}
                    <button
                      className="voiceover-submit-btn"
                      onClick={() => handleSubmit(index)}
                    >
                      Submit{" "}
                    </button>{" "}
                    <hr className="voiceover-hr" />
                  </div>
                );
              } else {
                return null;
              }
            })
          )}{" "}
        </div>
      )}{" "}
    </div>
  );
};

export default VoiceOverPage;
