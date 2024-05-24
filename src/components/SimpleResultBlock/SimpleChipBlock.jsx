import { Divider, Grid, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPlantList, getParamsInObject } from "../../utils/SimpleResultUtils";
import { addSimpleFilter, removeSimpleFilter } from "../../reducers/appReducer";
import { SIMLE_QUERY_REQUEST_PLANTLIST } from "../../apollo/simplePlantList";
import { useLazyQuery } from "@apollo/client";
import { useNavigate, useSearchParams } from "react-router-dom";
import { AOS_INTRO_BLOCK, AOS_LOADER_BLOCK } from "../../dataset/Animations";
import { PlantChip } from "./PlantChip";

const color = "#d0c7b6";

function SimpleChipBlock() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const simpleFilter = useSelector((state) => state.phytolex.simpleFilter);
  let [searchParams] = useSearchParams();

  function removingClass(item, className) {
    item.classList.remove(className);
  }
  const [value, setValue] = useState({});

  const [getRequestPlantlist, { loading, error, data, refetch }] = useLazyQuery(
    SIMLE_QUERY_REQUEST_PLANTLIST(value)
  );

  useEffect(() => {
    if (Object.keys(value).length > 0) {
      if (!!data) {
        refetch({ ...value });
      } else {
        getRequestPlantlist({
          variables: {
            ...value,
          },
        });
      }
    } else {
      //
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
    } else {
      setValue({});
    }
  }, [searchParams]);

  useEffect(() => {
    const filteredList = [...document.getElementsByClassName("filtered-plant")];
    const filteredListLength = filteredList.length;
    for (let i = 0; i < filteredListLength; i++) {
      removingClass(filteredList[i], "filtered-plant");
    }
    if (simpleFilter.length > 0) {
      simpleFilter.map((element) => {
        for (let item of document.getElementsByClassName("plant-chip")) {
          if (item.id === `plant-chip-${element}`) {
            item.classList.add("filtered-plant");
          }
        }
      });
    } else {
      for (let item of filteredList) {
        item.classList.remove("filtered-plant");
      }
    }
  }, [simpleFilter]);
  const plantList = getPlantList(data?.usagesConnection.edges);
  function handleClickOnePlant(event) {
    if (event.metaKey) {
      window.open(
        `${window.location.origin}/#/plant/${event.currentTarget.id}`,
        "_blank"
      );
    } else navigate(`/plant/${event.currentTarget.id}`);
  }
  const handleAddPlantFilter = (event) => {
    dispatch(addSimpleFilter(`${event.currentTarget.id}`));
  };
  const handleRemovePlantFilter = (event) => {
    dispatch(removeSimpleFilter(`${event.currentTarget.id}`));
  };

  if (
    !plantList.length ||
    plantList.length === 0 ||
    Object.keys(value).length === 0
  )
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
        <Grid item xs={12} sx={{ pt: "20px" }}></Grid>
      </Grid>
    );

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
      <Grid item xs={12} sx={{ pt: "20px" }} {...AOS_INTRO_BLOCK}>
        <Typography variant="simple_result_text">
          Растения (<b>{plantList.length}</b>)
        </Typography>
        <Divider color={color} />
      </Grid>
      <Grid
        item
        xs={12}
        {...AOS_INTRO_BLOCK}
        className="plant_chip_list_block"
        sx={{
          p: { xs: "10px 0", sm: "20px 40px" },
          display: "flex",
          gap: 3,
          flexWrap: "wrap",
          maxHeight: "32rem",
          overflowY: "auto",
          justifyContent: plantList.length > 3 ? "space-between" : "flex-start",
        }}
      >
        {plantList.map((plant, index) => {
          return (
            <PlantChip
              {...AOS_LOADER_BLOCK}
              key={"plant-chip-" + index}
              plant={plant}
              handleNavigateToOnePlant={handleClickOnePlant}
              handleAddPlantFilter={handleAddPlantFilter}
              handleRemovePlantFilter={handleRemovePlantFilter}
            />
          );
        })}
      </Grid>
    </Grid>
  );
}

export default SimpleChipBlock;
