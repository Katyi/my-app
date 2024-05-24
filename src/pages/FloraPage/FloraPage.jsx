import React from 'react'
import { Container } from '@mui/material';
import FloraPageContent from '../../components/FlogaPageContent/FloraPageContent';
import CustomHelmet from '../../components/Helmet/CustomHelmet';

function FloraPage() {
  return (
    <Container
      maxWidth="lg"
      sx={{
        minHeight: "800px",
        display: "flex",
        flexDirection: "column",
        gap: 6,
        pb: 12,
        pt:6,
      }}
    >
    <CustomHelmet title={"Блог"}/>
      <FloraPageContent />
    </Container>
  )
}

export default FloraPage