import { Box, CardMedia, Tooltip, Typography } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";
import { AOS_LOADER_BLOCK } from "../../dataset/Animations";
const color = "#d0c7b6";

function PicturesCarousel({ pictures }) {
  const navigate = useNavigate();

  const handleNavigatePicture = (event) => {
    navigate(`/picture/${event.currentTarget.id}`);
  };

  function getTooltipTitle(picture) {
    if (!picture.collection || picture.collection.length === 0) {
      return (
        <Typography variant="plant_name" className="picture_plant_name">
          {picture?.publicationSource.shortName ||
            picture?.publicationSource.title}
        </Typography>
      );
    }
    return (
      <Typography variant="plant_name" className="picture_plant_name">
        {picture.collection} - {picture.plantDepicted[0].plantName.name}
      </Typography>
    );
  }
  return (
    <Box display={"flex"} alignItems={"center"} flexWrap={"wrap"} gap={2}>
      {pictures.map((picture, index) => (
        <Box key={picture.id + index + Date()} 
        {...AOS_LOADER_BLOCK}>
          <Tooltip
            arrow
            className={"picture_tooltip"}
            componentsProps={{
              tooltip: {
                sx: {
                  minHeight: "40px",
                  bgcolor: "white",
                  border: "2px solid",
                  borderColor: color,
                  display: "flex",
                  justifyContent: "flex-start",
                  p: 1,
                  alignItems: "center",
                  "& .MuiTooltip-arrow": {
                    color: color,
                  },
                },
              },
            }}
            title={getTooltipTitle(picture)}
          >
            <CardMedia
              component="img"
              // image={`http://qstand.art:8034/${picture.img.miniature}`}
              image={`https://phytolex.eusp.org${picture.img.miniature}`}
              // image={`${picture.img.miniature}`}
              alt={picture.name}
              loading="lazy"
              id={picture.id}
              height={160}
              onClick={handleNavigatePicture}
              sx={{
                cursor: "pointer",
                objectFit: "contain",
                width: "auto",
                "&:hover": {
                  transition: "transform 0.4s ease-out",
                  scale: "1.2",
                  border: `1px solid ${color}`,
                },
              }}
            />
          </Tooltip>
        </Box>
      ))}
    </Box>
  );
}

export default PicturesCarousel;