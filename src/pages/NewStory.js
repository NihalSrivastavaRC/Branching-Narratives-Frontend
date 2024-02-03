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
        flexDirection: "column",
        margin: "1rem",
        textAlign: "center",
      }}
    >
      <h2>Create new story</h2>

      <FormControl sx={{ display: "flex", flex: 1 }}>
        <TextField
          placeholder="Title..."
          onChange={(e) => {
            setTitle(e.target.value);
          }}
          sx={{ margin: "1rem" }}
        ></TextField>
        <TextField
          placeholder="Genre..."
          onChange={(e) => {
            setGenre(e.target.value);
          }}
          sx={{ margin: "1rem" }}
        ></TextField>
        <TextareaAutosize
          placeholder="Description..."
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
        <FormLabel
          id="demo-radio-buttons-group-label"
          style={{ margin: "1rem" }}
        >
          Visibility
        </FormLabel>
        <RadioGroup
          aria-labelledby="demo-radio-buttons-group-label"
          defaultValue="female"
          name="radio-buttons-group"
          onChange={(e) => {
            setVisibility(e.target.value);
          }}
        >
          <FormControlLabel
            value={true}
            style={{ margin: "1rem", color: "#0F1035" }}
            control={<Radio />}
            label="Public"
          />
          <FormControlLabel
            value={false}
            control={<Radio />}
            label="Private"
            style={{ margin: "1rem" }}
          />
        </RadioGroup>
        <Button
          style={{ margin: "1rem" }}
          variant="contained"
          onClick={onClickHandler}
        >
          Create Story
        </Button>
      </FormControl>
    </div>
  );
}
