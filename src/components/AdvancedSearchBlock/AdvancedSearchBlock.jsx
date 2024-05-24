import { Box, Container, Typography } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";

import AdvancedSearchForm from "./AdvancedSearchForm";
import { isIE,isSafari } from 'react-device-detect';

const color="#d0c7b6"
function AdvancedSearchBlock() {
  const navigate = useNavigate();
  const handleClearSearch = () => {
    navigate("/adv-search");
    if (isIE || isSafari) document.location.reload(); else navigate(0)
  }
  return (
    <Box
      sx={{
        width: "100%",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Container maxWidth="md">
        <Box
          sx={{display:'flex',justifyContent:'space-between'}}
        >
          <Typography variant="simple_search_caption" >
            Параметры поиска
          </Typography>
          <Typography 
            variant="simple_search_caption" 
            onClick={handleClearSearch}
            sx={{
              cursor: "pointer",
              "&:hover": {
                textDecoration: "underline",
              },
            }} 
          >
           сбросить
          </Typography>
        </Box>
      </Container>
      <Container
        maxWidth="md"
        sx={{
          flexDirection: "column",
          borderRadius: "8px",
          border: `2px solid ${color}`,
          p: {xs:2,md:"64px 64px 32px 64px"},
        }}
      >
        <AdvancedSearchForm />
      </Container>
    </Box>
  );
}

export default AdvancedSearchBlock;
