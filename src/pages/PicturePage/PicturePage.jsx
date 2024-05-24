import { useQuery } from "@apollo/client";
import {
  Box,
  Button,
  CardMedia,
  Container,
  Grid,
  Stack,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import InnerImageZoom from "react-inner-image-zoom";
import { useNavigate, useParams } from "react-router-dom";
import { GET_ONE_PICTURE } from "../../apollo/onePicture";
import FullSizeViewDialog from "../../components/PicturesCarousel/FullSizeViewDialog";
import ProgressBlock from "../../components/ProgressBlock/ProgressBlock";
import SaveIcon from "@mui/icons-material/Save";
import ImageSearchIcon from "@mui/icons-material/ImageSearch";
import "react-inner-image-zoom/lib/InnerImageZoom/styles.min.css";

const color = "#d0c7b6";

function PicturePage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { loading, error, data } = useQuery(GET_ONE_PICTURE, {
    variables: { id: id },
  });
  const [open, setOpen] = useState(false);


  function handleClickLexeme(event) {
    navigate(`/plant/${event.currentTarget.id}`);
  }

  const handleClickOpen = (event) => {
    setOpen(true);
    // navigate(`/picture/${event.currentTarget.id}`);
  };

  const handleClose = () => {
    setOpen(false);
  };
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
        <ProgressBlock label="изображение" />
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
          Что-то пошло не так, изображение не найдено
        </Typography>
      </Container>
    );
  }
  const picture = data.pictures[0];
  if (picture) {
    return (
      <Container
        maxWidth="lg"
        sx={{
          mt: 4,
          mb: "100px",
        }}
      >
        <Grid container mt={4} rowSpacing={2}>
          <Grid item xs={12} md={4}>
            <Box
              display={"flex"}
              flexDirection={"column"}
              gap={2}
              sx={{
                width: "100%",
                borderRadius: "8px",
                border: "2px solid",
                borderColor: color,
                p: "22px 15px",
              }}
            >
                {picture.plantDepicted &&
                  picture.plantDepicted.length > 0 && (
                  // picture.plantDepicted[0] && (
              
              <Box display={"flex"} flexDirection={"column"} gap={1}>
                <Typography variant="usage_caption" sx={{ cursor: "default" }}>
                  растение
                </Typography>
                {picture.plantDepicted.map(item =>
                    <Typography
                      key={item?.plantName.id}
                      variant="source_summary_encoding"
                      onClick={() =>
                        navigate(
                          `/plant/${item?.plantName.id}`
                        )
                      }
                    >
                      {item?.plantName?.name}
                      <br />
                      <br />
                      {item?.plantName?.rusNomenclatureName}
                    </Typography>)}
              </Box>
                  )}
              {picture?.publicationSource && (
                <Box display={"flex"} flexDirection={"column"}>
                  <Typography variant="source_summary_text">
                    {picture?.publicationSource?.fullCitation}
                    {picture?.pagesFromPublication
                      ? ` С. ${picture?.pagesFromPublication}`
                      : ``}
                  </Typography>
                </Box>
              )}
              {picture?.placeWhereStored?.name && (
                <Box display={"flex"} flexDirection={"column"}>
                  <Typography variant="usage_caption">
                    место хранения
                  </Typography>
                  <Typography variant="source_summary_text">
                    {picture?.placeWhereStored?.name}
                  </Typography>
                </Box>
              )}
              {picture?.collection.length > 0 && (
                <Box display={"flex"} flexDirection={"column"}>
                  <Typography variant="usage_caption">
                    название коллекции
                  </Typography>
                  <Typography variant="source_summary_text">
                    {picture.collection}
                  </Typography>
                </Box>
              )}
              <Box
              sx={{
                display:'flex',
                flexDirection:'column',
                gap:1
              }}
              >
                <Typography variant="usage_caption">
                  исходное изображение
                </Typography>
                <Stack direction={'row'} justifyContent={'space-between'}>
                <Button
                  // as={"a"}
                  sx={{
                    p: 0,  
                    display: "flex",
                    alignItems: "center",
                    gap: 0.4,
                    textDecoration: "none",
                    "& > .MuiTypography-root": {
                      textDecoration: "none",
                    },
                  }}
                  variant="text"
                  href={`${picture.img.url}`}
                  target="_blank"
                >
                  <ImageSearchIcon />
                  <Typography
                    variant="picture_btn_label"
                    textTransform={"uppercase"}
                  >
                    открыть
                  </Typography>
                </Button>
                <Button
                  // as={"a"}
                  sx={{
                    p: 0,
                    display: "flex",
                    alignItems: "center",
                    gap: 0.4,
                    textDecoration: "none",
                    "& > .MuiTypography-root": {
                      textDecoration: "none",
                    },
                  }}
                  variant="text"
                  href={`${picture.img.url}`}
                  download
                >
                  <SaveIcon />
                  <Typography
                    variant="picture_btn_label"
                    textTransform={"uppercase"}
                  >
                    сохранить
                  </Typography>
                </Button>
                </Stack>
              </Box>
            </Box>
          </Grid>
          <Grid
            item
            xs={12}
            md={8}
            sx={{ display: "flex", justifyContent: "center",pl:"32px" }}
          >
            <CardMedia
              component={'img'}
              sx={{
                maxWidth:'100%',
                objectFit:'contain',
                maxHeight:'600px',
              }}
              // src={`${picture.img?.representation || picture.img?.url || "#"}`}
              src={`https://phytolex.eusp.org${picture.img?.representation && picture.img?.url || "#"}`}
            />
            {/* <img
              // src={`${picture.img.representation}`}
              onClick={handleClickOpen}
              src={`http://qstand.art:8034${picture.img.representation}`}
              alt={picture.name}
              loading="lazy"
            /> */}
          </Grid>
        </Grid>
        <FullSizeViewDialog
          picture={picture}
          open={open}
          handleClose={handleClose}
        />
      </Container>
    );
  }
}

export default PicturePage;
