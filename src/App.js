// import './App.css';
import { BrowserRouter, Navigate, Routes, Route } from "react-router-dom";
import HomePage from "scenes/homePage/index";
import LoginPage from "scenes/loginpage/index";
import ProfilePage from "scenes/profilepage/index";
import { useMemo } from "react";
import { useSelector } from "react-redux";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import { themeSettings } from "./theme";

import Layout from "scenes/layout";
import Dashboard from "scenes/dashboard";
import NewlyRegister from "scenes/newlyregister";
import Search from "scenes/transactions";
import AddPosts from "scenes/addPosts";
import Chat from "scenes/chat";
import Events from "scenes/events";
import Transactions from "scenes/transactions";




function App() {

  const mode = useSelector((state) => state.mode);
  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);
  const isAuth = Boolean(useSelector((state) => state.token));


  return (
    <div className="app">

    <BrowserRouter>
      <ThemeProvider theme={theme}>
      <CssBaseline />

            <Routes>
            <Route path="/" element={<LoginPage />} />
            <Route path="/home" element={isAuth ? <HomePage /> : <Navigate to="/" />}/>
            <Route path="/profile/:userId" element={isAuth ? <ProfilePage /> : <Navigate to="/" />}/>
           

            <Route element={<Layout />}>
              <Route path="/" element={<Navigate to="/dashboard" replace />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/NewlyRegister" element={<NewlyRegister />} />
              <Route path="/Search" element={<Search />} />
              <Route path="/AddPosts" element={<AddPosts/>} />
              <Route path="/Chat" element={<Chat />} />
              <Route path="/Events" element={<Events/>} />
              <Route path="/transactions" element={<Transactions />} />

            </Route>

            </Routes>
          

      </ThemeProvider>
    </BrowserRouter>

    </div>
  );
}

export default App;
