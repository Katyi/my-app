import React, { useRef } from "react";
import { Box, Container, Typography } from "@mui/material";
import StartPageAboutBlockContent from "../../components/AboutPageContent/StartPageAboutBlockContent";
import ArrowScrollDown from "../../components/ArrowScrollDown/ArrowScrollDown";
import SimpleResultBlock from "../../components/SimpleResultBlock/SimpleResultBlock";
import SimpleSearchBlock from "../../components/SimpleSearchBlock/SimpleSearchBlock";
// import { Nowrap } from "../../utils/SimpleResultUtils";
import SimpleChipBlock from "../../components/SimpleResultBlock/SimpleChipBlock";
import SimplePictureBlock from "../../components/SimpleResultBlock/SimplePictureBlock";
import { AOS_INTRO_BLOCK } from "../../dataset/Animations";

function StartPage() {
  const aboutRef = useRef(null);

  const handlescrollToAboutBlock = () => {
    window.scrollTo({
      top: aboutRef.current.offsetTop,
      left: 0,
      behavior: "smooth",
    });
  };

  return (
    <>
      <Container
        maxWidth="lg"
        component={"div"}
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          pt: { xs: "8vh", sm: "15vh" },
          minHeight: "calc(100vh - 162px)",
        }}
      >
        <Box
          display={"flex"}
          flexDirection={"column"}
          gap={".4rem"}
          minWidth={'min(720px, 80%)'}
          pb={4}
          {...AOS_INTRO_BLOCK}
          position={"relative"}
          top={{xs:"-100px",md:"-162px"}}
        >
          <Typography
            variant="main_title"
            color="initial"
            textAlign={"center"}
            width={"100%"}
            sx={{
            }}
          >
            <span> PhytoLex</span>
          </Typography>
           <Typography
            variant="main_title"
            color="initial"
            textAlign={"center"}
            width={"100%"}
          >
            Этноботаническая база данных
          </Typography>
          {/* ФОРМА ПОИСКА */}
         <SimpleSearchBlock />
        </Box>
      </Container>
      {/* DATA */}
      <SimpleChipBlock />
      <SimplePictureBlock />
      <SimpleResultBlock />
      <StartPageAboutBlockContent aboutRef={aboutRef} />
      <ArrowScrollDown
        handlescrollToAboutBlock={handlescrollToAboutBlock}
        // vision={result ? "none" : "inline-flex"}
      />
    </>
  );
}

export default StartPage;
