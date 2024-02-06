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

  const navigate = useNavigate();

  const BASE_URL = "http://localhost:3001";

  useEffect(() => {
    axios
      .get(BASE_URL + "/getAllStories")
      .then((response) => {
        setStories(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

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
            InputProps={{ disableUnderline: true }}
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
              <Grid item xs={12} sm={6}>
                <Card variant="outlined" key={index} style={{ margin: "1rem" }}>
                  <CardContent>
                    <Typography
                      sx={{ fontSize: 14 }}
                      color="text.secondary"
                      gutterBottom
                    >
                      {story.genre}
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
