import { Box, CardMedia, Grid, Typography } from "@mui/material";
import React from "react";
import { ABOUT_CONTENT } from "../../dataset/AboutProjectContent";
import { AOS_INTRO_BLOCK, AOS_INTRO_IMAGE } from "../../dataset/Animations";
import img1 from "../../images/1.png";
import img2 from "../../images/2.png";
import img3 from "../../images/3.png";
import img4 from "../../images/4.png";
import img5 from "../../images/5.png";
import RawHTML from "../SimpleResultBlock/RawHTML";

export function CustomImageBlock1() {
  return <Grid
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
        bgcolor={'red'}
        sx={{
          // width: "300px",
          position: "relative",
          bottom: {
            xs: "60px",
            sm: "60px",
            md: "-60px",
            lg: "20px",
            xl: "60px",
          },
          // left: {
          //   xs: "40px",
          //   sm: "40px",
          //   md: "60px",
          //   lg: "60px",
          //   xl: "120px",
          // },
        }}
        src={img2}
        id="img2"
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
          // width: "250px",
          position: "relative",
          bottom: {
            xs: "60px",
            sm: "60px",
            md: "80px",
            lg: "100px",
            xl: "100px",
          },
        }}
        src={img1}
        id="img1"
        alt="bg-image"
      />
    </Box>
  </Grid>
}

export function CustomImageBlock2() {
  return <Grid item xs={6} sm={6} md={5} sx={{ display: { xs: "flex" } }}>
    <Box
       {...AOS_INTRO_IMAGE(1,true)}
      sx={{
        width: {
          xs: "100px",
          sm: "150px",
          md: "200px",
          lg: "300px",
        },
        // bgcolor: {
        //   xs: "red",
        //   sm: "green",
        //   md: "yellow",
        //   lg: "blue",
        // },
      }}
    >
      <CardMedia
        component="img"
        sx={{
          // width: "300px",
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
}

export function CustomImageBlock3() {
  return <Grid item xs={12} sm={12} md={5} sx={{}}>
    <Box
      sx={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        width: "100%",
      }}
    >
      <Box
       {...AOS_INTRO_IMAGE(3)}
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
  </Grid>
}

function AboutPageContent() {
  return (
    <Box id="about-project-content" className="aboutBlock" mt={10} mb={10}>
      <Grid container rowSpacing={6} columnSpacing={0} sx={{ position: 'relative' }}>
        <Grid item xs={12} sm={12} sx={{}}>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
            }}
          >
            <Typography variant="about_title" paragraph>
              PhytoLex
            </Typography>
            <Typography
              variant="about_subtitle"
              paragraph
              sx={{
                fontSize: {
                  xs: "16px",
                  sm: "20px",
                  md: "36px",
                },
              }}
            >
              Этноботаническая база данных
            </Typography>
          </Box>
        </Grid>
        {
          ABOUT_CONTENT.map((paragraph, index, array) => {
            return (
              <Grid container xs={12} 
              id={index===1?"about-project-all-sources-block":""}
              className={index===1?"aboutBlock":""}

              item key={new Date().toDateString()+ index+paragraph.slice(0,10)}>
                {
                  index === 3 && <CustomImageBlock2/>
                }
                <Grid
                  item
                  xs={12}
                  sm={12}
                  md={index !== 0 ? index !== 3 ? index !== 7 ? 12 : 7 : 7 : 7}
                  sx={{
                    "& :first-of-type": {
                      mb: { xs: '1rem' },
                    },
                    "& >* > ol": {
                      listStyleType: 'none', /* Убираем исходные маркеры */
                      counterReset:  'item', /* Обнуляем счетчик списка */
                      "& > li:before": {
                        content: "counter(item) ') '", /* Добавляем к числам скобку */
                        counterIncrement: 'item', /* Задаём имя счетчика */
                      }
                    }
                  }}
                >
                  <Typography
                    {...AOS_INTRO_BLOCK}
                    component={"div"}
                    variant="about_text"
                    textAlign={"left"}
                    sx={{
                      fontSize: { xs: '18px', sm: '20px', md: '24px' },
                    }}>
                    <RawHTML
                      dirtyHTML={paragraph}
                    />
                  </Typography>
                </Grid>
                {
                  index === 0 && <CustomImageBlock1 />
                }
                {
                  index === 7 && <CustomImageBlock3 />
                }
              </Grid>
            )
          })
        }
      </Grid>
    </Box>
  );
}

export default AboutPageContent;
