import "./App.css";
import { Routes, Route } from "react-router-dom";
import { createTheme, ThemeProvider } from "@mui/material/styles";
//import SignIn from './components/SingIn';
import AppBar from "./components/AppBar";
import Clients from "./components/Clients";
import Vehicles from "./components/Vehicles";

const theme = createTheme();


function App() {
  return (
    <ThemeProvider theme={theme}>
      <AppBar />
      <Routes>
        <Route path="clientes" element={<Clients />} />
        <Route path="vehiculos" element={<Vehicles />} />
      </Routes>
    </ThemeProvider>
  );
}

export default App;
