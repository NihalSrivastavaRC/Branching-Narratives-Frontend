import React, { useState } from "react";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

import "./style.css";

export const Book = (props) => {
  const [flippedIndex, setFlippedIndex] = useState(0);
  const [currentLocation, setCurrentLocaion] = useState(1);
  const [bookOpen, setBookOpen] = useState(false);
  // const [bookClose, setBookClose] = useState(false);

  var words = props.content.replace(/<[^>]+>/g, "").split(" ");
  const wordLimit = 140;

  var pages = [];
  var index = 0;
  while (index < words.length) {
    var front = [];
    var back = [];
    for (let i = 0; i < wordLimit; i++) {
      if (index < words.length) {
        front.push(words[index]);
        index++;
      } else {
        break;
      }
    }
    for (let i = 0; i < wordLimit; i++) {
      if (index < words.length) {
        back.push(words[index]);
        index++;
      } else {
        break;
      }
    }
    pages.push([front.join(" "), back.join(" ")]);
  }

  const numberOfPages = pages.length;
  const maxLocation = numberOfPages + 1;

  const goNextPage = () => {
    if (currentLocation <= maxLocation) {
      if (currentLocation === 1) {
        setBookOpen(true);
      }
      setFlippedIndex(currentLocation);
      setCurrentLocaion(currentLocation + 1);
    }
  };

  const goPrevPage = () => {
    if (currentLocation > 1) {
      setFlippedIndex(currentLocation - 1);
      // switch (currentLocation) {
      //   case 2:
      //     // setBookClose(true);
      //     setFlippedIndex(1);
      //     break;
      //   case 3:
      //     setFlippedIndex(2);
      //     break;
      //   case 4:
      //     setFlippedIndex(3);
      //     break;
      //   default:
      //     throw new Error("unkown state");
      // }
      setCurrentLocaion(currentLocation - 1);
    }
  };

  return (
    <div className="main-container">
      <button
        className="prev-btn"
        onClick={goPrevPage}
        style={{
          transform: bookOpen ? "translateX(-180px)" : "",
          // transform: bookClose ? "translateX(0px)" : "",
        }}
      >
        <ArrowBackIosIcon className="arrow" />
      </button>

      <div
        className="book"
        style={{
          transform: bookOpen ? "translateX(50%)" : "",
          // transform: bookClose ? "translateX(0%)" : "",
        }}
      >
        {/* Cover */}
        <div
          id="p1"
          className={"paper" + (flippedIndex >= 1 ? " flipped" : "")}
          style={{ zIndex: flippedIndex >= 1 ? 1 : maxLocation }}
        >
          <div className="front">
            <div id="f1" className="front-content cover">
              <h1>{props.title}</h1>
              <h3>By {props.author}</h3>
            </div>
          </div>
          <div className="back">
            <div id="b1" className="back-content"></div>
          </div>
        </div>

        {pages.map((page, index) => {
          return (
            <div
              id={"p" + (index + 2)}
              className={
                "paper" + (flippedIndex >= index + 2 ? " flipped" : "")
              }
              style={{
                zIndex:
                  flippedIndex >= index + 2
                    ? index + 2
                    : maxLocation - (index + 1),
              }}
            >
              <div className="front">
                <div id={"f" + (index + 2)} className="front-content">
                  {page[0]}
                </div>
              </div>
              <div className="back">
                <div id={"b" + (index + 2)} className="back-content">
                  {page[1]}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <button
        className="next-btn"
        onClick={goNextPage}
        style={{
          transform: bookOpen ? "translateX(180px)" : "",
          // transform: bookClose ? "translateX(0px)" : "",
        }}
      >
        <ArrowForwardIosIcon className="arrow" />
      </button>
    </div>
  );
};
