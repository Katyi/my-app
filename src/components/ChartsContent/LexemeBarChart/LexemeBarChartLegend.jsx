import { Box, Typography } from "@mui/material";
import { FaSquareFull } from "react-icons/fa";

const LexemeBarChartLegend = ({payload , colors}) => {
  return (
    <Box 
      sx={{
        width: "30vh",
        maxHeight: "45vh",
        display:"flex",
        flexDirection:"column",
        alignItems: "start",
        gap: "5px",
        padding: "10px",
        overflow: "scroll",
        borderRadius: "5px",
        backgroundColor: "#fff",
        border: "1px solid #999",
      }}
    >
      {payload.map((entry, index) => (
        <Box sx={{display: "flex", alignItems:"center", gap:"10px"}} key={index}>
          <FaSquareFull style={{height: "10px"}} size={18} color={colors[index]} />
          <Typography sx={{fontSize: 10}}>
            {entry.value}
          </Typography>
        </Box>
      ))}
    </Box>
  )
}

export default LexemeBarChartLegend;