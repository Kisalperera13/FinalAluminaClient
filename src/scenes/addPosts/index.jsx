import React from 'react';
import { useSelector } from "react-redux";
import { Box, useMediaQuery } from "@mui/material";
import MyPostWidget from "scenes/widgets/MyPostWidget";
import PostsWidget from "scenes/widgets/PostsWidget";
import Header from "components/Header";


const AddPosts = () => {

  const isNonMobileScreens = useMediaQuery("(min-width:1000px)");
  const { _id, picturePath } = useSelector((state) => state.user);

  return (
    <div>
    <Box m="1.5rem 2.5rem">

      <Header title="Posts" />

      <Box
        width="100%"
        padding="2rem 6%"
        display={isNonMobileScreens ? "flex" : "block"}
        gap="0.5rem"
        justifyContent="space-between"
      >

        <Box
            flexBasis={isNonMobileScreens ? "65%" : undefined}
            mt={isNonMobileScreens ? undefined : "2rem"}
            mx={isNonMobileScreens ? "auto" : undefined} 
        >
          <MyPostWidget picturePath={picturePath} />
          <PostsWidget userId={_id} />

        </Box>


      </Box>
      </Box>
      
    </div>
  )
}

export default AddPosts
