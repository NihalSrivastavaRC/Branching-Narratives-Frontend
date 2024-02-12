import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import parse from "html-react-parser";
import {
  Button,
  Card,
  CardContent,
  CardActions,
  Typography,
} from "@mui/material";
import { Book } from "../components/book/Book";

import axios from "axios";

export default function ReadStory() {
  const [viewMode, setViewMode] = useState(false);
  const [stories, setStories] = useState([]);
  const navigate = useNavigate();
  const location = useLocation();

  const BASE_URL = "http://localhost:3001";

  const timeToRead = (
    (location.state.content.split(" ").length * 0.3) /
    100
  ).toFixed(2);

  useEffect(() => {
    axios
      .post(BASE_URL + "/getSimilarStories", {
        searchWord: location.state.description,
        top_n: 5,
      })
      .then((response) => {
        setStories(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [location.state.description]);

  return (
    <div>
      <div style={{ margin: "1rem" }}>
        <Button
          onClick={() => {
            setViewMode(false);
          }}
        >
          Blog
        </Button>
        <Button
          onClick={() => {
            setViewMode(true);
          }}
        >
          Story
        </Button>
      </div>
      {viewMode ? (
        <Book
          title={location.state.title}
          genre={location.state.genre}
          content={location.state.content}
          author={location.state.author}
        />
      ) : (
        <div style={{ padding: "1rem", display: "flex" }}>
          <div
            style={{ display: "flex", flexDirection: "column", width: "70vw" }}
          >
            <div className="header-container" style={{ margin: "1rem" }}>
              <span
                style={{
                  float: "left",
                  fontWeight: "bold",
                  fontSize: "3rem",
                  verticalAlign: "bottom",
                  lineHeight: "50px",
                }}
              >
                {location.state.title}
              </span>
              <span
                style={{
                  float: "right",
                  fontWeight: "lighter",
                  fontSize: "2rem",
                  verticalAlign: "bottom",
                  lineHeight: "50px",
                }}
              >
                {location.state.author}
              </span>
            </div>
            <hr />
            <div className="content-container" style={{ overflow: "auto" }}>
              <div style={{ margin: "1rem" }}>
                Time to read - {timeToRead} minutes
              </div>
              <div style={{ margin: "1rem" }}>
                {parse(location.state.content)}
              </div>
            </div>
          </div>
          <hr style={{ margin: "1rem" }} />
          <div>
            <h2>People also liked</h2>
            {stories.map((story, index) => {
              return (
                <Card variant="outlined" style={{ margin: "1rem" }} key={index}>
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
                  </CardActions>
                </Card>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
