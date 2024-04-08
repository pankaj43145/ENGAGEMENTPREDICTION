import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Admin.css";

function Admin() {
  const [userData, setUserData] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get(
        "https://btpbackend.onrender.com/user/getdata"
      );
      setUserData(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  return (
    <div className="admin">
      <h1> User Data </h1>{" "}
      <div>
        {" "}
        {userData.map((user) => (
          <div key={user._id} className="admin-item">
            <p>
              <strong> Email: </strong> {user.email}{" "}
            </p>{" "}
            <p>
              <strong> Engagement: </strong> {user.engagement}{" "}
            </p>{" "}
            <p>
              <strong> Video Number: </strong> {user.videoNumber}{" "}
            </p>{" "}
            <p>
              <strong> Video Type: </strong> {user.videoType}{" "}
            </p>{" "}
            <p>
              <strong> Video String: </strong>{" "}
              <a
                href={user.videostring}
                target="_blank"
                rel="noopener noreferrer"
              >
                {user.videostring}{" "}
              </a>{" "}
            </p>{" "}
            <p>
              <strong> Created At: </strong>{" "}
              {new Date(user.createdAt).toLocaleString()}{" "}
            </p>{" "}
          </div>
        ))}{" "}
      </div>{" "}
    </div>
  );
}

export default Admin;
