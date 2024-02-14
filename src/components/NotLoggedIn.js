import React from "react";
import { Button, Box, Typography } from "@mui/material";

import { useNavigate } from "react-router-dom";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

function NotLoggedIn() {
  const navigate = useNavigate();
  return (
    <Box sx={style}>
      <Typography
        id="modal-modal-title"
        variant="h6"
        component="h2"
        style={{ textAlign: "center" }}
      >
        Create account
      </Typography>
      <Typography
        id="modal-modal-description"
        sx={{
          mt: 2,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        Please login or register
        <div>
          <Button
            onClick={() => {
              navigate("/login");
            }}
          >
            Login
          </Button>
          <Button
            onClick={() => {
              navigate("/register");
            }}
          >
            Register
          </Button>
        </div>
      </Typography>
    </Box>
  );
}

export default NotLoggedIn;
