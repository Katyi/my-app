import { useEffect, useMemo, useState } from 'react';
import { Buffer } from "buffer";
import { useParams, useSearchParams } from "react-router-dom";
import { Box, Grid, Typography } from '@mui/material';
import LexemeInLexemeTableSettings from './LexemeInLexemeTableSettings';
import LexemeInOriginalTable from '../LexemeInOriginalTable/LexemeInOriginalTable';
import ProgressBlock from '../../ProgressBlock/ProgressBlock';
import { CHARTS_DATA_BY_ORIGINAL } from '../../../apollo/chartSearch';
import { useLazyQuery, useQuery } from "@apollo/client";
import {
  compareArrays,
  getColors,
  getFunctionList
} from "../../../utils/ChartsUtils";
import LexemeInLexemeTable from './LexemeInLexemeTable';
import { GET_LEXEMES_BY_SCIENTIFICNAME, GET_SCIENTIFICNAME_BY_LEXEME } from '../../../apollo/lexemeByLexeme';
import { getValidDatasetForOneLexeme } from '../../../utils/OneLexemeUtils';

const variants = new Map([
  [
    "часть растения",
    {
      label: "Части растения",
      verbose_name: "часть растения",
      name: "parts",
      apiName: "plantPart",
      nullName: "часть растения не указана",
      get: (arr) => (arr && Array.isArray(arr) ? arr : ["не указана"]),
    },
  ],
  [
    "функция растения",
    {
      label: "Функции растения",
      verbose_name: "функция растения",
      name: "functions",
      apiName: "allFunctions",
      nullName: "функция растения не указана",
      get: (arr) => {
        if (arr ) {
          const array = getFunctionList(arr);
          return array.map(k => k.reverse().join(" / "));
        }
        return ["функция не указана"];
      },
    },
  ],
  [
    "жанр",
    {
      label: "Жанр",
      verbose_name: "жанр",
      name: "genre",
      apiName: "citation",
      nullName: "жанр не указан",
      get: (arr) => {
        if (arr) {
          const array = getFunctionList(arr);
          return array.map(k => k.reverse().join(" / "));
        }
        return ["жанр не указан"];
      },
    }
  ],
  [
    "язык в источнике",
    {
      label: "Переведено с языков",
      verbose_name: "язык в источнике",
      name: "languageAffiliation",
      apiName: "languageAffiliation",
      nullName: "язык перевода не указан",
      get: (arr) => {
        return arr && Array.isArray(arr) ? arr : ["не указан"];
      },
    },
  ],
  [
    "этимон",
    {
      label: "Этимон",
      verbose_name: "этимон",
      name: "etymology",
      apiName: "lexeme",
      nullName: "этимон не указан",
      get: (arr) => {return arr ? arr : ["не указан"]},
    }
  ],
  [
    "сословие",
    {
      label: "Сословие",
      verbose_name: "сословие",
      name: "allSocialClassRels",
      apiName: "allSocialClassRels",
      nullName: "сословие не указано",
      get: (arr) => (arr && Array.isArray(arr) ? arr : ["не указано"]),
    }
  ],
]);

const TemplateBox = ({ text }) => (
  <Box
    display={"flex"}
    alignItems={"center"}
    justifyContent={"center"}
    component={Typography}
    fontWeight={700}
    color="lightgray"
  >
    {text}
  </Box>
);

