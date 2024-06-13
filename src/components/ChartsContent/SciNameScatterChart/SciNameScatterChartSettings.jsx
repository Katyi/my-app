import { useLazyQuery } from "@apollo/client";
import {
  Autocomplete,
  Box,
  Container,
  IconButton,
  InputBase,
  Stack,
  Tooltip,
  Typography,
} from "@mui/material";
import { FieldArray, Form, Formik, useFormik } from "formik";
import React, { useEffect, useState } from "react";
import { GET_SUGGESTIONS_CYR_LEXEME } from "../../../apollo/getSuggestions";
import AddIcon from "@mui/icons-material/Add";
import CloseIcon from "@mui/icons-material/Close";
import ColorPicker from "../../ColorPicker/ColorPicker";

function SciNameScatterChartSettings({ onNameChanged, initial = "", color_list, onColorChanged=(plant,color)=>{} }) {
  const color = "#d0c7b6";
  const [page, setPage] = useState(1);
  const [options, setOptions] = useState([]);
  const [anchorEl, setAnchorEl] = useState(null);
  const formik = useFormik({
    initialValues: {
      list:
        initial.length > 0
          ? initial.filter((p) => p !== "null" && p !== "undefined")
          : [""],
    },
    onSubmit: (values, actions) => {
      onNameChanged(values);
    },
  });

  const { handleChange, values, handleSubmit } = formik;

  const useSuggestionLat = () => {
    const usageLatScientificName = useLazyQuery(
      GET_SUGGESTIONS_CYR_LEXEME
    );
    return [usageLatScientificName];
  };
  const suggestionLat = useSuggestionLat();

  useEffect(() => {
    if (page > 1) loadMoreOptions();
  }, [page]);

  const handleScroll = (event) => {
    const listboxNode = event.currentTarget;
    const position = listboxNode.scrollTop + listboxNode.clientHeight;
    if (listboxNode.scrollHeight - position <= 1) {
      setPage((p) => p + 1);
    }
  };

  const loadMoreOptions = () => {
    const requestData = {
      text: values.list[0],
      textSub: ` ${values.list[0]}`,
      offset: page * 10,
    };
    setOptions([...generateOptions()]);
    fetchOptions(requestData);
  };

  const generateOptions = (index) => {
    const options_new = suggestionLat.every((r) => r[1]?.data)
      ? [
          ...new Map(
            suggestionLat[0][1]?.data?.usages.map((option) => {
              return [option.lexeme?.name, option];
            })
          ).keys(),
        ]
      : [];
    return [...new Set([...options, ...options_new])];
  };

  function fetchOptions(requestData) {
    const suggestions = suggestionLat;
    for (let i = 0; i < suggestions.length; i++) {
      const [action, data] = suggestions[i];
      if (!!data?.data) {
        data.refetch({ ...requestData });
      } else {
        action({ variables: { ...requestData } });
      }
    }
  }

  return (
    <Formik {...formik} onSubmit={handleSubmit}>
      {({ values, setFieldValue, handleSubmit }) => {
        // console.log('values',values.list);
        return (
          <Form>
            <Container maxWidth={"sm"}>
              <FieldArray name="list">
                {({ remove, push, insert, unshift, pop, form, ...other }) => {
                  return (
                    <Stack gap={2}>
                      {values?.list?.length > 0 &&
                        values.list.map((item, itemInd) => {
                          const current_color = color_list?.find(
                            (c) => String(values.list[itemInd]).includes(c.name) 
                          )?.color || "#7e71711c";
                          return (
                            <Stack key={itemInd + "   "} direction={"row"} alignItems={"center"}>
                              {/* Выбор цвета */}
                              <Stack justifyContent={"center"} pr={1}>
                                <ColorPicker
                                  anchorEl={anchorEl}
                                  setAnchorEl={setAnchorEl}
                                  color={current_color}
                                  plant={anchorEl?.id || item}
                                  handler={(color,plant)=>{
                                    onColorChanged(anchorEl?.id,color)
                                    setAnchorEl(null)
                                  }}
                                >
                                </ColorPicker>
                              </Stack>
                              {/* Поле инпут-список */}
                              
                              <Box
                                maxWidth="sm"
                                sx={{
                                  border: "2px solid",
                                  borderColor: color,
                                  borderRadius: "8px",
                                  bgcolor: "white",
                                  flexGrow: 1,
                                  boxShadow: `0 0 10px ${color}`,
                                  position: "relative",
                                }}
                              >
                                <Typography
                                  variant="simple_search_caption"
                                  sx={{
                                    position: "absolute",
                                    display:values.list[itemInd].length>0?'none':'block',
                                    top: { xs: "16px", sm: "-14px" },
                                    transition: "all .5s linear",
                                  }}
                                >
                                  Введите латинское или русское название растения
                                </Typography>
                                
                                <Tooltip 
                                  title={values.list[itemInd]|| "Например: виноград"}
                                  componentsProps={{
                                    tooltip: {
                                      sx: {
                                        minHeight: "auto",
                                        minWidth: "auto",
                                        bgcolor: "white",
                                        display: "flex",
                                        justifyContent: "center",
                                        p: 1,
                                        alignItems: "center",
                                        border: "1px solid #e0e0e0",
                                        fontSize: "13px",
                                      },
                                    },
                                  }} 
                                >
                                  
                                <Autocomplete
                                  freeSolo
                                  value={values.list[itemInd]}
                                  defaultValue={values.list[itemInd]}
                                  disableClearable={itemInd !== values.list.length - 1}
                                  onChange={(e, value) => {
                                    if (value) {
                                      setFieldValue(`list[${itemInd}]`, value);
                                      onNameChanged(
                                        values.list.map((el, i) =>
                                          i === itemInd ? value : el
                                        )
                                      );
                                    } else {
                                      const newList = values.list.length>1?values.list.filter((el,i)=>i!==itemInd):[""]
                                        setFieldValue(`list`, newList);
                                        onNameChanged(newList);
                                    }
                                  }}
                                  sx={{
                                    // height: "100%",
                                    // py: 1,
                                    // border: "0",
                                  }}
                                  options={generateOptions(itemInd)}
                                  renderInput={(params) => {
                                    const {
                                      InputLabelProps,
                                      InputProps,
                                      ...rest
                                    } = params;
                                    return (
                                      <InputBase
                                        id="text"
                                        name={`list[${itemInd}]`}
                                        type="text"
                                        {...params.InputProps}
                                        {...rest}
                                        onMouseDown={() => {
                                          return generateOptions(itemInd)
                                            .length === 0
                                            ? fetchOptions({
                                                text: "",
                                                textSub: ` ${""}`,
                                                offset: 0,
                                              })
                                            : undefined;
                                        }}
                                        tabIndex={1}
                                        onChange={(e) => {
                                          if (options.length > 0) setOptions([]);
                                          if (page !== 1) setPage(1);
                                          handleChange(e);
                                          const value = e.target.value;
                                          if (value && value.length > 1) {
                                            const requestData = {
                                              text: value,
                                              textSub: ` ${value}`,
                                              offset: 0,
                                            };
                                            fetchOptions(requestData);
                                          }
                                        }}
                                        
                                        value={values.list[itemInd]}
                                        sx={{
                                          height: "100%",
                                          py: 1,
                                          border: "0",
                                          pl: { xs: "12px", sm: "12px" },
                                          textTransform: "uppercase",
                                          fontSize: "16px",
                                          opacity: "0.8",
                                          color: "rgba(0, 0, 0, 1)",
                                          fontWeight: "700",
                                          letterSpacing: "0.13em",
                                          alignItems: "center",
                                          lineHeight: "30px",
                                          marginBottom: "-2px",
                                          "&>input": {
                                            pt: 0,
                                          },
                                        }}
                                      />
                                    );
                                  }}
                                  renderOption={(props, option, info, {options}) => {
                                    delete props['key'];
                                    return (
                                      <Box component={"li"} key={option} {...props}>
                                        {option}
                                      </Box>
                                    )
                                  }}
                                  ListboxProps={{
                                    onScroll: handleScroll,
                                  }}
                                  clearIcon={
                                    <CloseIcon
                                      sx={{
                                        borderRadius: 0,
                                        "&:hover": {
                                          color: "red",
                                        },
                                      }}
                                    />
                                  }
                                />
                                </Tooltip>
                              </Box>

                              {/* Иконкa удаления поля поиска */}
                              <IconButton
                                width={16}
                                height={16}
                                disableRipple
                                disabled={itemInd !== values.list.length - 1}
                                onClick={() => {
                                  remove(itemInd);
                                  onNameChanged(
                                    values.list.filter((v, i) => i !== itemInd)
                                  );
                                }}
                                sx={{
                                  borderRadius: 0,
                                  opacity:
                                    itemInd !== values.list.length - 1 ? 0 : 1,
                                  "&:hover": {
                                    color: "red",
                                  },
                                }}
                              >
                                <CloseIcon />
                              </IconButton>
                            </Stack>
                          );
                        })}
                      {values.list.length < 4 && (
                        <Stack
                          direction={"row"}
                          justifyContent={"space-between"}
                        >
                          <IconButton
                            width={16}
                            height={16}
                            onClick={() => push("")}
                            disableRipple
                            sx={{
                              borderRadius: 0,
                              "&:hover": {
                                color: "rgb(2, 142, 74)",
                              },
                            }}
                          >
                            <AddIcon />
                          </IconButton>
                        </Stack>
                      )}
                    </Stack>
                  );
                }}
              </FieldArray>
            </Container>
          </Form>
        );
      }}
    </Formik>
  );
}

export default SciNameScatterChartSettings;