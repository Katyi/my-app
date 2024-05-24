import { Container } from "@mui/material";
import AboutPageContent from "../../components/AboutPageContent/AboutPageContent";
import AboutPageNavigation from "../../components/AboutPageContent/AboutPageNavigation";
import TeamBlockContent from "../../components/AboutPageContent/TeamBlockContent";
import CustomHelmet from "../../components/Helmet/CustomHelmet";

function AboutPage() {
  return (
    <Container
      maxWidth="lg"
      sx={{
        minHeight: "800px",
      }}
    >
      <CustomHelmet title={"О проекте"}/>
      <AboutPageNavigation />
      <AboutPageContent />
      <TeamBlockContent />
    </Container>
  );
}

export default AboutPage;
