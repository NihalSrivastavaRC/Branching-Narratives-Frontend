import React, { useState } from "react";
import { TextField, FormControl, Button } from "@mui/material";

import { useNavigate } from "react-router-dom";

import axios from "axios";

//Photo by <a href="https://unsplash.com/@oddityandgrace?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash">hannah grace</a> on <a href="https://unsplash.com/photos/a-white-box-with-writing-on-it-next-to-a-plant-j9JoYpaJH3A?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash">Unsplash</a>
export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const BASE_URL = "http://localhost:3001";

  const onClickHandler = () => {
    axios
      .post(BASE_URL + "/login", { username: username, password: password })
      .then((response) => {
        localStorage.setItem("jwt_token", response.data.token);
        navigate("/");
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div style={{ display: "flex", width: "100%" }}>
      <div
        style={{
          flexGrow: 1,
          textAlign: "center",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <div
          style={{
            backgroundColor: "#1F2937",
            padding: "2rem",
            borderRadius: "2rem",
            width: "50%",
          }}
        >
          <h2 style={{ color: "#FFFFFF" }}>Login</h2>
          <FormControl sx={{ display: "flex", flex: "0 0 50%" }}>
            <TextField
              placeholder="Username..."
              onChange={(e) => {
                setUsername(e.target.value);
              }}
              sx={{
                margin: "1rem",
                borderRadius: "1rem",
                backgroundColor: "white",
              }}
            ></TextField>
            <TextField
              placeholder="Password..."
              type="password"
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              sx={{
                margin: "1rem",
                borderRadius: "1rem",
                backgroundColor: "white",
              }}
            ></TextField>
            <Button
              style={{ margin: "1rem" }}
              variant="contained"
              onClick={onClickHandler}
            >
              Login
            </Button>
          </FormControl>
        </div>
        <div
          style={{
            marginTop: "1%",
            padding: "2rem",
          }}
        >
          Do not have an account?{" "}
          <a href="/register" style={{ color: "black" }}>
            Sign up
          </a>
        </div>
      </div>
      <div style={{ flexGrow: 0.2, display: "flex", justifyContent: "right" }}>
        <img
          src="/images/login_img.jpg"
          style={{ objectFit: "cover", maxHeight: "100vh" }}
          alt="Login_quote.img"
        ></img>
      </div>
    </div>
  );
}
