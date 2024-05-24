import { Box, Button, Stack, Typography } from "@mui/material";
import { useErrorBoundary } from "react-error-boundary";
import {
  CustomImageBlock1,
  CustomImageBlock2,
  CustomImageBlock3,
} from "../AboutPageContent/AboutPageContent";

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

const IMAGE_LIST = [
  <CustomImageBlock1 />,
  <CustomImageBlock2 />,
  <CustomImageBlock3 />,
];
function ErrorFallback({ error, sub_message }) {
  const { resetBoundary } = useErrorBoundary();
  console.error(error);
  const image_index = getRandomInt(0, 2);
  return (
    <Box
      role="alert"
      minHeight={"400px"}
      display={"flex"}
      alignItems={"center"}
      justifyContent={"center"}
    >
      <Box sx={{ transform: "scale(0.5)" }} columns={6}>
        {IMAGE_LIST[image_index]}
      </Box>
      <Stack gap={1}>
        <Typography
          variant="about_title"
          paragraph
          fontSize={"1rem"}
          color={"grey"}
        >
          {sub_message ? (
            <pre style={{ fontSize: "1rem", color: "teal" }}>{sub_message}</pre>
          ) : (
            "К сожалению, произошла ошибка"
          )}
        </Typography>
        <Typography variant="about_title" paragraph fontSize={"1.2rem"}>
          {error?.message}
        </Typography>
        <Box pt={4}>
          <Button onClick={resetBoundary} variant="contained">
            На главную
          </Button>
        </Box>
      </Stack>
    </Box>
  );
}

export { ErrorFallback };
