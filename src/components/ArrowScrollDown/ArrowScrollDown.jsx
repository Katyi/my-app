import React from "react";
import KeyboardArrowDownOutlinedIcon from '@mui/icons-material/KeyboardArrowDownOutlined';
import { Box, IconButton, useMediaQuery } from "@mui/material";
import { useSelector } from "react-redux";
function ArrowScrollDown({ handlescrollToAboutBlock }) {
  const result = useSelector((state) => state.phytolex.result);
  const thinViewport = useMediaQuery('(min-height:620px)');
  const isHide = result || !thinViewport
  
  return (
    <Box
     data-aos="fade-down"
     data-aos-offset="-300"
     className="should-hide"
      sx={{
        position: "absolute",
        borderRadius: "0",
        width: "100%",
        bottom: "4px",
        left: "0",
        display:'flex',
        justifyContent:'center',
        alignItems:'center',
        "&:hover": {
          color: "rgba(2, 142, 74, 1)",
        },
      }}>

    <IconButton
      onClick={handlescrollToAboutBlock}
      disableRipple
      sx={{
        display: isHide ? "none" : "inline-flex",
        borderRadius: "0",
        "&:hover": {
          color: "rgba(2, 142, 74, 1)",
        },
      }}
    >
      <KeyboardArrowDownOutlinedIcon
        fontSize="large"
        sx={{
          transform: "scale(2) ",
        }}
      />
    </IconButton>
    </Box>
  );
}

export default ArrowScrollDown;
