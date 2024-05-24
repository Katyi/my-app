import { Box, Button } from "@mui/material";
import React from "react";

function AboutPageNavigation() {
  function handleScrollToBlock(event) {
    const aboutCollection = document.getElementsByClassName("aboutBlock");
    for (const key in aboutCollection) {
      if (Object.hasOwnProperty.call(aboutCollection, key)) {
        const elem = aboutCollection[key];
        if (elem.id === event.currentTarget.id)
          elem.scrollIntoView({
            behavior: "smooth",
          });
      }
    }
  }
  return (
    <Box
      mt={6}
      width={"100%"}
      display={"flex"}
      justifyContent={"flex-end"}
      position={"sticky"}
      top={0}
      zIndex={10000}
      bgcolor={"white"}
    >
      <Button
        variant="text"
        disableRipple
        id="about-project-content"
        onClick={handleScrollToBlock}
        sx={{ textDecoration: "underline" }}
      >
        О проекте
      </Button>
      {/* временно коментируется кнопка Источники Пока он не выверен, лучше пусть будет только ссылка в тексте описания. */}
      {/* <Button
        variant="text"
        disableRipple
        id="about-project-all-sources-block"
        onClick={handleScrollToBlock}
        sx={{ textDecoration: "underline" }}
      >
        Источники
      </Button> */}
      <Button
        variant="text"
        disableRipple
        id="about-project-team-block"
        onClick={handleScrollToBlock}
        sx={{ textDecoration: "underline" }}
      >
        Участники
      </Button>
    </Box>
  );
}

export default AboutPageNavigation;
