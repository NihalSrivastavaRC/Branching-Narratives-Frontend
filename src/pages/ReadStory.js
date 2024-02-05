import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import parse from "html-react-parser";
import { Button } from "@mui/material";
import { Book } from "../components/book/Book";

export default function ReadStory() {
  const [viewMode, setViewMode] = useState(false);
  const location = useLocation();

  return (
    <div>
      <div style={{ textAlign: "center", margin: "1rem" }}>
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
        <div style={{ padding: "1rem" }}>{parse(location.state.content)}</div>
      )}
    </div>
  );
}
