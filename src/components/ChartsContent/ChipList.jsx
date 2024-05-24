import { Chip, Container, IconButton, Stack } from "@mui/material";
import React from "react";
import CloseIcon from "@mui/icons-material/Close";

function ChipList({
  options=[],
  exceptions=[],
  handleClick = () => {
    console.log("click");
  },
  handlePickAll = () => {
    console.log("pick all");
  },
  variant
}) {
  const {verbose_name} = variant
  return (
      <Stack direction={"row"} gap={1}  alignItems={'center'} flexWrap={'wrap'}>
        {options &&
          options.length > 0 &&
          options.map((opt, index) => {
            return (
              <Chip
                onClick={() => handleClick(opt)}
                sx={{
                  bgcolor:!exceptions[verbose_name] || !exceptions[verbose_name].includes(opt)  ? "inherit":"#d0c7b6!important",
                  order:!opt ? -1 : 'inherit'
                }}
                key={`chip-option-chart ${opt}+${index}`}
                label={`${opt === null ? variant.nullName : opt}`}
                
                variant={!exceptions[verbose_name] || !exceptions[verbose_name].includes(opt) ? "outlined" : "filled"}
              />
            );
          })}
          {/* {exceptions && <IconButton onClick={handlePickAll}><CloseIcon/></IconButton>
          } */}
      </Stack>
  );
}

export default ChipList;
