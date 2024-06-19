import { useEffect, useMemo, useState } from 'react';
import { Buffer } from "buffer";
import { useSearchParams } from "react-router-dom";
import { Box, Grid, Typography } from '@mui/material';
import LexemeInOriginalTableSetting from './LexemeInOriginalTableSetting';
import LexemeInOriginalTable from './LexemeInOriginalTable';
import ProgressBlock from '../../ProgressBlock/ProgressBlock';
import { CHARTS_DATA_BY_ORIGINAL } from '../../../apollo/chartSearch';
import { useLazyQuery } from "@apollo/client";
import {
  compareArrays,
  getColors,
  getFunctionList
} from "../../../utils/ChartsUtils";
import LexemeInOriginalTableChipSettings from './LexemeInOriginalTableChipSettings';

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

const LexemeInOriginalTableContent = () => {
  const [params, setParams] = useSearchParams();
  const [name, setName] = useState(params.getAll("original") || [""]);
  const [exceptions, setExceptions] = useState({});
  const [color_list, setColor_list] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [after, setAfter] = useState(null);
  const [offset, setOffset] = useState(10);
  const [total, setTotal] = useState(0);
  const [loadData, { called, loading, data, error }] = useLazyQuery(
    CHARTS_DATA_BY_ORIGINAL({filters: name, page: currentPage, offset: offset, after: after})
  );

  const edges = data?.usagesConnection?.edges;
  
  const handleChangePage = (event, newPage) => {
    let s = undefined;
    if (newPage > 1) {
      let b = Buffer.from(`arrayconnection:${newPage * offset - offset - 1}`);
      s = b.toString('base64');
    }
    setCurrentPage(newPage-1)
    setAfter(s)
  };

  const handleChangeRowsPerPage = (newOffset) => {
    setOffset(newOffset)
  };

  useEffect(() => {
    if (!!name) {
      loadData({filters: name, page: currentPage, offset: offset, after: after});
    };
  }, [loadData, name]);

  useEffect(() => {
    const freshParams = params
      .getAll("original")
      ?.filter((p) => p !== "null" && p !== "undefined");
    if (freshParams) setName(freshParams);
    setExceptions({})
  }, [params]);

  useEffect(() => {
    if (edges && edges.length > 0) {
      setColor_list(getColors(name.map(el => el)));
    }
    setTotal(data?.usagesConnection.totalCount);
    if (edges?.length < offset) {
      setCurrentPage(0);
    }
  }, [edges]);

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

  function filterDataByExceptions(edges, exceptions, variants) {
    let newEdges =  edges?.filter(us => {
      const activeVariants = Array.from(variants.values()).filter(v=>!!exceptions[v.verbose_name] && exceptions[v.verbose_name].length>0) || [];
      
      if (activeVariants.length!==0) { 
        const atLeastOneFalse = activeVariants.map(
          (variant) => {
            const variantName = variant.verbose_name;
            if (!exceptions[variantName] || exceptions[variantName].length===0) return true;            
            return compareArrays(
              exceptions[variantName],
              variant.get(us.node[variant.apiName]).map((p) => p.name)
            );
          }
        );
        // Возвращаем false, если хотя бы один вариант вернул false
        return atLeastOneFalse.some(e=>e);
      } 
      return true

    }).map(el => el.node)
    return newEdges
  }

  return (
    <Grid container rowGap={2} rowSpacing={2} pt={4}>
      {/* Input для памятника */}
      <Grid item xs={12}>
        <LexemeInOriginalTableSetting
          onNameChanged={(v) => {
            setParams({ original: v });
          }}
          onColorChanged={handleChangeColor}
          initial={name}
          color_list={color_list}
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
          <LexemeInOriginalTable
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
          edges?.length === 0 &&
          // data?.usagesConnection?.edges.length === 0 && 
          (
            <TemplateBox text={"Растение не найдено"} />
        )}
        {!data && !called && name?.length === 0 && (
          <TemplateBox text={"Растение не выбрано"} />
        )}
        {!error && loading && name?.length > 0 && (
          <ProgressBlock label="данные и формируем график" />
        )}
      </Grid>
    </Grid>
  )
}

export default LexemeInOriginalTableContent;