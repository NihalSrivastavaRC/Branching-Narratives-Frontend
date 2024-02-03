import React, { useState } from "react";
import { TextField, FormControl, Button } from "@mui/material";

import { useNavigate } from "react-router-dom";

import axios from "axios";

export default function Register() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [penName, setPenName] = useState("");
  const navigate = useNavigate();

  const BASE_URL = "http://localhost:3001";

  const onClickHandler = () => {
    axios
      .post(BASE_URL + "/register", {
        username: username,
        password: password,
        penName: penName,
      })
      .then((response) => {
        console.log(response);
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
          <h2 style={{ color: "#FFFFFF" }}>Register</h2>
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
            <TextField
              placeholder="Pen name..."
              onChange={(e) => {
                setPenName(e.target.value);
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
              Register
            </Button>
          </FormControl>
        </div>
        <div
          style={{
            marginTop: "1%",
            padding: "2rem",
          }}
        >
          Already have an account?{" "}
          <a href="/login" style={{ color: "black" }}>
            Login here
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
