import { Slider, useMediaQuery } from "@mui/material";
import React from "react";
import { valuetext, YEAR_SLIDER_MARKS } from "../../dataset/FormDataset";
import { makeValidDateValue } from "../../utils/SimpleResultUtils";
import { useTheme } from "@emotion/react";

function SimpleDateSlider({ setFieldValue, date_filter }) {
  const theme = useTheme();
  const mobile = useMediaQuery(theme.breakpoints.down("sm"));
  return (
    <Slider
    sx={{
      position:'relative',
      top:20,
      "&>.MuiSlider-markLabel":{
        "&":{

        },
      }
    }}
    
      size="small"
      variant="filled"
      name={"date_filter"}
      scale={(x) => {
        return makeValidDateValue(x, false);
      }}
      marks={mobile?YEAR_SLIDER_MARKS.filter((e,i)=>i%2===0):YEAR_SLIDER_MARKS}
      min={1700 - 140}
      max={1825}
      defaultValue={[
        makeValidDateValue(date_filter[0], true),
        makeValidDateValue(date_filter[1], true),
      ]}
      value={[
        makeValidDateValue(date_filter[0], true),
        makeValidDateValue(date_filter[1], true),
      ]}
      getAriaLabel={() => "Source year range"}
      onChange={(e) => {
        setFieldValue("date_filter",[
        makeValidDateValue(e.target.value[0], false),
        makeValidDateValue(e.target.value[1], false),
      ])
      }}
      valueLabelDisplay="on"
      getAriaValueText={valuetext}
    />
  );
}

export default SimpleDateSlider;