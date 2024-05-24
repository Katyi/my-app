import {
  Box,
  Button,
  IconButton,
  InputBase,
  MenuItem,
  Select,
  Typography,
  Container,
  Tooltip,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Field, FieldArray, Form, Formik } from "formik";
import React, { useLayoutEffect } from "react";
import * as yup from "yup";
import AddIcon from "@mui/icons-material/Add";
import ClearIcon from "@mui/icons-material/Clear";
import { generateAdvancedFormInitialFromParams } from "../../utils/QueryRequestUtils";
import {
  CONTAIN_DATASET,
  GRAPH_QUERYTYPE_FIELD_DATASET,
  SEARCH_PARAMS_CONTAIN_LABEL,
} from "../../dataset/FormDataset";
import { useSearchParams } from "react-router-dom";
import {
  getParamsInObject,
} from "../../utils/SimpleResultUtils";
import {
  GET_SIMPLE_SUGGESTIONS_LEXEME,
  GET_SIMPLE_SUGGESTIONS_SCIENTIFIC_NAME,
  GET_SIMPLE_SUGGESTIONS_NAME_OF_LATIN_SOURCE,
  GET_SIMPLE_SUGGESTIONS_NAME_OF_LATIN_RECORD,
  GET_SIMPLE_SUGGESTIONS_FUNCTION,
  GET_SIMPLE_SUGGESTIONS_DISEASE_AS_IN_SOURCE,
  GET_SIMPLE_SUGGESTIONS_VET_DISEASE_AS_IN_SOURCE,
  GET_SIMPLE_SUGGESTIONS_MEDICINAL_FORM,
  GET_SIMPLE_SUGGESTIONS_PLANT_PART_USED,
  GET_SIMPLE_SUGGESTIONS_PLANT_PART_USED_IN_SOURCE,
  GET_SIMPLE_SUGGESTIONS_PLANT_PART,
  GET_SIMPLE_SUGGESTIONS_LIFE_FORM_IN_SOURCE,
  GET_SIMPLE_SUGGESTIONS_STORAGE_TYPE,
  GET_SIMPLE_SUGGESTIONS_SOCIAL_CLASS,
  GET_SIMPLE_SUGGESTIONS_ETHNO_LIST,
  GET_SIMPLE_SUGGESTIONS_PLACE_DISTRIBUTION,
  GET_SIMPLE_SUGGESTIONS_PLACE_ACQUISITION,
  GET_SIMPLE_SUGGESTIONS_PLACE,
  GET_SIMPLE_SUGGESTIONS_ORIGINAL_WORD,
  GET_SIMPLE_SUGGESTIONS_TRANSMISSION_METHOD,
  GET_SIMPLE_SUGGESTIONS_LANGUAGE,
  GET_SIMPLE_SUGGESTIONS_LANGUAGE_AFFILIATION,
  GET_SIMPLE_SUGGESTIONS_LANGUAGE_FOR_OTHER_NAMES,
  GET_SIMPLE_SUGGESTIONS_FIGURATIVE_MEANING,
  GET_SIMPLE_SUGGESTIONS_ETYMON,
  GET_SIMPLE_SUGGESTIONS_PART_OF_SPEECH,
  GET_SIMPLE_SUGGESTIONS_COPY_OF_ORIGINAL,
  GET_SIMPLE_SUGGESTIONS_COPY_OF_ORIGINAL_TYPE,
  GET_SIMPLE_SUGGESTIONS_ORIGINAL,
  GET_SIMPLE_SUGGESTIONS_ORIGINAL_TYPE,
  GET_SIMPLE_SUGGESTIONS_AUTHOR,
  GET_SIMPLE_SUGGESTIONS_GENRE,
  GET_SIMPLE_SUGGESTIONS_RUS_NOMENCLATURE_NAME,
} from "../../apollo/getSimpleSuggestions";
import { useLazyQuery } from "@apollo/client";
import { useDispatch, useSelector } from "react-redux";
import {
  setAdvancedForm,
  setFields,
} from "../../reducers/appReducer";
import ChipAutocomplete from "./ChipAutocomplete";
import AdvancedDateSlider from "./AdvancedDateSlider";
import { ExactAutocomplete } from "./ExactAutocomplete";

const validationSchema = yup.object().shape({
  conditions: yup.array().of(
    yup.object().shape({
      field: yup.string().required("Поле обязательно для заполнения"),
      unityType: yup.string().required("Поле обязательно для заполнения"),
      contain: yup.string().required("Поле обязательно для заполнения"),
      text: yup.string(),
      list: yup.array(),
    })
  ),
});

let initialValues = {
  date_filter: [1000, 1825],
  conditions: [
    {
      field: "",
      unityType: "И", // or - and - not
      contain: "совпадает", //содержит - не содержит - совпадает
      text: "",
      list: [],
    },
  ],
};

