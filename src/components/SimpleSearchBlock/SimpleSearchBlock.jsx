import { useEffect, useState } from "react";
import {
  Box,
  Button,
  Container,
  InputBase,
  Typography,
  Autocomplete,
} from "@mui/material";
import { sendMetrik } from "../../utils/metriks";
import { useFormik } from "formik";
import * as yup from "yup";
import { useSelector } from "react-redux";
import { useLazyQuery } from "@apollo/client";
import { useSearchParams } from "react-router-dom";
import { getParamsInObject } from "../../utils/SimpleResultUtils";
import {
  GET_SUGGESTIONS_CYR_LEXEME,
  GET_SUGGESTIONS_CYR_PICTURE_PLANT_NAME,
  GET_SUGGESTIONS_CYR_USAGE_PLANT_NAME,
  GET_SUGGESTIONS_LAT_NAME_OF_LATIN_SOURCE,
  GET_SUGGESTIONS_LAT_PICTURE_PLANT,
  GET_SUGGESTIONS_LAT_SCIENTIFIC_NAME,
  GET_SUGGESTIONS_NAME_OF_LATIN_RECORD,
} from "../../apollo/getSuggestions";
import SimpleDateSlider from "./SimpleDateSlider";
import CustomHelmet from "../Helmet/CustomHelmet";
import { AOS_INTRO_BLOCK } from "../../dataset/Animations";

const validationSchema = yup.object({
  text: yup
    .string("Введите тело запроса")
    .min(2, "Минимум два символа")
    .required("Поле обязательное"),
});

