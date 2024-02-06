import * as React from "react";
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Tooltip from "@mui/material/Tooltip";
import PersonAdd from "@mui/icons-material/PersonAdd";
import Settings from "@mui/icons-material/Settings";
import Logout from "@mui/icons-material/Logout";
import AddBoxIcon from "@mui/icons-material/AddBox";

import { Link, useNavigate } from "react-router-dom";

export default function Navbar() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const navigate = useNavigate();
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <React.Fragment>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          textAlign: "left",
          color: "#FFFFFF",
          backgroundColor: "#1F2937",
        }}
      >
        <Typography sx={{ flex: 0.5 }} component={"span"}>
          <h1 style={{ color: "#FFFFFF", margin: "1rem", fontFamily: "Inter" }}>
            BRANCHING NARRATIVES
          </h1>
        </Typography>
        <Typography sx={{ flex: 0.125 }} component={"span"}>
          <Link style={{ textDecoration: "none", color: "#FFFFFF" }} to="/">
            Home
          </Link>
        </Typography>
        <Typography sx={{ flex: 0.125 }} component={"span"}>
          <Link
            style={{ textDecoration: "none", color: "#FFFFFF" }}
            to="/explore"
          >
            Explore
          </Link>
        </Typography>
        <Typography
          sx={{ flex: 0.125 }}
          component={"span"}
          onClick={() => {
            navigate("/newStory");
          }}
        >
          <AddBoxIcon />
        </Typography>
        <Tooltip title="Account settings">
          <IconButton
            onClick={handleClick}
            size="small"
            aria-controls={open ? "account-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
          >
            <Avatar
              sx={{
                width: 32,
                height: 32,
                backgroundColor: "#FFFFFF",
                color: "#1F2937",
              }}
            >
              M
            </Avatar>
          </IconButton>
        </Tooltip>
        <Menu
          anchorEl={anchorEl}
          id="account-menu"
          open={open}
          onClose={handleClose}
          onClick={handleClose}
          PaperProps={{
            elevation: 0,
            sx: {
              overflow: "visible",
              filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
              backgroundColor: "rgb(165, 125, 100)",
              mt: 1.5,
              "& .MuiAvatar-root": {
                width: 32,
                height: 32,
                ml: -0.5,
                mr: 1,
              },
              "&::before": {
                content: '""',
                display: "block",
                position: "absolute",
                top: 0,
                right: 14,
                width: 10,
                height: 10,
                bgcolor: "background.paper",
                transform: "translateY(-50%) rotate(45deg)",
                zIndex: 0,
                backgroundColor: "rgb(165, 125, 100)",
              },
            },
          }}
          transformOrigin={{ horizontal: "right", vertical: "top" }}
          anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
        >
          <MenuItem
            onClick={() => {
              handleClose();
              navigate("/profile");
            }}
          >
            <Avatar /> Profile
          </MenuItem>
          <MenuItem
            onClick={() => {
              navigate("/myStories");
              handleClose();
            }}
          >
            <Avatar /> My Stories
          </MenuItem>
          <Divider />
          <MenuItem onClick={handleClose}>
            <ListItemIcon>
              <PersonAdd fontSize="small" />
            </ListItemIcon>
            Add another account
          </MenuItem>
          <MenuItem onClick={handleClose}>
            <ListItemIcon>
              <Settings fontSize="small" />
            </ListItemIcon>
            Settings
          </MenuItem>
          <MenuItem
            onClick={() => {
              localStorage.removeItem("jwt_token");
              handleClose();
              navigate("/");
            }}
          >
            <ListItemIcon>
              <Logout fontSize="small" />
            </ListItemIcon>
            Logout
          </MenuItem>
        </Menu>
      </Box>
    </React.Fragment>
  );
}
