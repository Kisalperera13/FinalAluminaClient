// import './App.css';
import { BrowserRouter, Navigate, Routes, Route } from "react-router-dom";
import HomePage from "scenes/homePage/index";
import LoginPage from "scenes/loginpage/index";
import ProfilePage from "scenes/profilepage/index";
import AdminLoginPage from "scenes/Adminloginpage";
import { useMemo } from "react";
import { useSelector } from "react-redux";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import { themeSettings } from "./theme";

import Layout from "scenes/layout";
import Dashboard from "scenes/dashboard";
import NewlyRegister from "scenes/newlyregister";
import AddPosts from "scenes/addPosts";
import Chat from "scenes/chat";
import Events from "scenes/events";
import Search from "scenes/search";




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
            <Route path="/adminlogin" element={<AdminLoginPage />} />

            <Route path="/home" element={isAuth ? <HomePage /> : <Navigate to="/" />}/>
            <Route path="/profile/:userId" element={isAuth ? <ProfilePage /> : <Navigate to="/" />}/>
           

            <Route element={<Layout />}>
              <Route path="/" element={<Navigate to="/dashboard" replace />} />
              <Route path="/dashboard" element={isAuth ? <Dashboard />: <Navigate to="/adminlogin" />} />
              <Route path="/NewlyRegister" element={isAuth ? <NewlyRegister />: <Navigate to="/adminlogin" />} />
              <Route path="/Search" element={isAuth ? <Search />: <Navigate to="/adminlogin" />} />
              <Route path="/AddPosts" element={isAuth ? <AddPosts/>: <Navigate to="/adminlogin" />} />
              <Route path="/Chat" element={isAuth ? <Chat />: <Navigate to="/adminlogin" />} />
              <Route path="/Events" element={isAuth ? <Events/>: <Navigate to="/adminlogin" />} />

            </Route>

            </Routes>
          

      </ThemeProvider>
    </BrowserRouter>

    </div>
  );
}

export default App;
