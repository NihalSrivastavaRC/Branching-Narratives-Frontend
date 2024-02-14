import React, { useState, useEffect } from "react";
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

import NotLoggedIn from "../components/NotLoggedIn";

export default function NewStory() {
  const [title, setTitle] = useState("");
  const [genre, setGenre] = useState("");
  const [description, setDescription] = useState("");
  const [visibility, setVisibility] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState("");

  const BASE_URL = "http://localhost:3001";

  const navigate = useNavigate();
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
  }, [token]);

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
          forkedFrom: "",
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
    <>
      {isLoggedIn ? (
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
                display: "grid",
                gridTemplateColumns: "25% auto auto",
                gridTemplateRows: "auto auto auto",
                alignItems: "center",
              }}
            >
              <h2
                style={{
                  gridColumnStart: 2,
                  gridColumnEnd: 3,
                  gridRowStart: 1,
                }}
              >
                Create new story
              </h2>
              <p
                style={{
                  gridColumnStart: 2,
                  gridColumnEnd: 3,
                  gridRowStart: 2,
                }}
              >
                A repository contains all project files, including the revision
                history.
              </p>
              <FormControl
                style={{
                  gridColumnStart: 1,
                  gridColumnEnd: 3,
                  gridRowStart: 3,
                  display: "grid",
                  gridTemplateColumns: "25% auto auto",
                  gridTemplateRows: "auto auto auto auto auto",
                  alignItems: "center",
                }}
              >
                <FormLabel
                  sx={{
                    "&.Mui-focused": { color: "rgba(0, 0, 0, 0.6)" },
                    gridRowStart: 1,
                    gridColumnStart: 1,
                    fontWeight: "bold",
                  }}
                >
                  Title
                </FormLabel>
                <TextField
                  onChange={(e) => {
                    setTitle(e.target.value);
                  }}
                  sx={{
                    margin: "1rem",
                    gridRowStart: 1,
                    gridColumnStart: 2,
                    gridColumnEnd: 4,
                    boxShadow:
                      "rgb(200, 208, 231) 3.2px 3.2px 8px 0px inset, rgb(255, 255, 255) -3.2px -3.2px 8px 0px inset",
                  }}
                ></TextField>

                <FormLabel
                  sx={{
                    "&.Mui-focused": { color: "rgba(0, 0, 0, 0.6)" },
                    gridRowStart: 2,
                    gridColumnStart: 1,
                    fontWeight: "bold",
                  }}
                >
                  Genre
                </FormLabel>
                <TextField
                  onChange={(e) => {
                    setGenre(e.target.value);
                  }}
                  sx={{
                    margin: "1rem",
                    gridRowStart: 2,
                    gridColumnStart: 2,
                    gridColumnEnd: 4,
                    boxShadow:
                      "rgb(200, 208, 231) 3.2px 3.2px 8px 0px inset, rgb(255, 255, 255) -3.2px -3.2px 8px 0px inset",
                  }}
                ></TextField>

                <FormLabel
                  sx={{
                    "&.Mui-focused": { color: "rgba(0, 0, 0, 0.6)" },
                    gridRowStart: 3,
                    gridColumnStart: 1,
                    fontWeight: "bold",
                  }}
                >
                  Description
                </FormLabel>
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
                    gridRowStart: 3,
                    gridColumnStart: 2,
                    gridColumnEnd: 4,
                    boxShadow:
                      "rgb(200, 208, 231) 3.2px 3.2px 8px 0px inset, rgb(255, 255, 255) -3.2px -3.2px 8px 0px inset",
                    padding: "1rem",
                  }}
                ></TextareaAutosize>
                <FormLabel
                  sx={{
                    "&.Mui-focused": { color: "rgba(0, 0, 0, 0.6)" },
                    gridRowStart: 4,
                    gridColumnStart: 1,
                    fontWeight: "bold",
                  }}
                >
                  Visibility
                </FormLabel>
                <RadioGroup
                  row={true}
                  aria-labelledby="demo-radio-buttons-group-label"
                  defaultValue="female"
                  name="radio-buttons-group"
                  onChange={(e) => {
                    setVisibility(e.target.value);
                  }}
                  sx={{
                    gridRowStart: 4,
                    gridColumnStart: 2,
                    gridColumnEnd: 4,
                  }}
                >
                  <FormControlLabel
                    value={true}
                    style={{ margin: "1rem", color: "rgba(0, 0, 0, 0.6)" }}
                    control={
                      <Radio
                        sx={{
                          boxShadow:
                            "rgb(200, 208, 231) 3.2px 3.2px 8px 0px inset, rgb(255, 255, 255) -3.2px -3.2px 8px 0px inset",
                        }}
                      />
                    }
                    label="Public"
                  />
                  <FormControlLabel
                    value={false}
                    control={
                      <Radio
                        sx={{
                          boxShadow:
                            "rgb(200, 208, 231) 3.2px 3.2px 8px 0px inset, rgb(255, 255, 255) -3.2px -3.2px 8px 0px inset",
                        }}
                      />
                    }
                    label="Private"
                    style={{ margin: "1rem", color: "rgba(0, 0, 0, 0.6)" }}
                  />
                </RadioGroup>
                <Button
                  variant="contained"
                  onClick={onClickHandler}
                  style={{
                    margin: "1rem",
                    backgroundColor: "#A57D64",
                    gridRowStart: 5,
                    gridColumnStart: 2,
                    gridColumnEnd: 4,
                  }}
                >
                  Create Story
                </Button>
              </FormControl>
            </div>
          </div>
        </div>
      ) : (
        <NotLoggedIn />
      )}
    </>
  );
}
