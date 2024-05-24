import { Box, Typography } from "@mui/material";
import React from "react";
import SourceSummaryContent from "./SourceSummaryContent";

function SourceSummaryOneSource({ citation }) {
const {encoding, copyOfOriginalType} = citation?.copyOfOriginal ?? {}
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        minWidth: "260px",
        gap: 1,
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
          "& >.sourceName": {},
        }}
      >
        {encoding && (
          <Typography
            minHeight={"40px"}
            variant="one_source_summary_encoding"
            className="sourceName"
            fontWeight={700}
          >
            {encoding}
          </Typography>
        )}
        {copyOfOriginalType?.name &&
          copyOfOriginalType?.name !==
            "публикация как источник" && (
            <Typography variant="usage_caption">
              {copyOfOriginalType.name}
            </Typography>
          )}
      </Box>
      <SourceSummaryContent citation={citation} isSourcePage={true}/>
    </Box>
  );
}

export default SourceSummaryOneSource;
