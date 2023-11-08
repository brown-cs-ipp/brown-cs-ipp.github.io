import React from "react";
import { useState } from "react";
import "./NavBar.css";
import { Link, NavLink } from "react-router-dom";
import ipplogo from "./images/ipp-logo.png";
import brownlogo from "./images/brownlogo.png";
import { Divider, Typography } from "@mui/material";
import { createTheme, ThemeProvider, styled } from "@mui/material/styles";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import {
  MobileView,
  BrowserView,
  isBrowser,
  isMobile,
} from "react-device-detect";

// Create themes for typography and palette customization
const theme = createTheme({
  typography: {
    fontFamily: "minion-pro",
    fontWeightBold: 700,
  },
  palette: {
    primary: {
      main: "#193AA5",
    },
    secondary: {
      main: "#FFFFFF",
    },
  },
});

const theme2 = createTheme({
  typography: {
    fontFamily: "franklin-gothic-atf",
    fontWeight: 700,
  },
  palette: {
    primary: {
      main: "#193AA5",
    },
    secondary: {
      main: "#FFFFFF",
    },
  },
});

export default function NavBar() {
  const [isNavExpanded, setIsNavExpanded] = useState(false);
  const [url, setUrl] = useState("");

  // Set the URL for Brown University logo link
  function handleClick() {
    setUrl("https://cs.brown.edu/");
  }

  function toggleMobileMenu() {
    setIsNavExpanded(!isNavExpanded);
  }

  function buildDesktopNavBarLinks() {
    return (
      <div className="desktop-only">
        <div className="navbar-links-container">
          <ThemeProvider theme={theme2}>
            <NavLink
              className="navbar-links"
              to="/events"
              style={({ isActive }) => ({
                color: isActive ? "#193AA5" : "#000000",
                background: isActive ? "#fff" : "#fff",
                borderBottom: isActive ? "2px solid #193AA5" : "none",
              })}
            >
              <Typography>
                <b>EVENTS</b>
              </Typography>
            </NavLink>

            <NavLink
              className="navbar-links"
              to="/partners"
              style={({ isActive }) => ({
                color: isActive ? "#193AA5" : "#000000",
                background: isActive ? "#fff" : "#fff",
                borderBottom: isActive ? "2px solid #193AA5" : "none",
              })}
            >
              <Typography>
                <b>PARTNERS</b>
              </Typography>
            </NavLink>

            <NavLink
              className="navbar-links"
              to="/apply"
              style={({ isActive }) => ({
                color: isActive ? "#193AA5" : "#000000",
                borderBottom: isActive ? "2px solid #193AA5" : "none",
                background: isActive ? "#fff" : "#fff",
              })}
            >
              <Typography>
                <b>APPLY</b>
              </Typography>
            </NavLink>

            <NavLink
              className="navbar-links"
              to="/resources"
              style={({ isActive }) => ({
                color: isActive ? "#193AA5" : "#000000",
                borderBottom: isActive ? "2px solid #193AA5" : "none",
                background: isActive ? "#fff" : "#fff",
              })}
            >
              <Typography>
                <b>RESOURCES</b>
              </Typography>
            </NavLink>

            <NavLink
              className="navbar-links"
              to="/blog"
              style={({ isActive }) => ({
                color: isActive ? "#193AA5" : "#000000",
                borderBottom: isActive ? "2px solid #193AA5" : "none",
                background: isActive ? "#fff" : "#fff",
              })}
            >
              <Typography>
                <b>BLOG</b>
              </Typography>
            </NavLink>
          </ThemeProvider>
        </div>
      </div>
    );
  }

  function buildMobileNavBarLinks() {
    return (
      <div className="mobile-menu">
        <div className="mobile-menu-open-button">
          <MenuIcon
            style={{ color: "#193AA5", fontSize: "28px" }}
            onClick={toggleMobileMenu}
          />
        </div>

        <ThemeProvider theme={theme2}>
          <div
            className="navbar-links-row"
            id={isNavExpanded ? "menu-visible" : "menu-hidden"}
          >
            <div className="navbar-links-mobile">
              <NavLink
                to="/events"
                onClick={toggleMobileMenu}
                style={({ isActive }) => ({
                  color: isActive ? "#193AA5" : "#000000",
                  background: isActive ? "#fff" : "#fff",
                  borderBottom: isActive ? "2px solid #193AA5" : "none",
                })}
              >
                <Typography>
                  <b>EVENTS</b>
                </Typography>
              </NavLink>
            </div>

            <div className="navbar-links-mobile">
              <NavLink
                className="navbar-links-mobile"
                onClick={toggleMobileMenu}
                to="/partners"
                style={({ isActive }) => ({
                  color: isActive ? "#193AA5" : "#000000",
                  background: isActive ? "#fff" : "#fff",
                  borderBottom: isActive ? "2px solid #193AA5" : "none",
                })}
              >
                <Typography>
                  <b>PARTNERS</b>
                </Typography>
              </NavLink>
            </div>

            <div className="navbar-links-mobile">
              <NavLink
                className="navbar-links-mobile"
                onClick={toggleMobileMenu}
                to="/apply"
                style={({ isActive }) => ({
                  color: isActive ? "#193AA5" : "#000000",
                  background: isActive ? "#fff" : "#fff",
                  borderBottom: isActive ? "2px solid #193AA5" : "none",
                })}
              >
                <Typography>
                  <b>APPLY</b>
                </Typography>
              </NavLink>
            </div>

            <div className="navbar-links-mobile">
              <NavLink
                className="navbar-links-mobile"
                onClick={toggleMobileMenu}
                to="/resources"
                style={({ isActive }) => ({
                  color: isActive ? "#193AA5" : "#000000",
                  background: isActive ? "#fff" : "#fff",
                  borderBottom: isActive ? "2px solid #193AA5" : "none",
                })}
              >
                <Typography>
                  <b>RESOURCES</b>
                </Typography>
              </NavLink>
            </div>

            <div className="navbar-links-mobile">
              <NavLink
                className="navbar-links-mobile"
                onClick={toggleMobileMenu}
                to="/blog"
                style={({ isActive }) => ({
                  color: isActive ? "#193AA5" : "#000000",
                  background: isActive ? "#fff" : "#fff",
                  borderBottom: isActive ? "2px solid #193AA5" : "none",
                })}
              >
                <Typography>
                  <b>BLOG</b>
                </Typography>
              </NavLink>
            </div>

            <div className="mobile-menu-close-button">
              <CloseIcon
                style={{ color: "#193AA5", fontSize: "28px" }}
                onClick={toggleMobileMenu}
              />
            </div>
          </div>
        </ThemeProvider>
      </div>
    );
  }

  return (
    <div className="navbar-container">
      <div className="navbar-logo">
        <a href={url}>
          {" "}
          <img
            className="brown"
            src={brownlogo}
            alt="brown university logo"
            onClick={handleClick}
          />{" "}
        </a>
        <Divider orientation="vertical" flexItem />
        <Link to="/">
          {" "}
          <img className="ipp" src={ipplogo} alt="ipp logo" />{" "}
        </Link>
        <Link to="/">
          <ThemeProvider theme={theme}>
            <BrowserView>
              <Typography>Industry Partners Program</Typography>
            </BrowserView>
            <MobileView>
              <Typography>IPP</Typography>
            </MobileView>
          </ThemeProvider>
        </Link>
      </div>

      {isMobile ? buildMobileNavBarLinks() : buildDesktopNavBarLinks()}
    </div>
  );
}
