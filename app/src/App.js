import "./App.css";
import { Routes, Route } from "react-router-dom";
import { createTheme, ThemeProvider } from "@mui/material/styles";
//import SignIn from './components/SingIn';
import AppBar from "./components/AppBar";
import Clients from "./components/Clients";

const theme = createTheme();
//let isLoggedIn = true

function App() {
  return (
    <ThemeProvider theme={theme}>
      <AppBar />
      <Routes>
        <Route path="clientes" element={<Clients />} />
      </Routes>
    </ThemeProvider>
  );
}

export default App;