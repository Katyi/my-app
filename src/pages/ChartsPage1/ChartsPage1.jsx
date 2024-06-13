import { Box, Typography } from "@mui/material";
import React from "react";
import CustomHelmet from "../../components/Helmet/CustomHelmet";
import SciNameScatterChartContent from "../../components/ChartsContent/SciNameScatterChart/SciNameScatterChartContent";

function ChartsPage1() {
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
      <Typography
        variant="about_subtitle"
        sx={{
          width: "100%",
          textAlign: "center",
          mt: 3,
        }}
      >
        Визуализация
      </Typography>
      <SciNameScatterChartContent />
    </Box>
  );
}

export default ChartsPage1;