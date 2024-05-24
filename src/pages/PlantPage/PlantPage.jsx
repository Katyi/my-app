import { useQuery } from "@apollo/client";
import {
  Box,
  CircularProgress,
  Container,
  Divider,
  Grid,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { GET_ONE_PLANT } from "../../apollo/onePlant";
import PicturesCarousel from "../../components/PicturesCarousel/PicturesCarousel";
import { getValidDatasetForOnePlant } from "../../utils/OnePlantUtils";
import PlantSummary from "./PlantSummary";

const color = "#d0c7b6";
const borderColor="#028e4a"
function PlantPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [options, setOptions] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const { loading, error, data } = useQuery(GET_ONE_PLANT, {
    variables: { id: id },
  });
  function handleClickLexeme(event) {
    navigate(`/lexeme/${event.currentTarget.id}`);
  }
  if (loading) {
    return (
      <Container
        maxWidth="lg"
        sx={{
          mt: 4,
          mb: 4,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <CircularProgress size={200} color="primary" />{" "}
      </Container>
    );
  }
  if (error) {
    return (
      <Container
        maxWidth="lg"
        sx={{
          mt: 4,
          mb: 4,
          display: "flex",
          justifyContent: "center",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography variant="h3" color="error">
          К сожалению, растение не найдено
        </Typography>
      </Container>
    );
  }
  if (data) {
    // const oneQuote = data.usages[0];
    const dataset = getValidDatasetForOnePlant(data)
    const { name,nameRus, items, kingdom, links, pictures} = dataset;
    const herbariumPictures = pictures.filter((pic) => pic.collection.length > 0);
    const illustrationPictures = pictures.filter(
      (pic) => pic?.publicationSource?.shortName
    );
    // const pictures = data?.pictures
    return (
      <Container
        maxWidth="lg"
        sx={{
          mt: 4,
          mb: "100px",
        }}
      >
        <Grid container rowSpacing={4}>
          <Grid
            item
            xs={12}
            md={6}
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-start",
            }}
          >
          {
            Object.keys(links).length >0 &&  <>
              <Typography variant="usage_caption" component={"div"}>
                информация о растении
              </Typography>
              <PlantSummary links={links} kingdom={kingdom}/>
            </>
          }
          </Grid>

          <Grid
            item
            xs={12}
            md={6}
            sx={{
              order: { xs: -1, md: "inherit" },
              display: "flex",
              flexDirection: "column",
              alignItems: { xs: "flex-start", md: "flex-end" },
            }}
          >
            <Typography variant="usage_caption" component={"div"}>
              растение
            </Typography>
            <Typography variant="usage_plant_label" textAlign={{ xs: "start", md: "end" }}>{name}</Typography>
            <Typography variant="usage_plant_label_sub" textAlign={{ xs: "start", md: "end" }}>{nameRus}</Typography>
          </Grid>

          {herbariumPictures.length > 0 && (
        <>
          <Grid item xs={12} sx={{ pt: "20px" }}>
            <Typography variant="simple_result_text">
              Гербарии: (<b>{herbariumPictures.length}</b>)
            </Typography>
            <Divider color={color} />
          </Grid>
          <Grid
            item
            xs={12}
            className="plant_chip_list_block"
            sx={{
              p: "20px 40px",
              display: "flex",
              flexDirection: "row",
              gap: 3,
              flexWrap: "wrap",
              maxHeight: "32rem",
              overflowY: "auto",
            }}
          >
            <PicturesCarousel pictures={herbariumPictures} />
          </Grid>
        </>
      )}

      {illustrationPictures.length > 0 && (
        <>
          <Grid item xs={12} sx={{ pt: "20px" }}>
            <Typography variant="simple_result_text">
              Иллюстрации: (<b>{illustrationPictures.length}</b>)
            </Typography>
            <Divider color={color} />
          </Grid>
          <Grid
            item
            xs={12}
            className="plant_chip_list_block"
            sx={{
              p: "20px 40px",
              display: "flex",
              flexDirection: "row",
              gap: 3,
              flexWrap: "wrap",
              maxHeight: "32rem",
              overflowY: "auto",
            }}
          >
            <PicturesCarousel pictures={illustrationPictures} />
          </Grid>
        </>
      )}
           <Grid item xs={12} mt={6} sx={{}}>
            {items && items.length>0  && (
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "12px",
                  flexWrap: "wrap",
                  overflow: "hidden",
                }}
              >
                <Typography variant="usage_plant_lexeme_caption" component={"div"}
                sx={{
                  
                    borderBottom:'1px solid',
                    borderColor:borderColor,
                }}
                >
                  Cвязанные лексемы ({items.length}):
                </Typography>
                <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "4px",
                  flexWrap: "wrap",
                  overflow: "hidden",
                  pl:5,
                }}
                >
                  {items.map((lexeme, index) => {
                    return (
                      <Typography
                        variant="usage_plant_lexeme_name"
                        key={"lexeme-" + lexeme + index}
                        id={lexeme.id}
                        onClick={handleClickLexeme}
                        sx={{}}
                      >
                       <span>{index+1}{". "}</span> {lexeme.name}
                      </Typography>
                    );
                  })}
                </Box>
              </Box>
            )}
          </Grid>
          
        </Grid>
      </Container>
    );
  } else {
    return (
      <div>
        <CircularProgress size={200} color="primary" />{" "}
      </div>
    );
  }
}

export default PlantPage;
