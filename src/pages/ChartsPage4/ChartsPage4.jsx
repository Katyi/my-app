import { Box, Link, Typography } from "@mui/material";
import React from "react";
import CustomHelmet from "../../components/Helmet/CustomHelmet";
import LexemeInOriginalTableContent from "../../components/ChartsContent/LexemeInOriginalTable/LexemeInOriginalTableContent";

function ChartsPage4() {
  const color = "#d0c7b6";

  return (
    <Box
      sx={{
        display: "flex",
        flexWrap: "wrap",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        gap: "10px",
      }}
    >
      <CustomHelmet title={"Визуализация"} />
      <Box minWidth={"50%"} sx={{width: "500px", height: "30px"}}>
        <Link href="/charts-links" underline="none" sx={{color: color}}>Обратно в список визуализации</Link>
      </Box>
      <Typography
        variant="about_subtitle"
        sx={{
          width: "100%",
          textAlign: "center",
          mt: 3,
        }}
      >
        Сравнение источников
      </Typography>
      <LexemeInOriginalTableContent />
    </Box>
  );
}

export default ChartsPage4; 