const LexemeInLexemeTableContent = () => {
  const [params, setParams] = useSearchParams();
  const [name, setName] = useState(params.getAll("lexeme") || [""]);
  const [scientificNames, setScientificNames] = useState([]);
  const [exceptions, setExceptions] = useState({});
  const [color_list, setColor_list] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [after, setAfter] = useState(null);
  const [offset, setOffset] = useState(10);
  const [total, setTotal] = useState(0);
  const [lastTotal, setLastTotal] = useState(0);
  const [plants, setPlants] = useState();

  const { called, loading, error, data } = useQuery(GET_LEXEMES_BY_SCIENTIFICNAME, {
    variables: { name: scientificNames, offset: offset, afterString: after },
  });

  const {data: scientificNameData } = useQuery(GET_SCIENTIFICNAME_BY_LEXEME, {
    variables: { name: name },
  });

  const edges = [...new Set(data?.usagesConnection?.edges.map(el =>  el.node))];
  
  const handleChangePage = (event, newPage) => {
    let s = undefined;
    if (newPage > 1) {
      let b = Buffer.from(`arrayconnection:${newPage * offset - offset - 1}`);
      s = b.toString('base64');
    }
    setCurrentPage(newPage-1)
    setAfter(s ? s : null)
  };

  const handleChangeRowsPerPage = (newOffset) => {
    setOffset(newOffset)
  };

  useEffect(() => {
    if (!!scientificNameData) {
      let temp = scientificNameData.usagesConnection.edges.map(el => el.node.scientificName).flat().map(r => r.name);
      setScientificNames([... new Set(temp)])
    };
  }, [scientificNameData]);

  
  useEffect(() => {
    const freshParams = params
      .getAll("lexeme")
      ?.filter((p) => p !== "null" && p !== "undefined");
    if (freshParams) setName(freshParams);
    setExceptions({})
  }, [params]);

  useEffect(() => {
    if (edges && edges.length > 0) {
      setColor_list(getColors(name.map(el => el)));    
    }
    setTotal(data?.usagesConnection.totalCount);
  }, [data]);

  useEffect(() => {
    setAfter(null)
    setCurrentPage(0)
  },[name])

  function handleClickChip(variant, label) {
    return exceptions &&
      exceptions[variant] &&
      exceptions[variant].includes(label)
      ? setExceptions((p) => ({
          ...p,
          [variant]: p[variant].filter((el) => el !== label),
        }))
      : setExceptions((p) => ({
          ...p,
          [variant]: [...(p[variant] || []), label],
        }));
  }

  function handleChangeColor(plant, color) {
    plant &&
      color &&
      setColor_list(
        color_list?.map((c) => (plant.includes(c.name) ? { ...c, color } : c)) || []
      );
  }

  return (
    <Grid container rowGap={2} rowSpacing={2} pt={4}>
      {/* Input для памятника */}
      <Grid item xs={12}>
        <LexemeInLexemeTableSettings
          onNameChanged={(v) => {
            setParams({ lexeme: v });
          }}
          onColorChanged={handleChangeColor}
          initial={name}
          color_list={color_list}
          setPlants={setPlants}
        />
      </Grid>
      {/* Настройка графика - ТЭГИ */}
      {/* {data && edges && edges?.length > 0 && (
        <Grid item xs={12}>
          <LexemeInOriginalTableChipSettings
            data={data}
            variants={variants}
            exceptions={exceptions}
            onUpdate={handleClickChip}
          />
        </Grid>
      )} */}
      {/* Отображение таблицы */}
      <Grid
        item
        xs={12}
        display={"flex"}
        justifyContent={"center"}
        minHeight={420}
      >
        {data && edges && edges?.length > 0 && (
          <LexemeInLexemeTable
            data={edges}
            name={name}
            color_list={color_list}
            variants={variants}
            handleChangePage={handleChangePage}
            handleChangeRowsPerPage={handleChangeRowsPerPage}
            page={currentPage}
            total={total}
            offset={offset}
          />
        )}
        {!loading &&
          called &&
          name?.length > 0 &&
          // edges?.length === 0 &&
          data?.usagesConnection?.edges.length === 0 && 
          (
            <TemplateBox text={"Растение не найдено"} />
        )}
        {!data && !called  && name?.length === 0 && (
          <TemplateBox text={"Растение не выбрано"} />
        )}
        {!error && loading && name?.length > 0 && (
          <ProgressBlock label="данные и формируем график" />
        )}
      </Grid>
    </Grid>
  )
}

export default LexemeInLexemeTableContent;