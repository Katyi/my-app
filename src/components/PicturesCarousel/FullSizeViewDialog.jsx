import {
  Box,
  Container,
  Dialog,
  DialogActions,
  DialogTitle,
  Grid,
  IconButton,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import { useNavigate } from "react-router-dom";

const color = "#d0c7b6";

function FullSizeViewDialog({ open, handleClose, picture }) {
  const navigate = useNavigate();
  return (
    <Dialog fullScreen open={open} onClose={handleClose}>
      <DialogActions>
        {/* <IconButton  onClick={close} sx={{
            position:'absolute',
            top:10,
            right:10,
            borderRadius:0,
            "&:hover":{
              color:'red'
            }
          }}> */}
        Нажмите Esc для выхода
        {/* <CloseIcon fontSize="large"/> */}
        {/* </IconButton> */}
      </DialogActions>
      <Container maxWidth="xl">
        <Grid container mt={4} rowSpacing={2}>
          {/* <Grid item xs={12} md={4}>
            <Box
              display={"flex"}
              flexDirection={"column"}
              gap={2}
              sx={{
                width: "100%",
                borderRadius: "8px",
                border: "2px solid",
                borderColor: color,
                p: "22px 15px",
              }}
            >
              <Box display={"flex"} flexDirection={"column"} gap={1}>
                <Typography variant="usage_caption" sx={{ cursor: "default" }}>
                  растение
                </Typography>
                <Typography
                  variant="source_summary_encoding"
                  onClick={() =>
                    navigate(`/plant/${picture.plantDepicted[0].plantName.id}`)
                  }
                >
                  {picture.plantDepicted[0].plantName.name}
                  <br />
                  <br />
                  {picture.plantDepicted[0].plantName.rusNomenclatureName}
                </Typography>
              </Box>
              {picture?.publicationSource && (
                <Box display={"flex"} flexDirection={"column"}>
                  <Typography variant="source_summary_text">
                    {picture?.publicationSource?.fullCitation }
                    {picture?.pagesFromPublication ? ` С. ${picture?.pagesFromPublication}`:``}
                  </Typography>
                </Box>
              )}
              {picture?.placeWhereStored?.name && (
                <Box display={"flex"} flexDirection={"column"}>
                  <Typography variant="usage_caption">
                    место хранения
                  </Typography>
                  <Typography variant="source_summary_text">
                    {picture?.placeWhereStored?.name}
                  </Typography>
                </Box>
              )}
              {picture?.collection.length > 0 && (
                <Box display={"flex"} flexDirection={"column"}>
                  <Typography variant="usage_caption">
                    название коллекции
                  </Typography>
                  <Typography variant="source_summary_text">
                    {picture.collection}
                  </Typography>
                </Box>
              )}
            </Box>
          </Grid> */}
          <Grid
            item
            xs={12}
            
            sx={{ display: "flex", justifyContent: "center" }}
          >
            <img
              src={`${picture.img.representation}`}
              // src={`http://qstand.art:8034${picture.img.representation}`}
              alt={picture.name}
              loading="lazy"
            />
          </Grid>
        </Grid>
      </Container>
    </Dialog>
  );
}

export default FullSizeViewDialog;
