import React, { useState } from "react";
import { Box, useMediaQuery } from "@mui/material";
import { Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import AdminNavbar from "components/AdminNavbar";
import AdminSidebar from "components/AdminSidebar";
// import { useGetUserQuery } from "state/api";

const Layout = () => {
  const isNonMobile = useMediaQuery("(min-width: 600px)");
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
//   const userId = useSelector((state) => state.global.userId);
//   const { data } = useGetUserQuery(userId);

// const toggleSidebar = () => {
//     setIsSidebarOpen(!isSidebarOpen);
//   };

  return (
    <Box display={isNonMobile ? "flex" : "block"} width="100%" height="100%">
      <AdminSidebar
        // user={data || {}}
        isNonMobile={isNonMobile}
        drawerWidth="250px"
        isSidebarOpen={isSidebarOpen}
        setIsSidebarOpen={setIsSidebarOpen}
      />
      <Box flexGrow={1}>
        <AdminNavbar
        //   user={data || {}}
        setIsSidebarOpen={setIsSidebarOpen}
          isSidebarOpen={isSidebarOpen}
        />
        <Outlet />
      </Box>
    </Box>
  );
};

export default Layout;
