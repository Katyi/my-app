import { Box, CardMedia, Grid, IconButton, Typography } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";
import CloseIcon from "@mui/icons-material/Close";
import HEADER_LOGO from "../../images/logo.svg";
import { NAV_LIST } from "../../dataset/HeaderDataset";

function MobileMenuDrawer({ menuItems, menuHref, handleCloseDrawer }) {
  const color="#d0c7b6"
  const navigate = useNavigate();
  const handleNavigate = (event) => {
    handleCloseDrawer();
    navigate(event.target.id);
  };
  return (
    <Grid
      container
      sx={{
        width:'100vw',
        position:'relative',
        height: "auto",
        maxHeight: "100vh",
        m: "2rem 0",
      }}
    >
      <Grid
        item
        xs={12}
        sx={{
          minHeight: "100%",
          maxHeight: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          gap: "40px",
        }}
      >
        <Box
          sx={{
            width: "140px",
            height: "140px",
          }}
        >
          <CardMedia
            id={""}
            component="img"
            src={HEADER_LOGO}
            alt="project logo"
            onClick={handleNavigate}
          />
        </Box>
        {NAV_LIST.map(({label,href,disabled}, index) => {
          if (label === "project-logo") return undefined;
          return (
            <Typography
              key={"drawer_nav" + index}
              variant="footer_nav"
              onClick={!disabled?handleNavigate:undefined}
              id={href}
            >
              {label}
            </Typography>
          );
        })}
      </Grid>
      <IconButton
      
            disableFocusRipple
            disableRipple
        sx={{
          position: "absolute",
          top: -6,
          right: "20px",
          "&>svg":{
            width: "40px",
            height: "40px",
          },
          cursor: "pointer",
        }}
        onClick={handleCloseDrawer}
      >
        <CloseIcon fontSize="large" />
      </IconButton>
    </Grid>
  );
}

export default MobileMenuDrawer;
