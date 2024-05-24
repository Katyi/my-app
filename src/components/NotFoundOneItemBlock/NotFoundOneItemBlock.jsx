import { Button, Container, Typography } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";

function NotFoundOneItemBlock({ error }) {
  const navigate = useNavigate();
  return (
    <Container
      maxWidth="lg"
      sx={{
        minHeight: "800px",
        display: "flex",
        flexDirection: "column",
        gap: 6,
        pt: 12,
        pb: 12,
      }}
    >
      <Typography
        variant="about_subtitle"
        sx={{
          width: "100%",
          textAlign: "center",
        }}
      >
        К сожалению, произошла ошибка передачи данных!
      </Typography>
      <Typography
        variant="about_subtitle"
        component={Button}
        onClick={() => navigate("/")}
        sx={{
          width: "100%",
          textAlign: "center",
          textDecoration: "underline",
        }}
      >
        На главную
      </Typography>
      <Typography
        variant="about_text"
        sx={{
          width: "100%",
          textAlign: "center",
        }}
      >
        {error}
      </Typography>
    </Container>
  );
}

export default NotFoundOneItemBlock;
