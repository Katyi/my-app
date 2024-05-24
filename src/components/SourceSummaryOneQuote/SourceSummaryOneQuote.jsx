import { Box, Typography } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";
import SourceSummaryContent from "./SourceSummaryContent";

function SourceSummaryOneQuote({ citation, isPopper = false }) {
  const navigate = useNavigate();
  function handleOneSource(event) {
    navigate(`/source/${event.currentTarget.id}`);
  }
  return (
    <Box
      sx={{
        border: "2px solid rgba(75, 174, 96, 0.4)",
        bgcolor: "white",
        color: "black",
        borderRadius: "8px",
        minWidth: { xs: "100%", md: "80%" },
        maxWidth: "100%",
        minHeight: '10vh',
        // maxHeight: '30vh',
        p: "22px 15px",
        mt: "10px",
        display: "flex",
        flexDirection: "column",
        gap: 1,
        overflow: "hidden",
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
          "& >.sourceName": {
            opacity: isPopper ? "0.6" : "1",
          },
        }}
      >
        <Typography
          minHeight={40}
          variant="source_summary_encoding"
          className="sourceName"
          id={citation.copyOfOriginal.id}
          onClick={handleOneSource}
        >
          {citation.copyOfOriginal.encoding}
        </Typography>
        {
          citation.copyOfOriginal?.copyOfOriginalType?.name &&
          citation.copyOfOriginal?.copyOfOriginalType?.name !==
          "публикация как источник" && (
          <Typography variant="usage_caption">
            {citation.copyOfOriginal.copyOfOriginalType.name}
          </Typography>
        )}
      </Box>
      <SourceSummaryContent citation={citation} />
    </Box>
  );
}

export default SourceSummaryOneQuote;
