import { Box, Grid, Typography } from "@mui/material";
import React, { useEffect, useMemo, useState } from "react";
// import ChipSettings from "./ChipSettings";
import ChartsSettingsBySciName from "../ChartsSettingsBySciName";
import LexemeScatterChartChipSettings from "./LexemeScatterChartChipSettings";
import LexemeScatterChartView from "./LexemeScatterChartView";
import { CHARTS_DATA_BY_SCIENTIFIC } from "../../../apollo/chartSearch";
import { useLazyQuery } from "@apollo/client";
import ProgressBlock from "../../ProgressBlock/ProgressBlock";
import { useLocation, useSearchParams } from "react-router-dom";
import {
  compareArrays,
  getColors,
  getFunctionList
} from "../../../utils/ChartsUtils";

const regex = /^.*(?=\s-\s)/;

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

function LexemeScatterChartContent() {
  const {pathname} = useLocation();
  const [params, setParams] = useSearchParams();
  const [name, setName] = useState(params.getAll("plant") || [""]);
  const [exceptions, setExceptions] = useState({});
  const [loadData, { called, loading, data, error }] = useLazyQuery(
    CHARTS_DATA_BY_SCIENTIFIC({ name })
  );
  
  const edges = data?.plantsConnection?.edges;
  const [color_list, setColor_list] = useState([]);

  const filtered_data = useMemo(()=>filterDataByExceptions(edges, exceptions, variants),[edges, exceptions])
  
  useEffect(() => {
    if (!!name) {
      loadData({ name })
    };
  }, [loadData, name]);

  useEffect(() => {
    const freshParams = params
      .getAll("plant")
      ?.filter((p) => p !== "null" && p !== "undefined").map(el=>el.includes(" - ")?regex.exec(el)[0] : el);
    if (freshParams) setName(freshParams);
    setExceptions({})
  }, [params]);

  useEffect(() => {
    if (edges && edges.length > 0) {
      setColor_list(getColors(edges.map((e) => e.node).map((el) => el.name)));
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
    return edges
      ?.map((e) => e.node)
      ?.map((plant) => {
        return {
          ...plant,
          usage: plant.usage.filter((us) => {
            // Проверяем каждый вариант
                // Проверяем есть ли хоть одно исключение
                const activeVariants = Array.from(variants.values()).filter(v=>!!exceptions[v.verbose_name] && exceptions[v.verbose_name].length>0) || []
                
                if (activeVariants.length!==0) { 
                  const atLeastOneFalse = activeVariants.map(
                    (variant) => {
                      const variantName = variant.verbose_name;
                      if (!exceptions[variantName] || exceptions[variantName].length===0) return true;
                      
                      if (variant.apiName === "citation") {
                        return compareArrays(
                          exceptions[variantName],
                          variant.get(us[variant.apiName].copyOfOriginal.original.genre)
                        )
                      }
                      if (variant.apiName === "lexeme") {
                        return compareArrays(
                          exceptions[variantName],
                          variant.get(us[variant.apiName].etymology.map(p => p.etymon))
                        )
                      }
                      if (variant.apiName === "allFunctions") {
                        return compareArrays(
                          exceptions[variantName],
                          variant.get(us[variant.apiName])
                        );
                      }
                      
                      return compareArrays(
                        exceptions[variantName],
                        variant.get(us[variant.apiName]).map((p) => p.name)
                      );
                    }
                  );
                  // Возвращаем false, если хотя бы один вариант вернул false
                  return atLeastOneFalse.some(e=>e);
                } 
                return true
          }),
        };
      });
  }

  return (
    <Grid container rowGap={2} rowSpacing={2} pt={4}>
      {/* ИНПУТЫ - ВЫПАДАЮЩИЕ МЕНЮ */}
      <Grid item xs={12}>
      {/* Input для названия растения */}
        <ChartsSettingsBySciName
          onNameChanged={(v) => {
            setParams({ plant: v });
          }}
          onColorChanged={handleChangeColor}
          initial={name}
          color_list={color_list}
        />
      </Grid>
      {/* Настройка графика - ТЭГИ */}
      {data && edges && edges?.length > 0 && (
        <Grid item xs={12}>
          <LexemeScatterChartChipSettings
            data={data}
            variants={variants}
            exceptions={exceptions}
            onUpdate={handleClickChip}
          />
        </Grid>
      )}
      {/* Отображение графика */}
      <Grid
        item
        xs={12}
        display={"flex"}
        justifyContent={"center"}
        minHeight={420}
      >
        {data && edges && edges?.length > 0 && (
          // график лексем - точки
          <LexemeScatterChartView
            data={filtered_data}
            color_list={color_list}
            variants={variants}
          />
        )}
        {!loading &&
          called &&
          name?.length > 0 &&
          data?.plantsConnection.edges.length === 0 && (
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
  );
}

export default LexemeScatterChartContent;