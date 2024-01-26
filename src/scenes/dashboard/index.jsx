import React from "react";
import { Box, Card, CardActionArea, CardContent, Typography, useTheme } from "@mui/material";
import { useNavigate } from "react-router-dom";
import Header from "components/Header";
import SearchIcon from "@mui/icons-material/Search";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import PostAddIcon from "@mui/icons-material/PostAdd";
import ChatIcon from "@mui/icons-material/Chat";
import EventIcon from "@mui/icons-material/Event";

const Dashboard = () => {
  const theme = useTheme();
  const navigate = useNavigate();

  const navigateTo = (path) => {
    navigate(path);
  };

  const navigationItems = [
    { title: "Search", path: "/Search", icon: <SearchIcon fontSize="large" /> },
    { title: "New Register", path: "/NewlyRegister", icon: <PersonAddIcon fontSize="large" /> },
    { title: "Add Posts", path: "/AddPosts", icon: <PostAddIcon fontSize="large" /> },
    { title: "Chat", path: "/Chat", icon: <ChatIcon fontSize="large" /> },
    { title: "Event", path: "/Events", icon: <EventIcon fontSize="large" /> },
  ];

  return (
    <Box m="1.5rem 2.5rem">
      <Header title="DashBoard" mb="1rem" />
      <br />
      <Box
        display="grid"
        gridTemplateColumns="repeat(auto-fill, minmax(250px, 1fr))"
        gap="1rem"
      >
        {navigationItems.map((item) => (
          <Card
            key={item.title}
            sx={{
              cursor: "pointer",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              minHeight: "200px",
              padding: "1rem",
              borderRadius: "12px",
              boxShadow: theme.shadows[3],
            }}
            onClick={() => navigateTo(item.path)}
          >
            <CardActionArea sx={{ width: "100%" }}>
              <CardContent>
                {item.icon}
                <Typography variant="h6" mt="0.5rem">
                  {item.title}
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        ))}
      </Box>
    </Box>
  );
};

export default Dashboard;
