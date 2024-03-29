import React, { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardActions,
  Typography,
  Button,
  Grid,
  TextField,
} from "@mui/material";

import axios from "axios";
import { useNavigate } from "react-router-dom";

// Photo by <a href="https://unsplash.com/@anniespratt?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash">Annie Spratt</a> on <a href="https://unsplash.com/photos/a-little-girl-laying-on-a-bed-with-lots-of-books-oOEz7c7V3gk?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash">Unsplash</a>

function Explore() {
  const [stories, setStories] = useState([]);
  const [searchWord, setSearchWord] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState("");

  const navigate = useNavigate();

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
      .get(BASE_URL + "/getAllStories")
      .then((response) => {
        console.log(response.data);
        setStories(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [token]);

  const fork = (title, genre, description, content, username) => {
    const token = localStorage.getItem("jwt_token");
    axios
      .post(
        BASE_URL + "/incrementForkCounter",
        { title: title, username: username },
        { headers: { Authorization: `Bearer ${token}` } }
      )
      .then((response) => {
        console.log(response);
      })
      .catch((err) => {
        console.log(err);
      });
    axios
      .post(
        BASE_URL + "/createStory",
        {
          title: title,
          genre: genre,
          description: description,
          visibility: true,
          commit_history: [
            {
              commitMessage: "forked",
              content: content,
              time: Date.now(),
            },
          ],
          forkedFrom: username,
        },
        { headers: { Authorization: `Bearer ${token}` } }
      )
      .then((response) => {
        console.log(response);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const onClickHandler = () => {
    axios
      .post(BASE_URL + "/getSimilarStories", {
        searchWord: searchWord,
        top_n: 5,
      })
      .then((response) => {
        setStories(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div style={{ display: "flex" }}>
      <div style={{ flexGrow: 75 }}>
        <div style={{ display: "flex" }}>
          <TextField
            disabled={false}
            placeholder="Search"
            size="lg"
            style={{ flex: 1, margin: "1rem" }}
            onChange={(e) => {
              setSearchWord(e.target.value);
            }}
            InputProps={{ disableunderline: "true" }}
            sx={{
              boxShadow:
                "rgb(200, 208, 231) 3.2px 3.2px 8px 0px inset, rgb(255, 255, 255) -3.2px -3.2px 8px 0px inset",
              border: 0,
              borderRadius: "1rem",
              "& fieldset": { border: "none" },
            }}
          />
          <Button
            onClick={onClickHandler}
            style={{
              backgroundColor: "#A57D64",
              color: "white",
              margin: "1rem",
              borderRadius: "1rem",
            }}
          >
            Search
          </Button>
        </div>
        <Grid container>
          {stories.map((story, index) => {
            return (
              <Grid item xs={12} sm={6} key={index}>
                <Card variant="outlined" style={{ margin: "1rem" }}>
                  <CardContent>
                    <Typography
                      sx={{ fontSize: 14 }}
                      color="text.secondary"
                      gutterBottom
                    >
                      <span>{story.genre}</span>
                      <span style={{ float: "right" }}>
                        Fork Count: {story.forkCount}
                      </span>
                    </Typography>
                    <Typography variant="h5" component="div">
                      {story.title}
                    </Typography>
                    <Typography sx={{ mb: 1.5 }} color="text.secondary">
                      {story.username}
                    </Typography>
                    <Typography variant="body2">{story.description}</Typography>
                  </CardContent>
                  <CardActions>
                    <Button
                      size="small"
                      onClick={() => {
                        let latest_commit_content = "";
                        if (story.commit_history) {
                          latest_commit_content =
                            story.commit_history[
                              story.commit_history.length - 1
                            ].content;
                        }

                        navigate("/readStory", {
                          state: {
                            title: story.title,
                            genre: story.genre,
                            description: story.description,
                            visibility: story.visibility,
                            content: latest_commit_content,
                            author: story.username,
                          },
                        });
                      }}
                    >
                      Read now
                    </Button>
                    <Button
                      size="small"
                      disabled={!isLoggedIn}
                      onClick={() => {
                        let latest_commit_content = "";
                        if (story.commit_history) {
                          latest_commit_content =
                            story.commit_history[
                              story.commit_history.length - 1
                            ].content;
                        }

                        fork(
                          story.title,
                          story.genre,
                          story.description,
                          latest_commit_content,
                          story.username
                        );

                        navigate("/storyEditor", {
                          state: {
                            title: story.title,
                            genre: story.genre,
                            description: story.description,
                            visibility: story.visibility,
                            content: latest_commit_content,
                          },
                        });
                      }}
                    >
                      Fork
                    </Button>
                  </CardActions>
                </Card>
              </Grid>
            );
          })}
        </Grid>
      </div>
      <img
        src="/images/explore_img.jpg"
        style={{ width: "50%", height: "auto", objectFit: "cover" }}
        alt="Explore"
      ></img>
    </div>
  );
}

export default Explore;
