import { Typography, Select, MenuItem, Stack } from "@mui/material";
import React from "react";

function ElementPerPageSelector({ offset, handler }) {
  const options = [10, 25, 50, 100];

  const handleChange = (event) => {
    handler(event.target.value);
  };

  return (
    <Stack direction={'row'} alignItems={'center'} height={'40px'} gap={1} alignSelf={'flex-end'}>
      <Typography variant="simple_search_caption">Показывать по:</Typography>
      <Select value={offset} onChange={handleChange} variant="filled" 
      sx={{
          height:'40px'
      }}
      inputProps={{
        sx:{
          p:0,
          pl:.8,
        }
      }}>
        {options.map((option) => (
          <MenuItem key={option} value={option}>
            {option}
          </MenuItem>
        ))}
      </Select>
    </Stack>
  );
}

export default ElementPerPageSelector;