function SimpleSearchBlock() {
  const result = useSelector((state) => state.phytolex.result);
  const [page, setPage] = useState(1);
  const [options, setOptions] = useState([]);

  const color = "#d0c7b6";
  const buttonColor = "#028e4a";
  let [searchParams, setSearchParams] = useSearchParams();
  const { text, yearStart, yearEnd } = getParamsInObject(searchParams);
  let initialValues = {
    text: text || "",
    date_filter: [+yearStart || 1000, +yearEnd || 1825],
  };

  const useSuggestionCyr = () => {
    const lexemeNames = useLazyQuery(GET_SUGGESTIONS_CYR_LEXEME);
    const usageCyrPlantName = useLazyQuery(
      GET_SUGGESTIONS_CYR_USAGE_PLANT_NAME
    );
    const usageCyrPicturePlantName = useLazyQuery(
      GET_SUGGESTIONS_CYR_PICTURE_PLANT_NAME
    );
    return [lexemeNames, usageCyrPicturePlantName, usageCyrPlantName];
  };

  const useSuggestionLat = () => {
    const usageLatNameOfLatinSources = useLazyQuery(
      GET_SUGGESTIONS_LAT_NAME_OF_LATIN_SOURCE
    );

    const usageLatNameOfLatinRecord = useLazyQuery(
      GET_SUGGESTIONS_NAME_OF_LATIN_RECORD
    );
    const usageLatPicturePlantName = useLazyQuery(
      GET_SUGGESTIONS_LAT_PICTURE_PLANT
    );
    const usageLatScientificName = useLazyQuery(
      GET_SUGGESTIONS_LAT_SCIENTIFIC_NAME
    );
    return [
      usageLatNameOfLatinRecord,
      usageLatNameOfLatinSources,
      usageLatPicturePlantName,
      usageLatScientificName,
    ];
  };
  const suggestionLat = useSuggestionLat();
  const suggestionCyr = useSuggestionCyr();

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: validationSchema,
    enableReinitialize: true,
    onSubmit: (values) => {
      setSearchParams({
        text: values.text,
        yearStart: values.date_filter[0],
        yearEnd: values.date_filter[1],
      });
      sendMetrik("reachGoal", "SimpleSearchSubmit");
    },
  });
  useEffect(() => {
    if (page > 1) loadMoreOptions();
  }, [page]);

  const handleViewHidden = () => {
    const elems = document.getElementsByClassName("hidden");
    for (let i = 0; i < elems.length; i + 1) {
      elems.item(i).classList.remove("hidden");
    }
  };
  const handleScroll = (event) => {
    const listboxNode = event.currentTarget;

    const position = listboxNode.scrollTop + listboxNode.clientHeight;
    if (listboxNode.scrollHeight - position <= 1) {
      setPage((p) => p + 1);
    }
  };
  const loadMoreOptions = () => {
    const requestData = {
      text: formik.values.text,
      textSub: ` ${formik.values.text}`,
      offset: page * 10,
    };
    setOptions([...generateOptions()]);
    fetchOptions(requestData);
  };
  const generateOptions = () => {
    const options_new = !formik.values.text
      ? []
      : formik.values.text.match(/[a-z]/i) //lat
      ? suggestionLat.every((r) => r[1].data)
        ? [
            ...new Map(
              suggestionLat[0][1].data.usages
                .map((option) => {
                  return [option.nameOfLatinRecord, option];
                })
                .concat(
                  suggestionLat[1][1].data.usages.map((option) => {
                    return [option.nameOfLatinSource, option];
                  })
                )
                .concat(
                  suggestionLat[2][1].data.pictures.map((option) => {
                    return [option.plantDepicted[0].plantName.name, option];
                  })
                )
                .concat(
                  suggestionLat[3][1].data.usages.map((option) => {
                    return [option.scientificName[0].name, option];
                  })
                )
            ).keys(),
          ]
        : []
      : suggestionCyr.every((r) => r[1].data) /*rus */
      ? [
          ...new Map(
            suggestionCyr[0][1].data.usages
              .map((option) => {
                return [option.lexeme.name, option];
              })
              .concat(
                suggestionCyr[1][1].data.pictures.map((option) => {
                  return [
                    option.plantDepicted[0].plantName.rusNomenclatureName,
                    option,
                  ];
                })
              )
              .concat(
                suggestionCyr[2][1].data.usages.map((option) => {
                  return [option.scientificName[0].rusNomenclatureName, option];
                })
              )
          ).keys(),
        ]
      : [];
    return [...new Set([...options, ...options_new])];
  };
  function fetchOptions(requestData) {
    const suggestions = requestData.text.match(/[a-z]/i)
      ? suggestionLat
      : suggestionCyr;

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
    <Box
      sx={{
        minHeight: "auto",
        // width: "100%",
        pt: { xs: "1rem" },
        display: "flex",
        flexDirection: "column",
        gap: "60px",
      }}
    >
      <CustomHelmet title={text && text?.length > 0 ? text : null} />
      <form onSubmit={formik.handleSubmit}>
        <Container
          {...AOS_INTRO_BLOCK}
          disableGutters
          maxWidth="md"
          sx={{
            minHeight: "130px",
            position: "relative",
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <Typography
            variant="simple_search_caption"
            color="initial"
            className={formik.values?.text.length > 0 ? "" : "hidden"}
            sx={{
              position: "absolute",
              top: { xs: "16px", sm: "8px" },
              left: 0,
              transition: "all .5s linear",
            }}
          >
            Введите русское или латинское название растения
          </Typography>
          <Box
            sx={{
              display: "flex",
              boxSizing: "content-box",
              flexGrow: 1,
              height: { xs: "50px", sm: "70px" },
              overflow: "hidden",
              bgcolor: "white",
              boxShadow: `0 0 10px ${color}`,
              borderRadius: "8px",
            }}
          >
            <Box
              sx={{
                border: "2px solid",
                borderColor: color,
                borderTopLeftRadius: "8px",
                borderBottomLeftRadius: "8px",
                bgcolor: "white",
                flexGrow: 1,
                borderRight: "none",
                boxShadow: `0 0 10px ${color}`,
              }}
            >
              <Autocomplete
                fullWidth
                freeSolo
                disableClearable
                value={formik.values.text}
                defaultValue={formik.values.text}
                onFocus={handleViewHidden}
                onChange={(e, value) => {
                  formik.setFieldValue("text", value);
                }}
                sx={{
                  height: "100%",
                  padding: "0",
                  border: "0",
                }}
                options={generateOptions()}
                renderInput={(params) => {
                  const { InputLabelProps, InputProps, ...rest } = params;
                  return (
                    <InputBase
                      id="text"
                      name="text"
                      type="text"
                      {...params.InputProps}
                      {...rest}
                      tabIndex={1}
                      onTouchStart={handleViewHidden}
                      onChange={(e) => {
                        if (options.length > 0) setOptions([]);
                        if (page !== 1) setPage(1);
                        formik.handleChange(e);
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
                      value={formik.values.text}
                      sx={{
                        height: "100%",
                        border: "0",
                        pl: { xs: "12px", sm: "30px" },
                        textTransform: "uppercase",
                        fontSize: "24px",
                        opacity: "0.8",
                        color: "rgba(0, 0, 0, 1)",
                        fontWeight: "700",
                        letterSpacing: "0.13em",
                        lineHeight: "30px",
                        "&>input": {
                          pt: 0,
                        },
                      }}
                    />
                  );
                }}
                renderOption={(props, option, info, { options }) => {
                  delete props['key'];
                  return (
                    <Box component="li" key={option} {...props}>
                      {option}
                    </Box>
                  );
                }}
                ListboxProps={{
                  onScroll: handleScroll,
                }}
              />
            </Box>
            <Box
              sx={{
                borderTopRightRadius: "8px",
                borderBottomRightRadius: "8px",
                overflow: "hidden",
                border: "2px solid",
                backgroundColor: buttonColor,
                borderColor: buttonColor,
              }}
            >
              <Button
                onClick={formik.handleSubmit}
                type="submit"
                disableRipple
                tabIndex={1}
                sx={{
                  height: "100%",
                  width: "120px",
                  borderRadius: 0,
                  fontSize: "20px",
                  textTransform: "uppercase",
                  fontFamily: "'Playfair Display', serif",
                  pt: "2px",
                  fontWeight: 700,
                  backgroundColor: buttonColor,
                  color: "white",
                  "&:focus-visible": {
                    backgroundColor: "blue",
                  },
                  "&:hover": {
                    boxShadow: "none",
                    color: buttonColor,
                    backgroundColor: "white",
                  },
                  "@media (max-width:768px)": {
                    width: "80px",
                    fontSize: "14px",
                    pt: "6px",
                  },
                }}
              >
                найти
              </Button>
            </Box>
          </Box>
        </Container>
        <Container
          maxWidth="md"
          className={formik.values?.text.length > 0 ? "" : "hidden"}
          sx={{
            transition: "all 2s linear",
          }}
        >
          <SimpleDateSlider
            setFieldValue={formik.setFieldValue}
            date_filter={formik.values.date_filter}
          />
        </Container>
      </form>
    </Box>
  );
}

export default SimpleSearchBlock;
