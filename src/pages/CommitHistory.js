import React from "react";
import { useLocation } from "react-router-dom";

import Accordion from "@mui/material/Accordion";
import AccordionActions from "@mui/material/AccordionActions";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Button from "@mui/material/Button";

import parse from "html-react-parser";

function CommitHistory() {
  const location = useLocation();

  //<p>{commit.commitMessage} {commit.time}</p>

  return (
    <div>
      <h2>CommitHistory</h2>
      <h3>Title: {location.state.title}</h3>
      <h3>Genre: {location.state.genre}</h3>
      <h3>Description: {location.state.description}</h3>
      {location.state.commit_history.map((commit, index) => {
        return (
          <Accordion style={{margin: '1rem'}}>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel3-content"
              id="panel3-header"
              style={{display: "flex"}}
            >
                <div>{commit.commitMessage}</div>
                <div style={{marginLeft: 'auto'}}>{commit.time}</div>
            </AccordionSummary>
            <AccordionDetails>{parse(commit.content)}</AccordionDetails>
            <AccordionActions>
              <Button>Cancel</Button>
              <Button>Agree</Button>
            </AccordionActions>
          </Accordion>
        );
      })}
    </div>
  );
}

export default CommitHistory;
