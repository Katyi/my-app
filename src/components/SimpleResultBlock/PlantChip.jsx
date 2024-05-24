import { Box, IconButton, Typography } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import ReplayIcon from "@mui/icons-material/Replay";

const buttonColor = "#028e4a";
function PlantChip({ plant, handleAddPlantFilter, handleRemovePlantFilter, handleNavigateToOnePlant }) {
  return (
    <Box
      className="plant-chip"
      id={"plant-chip-" + plant.id}
      sx={{
        display: "flex",
        flexDirection: "column",
        borderRadius: "8px",
        p: "10px 12px",
        border: `1px solid ${buttonColor}`,
        minWidth: "330px",
        maxWidth:'450px',
        minHeight: '100px',
        justifyContent: "space-between",
        alignItems:'flex-start',
        position: "relative",
        "&.filtered-plant": {
          border: "1px solid rgba(2, 142, 74, 0.3)",
          color: "rgba(2, 142, 74, 0.3)",
        },
        "&.filtered-plant>.close-button": {
          display: "none",
        },
        "&.filtered-plant>.remove-button": {
          display: "inline-flex",
          opacity: 1,
        },
      }}
    >
      <Typography
        fontWeight={"700"}
        variant="chip_title"
        id={plant.id}
        sx={{ 
          width:"calc(100% - 20px)"
        }}
        onClick={handleNavigateToOnePlant}
      >
        {plant.name}
      </Typography>
      
      <Typography variant="chip_title_rus"
        id={plant.id}
        sx={{ 
        }}
        onClick={handleNavigateToOnePlant}>
        {plant.rusNomenclatureName}
      </Typography>
      <IconButton
        id={plant.id}
        onClick={handleAddPlantFilter}
        disableFocusRipple
        disableRipple
        disableTouchRipple
        className="close-button"
        sx={{
          position: "absolute",
          display:!handleRemovePlantFilter?'none':'inherit',
          top: "0",
          right: "0",
          borderRadius: "8px",
          "&:hover": {
            color: "rgba(235, 7, 7, 0.6)",
          },
        }}
      >
        <CloseIcon />
      </IconButton>
      <IconButton
        id={plant.id}
        className="remove-button"
        disableFocusRipple
        disableRipple
        disableTouchRipple
        sx={{
          position: "absolute",
          top: "0",
          right: "0",
          borderRadius: "8px",
          display: "none",
          width: "40px",
          height: "40px",
          m: "auto 0",
          color: buttonColor,
          "& svg:hover": {
            animation: "spin 2s linear infinite",
          },
          "@keyframes spin": {
            "0%": {
              transform: "rotate(360deg)",
            },
            "100%": {
              transform: "rotate(0deg)",
            },
          },
        }}
        onClick={handleRemovePlantFilter}
      >
        <ReplayIcon />
      </IconButton>
    </Box>
  );
}
export {PlantChip}