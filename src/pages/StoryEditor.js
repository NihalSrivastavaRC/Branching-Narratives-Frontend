import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import { TextField, Button } from "@mui/material";

import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

import axios from "axios";

export default function StoryEditor() {
  const [value, setValue] = useState("");
  const [commitMessage, setCommitMessage] = useState("");

  const BASE_URL = "http://localhost:3001";

  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    setValue(location.state.content);
  }, [location.state.content])

  const onClickHandler = () => {
    console.log(value, commitMessage);
    const token = localStorage.getItem("jwt_token");

    axios
      .post(
        BASE_URL + "/updateStory",
        {
          title: location.state.title,
          content: value,
          commitMessage: commitMessage,
        },
        { headers: { Authorization: `Bearer ${token}` } }
      )
      .then((response) => {
        console.log(response);
        navigate('/');
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div
      className="page"
      style={{ display: "flex", flexDirection: "column", margin: "1rem" }}
    >
      <h2>Title: {location.state.title}</h2>
      <h2>Genre: {location.state.genre}</h2>
      <h2 style={{ textAlign: "center" }}>StoryEditor</h2>
      <ReactQuill
        theme="snow"
        value={value}
        onChange={setValue}
        style={{ margin: "1rem 0 1rem 0" }}
      />

      <div
        style={{
          backgroundColor: "#365486",
          display: "flex",
          flexDirection: "column",
          borderRadius: "1rem",
        }}
      >
        <TextField
          placeholder="commit message..."
          onChange={(e) => {
            setCommitMessage(e.target.value);
          }}
          style={{ margin: "1rem" }}
        ></TextField>
        <Button
          variant="contained"
          onClick={onClickHandler}
          style={{ margin: "1rem", backgroundColor: "#7FC7D9" }}
        >
          Create
        </Button>
      </div>
    </div>
  );
}
