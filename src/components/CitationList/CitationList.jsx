import { Box, Typography } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";
import PdfPartsView from "../PdfPartsView/PdfPartsView";
import RawHTML from "../SimpleResultBlock/RawHTML";
import { get_image_pdf } from "../../utils/AdvancedResultUtils";

function CitationList({ list, page }) {
  const navigate = useNavigate();
  function handleNavigateOneCitation(event) {
    navigate(`/citation/${event.currentTarget.id}`);
  }
  return (
    <>
      {list
        .map((e) => {
          return { ...e.node };
        })
        .map((oneCitation, oneCitationIndex, array) => {
          const imagePDF = get_image_pdf(oneCitation)
          const isLast = oneCitationIndex === array.length-1
          return (
            <Box
              id={oneCitation.id} 
              className={'with_hover'}
              key={
                "usage_quote_text" +
                oneCitation.originalQuote +
                oneCitation.id +
                Date() +
                oneCitationIndex
              }
              onClick={handleNavigateOneCitation}
              sx={{
                px:'2rem',
                py:'1rem',
                borderRadius:'4px',
                "&::after":{
                  display:isLast?'none':'block',
                  position:'relative',
                  top:'2rem',
                  content:'""',
                  height:'1px',
                  width:'100%',
                  background:'rgba(0, 0, 0, 0.12)'
                }
              }}
            >
              <Box  
              display={"flex"} 
              flexDirection={"column"} 
              width={"100%"} 
                >
                <Typography variant="usage_quote_text">
                  <RawHTML
                    dirtyHTML={`
                      ${
                      oneCitation.originalQuote ||
                      oneCitation.copyOfOriginalQuote ||
                      oneCitation.simplifiedQuote
                    }`}
                  />
                </Typography>
              </Box>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "30px",
                  p: "0 30px",
                  width: "100%",
                }}
              >
                {imagePDF &&
                  <PdfPartsView images={imagePDF} />
                  }
              </Box>
            </Box>
          );
        })}
    </>
  );
}

export default CitationList;
