import {
  Box,
  Button,
  CardMedia,
  Container,
  Grid,
  Slide,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import LOGO_EU from "../../images/eu-logo-footer.svg";
import LOGO_MAST from "../../images/mast-logo-footer.svg";
import FeedbackDialog from "./FeedbackDialog";


function AppFooterBar() {
  const navigate = useNavigate();
  const location = useLocation();
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const color = "#d0c7b6";
  const menuItems = [
    "о проекте",
    "расширенный поиск",
    // "флора XVIII века",
    "Источники",
    "новости",
  ];
  const menuHref = ["about",
    "adv-search",
    // "flora-lib",
    "all-sources",
    "news"];
  const handleNavigate = (event) => {
    navigate(event.target.id);
  };
  return (
    <Box
      component="footer"
      sx={{
        boxSizing: "border-box",
        borderTop: "8px solid",
        borderColor: color,
        overflow: "hidden",
        p: { xs: "64px 32px 32px 32px" },
      }}
    >
      <Container maxWidth="xl" sx={{ p: 0, height: "100%" }}>
        <Grid
          container
          sx={{}}
          spacing={2}
          direction="row"
          justifyContent="center"
          alignItems="stretch"
        >
          <Grid
            item
            xs={12}
            sm={6}
            md={6}
            lg={4}
            sx={{
              pr: 2,
              minHeight: "100%",
              maxHeight: "100%",
              display: {xs:'none',md:"flex"},
              flexDirection: "column",
              justifyContent: "space-around",
              alignItems: "center",
              gap: 4,
            }}
          >
            {menuItems.map((el, ind) => {
              return (
                <Typography
                  variant="nav_button"
                  id={menuHref[ind]}
                  key={el + ind + "footer_nav"}
                  onClick={handleNavigate}
                  textAlign={{ xs: "center" }}
                  className={
                    location.pathname.indexOf(menuHref[ind]) !== -1
                      ? "footer_nav active_nav"
                      : "footer_nav"
                  }
                >
                  {el}{" "}
                </Typography>
              );
            })}
          </Grid>
          <Grid
            item
            xs={12}
            sm={6}
            md={6}
            lg={4}
            sx={{
              bgcolor: "white",
              minHeight: "100%",
              maxHeight: "100%",
            }}
            container
            direction="column"
            justifyContent="center"
            alignItems="flex-start"
          >
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: "28px",
              }}
            >
              <Typography variant="footer_text" component={"a"}
                sx={{
                  color: "black",
                  textDecoration: "none",
                  "&:hover": {
                  textDecoration: "underline",
                    color: color,
                  },
                }}
                href="https://eusp.org/" 
                target="_blank"
              >
                Европейский университет в Санкт-Петербурге
              </Typography>
              <Typography variant="footer_text" component={"p"}>
                191187, Санкт-Петербург,
                <br /> Гагаринская ул., д. 6/1, А
              </Typography>
              <Typography
                variant="footer_text"
                sx={{
                  cursor: "pointer",
                    color: "black",
                    textDecoration: "none",
                    "&:hover": {
                    textDecoration: "underline",
                      color: color,
                    },
                }}
                component={'a'}
                  href="tel:+78123867637"
              >
                  (812) 386-76-37
              </Typography>
            </Box>
            <Box
              sx={{
                width: "100%",
                display: "flex",
                justifyContent: "space-between",
                mt: 4,
              }}
            >
              <Button variant="contained" onClick={handleClickOpen}>
                написать нам
              </Button>
            </Box>
          </Grid>
          <Grid
            item
            xs={12}
            sm={6}
            md={12}
            lg={4}
            sx={{
              minHeight: "100%",
              maxHeight: "100%",
              display: "flex",
              flexDirection: {
                xs: "row",
                sm: "column",
                md: "row",
                lg: "column",
              },
              justifyContent: "space-around",
              alignItems: {
                xs: "center",
                sm: "center",
                md: "center",
                lg: "flex-start",
              },
              gap: "1rem",
            }}
          >
            <CardMedia
              id={"logo-eu"}
              component="img"
              sx={{
                height: {xs:"40px",sm:"40px",md:"60px"},
                objectFit: "contain",
              }}
              src={LOGO_EU}
              alt="logo-eu"
            />
            <CardMedia
              id={"logo-mast"}
              component="img"
              sx={{
                height: {xs:"80px",sm:"80px",md:"120px"},
                objectFit: "contain",
              }}
              src={LOGO_MAST}
              alt="logo-mast"
            />
          </Grid>
          <Grid
            item
            xs={12}
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              opacity: 0.6,
            }}
          >
            <Typography
              variant="footer_copyrigth_text"
              sx={{ textAlign: "center", mt: 4 }}
            >
              © Прикладной центр машинного обучения, анализа данных и статистики,
              {" "}{new Date().getFullYear()}
            </Typography>
          </Grid>
        </Grid>
      </Container>
      <FeedbackDialog open={open} handleClose={handleClose} />
    </Box>
  );
}

export default AppFooterBar;
