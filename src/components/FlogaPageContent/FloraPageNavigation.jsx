import { Box, Button } from "@mui/material";
import React from "react";

function FloraPageNavigation() {
  function handleScrollToBlock(event) {
    const floraCollection = document.getElementsByClassName("floraBlock");
    for (const key in floraCollection) {
      if (Object.hasOwnProperty.call(floraCollection, key)) {
        const elem = floraCollection[key];
    console.log(elem);

        if (elem.id === event.currentTarget.id)
          elem.scrollIntoView({
            behavior: "smooth",
          });
      }
    }
  }
  return (
    <Box
      mt={2}
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
        id="flora-page-content"
        onClick={handleScrollToBlock}
        sx={{ textDecoration: "underline" }}
      >
        Флора XVIII века
      </Button>
      <Button
        variant="text"
        disableRipple
        id="flora-page-other-block"
        onClick={handleScrollToBlock}
        sx={{ textDecoration: "underline" }}
      >
        Разное
      </Button>
    </Box>
  );
}

export default FloraPageNavigation;