function AdvancedSearchForm() {
  let [searchParams, setSearchParams] = useSearchParams();
  const advancedForm = useSelector((state) => state.phytolex.advancedForm);
  const fields = useSelector((state) => state.phytolex.fields);
  const dispatch = useDispatch();
  if (initialValues.conditions?.length === 1 && advancedForm?.length > 0)
    initialValues.conditions = [...advancedForm];

  useLayoutEffect(() => {
    const newInitial = generateAdvancedFormInitialFromParams(
      getParamsInObject(searchParams)
    );
    
    if (newInitial.conditions.length > 0) {
      initialValues = { ...newInitial };
      // dispatch(
      //   setAdvancedForm({
      //     conditions: newInitial.conditions,
      //     yearPeriod: newInitial.date_filter,
      //   })
      // );
      const fieldList = newInitial.conditions
        .map((cond) =>{
          return Object.keys(GRAPH_QUERYTYPE_FIELD_DATASET)
            .map((e) => GRAPH_QUERYTYPE_FIELD_DATASET[e])
            .find((e) => e.rus === cond.field)}
        ).filter((e) => !fields.map((f) => f.rus).includes(e.rus));
      dispatch(setFields(fieldList));
    } else {
      // dispatch(setAdvancedForm())
      // alert("Необходимо заполнить поля");
    }
  }, [searchParams]);

  const handleSubmit = (values, { resetForm }) => {
    const yearRangeValues = values.date_filter;
    dispatch(
      setAdvancedForm({
        conditions: values.conditions,
        yearPeriod: yearRangeValues,
      })
    );
    const fieldList = values.conditions
      .map((cond) =>
        Object.keys(GRAPH_QUERYTYPE_FIELD_DATASET)
          .map((e) => GRAPH_QUERYTYPE_FIELD_DATASET[e])
          .find((e) => e.rus === cond.field)
      )
      .filter((e) => !fields.map((f) => f.rus).includes(e.rus));

    dispatch(setFields(fieldList));
    const currentSearchParam = {};
    values.conditions.forEach((cond) => {
      const elem = Object.keys(GRAPH_QUERYTYPE_FIELD_DATASET)
        .map((e) => GRAPH_QUERYTYPE_FIELD_DATASET[e])
        .find((e) => e.rus === cond.field);
        // debugger
      const value =
        cond.contain === "совпадает" 
        // && cond.field !== "Функция растения"
        // && cond.field !== "Жанр"
        // && cond.field !== "Способ обработки и запасания"
          ? cond.list
          : cond.text;
      currentSearchParam[elem.formikName] =
        SEARCH_PARAMS_CONTAIN_LABEL[cond.contain] + "_" + value;
    });
    setSearchParams({
      ...currentSearchParam,
      yearStart: yearRangeValues[0],
      yearEnd: yearRangeValues[1],
    });
  };

  const useLexemeSuggestions = () => {
    const lexemeNames = useLazyQuery(GET_SIMPLE_SUGGESTIONS_LEXEME.query);
    const lexemeNamesSub = useLazyQuery(GET_SIMPLE_SUGGESTIONS_LEXEME.subQuery);
    return {
      options: [lexemeNames, lexemeNamesSub],
      foldedSuggestions: GET_SIMPLE_SUGGESTIONS_LEXEME.suggestions,
    };
  };
  const useScientificNameSuggestions = () => {
    const scientificNames = useLazyQuery(
      GET_SIMPLE_SUGGESTIONS_SCIENTIFIC_NAME.query
    );
    const scientificNamesSub = useLazyQuery(
      GET_SIMPLE_SUGGESTIONS_SCIENTIFIC_NAME.subQuery
    );
    return {
      options: [scientificNames, scientificNamesSub],
      foldedSuggestions: GET_SIMPLE_SUGGESTIONS_SCIENTIFIC_NAME.suggestions,
    };
  };
  const useRusNomenclatureNameSuggestions = () => {
    const rusNomenclatureNames = useLazyQuery(
      GET_SIMPLE_SUGGESTIONS_RUS_NOMENCLATURE_NAME.query
    );
    const rusNomenclatureNamesSub = useLazyQuery(
      GET_SIMPLE_SUGGESTIONS_RUS_NOMENCLATURE_NAME.subQuery
    );
    return {
      options: [rusNomenclatureNames, rusNomenclatureNamesSub],
      foldedSuggestions:
        GET_SIMPLE_SUGGESTIONS_RUS_NOMENCLATURE_NAME.suggestions,
    };
  };
  const useNameOfLatinSourceSuggestions = () => {
    const nameOfLatinSources = useLazyQuery(
      GET_SIMPLE_SUGGESTIONS_NAME_OF_LATIN_SOURCE.query
    );
    const nameOfLatinSourcesSub = useLazyQuery(
      GET_SIMPLE_SUGGESTIONS_NAME_OF_LATIN_SOURCE.subQuery
    );
    return {
      options: [nameOfLatinSources, nameOfLatinSourcesSub],
      foldedSuggestions:
        GET_SIMPLE_SUGGESTIONS_NAME_OF_LATIN_SOURCE.suggestions,
    };
  };
  const useNameOfLatinRecordSuggestions = () => {
    const nameOfLatinRecords = useLazyQuery(
      GET_SIMPLE_SUGGESTIONS_NAME_OF_LATIN_RECORD.query
    );
    const nameOfLatinRecordsSub = useLazyQuery(
      GET_SIMPLE_SUGGESTIONS_NAME_OF_LATIN_RECORD.subQuery
    );
    return {
      options: [nameOfLatinRecords, nameOfLatinRecordsSub],
      foldedSuggestions:
        GET_SIMPLE_SUGGESTIONS_NAME_OF_LATIN_RECORD.suggestions,
    };
  };
  const useFunctionSuggestions = () => {
    const functions = useLazyQuery(GET_SIMPLE_SUGGESTIONS_FUNCTION.query);
    const functionsSub = useLazyQuery(GET_SIMPLE_SUGGESTIONS_FUNCTION.subQuery);
    return {
      options: [functions, functionsSub],
      foldedSuggestions: GET_SIMPLE_SUGGESTIONS_FUNCTION.suggestions,
    };
  };
  const useDiseaseAsInSourceSuggestions = () => {
    const diseasesAsInSource = useLazyQuery(
      GET_SIMPLE_SUGGESTIONS_DISEASE_AS_IN_SOURCE.query
    );
    const diseasesAsInSourceSub = useLazyQuery(
      GET_SIMPLE_SUGGESTIONS_DISEASE_AS_IN_SOURCE.subQuery
    );
    return {
      options: [diseasesAsInSource, diseasesAsInSourceSub],
      foldedSuggestions:
        GET_SIMPLE_SUGGESTIONS_DISEASE_AS_IN_SOURCE.suggestions,
    };
  };
  const useVetDiseaseAsInSourceSuggestions = () => {
    const vetDiseasesAsInSource = useLazyQuery(
      GET_SIMPLE_SUGGESTIONS_VET_DISEASE_AS_IN_SOURCE.query
    );
    const vetDiseasesAsInSourceSub = useLazyQuery(
      GET_SIMPLE_SUGGESTIONS_VET_DISEASE_AS_IN_SOURCE.subQuery
    );
    return {
      options: [vetDiseasesAsInSource, vetDiseasesAsInSourceSub],
      foldedSuggestions:
        GET_SIMPLE_SUGGESTIONS_VET_DISEASE_AS_IN_SOURCE.suggestions,
    };
  };
  const useMedicinalForm = () => {
    const medicinalForms = useLazyQuery(
      GET_SIMPLE_SUGGESTIONS_MEDICINAL_FORM.query
    );
    const medicinalFormsSub = useLazyQuery(
      GET_SIMPLE_SUGGESTIONS_MEDICINAL_FORM.query
    );
    return {
      options: [medicinalForms, medicinalFormsSub],
      foldedSuggestions: GET_SIMPLE_SUGGESTIONS_MEDICINAL_FORM.suggestions,
    };
  };
  const usePlantPartUsed = () => {
    const plantPartsUsed = useLazyQuery(
      GET_SIMPLE_SUGGESTIONS_PLANT_PART_USED.query
    );
    const plantPartsUsedSub = useLazyQuery(
      GET_SIMPLE_SUGGESTIONS_PLANT_PART_USED.subQuery
    );
    return {
      options: [plantPartsUsed, plantPartsUsedSub],
      foldedSuggestions: GET_SIMPLE_SUGGESTIONS_PLANT_PART_USED.suggestions,
    };
  };
  const usePlantPartUsedInSource = () => {
    const plantPartsUsedInSource = useLazyQuery(
      GET_SIMPLE_SUGGESTIONS_PLANT_PART_USED_IN_SOURCE.query
    );
    const plantPartsUsedInSourceSub = useLazyQuery(
      GET_SIMPLE_SUGGESTIONS_PLANT_PART_USED_IN_SOURCE.subQuery
    );
    return {
      options: [plantPartsUsedInSource, plantPartsUsedInSourceSub],
      foldedSuggestions:
        GET_SIMPLE_SUGGESTIONS_PLANT_PART_USED_IN_SOURCE.suggestions,
    };
  };
  const usePlantPart = () => {
    const plantParts = useLazyQuery(GET_SIMPLE_SUGGESTIONS_PLANT_PART.query);
    const plantPartsSub = useLazyQuery(GET_SIMPLE_SUGGESTIONS_PLANT_PART.query);
    return {
      options: [plantParts, plantPartsSub],
      foldedSuggestions: GET_SIMPLE_SUGGESTIONS_PLANT_PART.suggestions,
    };
  };
  const useLifeFormInSource = () => {
    const lifeFormsInSource = useLazyQuery(
      GET_SIMPLE_SUGGESTIONS_LIFE_FORM_IN_SOURCE.query
    );
    const lifeFormsInSourceSub = useLazyQuery(
      GET_SIMPLE_SUGGESTIONS_LIFE_FORM_IN_SOURCE.subQuery
    );
    return {
      options: [lifeFormsInSource, lifeFormsInSourceSub],
      foldedSuggestions: GET_SIMPLE_SUGGESTIONS_LIFE_FORM_IN_SOURCE.suggestions,
    };
  };
  const useStorageType = () => {
    const storageTypes = useLazyQuery(
      GET_SIMPLE_SUGGESTIONS_STORAGE_TYPE.query
    );
    const storageTypesSub = useLazyQuery(
      GET_SIMPLE_SUGGESTIONS_STORAGE_TYPE.query
    );
    return {
      options: [storageTypes, storageTypesSub],
      foldedSuggestions: GET_SIMPLE_SUGGESTIONS_STORAGE_TYPE.suggestions,
    };
  };
  const useEthnoLists = () => {
    const ethnoLists = useLazyQuery(GET_SIMPLE_SUGGESTIONS_ETHNO_LIST.query);
    const ethnoListsSub = useLazyQuery(GET_SIMPLE_SUGGESTIONS_ETHNO_LIST.query);
    return {
      options: [ethnoLists, ethnoListsSub],
      foldedSuggestions: GET_SIMPLE_SUGGESTIONS_ETHNO_LIST.suggestions,
    };
  };
  const useSocialClass = () => {
    const socialClasses = useLazyQuery(GET_SIMPLE_SUGGESTIONS_SOCIAL_CLASS.query);
    const socialClassesSub = useLazyQuery(GET_SIMPLE_SUGGESTIONS_SOCIAL_CLASS.subQuery);
    return {
      options: [socialClasses, socialClassesSub],
      foldedSuggestions: GET_SIMPLE_SUGGESTIONS_SOCIAL_CLASS.suggestions,
    };
  };
  const usePlaceDistribution = () => {
    const placesDistribution = useLazyQuery(
      GET_SIMPLE_SUGGESTIONS_PLACE_DISTRIBUTION.query
    );
    const placesDistributionSub = useLazyQuery(
      GET_SIMPLE_SUGGESTIONS_PLACE_DISTRIBUTION.subQuery
    );
    return {
      options: [placesDistribution, placesDistributionSub],
      foldedSuggestions: GET_SIMPLE_SUGGESTIONS_PLACE_DISTRIBUTION.suggestions,
    };
  };
  const usePlaceAcquisition = () => {
    const placesAcquisition = useLazyQuery(
      GET_SIMPLE_SUGGESTIONS_PLACE_ACQUISITION.query
    );
    const placesAcquisitionSub = useLazyQuery(
      GET_SIMPLE_SUGGESTIONS_PLACE_ACQUISITION.subQuery
    );
    return {
      options: [placesAcquisition, placesAcquisitionSub],
      foldedSuggestions: GET_SIMPLE_SUGGESTIONS_PLACE_ACQUISITION.suggestions,
    };
  };
  const usePlace = () => {
    const placesAcquisition = useLazyQuery(
      GET_SIMPLE_SUGGESTIONS_PLACE.query
    );
    const placesAcquisitionSub = useLazyQuery(
      GET_SIMPLE_SUGGESTIONS_PLACE.subQuery
    );
    return {
      options: [placesAcquisition, placesAcquisitionSub],
      foldedSuggestions: GET_SIMPLE_SUGGESTIONS_PLACE.suggestions,
    };
  };
  const useOriginalWord = () => {
    const originalWords = useLazyQuery(
      GET_SIMPLE_SUGGESTIONS_ORIGINAL_WORD.query
    );
    const originalWordsSub = useLazyQuery(
      GET_SIMPLE_SUGGESTIONS_ORIGINAL_WORD.subQuery
    );
    return {
      options: [originalWords, originalWordsSub],
      foldedSuggestions: GET_SIMPLE_SUGGESTIONS_ORIGINAL_WORD.suggestions,
    };
  };
  const useTransmissionMethod = () => {
    const transmissionMethods = useLazyQuery(
      GET_SIMPLE_SUGGESTIONS_TRANSMISSION_METHOD.query
    );
    const transmissionMethodsSub = useLazyQuery(
      GET_SIMPLE_SUGGESTIONS_TRANSMISSION_METHOD.subQuery
    );
    return {
      options: [transmissionMethods, transmissionMethodsSub],
      foldedSuggestions: GET_SIMPLE_SUGGESTIONS_TRANSMISSION_METHOD.suggestions,
    };
  };
  const useLanguage = () => {
    const languages = useLazyQuery(GET_SIMPLE_SUGGESTIONS_LANGUAGE.query);
    const languagesSub = useLazyQuery(GET_SIMPLE_SUGGESTIONS_LANGUAGE.subQuery);
    return {
      options: [languages, languagesSub],
      foldedSuggestions: GET_SIMPLE_SUGGESTIONS_LANGUAGE.suggestions,
    };
  };
  const useLanguageAffiliation = () => {
    const languageAffiliations = useLazyQuery(
      GET_SIMPLE_SUGGESTIONS_LANGUAGE_AFFILIATION.query
    );
    const languageAffiliationsSub = useLazyQuery(
      GET_SIMPLE_SUGGESTIONS_LANGUAGE_AFFILIATION.subQuery
    );
    return {
      options: [languageAffiliations, languageAffiliationsSub],
      foldedSuggestions:
        GET_SIMPLE_SUGGESTIONS_LANGUAGE_AFFILIATION.suggestions,
    };
  };
  const useLanguageForOtherNames = () => {
    const languagesForOtherNames = useLazyQuery(
      GET_SIMPLE_SUGGESTIONS_LANGUAGE_FOR_OTHER_NAMES.query
    );
    const languagesForOtherNamesSub = useLazyQuery(
      GET_SIMPLE_SUGGESTIONS_LANGUAGE_FOR_OTHER_NAMES.subQuery
    );
    return {
      options: [languagesForOtherNames, languagesForOtherNamesSub],
      foldedSuggestions:
        GET_SIMPLE_SUGGESTIONS_LANGUAGE_FOR_OTHER_NAMES.suggestions,
    };
  };
  const useFigurativeMeaning = () => {
    const figurativeMeanings = useLazyQuery(
      GET_SIMPLE_SUGGESTIONS_FIGURATIVE_MEANING.query
    );
    const figurativeMeaningsSub = useLazyQuery(
      GET_SIMPLE_SUGGESTIONS_FIGURATIVE_MEANING.subQuery
    );
    return {
      options: [figurativeMeanings, figurativeMeaningsSub],
      foldedSuggestions: GET_SIMPLE_SUGGESTIONS_FIGURATIVE_MEANING.suggestions,
    };
  };
  const useEtymon = () => {
    const etymons = useLazyQuery(GET_SIMPLE_SUGGESTIONS_ETYMON.query);
    const etymonsSub = useLazyQuery(GET_SIMPLE_SUGGESTIONS_ETYMON.subQuery);
    return {
      options: [etymons, etymonsSub],
      foldedSuggestions: GET_SIMPLE_SUGGESTIONS_ETYMON.suggestions,
    };
  };
  const usePartOfSpeech = () => {
    const partsOfSpeech = useLazyQuery(
      GET_SIMPLE_SUGGESTIONS_PART_OF_SPEECH.query
    );
    const partsOfSpeechSub = useLazyQuery(
      GET_SIMPLE_SUGGESTIONS_PART_OF_SPEECH.subQuery
    );
    return {
      options: [partsOfSpeech, partsOfSpeechSub],
      foldedSuggestions: GET_SIMPLE_SUGGESTIONS_PART_OF_SPEECH.suggestions,
    };
  };
  const useCopyOfOriginal = () => {
    const copiesOfOriginal = useLazyQuery(
      GET_SIMPLE_SUGGESTIONS_COPY_OF_ORIGINAL.query
    );
    const copiesOfOriginalSub = useLazyQuery(
      GET_SIMPLE_SUGGESTIONS_COPY_OF_ORIGINAL.subQuery
    );
    return {
      options: [copiesOfOriginal, copiesOfOriginalSub],
      foldedSuggestions: GET_SIMPLE_SUGGESTIONS_COPY_OF_ORIGINAL.suggestions,
    };
  };
  const useCopyOfOriginalType = () => {
    const copiesOfOriginalTypes = useLazyQuery(
      GET_SIMPLE_SUGGESTIONS_COPY_OF_ORIGINAL_TYPE.query
    );
    const copiesOfOriginalTypesSub = useLazyQuery(
      GET_SIMPLE_SUGGESTIONS_COPY_OF_ORIGINAL_TYPE.subQuery
    );
    return {
      options: [copiesOfOriginalTypes, copiesOfOriginalTypesSub],
      foldedSuggestions:
        GET_SIMPLE_SUGGESTIONS_COPY_OF_ORIGINAL_TYPE.suggestions,
    };
  };
  const useOriginal = () => {
    const originals = useLazyQuery(GET_SIMPLE_SUGGESTIONS_ORIGINAL.query);
    const originalsSub = useLazyQuery(GET_SIMPLE_SUGGESTIONS_ORIGINAL.subQuery);
    return {
      options: [originals, originalsSub],
      foldedSuggestions: GET_SIMPLE_SUGGESTIONS_ORIGINAL.suggestions,
    };
  };
  const useOriginalType = () => {
    const originalTypes = useLazyQuery(
      GET_SIMPLE_SUGGESTIONS_ORIGINAL_TYPE.query
    );
    const originalTypesSub = useLazyQuery(
      GET_SIMPLE_SUGGESTIONS_ORIGINAL_TYPE.query
    );
    return {
      options: [originalTypes, originalTypesSub],
      foldedSuggestions: GET_SIMPLE_SUGGESTIONS_ORIGINAL_TYPE.suggestions,
    };
  };
  const useAuthor = () => {
    const authors = useLazyQuery(GET_SIMPLE_SUGGESTIONS_AUTHOR.query);
    const authorsSub = useLazyQuery(GET_SIMPLE_SUGGESTIONS_AUTHOR.subQuery);
    return {
      options: [authors, authorsSub],
      foldedSuggestions: GET_SIMPLE_SUGGESTIONS_AUTHOR.suggestions,
    };
  };
  const useGenre = () => {
    const genres = useLazyQuery(GET_SIMPLE_SUGGESTIONS_GENRE.query);
    const genresSub = useLazyQuery(GET_SIMPLE_SUGGESTIONS_GENRE.subQuery);
    return {
      options: [genres, genresSub],
      foldedSuggestions: GET_SIMPLE_SUGGESTIONS_GENRE.suggestions,
    };
  };

  // const useSuggestionCyr = () => {
  //   const lexemeNames = useLazyQuery(GET_SUGGESTIONS_CYR_LEXEME);
  //   const usageCyrPlantName = useLazyQuery(
  //     GET_SUGGESTIONS_CYR_USAGE_PLANT_NAME
  //   );
  //   const usageCyrPicturePlantName = useLazyQuery(
  //     GET_SUGGESTIONS_CYR_PICTURE_PLANT_NAME
  //   );
  //   return [lexemeNames, usageCyrPicturePlantName,usageCyrPlantName];
  // };
  const suggestions = {};
  suggestions["Лексема"] = useLexemeSuggestions();
  suggestions["Ботаническое название растения (лат.)"] = useScientificNameSuggestions();
  suggestions["Cовременное название растения (рус.)"] =
    useRusNomenclatureNameSuggestions();
  suggestions["Название в источнике (лат.)"] =
    useNameOfLatinSourceSuggestions();
  suggestions["Идентификация автора публикации (лат.)"] =
    useNameOfLatinRecordSuggestions();
  suggestions["Функция растения"] = useFunctionSuggestions();
  suggestions["Болезнь (как в источнике)"] = useDiseaseAsInSourceSuggestions();
  suggestions["Болезнь животного (как в источнике)"] =
    useVetDiseaseAsInSourceSuggestions();
  suggestions["Лекарственная форма"] = useMedicinalForm();
  suggestions["Используемая часть растения"] = usePlantPartUsed();
  suggestions["Используемая часть растения (как в источнике)"] =
    usePlantPartUsedInSource();
  suggestions["Лексема обозначает часть растения"] = usePlantPart();
  suggestions["Жизненная форма (как в источнике)"] = useLifeFormInSource();
  suggestions["Способ обработки и запасания"] = useStorageType();
  suggestions["Этноним"] = useEthnoLists();
  suggestions["Сословие"] = useSocialClass();
  suggestions["Место произрастания"] = usePlaceDistribution();
  suggestions["Место купли"] = usePlaceAcquisition();
  suggestions["Место использования"] = usePlace();
  suggestions["Слово в оригинале (если перевод)"] = useOriginalWord();
  suggestions["Способы передачи инояз. фитонима"] = useTransmissionMethod();
  suggestions["Язык, с которого сделан перевод"] = useLanguage();
  suggestions["Языковая принадлежность фитонима (в источнике)"] =
    useLanguageAffiliation();
  suggestions["Язык эквивалентных фитонимов"] = useLanguageForOtherNames();
  suggestions["Переносное значение"] = useFigurativeMeaning();
  suggestions["Этимон"] = useEtymon();
  suggestions["Часть речи"] = usePartOfSpeech();
  suggestions["Источник"] = useCopyOfOriginal();
  suggestions["Тип источника"] = useCopyOfOriginalType();
  suggestions["Памятник"] = useOriginal();
  suggestions["Оригинал / перевод"] = useOriginalType();
  suggestions["Автор"] = useAuthor();
  suggestions["Жанр"] = useGenre();
  

  //suggestions['Описание растения'] =  // we need to boolean processing as well as text values
  // suggestions["Сословие"] = useSocialClass();
  //suggestions['Поиск по цитате'] =  // wee need to process fultext-search requests
  //suggestions['Фольклорные материалы'] = // we need to boolean processing as well as text values

  // function checkIsDisabled(values, field) {
  //   const fieldList = values.map((e) => e.field);
  //   const unityTypeList = values.map((e) => e.unityType);

  //   const currentUnityType = unityTypeList[unityTypeList.length - 1];

  //   const example = fieldList.reduce((acc, el) => {
  //     acc[el] = (acc[el] || 0) + 1;
  //     return acc;
  //   }, {});
  // }
  
  return (
    <Formik
      initialValues={initialValues}
      onSubmit={handleSubmit}
      enableReinitialize={true}
      validationSchema={validationSchema}
    >
      {({
        values,
        errors,
        isSubmitting,
        handleChange,
        handleBlur,
        touched,
        dirty,
        isValid,
        setFieldValue,
      }) => {
        return (
          <Form>
            <Box>
              <FieldArray name="conditions">
                {({ insert, remove, push }) => (
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      rowGap: { xs: 6, md: 3 },
                      flexWrap: "wrap",
                      mb: 6,
                    }}
                  >
                    {values.conditions &&
                      values.conditions?.length > 0 &&
                      values.conditions.map((condition, index) => {
                        return (
                          <Box
                            sx={{
                              display: "flex",
                              width: "100%",
                              overflow: "hidden",
                              justifyContent: "space-between",
                              flexWrap: "wrap",
                            }}
                            key={`conditions-${index}-container`}
                          >
                            <Box
                              sx={{
                                display: "flex",
                                justifyContent: "space-between",
                                overflow: "hidden",
                                flexGrow: 1,
                                flexWrap: "wrap",
                                rowGap: "16px",
                              }}
                            >
                              {/* {index > 0 && (
                                <Box className="col">
                                  <Field
                                    as={Select}
                                    variant="filled"
                                    className="unityType"
                                    input={<InputBase variant="outlined" />}
                                    name={`conditions.${index}.unityType`}
                                    defaultValue={UNITYTYPE_DATASET[0]}
                                    // value={values.conditions[index].unityType}
                                    IconComponent={ExpandMoreIcon}
                                    sx={{}}
                                  >
                                    {UNITYTYPE_DATASET.map((el) => (
                                      <MenuItem
                                        key={"opt-item-unityType" + el}
                                        value={el}
                                        sx={{ textTransform: "uppercase" }}
                                      >
                                        {el}
                                      </MenuItem>
                                    ))}
                                  </Field>
                                </Box>
                              )} */}

                              {/* SELECT ДЛЯ ГДЕ ИСКАТЬ */}
                              <Box
                                className="col"
                                sx={{ width: { xs: "100%", md: "48%" }}}
                              >
                                <Field
                                  name={`conditions.${index}.field`}
                                  as={Select}
                                  displayEmpty
                                  fullWidth
                                  // value={values.conditions[index].field}
                                  variant="filled"
                                  className="field"
                                  onClick={(e) => {
                                    const field = e.target.dataset.value;
                                    setFieldValue(
                                      `conditions.${index}.text`,
                                      ""
                                    );
                                    setFieldValue(
                                      `conditions.${index}.list`,
                                      []
                                    );
                                    // values.conditions[index].text = "";
                                    if (
                                      suggestions[field] &&
                                      !suggestions[field].options.every(
                                        (r) => r[1].data
                                      )
                                    ) {
                                      suggestions[field].options.forEach(
                                        (r, ri) => {
                                          r[0]({
                                            variables: {
                                              text: `${ri === 1 ? " " : ""}`,
                                              textSpace: "",
                                              offset:0
                                            },
                                          });
                                        }
                                      );
                                    }
                                  }}
                                  input={<InputBase variant="outlined" />}
                                  IconComponent={ExpandMoreIcon}
                                >
                                  <MenuItem disabled value="">
                                    <Typography
                                      variant="simple_serach_caption"
                                      sx={{ opacity: 0.5 }}
                                    >
                                      Выберите поле
                                    </Typography>
                                  </MenuItem>
                                  {Object.keys(GRAPH_QUERYTYPE_FIELD_DATASET)
                                    .map(
                                      (e) =>
                                        GRAPH_QUERYTYPE_FIELD_DATASET[e].rus
                                    )
                                    .filter((e) => e !== "Время создания")
                                    .map((el) => {
                                      return (
                                        <MenuItem
                                          key={"opt-item-" + el}
                                          value={el}
                                        >
                                          {el}
                                        </MenuItem>
                                      );
                                    })}
                                </Field>
                                {/* <ErrorMessage
                              name={`conditions.${index}.field`}
                              component="div"
                              className="field-error"
                            /> */}
                              </Box>

                              {/* SELECT ДЛЯ "СОДЕРЖИТ","НЕ СОДЕРЖИТ", "СОВПАДАЕТ"  */}
                              <Box
                                className="col"
                                sx={{ width: { xs: "100%", md: "48%" } }}
                              >
                                <Field
                                  name={`conditions.${index}.contain`}
                                  type="text"
                                  as={Select}
                                  fullWidth
                                  variant="filled"
                                  id={values.conditions[index].contain}
                                  // defaultValue={CONTAIN_DATASET[0]}
                                  // value={values.conditions[index].unityType}
                                  input={<InputBase variant="outlined" />}
                                  displayEmpty
                                  IconComponent={ExpandMoreIcon}
                                  className="contain"
                                >
                                  {CONTAIN_DATASET.map((el) => (
                                    <MenuItem
                                      key={"opt-item-contain" + el}
                                      value={el}
                                    >
                                      {el}
                                    </MenuItem>
                                  ))}
                                </Field>
                                {/* <ErrorMessage
                                name={`conditions.${index}.contain`}
                                component="div"
                                className="field-error"
                              /> */}
                              </Box>
                               {/* INPUT ЧТО ИСКАТЬ  */}
                              <Box
                                className="col"
                                sx={{
                                  flexGrow: 2,
                                  display: "flex",
                                  alignItems: "flex-end"
                                }}
                              >
                                {values.conditions[index].contain ===
                                  "совпадает" 
                                  // && values.conditions[index].field !== "Жанр"
                                // && values.conditions[index].field !==
                                //   "Способ обработки и запасания" 
                                //   &&
                                // values.conditions[index].field !==
                                //   "Функция растения" 
                                  ? (
                                  <ChipAutocomplete
                                    index={index}
                                    field="list"
                                    values={values}
                                    handleChange={handleChange}
                                    suggestions={suggestions}
                                    setFieldValue={setFieldValue}
                                  />
                                ) : (
                                  <ExactAutocomplete
                                    index={index}
                                    field="list"
                                    values={values}
                                    handleChange={handleChange}
                                    suggestions={suggestions}
                                    setFieldValue={setFieldValue}
                                  />
                                )}

                                {/* <ErrorMessage
                                  name={`conditions.${index}.text`}
                                  component="div"
                                  className="field-error"
                                /> */}
                                {(values.conditions[index].field ||
                                  values.conditions?.length > 0) && (
                                  <IconButton
                                    onClick={() => {
                                      if (values.conditions?.length === 1) {
                                        setFieldValue(
                                          `conditions.${index}.text`,
                                          ""
                                        );
                                        setFieldValue(
                                          `conditions.${index}.list`,
                                          []
                                        );
                                        setFieldValue(
                                          `conditions.${index}.field`,
                                          ""
                                        );
                                      } else {
                                        remove(index);
                                      }
                                    }}
                                    sx={{
                                      borderRadius: 0,
                                      width: "50px",
                                      height: "50px",
                                      "&:hover": {
                                        bgcolor: "white",
                                        color: "red",
                                      },
                                    }}
                                  >
                                    <ClearIcon />
                                  </IconButton>
                                )}
                              </Box>
                            </Box>
                          </Box>
                        );

                      })}
                    <Box display={"flex"}>
                      {/* !(dirty && isValid) ? "none" : "flex"*/}
                      <Button
                        variant="text"
                        onClick={() =>
                          push({
                            field: "",
                            unityType: "И", // or - and - not
                            contain: "совпадает", //содержит - не содержит
                            text: "",
                            list: [],
                          })
                        }
                        startIcon={
                          <AddIcon
                            sx={{
                              width: "auto",
                            }}
                          />
                        }
                      >
                        Добавить условие
                      </Button>
                    </Box>
                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: {
                          xs: "column",
                          md: "row",
                        },
                        alignItems: "center",
                        gap: "30px",
                      }}
                    >
                      <Container
                        sx={{
                          mt: 5,
                          display: "flex",
                          p: "0 20px",
                        }}
                        disableGutters
                      >
                        <AdvancedDateSlider
                          setFieldValue={setFieldValue}
                          date_filter={values.date_filter}
                        />
                      </Container>
                      <Box
                        sx={{
                          alignSelf: {
                            xs: "center",
                            md: "auto",
                          },
                        }}
                      >
                        <Tooltip
                          title={
                            !(dirty && isValid) ? "Заполните все поля" : ""
                          }
                          placement="bottom"
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
                          <span>
                            <Button
                              type="submit"
                              variant="contained"
                              disabled={!(dirty && isValid)}
                              fullWidth
                              sx={{
                                outline:
                                  !(dirty && isValid) &&
                                  "2px solid rgba(75,174,96,1)",
                              }}
                            >
                              Поиск
                            </Button>
                          </span>
                        </Tooltip>
                      </Box>
                    </Box>
                  </Box>
                )}
              </FieldArray>
            </Box>
          </Form>
        );
      }}
    </Formik>
  );
}

export default AdvancedSearchForm;
