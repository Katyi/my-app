import React, { useEffect, useState } from "react";
import Circle from "@uiw/react-color-circle";
import { Box, Container, Popper,Paper } from "@mui/material";
import { CHART_COLORS_LIST } from "../../utils/ChartsUtils";

function ColorPicker({
  color,
  handler = (color) => {},
  anchorEl,
  setAnchorEl,
  plant,
}) {
  const [hex, setHex] = useState(color);
  const handleClick = (event) => {
    setAnchorEl(anchorEl ? null : event.currentTarget);
  };

  useEffect(() => {
    if (hex ) {
      handler(hex);
      setAnchorEl(null);
      setHex(null);
    }
  }, [hex]);
  const open = Boolean(anchorEl);
  const id = open ? "simple-popper" : undefined;
  return (
    <>
      <Circle
        id={plant}
        colors={[color]}
        onClick={handleClick}
        aria-describedby={id}
      />
      <Popper
        id={id}
        open={open}
        anchorEl={anchorEl}
        placement="left-start"
        sx={{
          width: "106px",
          p: 0,
        }}
      >
        <Container maxWidth="20px" disableGutters>
          <Box
          component={Paper}
          elevation={1}
            sx={{
              p: 1,
              bgcolor: "background.paper",
              display: "flex",
              borderRadius: "8px",
              borderWidth:'1px',
              borderColor:'lightgray',
              "&>div": {
                justifyContent: "flex-start",
                alignItems: "center",
              },
              "&>div>div": {
                m: "0 0!important",
              },
            }}
          >
            <Circle
              colors={CHART_COLORS_LIST}
              color={hex}
              style={{
                gap: 1,
              }}
              onChange={(color) => {
                setHex(color.hex);
              }}
            />
          </Box>
        </Container>
      </Popper>
    </>
  );
}

export default ColorPicker;
