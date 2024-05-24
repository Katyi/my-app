import React from "react";
import { Box, CircularProgress, Typography, Tooltip } from "@mui/material";

function calculateCompletionPercentage(currentPage, totalPages) {
  if (currentPage < 1 || totalPages < 1) {
    return 0; // Некорректные входные данные
  }

  const completionPercentage = (currentPage / totalPages) * 100;
  return Math.min(completionPercentage, 100); // Ограничиваем значение до 100%
}
function ProgressCircularPercent({ currentPage, totalPages }) {
  const progress = calculateCompletionPercentage(currentPage, totalPages);
  return (
    <Box sx={{ position: "relative", display: "inline-flex" }}>
      <CircularProgress />
      <Box
        sx={{
          top: 0,
          left: 0,
          bottom: 0,
          right: 0,
          position: "absolute",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Tooltip
          title={`загружено ${currentPage} из ${totalPages}`}
          placement="bottom"
          componentsProps={{
            tooltip: {
              sx: {
                minHeight: "auto",
                minWidth: "auto",
                bgcolor: "white",
                display: "flex",
                justifyContent: "center",
                p: 1,
                alignItems: "center",
                border: "1px solid #e0e0e0",
                fontSize: "13px",
              },
            },
          }}
        >
          <Typography
            variant="simple_search_caption"
            component="div"
            color="text.secondary"
          >
            {`${Math.round(progress)}%`}
          </Typography>
        </Tooltip>
      </Box>
    </Box>
  );
}

export default ProgressCircularPercent;
