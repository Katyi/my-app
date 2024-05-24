import { Box, CardMedia, Tooltip } from "@mui/material";
import { useState } from "react";
import icon from "../../images/export-excel-icon.png";
import ExportContent from "./ExportContent";

const color = "#d0c7b6";

function ExportBlock() {
  const [open, setOpen] = useState(false)

  return (
    <Box
      sx={{
        p: "2rem 0",
        display: "flex",
        justifyContent: "flex-start",
      }}
    >
      <Tooltip
        title="Cкачать результаты поиска в формате .xlsx"
        componentsProps={{
          tooltip: {
            sx: {
              minHeight: "40px",
              bgcolor: "white",
              border: "2px solid",
              borderColor: color,
              fontSize: "1rem",
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
      >
        <CardMedia
            onClick={(e) =>
              setOpen(true)
            }
            component="img"
            image={icon}
            height="48"
            alt="export to excel"
            sx={{
              width: "48px",
              cursor: "pointer",
              objectFit: "contain",
            }}
          />
      </Tooltip>
      {
        open && <ExportContent clb={setOpen}/>
      }
    </Box>
  );
}

export default ExportBlock;
