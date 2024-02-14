import React, { useEffect, useState } from "react";
import axios from "axios";

import { Avatar } from "@mui/material";

import NotLoggedIn from "../components/NotLoggedIn";

// Photo by <a href="https://unsplash.com/@sample_in_photography?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash">Lucia Macedo</a> on <a href="https://unsplash.com/photos/a-hand-holding-a-pen-and-writing-on-top-of-a-bottle-Jowx9DUhoMM?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash">Unsplash</a>

export default function Profile() {
  const [user, setUser] = useState({ username: "", penName: "" });
  const [userGenres, setUserGenres] = useState([]);
  const [topStories, setTopStories] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState("");

  const BASE_URL = "http://localhost:3001";
  const token = localStorage.getItem("jwt_token");

  useEffect(() => {
    axios
      .get(BASE_URL + "/isLoggedIn", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        setIsLoggedIn(true);
      })
      .catch((err) => {
        console.log(err);
        setIsLoggedIn(false);
      });

    axios
      .get(BASE_URL + "/getUser", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        setUser(response.data);
      })
      .catch((err) => {
        console.log(err);
      });

    axios
      .get(BASE_URL + "/getUserGenre", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        setUserGenres(response.data);
      })
      .catch((err) => {
        console.log(err);
      });

    axios
      .get(BASE_URL + "/getPopularUserStories", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        setTopStories(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [token]);

  return (
    <>
      {isLoggedIn ? (
        <div
          className="outer-container"
          style={{
            display: "flex",
            height: "100vh",
            backgroundColor: "#F8C573",
            alignItems: "center",
          }}
        >
          <div className="img-container">
            <img
              src="/images/profile_img.jpg"
              alt="profile_img.jpg"
              style={{ height: "100vh", width: "auto" }}
            ></img>
          </div>
          <div
            className="content-container"
            style={{
              backgroundColor: "#F0F2F5",
              boxShadow: "0px 0px 15px 5px rgba(0,0,0,0.25)",
              height: "60vh",
              width: "30vw",
              padding: "2rem",
              display: "grid",
              gridTemplateColumns: "auto auto",
              gridTemplateRows: "auto auto auto auto auto",
              alignItems: "center",
            }}
          >
            <Avatar
              style={{
                height: "6rem",
                width: "6rem",
                gridColumnStart: 2,
                gridColumnEnd: 3,
              }}
            />
            <h3 style={{ margin: "1rem", gridRowStart: 2 }}>Name</h3>{" "}
            {user.username}
            <h3 style={{ margin: "1rem", gridRowStart: 3 }}>Pen Name</h3>{" "}
            {user.penName}
            <h3 style={{ margin: "1rem", gridRowStart: 4 }}>
              Speciality genre
            </h3>
            {userGenres.join(", ")}
            <h3 style={{ margin: "1rem", gridRowStart: 5 }}>
              Popular Stories:
            </h3>
            {topStories.join(", ")}
          </div>
        </div>
      ) : (
        <NotLoggedIn />
      )}
    </>
  );
}
