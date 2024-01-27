import React from "react";
import {
  Box,
  Card,
  CardActionArea,
  CardContent,
  Typography,
  Button,
  useTheme,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import Header from "components/Header";
import SearchIcon from "@mui/icons-material/Search";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import PostAddIcon from "@mui/icons-material/PostAdd";
import ChatIcon from "@mui/icons-material/Chat";
import EventIcon from "@mui/icons-material/Event";

const NewlyRegister = () => {
  const theme = useTheme();
  const navigate = useNavigate();

  const navigateTo = (path) => {
    navigate(path);
  };

  const handleUserDetails = (userId) => {
    // Navigate to the route for showing user details based on userId
    navigate(`/userDetails/${userId}`);
  };

  const handleAcceptUser = (userId) => {
    // Navigate to the route for accepting the user based on userId
    navigate(`admin/approve/${userId}`);
  };

  const handleRejectUser = (userId) => {
    // Navigate to the route for rejecting the user based on userId
    navigate(`admin/reject/${userId}`);
  };

  const users = [
    { userId: 1, name: "User 1" },
    { userId: 2, name: "User 2" },
    // Add more user details as needed
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
        {users.map((user) => (
          <Card
            key={user.userId}
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
          >
            <CardActionArea sx={{ width: "100%" }} onClick={() => handleUserDetails(user.userId)}>
              <CardContent>
                <Typography variant="h6" mt="0.5rem">
                  {user.name}
                </Typography>
                {/* Add other user details here */}
              </CardContent>
            </CardActionArea>
            <Box display="flex" justifyContent="space-between" mt="auto" width="100%">
              <Button variant="contained" color="primary" onClick={() => handleAcceptUser(user.userId)}>
                Accept
              </Button>
              <Button variant="contained" color="error" onClick={() => handleRejectUser(user.userId)}>
                Reject
              </Button>
            </Box>
          </Card>
        ))}
      </Box>
    </Box>
  );
};

export default NewlyRegister;
