import { Box, Stack, Typography } from '@mui/material';

const LexemeBarChartTooltip = ({active, payload, label}) => {
  // console.log(active)
  // console.log(payload)
  // console.log(label)
  if (active && payload.length) {
    return (
      <Box
        style={{
          backgroundColor: "#fff",
          border: "1px solid #999",
          margin: 0,
          padding: "10px",
          minWidth: "260px",
        }}
      > 
        <Stack direction={"row"} justifyContent={"space-between"}>
          <Stack direction={"column"} gap={"4px"}>
            <Typography
              sx={{
                fontWeight: 700,
                fontSize: "14px",
              }}
            >
              ЛЕКСЕМЫ
            </Typography>
          </Stack>
          <Typography
            sx={{
              fontWeight: 700,
            }}
          >
            {label}
          </Typography>
        </Stack>
        <Stack
          direction={"column"}
          gap={"4px"}
          border={`1px solid #1f77b4d9`}
          borderRadius={"5px"}
          p={1}
        >
          {payload.map((el, index) => (
            <Typography 
              key={index}
              textAlign={"left"}
              fontSize={12}
              color="gray"
            >
              <span style={{fontWeight: 700}}>{el.name}</span>: {el.value.toFixed(2)}%
            </Typography>
          ))}
        </Stack>
      </Box>
    )
  }
}

export default LexemeBarChartTooltip;