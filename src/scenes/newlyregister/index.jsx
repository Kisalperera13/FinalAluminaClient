import React from "react";
import { useEffect,useState } from "react";
import { useSelector } from "react-redux";
import CircularProgress from '@mui/material/CircularProgress';
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



const NewlyRegister = () => {
  const baseURL = process.env.REACT_APP_BASE_URL;
  const token = useSelector((state) => state.token);

  const [users, setNewUsers] = useState([]);
  const [loading, setLoading] = useState(true)

  const theme = useTheme();
  const navigate = useNavigate();
  

  useEffect(() => {
    const UserDetails = async () => {
      const response = await fetch(`${baseURL}/client/toapprove`, {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await response.json();
      setNewUsers(data.users);
      setLoading(false);
    };
    UserDetails();
  }, []); 


  const handleAcceptUser = async (userId) => {
    try {
      const response = await fetch(
        `${baseURL}/admin/approve/${userId}`, {
          method: "PUT",
          headers: { Authorization: `Bearer ${token}` },
        }
      );
  
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
  
    } catch (error) {
      console.error("An error occurred during the fetch:", error);
    }
    setNewUsers(users.filter(user => user._id !== userId))

  };
  

  const handleRejectUser = async (userId) => {
    try {
      const response = await fetch(
        `${baseURL}/admin/reject/${userId}`, {
          method: "PUT",
          headers: { Authorization: `Bearer ${token}` },
        }
      );
  
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
  
    } catch (error) {
      console.error("An error occurred during the fetch:", error);
    }
    setNewUsers(users.filter(user => user._id !== userId))

  };
  
  

  return (
    <Box m="1.5rem 2.5rem">
      <Header title="Newly Register" mb="1rem" />
      <br />
      <Box
        display="grid"
        gridTemplateColumns="repeat(auto-fill, minmax(250px, 1fr))"
        gap="1rem"
      >
        {loading ? (
          // Show loading indicator while data is being fetched
          <Box display="flex" justifyContent="center" alignItems="center">
            <CircularProgress />
          </Box>
        ):(
        users.map((user) => (
          <Card
            key={user._id}
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
            <CardActionArea sx={{ width: "100%" }} >
              <CardContent>
                <Typography variant="h6" mt="0.5rem">
                  {user.firstName} {user.lastName}
                </Typography>
                <Typography variant="body1" mt="0.5rem">
                  Email: {user.email}
                </Typography>
                <Typography variant="body1" mt="0.5rem">
                 Location: {user.location}
                </Typography>
                <Typography variant="body1" mt="0.5rem">
                 Country: {user.country}
                </Typography>
                <Typography variant="body1" mt="0.5rem">
                  Ocupation: {user.occupation}
                </Typography>
                <Typography variant="body1" mt="0.5rem">
                 Work Place: {user.workPlace}
                </Typography>
                <Typography variant="body1" mt="0.5rem">
                  Entered Year: {user.enteredYear}
                </Typography>
                <Typography variant="body1" mt="0.5rem">
                  PhoneNumber: {user.phoneNumber}
                </Typography>
                <Typography variant="body1" mt="0.5rem">
                Student Id Number: {user.studentIdNumber}
                </Typography>
                {/* Add other user details here */}
              </CardContent>
            </CardActionArea>
            <Box display="flex" justifyContent="space-between" mt="auto" width="100%">
              <Button variant="contained" color="primary" onClick={() => handleAcceptUser(user._id)}>
                Accept
              </Button>
              <Button variant="contained" color="error" onClick={() => handleRejectUser(user._id)}>
                Reject
              </Button>
            </Box>
          </Card>

        )))}
      </Box>
    </Box>
  );
};

export default NewlyRegister;
