import React from "react";
import {
  AppBar,
  Box,
  Button,
  Container,
  IconButton,
  Toolbar,
  Typography,
} from "@mui/material";
import { Lock, Menu } from "@mui/icons-material";
import { useState } from "react";
import { useValue } from "../context/ContextProvider";
import UserIcon from "./user/UserIcon";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const {
    state: { currentUser },
    dispatch,
  } = useValue();
  console.log(currentUser);
  return (
    <>
      <AppBar>
        <Container maxWidth="lg">
          <Toolbar disableGutters>
            <Box sx={{ mr: 1 }}>
              <IconButton
                size="large"
                color="inherit"
                onClick={() => setIsOpen(true)}
              >
                <Menu />
              </IconButton>
            </Box>
            <Typography
              variant="h6"
              component="h1"
              noWrap
              sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}
            >
              You Are Welcome
            </Typography>
            <Typography
              variant="h6"
              component="h1"
              noWrap
              sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}
            >
              YRW
            </Typography>
            {!currentUser ? (
              <Button
                color="inherit"
                startIcon={<Lock />}
                onClick={() => dispatch({ type: "OPEN_LOGIN" })}
              >
                Login
              </Button>
            ) : (
              <UserIcon />
            )}
          </Toolbar>
        </Container>
      </AppBar>
      <Toolbar />
    </>
  );
};

export default Navbar;
