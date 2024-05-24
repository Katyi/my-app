import { Divider, Grid, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { getParamsInObject } from "../../utils/SimpleResultUtils";

import { useLazyQuery } from "@apollo/client";
import { useSearchParams } from "react-router-dom";
import { SIMLE_QUERY_REQUEST_PICTURELIST } from "../../apollo/simplePictureList";
import PicturesCarousel from "../PicturesCarousel/PicturesCarousel";
import { AOS_INTRO_BLOCK } from "../../dataset/Animations";

const color = "#d0c7b6";
const buttonColor = "#028e4a";

function SimplePictureBlock() {
  let [searchParams, setSearchParams] = useSearchParams();

  const [value, setValue] = useState({});

  const [getRequestPlantlist, { loading, error, data, refetch }] = useLazyQuery(
    SIMLE_QUERY_REQUEST_PICTURELIST
  );
  const pictures = data?.pictures;
  useEffect(() => {
    if (!!data) {
      refetch({ ...value });
    } else {
      if (Object.keys(value).length > 0) {
        getRequestPlantlist({
          variables: {
            ...value,
          },
        });
      }
    }
  }, [value]);

  useEffect(() => {
    //если появились результаты, отправляем запрос на список растений
    const variables = getParamsInObject(searchParams);
    if (!!Object.keys(variables).length) {
      const requestData = {
        text: variables.text,
        start_year: +variables.start_year,
        finish_year: +variables.finish_year,
      };
      setValue({ ...requestData });
    }
  }, [searchParams]);

  if (!pictures) return <></>;
  if (!pictures.length || pictures.length === 0)
    return (
      <Grid
        container
        sx={{
          bgcolor: "white",
          width: "100%",
          overflow: "hidden",
          height: "auto",
        }}
      >
        <Grid item xs={12}></Grid>
      </Grid>
    );

  const herbariumPictures = pictures.filter((pic) => pic.collection.length > 0);
  const illustrationPictures = pictures.filter(
    (pic) => pic?.publicationSource?.shortName
  );
  return (
    <Grid
      container
      sx={{
        bgcolor: "white",
        width: "100%",
        overflow: "hidden",
        minHeight: "auto",
      }}
    >
      {herbariumPictures.length > 0 && (
        <>
          <Grid item xs={12} sx={{ pt: "20px" }}
            {...AOS_INTRO_BLOCK}>
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
    </Grid>
  );
}

export default SimplePictureBlock;
