import React, { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardActions,
  Typography,
  Button,
  Input,
} from "@mui/material";

import axios from "axios";
import { useNavigate } from "react-router-dom";

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
    <div style={{ display: "flex", flexDirection: "column", margin: "1rem" }}>
      <h2 style={{ margin: "1rem", textAlign: "center" }}>Explore</h2>
      <Input
        color="primary"
        disabled={false}
        placeholder="Search"
        size="lg"
        variant="soft"
        style={{ margin: "1rem" }}
        onChange={(e) => {
          setSearchWord(e.target.value);
        }}
      />
      <Button onClick={onClickHandler}>Search</Button>
      <div>
        {stories.map((story, index) => {
          return (
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
                        story.commit_history[story.commit_history.length - 1]
                          .content;
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
          );
        })}
      </div>
    </div>
  );
}

export default Explore;
