import {
  AppBar,
  Box,
  CardMedia,
  Container,
  IconButton,
  SwipeableDrawer,
  Toolbar,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import HEADER_LOGO from "../../images/logo.svg";
import MenuIcon from "@mui/icons-material/Menu";
import MobileMenuDrawer from "../MobileMenuDrawer/MobileMenuDrawer";
import { NAV_LIST } from "../../dataset/HeaderDataset";
function AppHeaderBar() {
  const [openDrawer, setOpenDrawer] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const handleNavigate = (event) => {
    navigate(event.target.id);
  };
  return (
    <AppBar
      position="static"
      component="header"
      elevation={0}
      color="inherit"
      sx={{
        top: 0,
        left: 0,
        pt: "12px",
      }}
    >
      <Container maxWidth="xl" disableGutters>
        <Toolbar disableGutters>
          <Box
          component="nav"
            sx={{
              width: "100%",
              height: "100%",
              display: "flex",
              justifyContent: {
                xs: "space-between",
                sm: "space-between",
                md: "center",
              },
              alignItems: "center",
              gap: { xs: "0px", md: "20px", lg: "24px", xl: "72px" },
            }}
          >
            {NAV_LIST.map(({label,href,disabled}, ind) => {
              if (label === "project-logo") {
                return (
                  <Box
                    key={label + ind}
                    sx={{
                      width: "140px",
                      // height: "100px",
                      m: "16px 24px",
                      cursor: "pointer",
                      textAlign: "center",
                      "&:hover": {
                        // filter: "drop-shadow(5px 5px 5px rgba(0, 0, 0, 0.3))",
                      },
                    }}
                  >
                    <CardMedia
                      id={href}
                      component="img"
                      sx={{
                        height: "100%",
                        position: "relative",
                        bottom: "26px",
                      }}
                      src={HEADER_LOGO}
                      alt={label}
                      onClick={handleNavigate}
                    />
                  </Box>
                );
              }
              return (
                <Typography
                  sx={{
                    display: {
                      xs: "none",
                      sm: "none",
                      md: "block",
                    },
                    whiteSpace:"pre-line",

                  }}
                  underline="none"
                  className={location.pathname.indexOf(href) !== -1 ? "active_nav" : ""}
                  id={href}
                  key={label + ind}
                  textAlign="center"
                  variant="nav_button"
                  onClick={!disabled?handleNavigate:undefined}
                >
                  {label}
                </Typography>
              );
            })}
            <Box sx={{
              position:'fixed',
              zIndex:9999,
              right:'-18px',
                display: {
                  xs: "flex",
                  md: "none",
                },
              height:'100px',
              width:'100px',
                justifyContent:'center'
            }}>
              <IconButton
              disableFocusRipple
              disableRipple
              sx={{
                position:'relative',
                bottom:32,
                "&>svg":{
                  width: "40px",
                  height: "40px",
                }
              }}
              onClick={() => setOpenDrawer(true)}
            >
              <MenuIcon  />
            </IconButton>
            </Box>
            
            <SwipeableDrawer
              anchor={"top"}
              open={openDrawer}
              onOpen={() => { }}
              onClose={() => setOpenDrawer(false)}
              sx={{
                height: "50vh",
                zIndex: 10000
              }}
            >
               <MobileMenuDrawer
                handleNavigate={handleNavigate}
                handleCloseDrawer={() => setOpenDrawer(false)}
              /> 
            </SwipeableDrawer>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default AppHeaderBar;
