import React, { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardActions,
  Typography,
  Button,
} from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function MyStories() {
  const [stories, setStories] = useState([]);
  const [updateCalled, setUpdateCalled] = useState(false);
  const BASE_URL = "http://localhost:3001";
  const navigate = useNavigate();

  const token = localStorage.getItem("jwt_token");

  const onClickDeleteHandler = (title) => {
    axios
      .post(
        BASE_URL + "/deleteStory",
        { title: title },
        { headers: { Authorization: `Bearer ${token}` } }
      )
      .then((response) => {
        console.log(response);
        setUpdateCalled(!updateCalled);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    axios
      .get(BASE_URL + "/getStories", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        setStories(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [updateCalled, token]);

  return (
    <div style={{ padding: "1rem" }}>
      <h2>MyStories</h2>
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
                Edit now
              </Button>
              <Button
                size="small"
                onClick={() => {
                  onClickDeleteHandler(story.title);
                }}
              >
                Delete Story
              </Button>
              <Button
                size="small"
                onClick={() => {
                  navigate("/commitHistory", {
                    state: {
                      title: story.title,
                      genre: story.genre,
                      description: story.description,
                      visibility: story.visibility,
                      commit_history: story.commit_history,
                    },
                  });
                }}
              >
                See History
              </Button>
            </CardActions>
          </Card>
        );
      })}
    </div>
  );
}
