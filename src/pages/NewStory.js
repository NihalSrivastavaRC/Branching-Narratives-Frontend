import React, { useState } from "react";
import {
  TextField,
  TextareaAutosize,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  Button,
} from "@mui/material";

import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function NewStory() {
  const [title, setTitle] = useState("");
  const [genre, setGenre] = useState("");
  const [description, setDescription] = useState("");
  const [visibility, setVisibility] = useState("");

  const BASE_URL = "http://localhost:3001";

  const navigate = useNavigate();

  const onClickHandler = () => {
    const token = localStorage.getItem("jwt_token");
    axios
      .post(
        BASE_URL + "/createStory",
        {
          title: title,
          genre: genre,
          description: description,
          visibility: visibility,
          commit_history: [],
        },
        { headers: { Authorization: `Bearer ${token}` } }
      )
      .then((response) => {
        console.log(response);
      })
      .catch((err) => {
        console.log(err);
      });
    navigate("/storyEditor", {
      state: {
        title: title,
        genre: genre,
        description: description,
        visibility: visibility,
      },
    });
  };

  return (
    <div
      className="page"
      style={{
        display: "flex",
        flexDirection: "row",
        background: "linear-gradient(90deg, #A57D64 45vw, #f0f2f5 45vw)",
        height: "100vh",
      }}
    >
      <div
        className="inner-container"
        style={{
          display: "flex",
          flex: "row",
          position: "relative",
          left: "20vw",
          height: "75vh",
          width: "65vw",
          top: "10vh",
          boxShadow: "0px 0px 10px 2px rgba(0,0,0,0.4)",
        }}
      >
        <div className="pic-container" style={{}}>
          <img
            src="/images/create_story_pic.jpg"
            style={{
              height: "75vh",
              width: "25vw",
            }}
            alt="Create Story Pic"
          />
        </div>
        <div
          style={{
            flex: 1,
            margin: "2rem",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <h2>Create new story</h2>
          <p>
            A repository contains all project files, including the revision
            history.
          </p>
          <FormControl sx={{ display: "flex", flex: 1 }}>
            <FormLabel sx={{ display: "flex", alignItems: "center" }}>
              Title
              <TextField
                onChange={(e) => {
                  setTitle(e.target.value);
                }}
                sx={{ margin: "1rem" }}
              ></TextField>
            </FormLabel>
            <FormLabel sx={{ display: "flex", alignItems: "center" }}>
              Genre
              <TextField
                onChange={(e) => {
                  setGenre(e.target.value);
                }}
                sx={{ margin: "1rem" }}
              ></TextField>
            </FormLabel>

            <FormLabel sx={{ display: "flex", alignItems: "center" }}>
              Description
              <TextareaAutosize
                minRows={2}
                variant="soft"
                onChange={(e) => {
                  setDescription(e.target.value);
                }}
                style={{
                  margin: "1rem",
                  backgroundColor: "transparent",
                  borderRadius: "0.25rem",
                  borderColor: "gray",
                }}
              ></TextareaAutosize>
            </FormLabel>
            <RadioGroup
              row
              aria-labelledby="demo-radio-buttons-group-label"
              defaultValue="female"
              name="radio-buttons-group"
              onChange={(e) => {
                setVisibility(e.target.value);
              }}
              sx={{ display: "flex", alignItems: "center" }}
            >
              <FormLabel>Visibility</FormLabel>
              <FormControlLabel
                value={true}
                style={{ margin: "1rem", color: "rgba(0, 0, 0, 0.6)" }}
                control={<Radio />}
                label="Public"
              />
              <FormControlLabel
                value={false}
                control={<Radio />}
                label="Private"
                style={{ margin: "1rem", color: "rgba(0, 0, 0, 0.6)" }}
              />
            </RadioGroup>
            <Button
              variant="contained"
              onClick={onClickHandler}
              style={{ margin: "1rem", backgroundColor: "#A57D64" }}
            >
              Create Story
            </Button>
          </FormControl>
        </div>
      </div>
    </div>
  );
}
