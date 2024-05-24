import { Backdrop, Box, Chip, Fade, IconButton, Paper, Popper, Typography, ButtonGroup, Button } from "@mui/material";
import React, { useState } from "react";
import SettingsIcon from "@mui/icons-material/Settings";
import { GRAPH_QUERYTYPE_FIELD_DATASET } from "../../dataset/FormDataset"
import { useDispatch, useSelector } from "react-redux";
import { setFields, removeField, clearAllFields, } from "../../reducers/appReducer"
function ResultSettingUpBlock() {
  const fields = useSelector(state => state.phytolex.fields)
  const dispatch = useDispatch()
  const [open, setOpen] = useState(false);
  const [activeAllButton, setActiveAllButton] = useState(false)
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
    setOpen((prev) => !prev);
    if (fields.length === 28) setActiveAllButton(true)
  };

  const handleClickChip = (event, field) => {
    if (fields.find(item => item.formikName === field.formikName)) {
      dispatch(removeField(field.formikName))
      setActiveAllButton(false)
    } else {
      dispatch(setFields(field))
    }
    // 
  };

  const handleRemoveAllChips = () => {
    dispatch(clearAllFields())
    setActiveAllButton(false)
  }

  const handleSetActiveAll = () => {
    setActiveAllButton(!activeAllButton)
    if (activeAllButton) {
      dispatch(clearAllFields())
    } else {
      Object.keys(GRAPH_QUERYTYPE_FIELD_DATASET).map((key) => {
        if (!fields.find(item => item.formikName === key)) {
          const field = GRAPH_QUERYTYPE_FIELD_DATASET[key]
          dispatch(setFields(field))
        }
      })
    }
  }

  return (
    <Box>
      <IconButton
        disableRipple
        onClick={handleClick}
        sx={{
          position: "relative",
          bottom: '1px',
          "&>*:hover": {
            color: "white",
          },
        }}
      >
        <SettingsIcon sx={{ color: "rgb(135, 109, 59)" }} />
      </IconButton>
      {
        open && <Backdrop open={open} onClick={() => setOpen(false)} />
      }
      <Popper
        open={open}
        anchorEl={anchorEl}
        placement={"bottom-end"}
        transition
      >
        {({ TransitionProps }) => (
          <Fade {...TransitionProps} timeout={350}>
            <Paper sx={{ maxWidth: '600px', p: 2 }}>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                  pb: 2,
                }}
              >
                <Typography variant="usage_caption" fontSize={16}>Выберите нужные поля</Typography>
                <ButtonGroup size="small" variant="outlined" aria-label="small button group">
                  <Button
                    id="active_all"
                    onClick={handleSetActiveAll}
                    sx={{
                      bgcolor: activeAllButton ? "#d0c7b6" : "",
                      color: activeAllButton ? "black" : "",
                    }}
                  >
                    Выбрать все
                  </Button>
                  <Button
                    onClick={() => setOpen(false)}
                  >
                    Сохранить
                  </Button>
                  <Button
                    id="remove_active_chips"
                    onClick={handleRemoveAllChips}
                  >
                    Отменить
                  </Button>
                </ButtonGroup>
              </Box>
              <Box display={'flex'} flexWrap={'wrap'} gap={"4px"}>
                {
                  Object.keys(GRAPH_QUERYTYPE_FIELD_DATASET).map((key, keyIndex) => {
                    const field = GRAPH_QUERYTYPE_FIELD_DATASET[key]
                    return (<Chip
                      key={"set_chip" + field?.formikName + key + keyIndex}
                      label={field.rus}
                      className={fields.find(item => item.formikName === field.formikName) ? "active" : ""}
                      variant={'filled'}
                      id={key}
                      onClick={(e) => handleClickChip(e, field)}
                    />)
                  })
                }

              </Box>
            </Paper>
          </Fade>
        )}
      </Popper>
    </Box>
  );
}

export default ResultSettingUpBlock;
