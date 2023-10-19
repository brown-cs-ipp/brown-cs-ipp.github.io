import "./App.css";
import { Outlet } from "react-router-dom";
import { createTheme, ThemeProvider } from "@mui/material";

import NavBar from "./components/nav-bar/NavBar";

export const theme = createTheme({
  typography: {
    h1: {
      fontFamily: "minion-pro, serif",
      fontWeight: 400,
      fontSize: "32px",
      color: "rgb(9,64,179)",
    },
    h2: {
      fontFamily: "minion-pro, serif",
      fontWeight: 600,
      fontSize: "36px",
    },
    h3: {
      fontFamily: "minion-pro, serif",
      fontWeight: 700,
      fontSize: "24px",
    },
    h4: {
      fontFamily: "minion-pro, serif",
      fontWeight: 700,
      fontSize: "20px",
    },
    h5: {
      fontFamily: "minion-pro, serif",
      fontWeight: 400,
      fontSize: "20px",
      color: "black",
    },
    splashText: {
      fontFamily: "minion-pro, serif",
      fontWeight: 400,
      fontSize: "40px",
      color: "black",
    },
    p: {
      fontFamily: "franklin-gothic-atf",
      fontWeight: 200,
      fontSize: "16px",
    },
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

function App() {
  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        <NavBar />
        <Outlet />
      </ThemeProvider>
    </div>
  );
}

export default App;
