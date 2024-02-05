import React from "react";
import styled from "styled-components";

import ControlPointDuplicateIcon from "@mui/icons-material/ControlPointDuplicate";
import BookIcon from "@mui/icons-material/Book";
import Diversity3Icon from "@mui/icons-material/Diversity3";

//Photo by <a href="https://unsplash.com/@impatrickt?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash">Patrick Tomasso</a> on <a href="https://unsplash.com/photos/open-book-lot-Oaqk7qqNh_c?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash">Unsplash</a>

const Glassmorph = styled.div`
  background: rgba(240, 242, 245, 0.2);
  box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
  backdrop-filter: blur(8.5px);
  -webkit-backdrop-filter: blur(8.5px);
  border-radius: 10px;
  border: 1px solid rgba(255, 255, 255, 0.18);
  margin: 1rem;
  padding: 1rem;
  text-align: center;
  width: 50vh;
`;

const Home = () => {
  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <img
        src="/images/home_pic.jpg"
        style={{ height: "30vh", objectFit: "cover" }}
      />
      <div style={{ margin: "1rem" }}>
        <h3>
          Unleash Your Creativity, Control, and Collaboration - Welcome to
          Branching Narratives
        </h3>
        Tired of content lost in the void? We were too. Introducing Branching
        Narratives, the version-controlled playground for creators of all
        stripes. Whether you weave magical stories, craft insightful technical
        blogs, or capture the world through stunning photography, Branching
        Narratives empowers you to:
      </div>
      <div
        style={{
          backgroundColor: "#1F2937",
          color: "#FFFFFF",
          textAlign: "center",
          padding: "1rem",
          margin: "0 auto",
          borderRadius: "1rem",
          width: "50%",
          alignContent: "center",
        }}
      >
        Forge your future, not just content
      </div>
      <div
        style={{ display: "flex", margin: "2.5rem", justifyContent: "center" }}
      >
        <Glassmorph>
          <ControlPointDuplicateIcon />
          <div>
            Version control and track changes: Dive into any past iteration of
            your work, compare versions, and revert seamlessly. No more
            accidental overwrites! Collaborate with confidence: Invite fellow
            creators to contribute, brainstorm, and polish your masterpieces.
            Real-time collaboration keeps everyone in sync. Publish with ease:
            Share your finished creations directly from Branching Narratives.
            Built-in publishing tools let you reach the world effortlessly.
          </div>
        </Glassmorph>
        <Glassmorph>
          <BookIcon />
          <div>
            Branching Narratives is your creative oasis, with features designed
            for diverse minds: Unleash your format: From long-form narratives to
            bite-sized blog posts, code snippets to captivating images,
            Branching Narratives embraces your vision, whatever it may be.
            Organize with finesse: Tag your work, create custom libraries, and
            navigate your creative universe with intuitive search and filtering.
            Customize your canvas: Tailor your workspace to your flow, with
            themes, fonts, and keyboard shortcuts that speak your language.
          </div>
        </Glassmorph>
        <Glassmorph>
          <Diversity3Icon />
          <div>
            More than just a platform, Branching Narratives is a community:
            Connect with your tribe: Discover fellow creators, engage in
            discussions, and build a network that fuels your inspiration. Get
            feedback that matters: Share your work with trusted advisors,
            receive constructive criticism, and push your creativity to new
            heights. Learn and grow together: Workshops, tutorials, and expert
            insights help you hone your craft and unlock your full potential.
          </div>
        </Glassmorph>
      </div>
      <div style={{ margin: "1rem", textAlign: "center" }}>
        Ready to forge your creative legacy? <a href="/register">Sign up</a>{" "}
        account today and: Experience the freedom of version control.
        Collaborate with the world's most talented minds. Publish your work with
        confidence and ease.
      </div>
      <div
        style={{
          backgroundColor: "#1F2937",
          color: "#FFFFFF",
          textAlign: "center",
          padding: "1rem",
          margin: "0 auto",
          borderRadius: "1rem",
          width: "50%",
        }}
      >
        Branching Narratives isn't just a tool, it's a revolution.
        <a href="/login" style={{ color: "#FFFFFF" }}>
          Join us
        </a>{" "}
        and let's rewrite the rules of content creation, together.
      </div>
    </div>
  );
};

export default Home;
