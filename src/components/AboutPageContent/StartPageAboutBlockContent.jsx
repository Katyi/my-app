import { Box, CardMedia, Grid, Typography } from "@mui/material";
import React from "react";
import { AOS_INTRO_BLOCK, AOS_INTRO_IMAGE } from "../../dataset/Animations";
import img1 from "../../images/1.png";
import img2 from "../../images/2.png";
import img3 from "../../images/3.png";
import img4 from "../../images/4.png";
import img5 from "../../images/5.png";
import { useSearchParams } from "react-router-dom";
import { getParamsInObject } from "../../utils/SimpleResultUtils";

const TEXT_ABOUT = [
  "База данных является частью проекта “Растения и люди в Российской империи: сословная дистрибуция знаний и практик”, реализуемого в Европейском университете в Санкт-Петербурге (ПЦ МАСТ).",
  "Собранный материал помогает упорядочить и выявить особенности применения растений и их частей в различных сферах жизнедеятельности человека с учетом его сословной принадлежности.",
  "Источниковая база включает пособия по сельскому хозяйству и ветеринарии, документы Аптекарского приказа, Медицинской канцелярии и Медицинской коллегии, фондов Дворцового ведомства, монастырские хозяйственные записи, документы личного происхождения, лексикографические данные.",
  "Названия растений, встречающиеся в источниках, соотнесены с современной ботанической номенклатурой.",
];

function StartPageAboutBlockContent({ aboutRef = null }) {
  let [searchParams] = useSearchParams();
  if (getParamsInObject(searchParams)?.text) return <></>;
  return (
    <Box id="about-project-content" mt={10} mb={10} ref={aboutRef}>
      <Grid
        container
        rowSpacing={6}
        columnSpacing={0}
        sx={{ position: "relative" }}
      >
        <Grid
          item
          xs={12}
          sm={12}
          md={7}
          sx={{
            "& :first-of-type": {
              mb: { xs: "1rem", sm: "1rem", md: "4rem" },
            },
          }}
        >
          <Typography
            {...AOS_INTRO_BLOCK}
            component={"div"}
            variant="about_text"
            textAlign={"left"}
            sx={{ fontSize: { xs: "18px", sm: "20px", md: "24px" } }}
          >
            {TEXT_ABOUT[0]}
          </Typography>
          <Typography
            {...AOS_INTRO_BLOCK}
            component={"div"}
            variant="about_text"
            textAlign={"left"}
            sx={{ fontSize: { xs: "18px", sm: "20px", md: "24px" } }}
          >
            {TEXT_ABOUT[1]}
          </Typography>
        </Grid>
        <Grid
          item
          xs={6}
          sm={6}
          md={5}
          sx={{
            display: { xs: "flex" },
            position: {
              xs: "relative",
              sm: "relative",
              md: "relative",
            },
            right: 0,
            top: {
              xs: "100px",
            },
          }}
        >
          <Box
            {...AOS_INTRO_IMAGE(1)}
            sx={{
              width: {
                xs: "100px",
                sm: "150px",
                md: "200px",
                lg: "300px",
              },
            }}
          >
            <CardMedia
              component="img"
              sx={{
                position: "relative",
                bottom: {
                  xs: "60px",
                  sm: "60px",
                  md: "-60px",
                  lg: "20px",
                  xl: "60px",
                },
              }}
              src={img1}
              id="img1"
              alt="bg-image"
            />
          </Box>
          <Box
            {...AOS_INTRO_IMAGE(2,true)}
            sx={{
              width: {
                xs: "100px",
                sm: "150px",
                md: "200px",
                lg: "300px",
              },
            }}
          >
            <CardMedia
              component="img"
              sx={{
                position: "relative",
                bottom: {
                  xs: "60px",
                  sm: "60px",
                  md: "80px",
                  lg: "100px",
                  xl: "100px",
                },
              }}
              src={img2}
              id="img2"
              alt="bg-image"
            />
          </Box>
        </Grid>
        <Grid item xs={6} sm={6} md={5} sx={{ display: { xs: "flex" } }}>
          <Box
            {...AOS_INTRO_IMAGE(1,true)}
            sx={{
              width: {
                xs: "100px",
                sm: "150px",
                md: "200px",
                lg: "300px",
              },
            }}
          >
            <CardMedia
              component="img"
              sx={{
                position: "relative",
                bottom: {
                  xs: "-28px",
                  sm: "-20px",
                  md: "0px",
                  lg: "0px",
                  xl: "0px",
                },
                left: {
                  xs: "0px",
                  sm: "0px",
                  md: "0px",
                  lg: "0px",
                  xl: "0px",
                },
              }}
              src={img3}
              id="img3"
              alt="bg-image"
            />
          </Box>
          <Box
            {...AOS_INTRO_IMAGE(2)}
            sx={{
              width: {
                xs: "100px",
                sm: "150px",
                md: "200px",
                lg: "300px",
              },
            }}
          >
            <CardMedia
              component="img"
              sx={{
                width: "300px",
                position: "relative",
                bottom: {
                  xs: "-46px",
                  sm: "-46px",
                  md: "0px",
                  lg: "40px",
                  xl: "40px",
                },
                left: {
                  xs: "20px",
                  sm: "0px",
                  md: "0px",
                  lg: "0px",
                  xl: "0px",
                },
              }}
              src={img4}
              id="img4"
              alt="bg-image"
            />
          </Box>
        </Grid>
        <Grid item xs={12} sm={12} md={7} 
          sx={{
            "& :first-of-type": {
              mb: { xs: "1rem", sm: "1rem", md: "4rem" },
            },
          }}
          >
          <Typography
            {...AOS_INTRO_BLOCK}
            component={"div"}
            variant="about_text"
            textAlign={"left"}
            sx={{ fontSize: { xs: "18px", sm: "20px", md: "24px" } }}
          >
            {TEXT_ABOUT[2]}
          </Typography>
          <Typography
            {...AOS_INTRO_BLOCK}
            component={"div"}
            variant="about_text"
            textAlign={"left"}
            sx={{ fontSize: { xs: "18px", sm: "20px", md: "24px" } }}
          >
            {TEXT_ABOUT[3]}
          </Typography>
        </Grid>
        {/* <Grid item xs={12} sm={12} md={7} sx={{}}>
          <Typography
            {...AOS_INTRO_BLOCK}
            component={"div"}
            variant="about_text"
            textAlign={"left"}
            sx={{ fontSize: { xs: "18px", sm: "20px", md: "24px" } }}
          >
          </Typography>
        </Grid>
        <Grid item xs={12} sm={12} md={5} sx={{}}>
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
              width: "100%",
            }}
          >
            <Box
            {...AOS_INTRO_IMAGE(1)}
              sx={{
                width: {
                  xs: "200px",
                  sm: "250px",
                  md: "300px",
                  lg: "350px",
                },
              }}
            >
              <CardMedia
                component="img"
                sx={{
                  width: "400px",
                  position: "relative",
                  bottom: {
                    xs: "0px",
                    sm: "0px",
                    md: "0px",
                    lg: "0px",
                    xl: "0px",
                  },
                }}
                src={img5}
                id="img5"
                alt="bg-image"
              />
            </Box>
          </Box>
        </Grid> */}
      </Grid>
    </Box>
  );
}

export default StartPageAboutBlockContent;
