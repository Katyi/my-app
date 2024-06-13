import { useEffect, useMemo, useState } from 'react';
import { Buffer } from "buffer";
import { Box, Grid, Typography } from '@mui/material';
import { useSearchParams } from "react-router-dom";
import FunctionTableSettings from './FunctionTableSettings';
import FunctionTable from './FunctionTable';
import ProgressBlock from '../../ProgressBlock/ProgressBlock';
import FunctionTableChipSettings from './FunctionTableChipSettings';
import { CHARTS_DATA_BY_FUNCTION } from '../../../apollo/chartSearch';
import { useLazyQuery } from "@apollo/client";
import {
  compareArrays,
  getColors,
  getFunctionList
} from "../../../utils/ChartsUtils";
import { getStringNestedTypeEleven } from '../../../utils/QueryRequestUtils';
import { forIn } from 'lodash';

const variants = new Map([
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
  [
    "этноним",
    {
      label: "Этноним",
      verbose_name: "этноним",
      name: "allEthnoLists",
      apiName: "allEthnoLists",
      nullName: "этноним не указан",
      get: (arr) => (arr && Array.isArray(arr) ? arr : ["не указан"]),
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

const FunctionTableContent = () => {
  const [params, setParams] = useSearchParams();
  const [name, setName] = useState(params.getAll("function") || [""]);
  const [filters, setFilters] = useState(null);
  const [exceptions, setExceptions] = useState({});
  const [color_list, setColor_list] = useState([]);

  const [currentPage, setCurrentPage] = useState(0);
  const [after, setAfter] = useState(null);
  const [offset, setOffset] = useState(10);
  const [total, setTotal] = useState(0);


  const [loadData, { called, loading, data, error }] = useLazyQuery(
    CHARTS_DATA_BY_FUNCTION({filters: filters, page: currentPage, offset: offset, after: after})
  );

  // const edges = data?.functionsConnection?.edges;
  const edges = data?.usagesConnection?.edges;
  console.log(edges)
  // console.log(edges)
  // const filtered_data = useMemo(()=>filterDataByExceptionsOld(edges, exceptions, variants),[edges, exceptions]);
  const filtered_data = useMemo(()=>filterDataByExceptions(edges, exceptions, variants),[edges, exceptions]);
  // const filtered_data1 = edges?.filter(el => el.node.allEthnoLists[0].name === 'немцы');
  // const filtered_data = edges;
  
  // console.log(total)
  console.log(exceptions)
  console.log(filtered_data)
  // console.log(filtered_data1)

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
    // console.log(filters)
    if (!!filters) {
      loadData({filters: filters, page: currentPage, offset: offset, after: after})
    };
  }, [loadData, filters]);

  

  useEffect(() => {
    // console.log(params)
    const freshParams = params
      .getAll("function")
      // ?.filter((p) => p !== "null" && p !== "undefined").map(el=>el.includes(" - ")?regex.exec(el)[0] : el).join('').split(' / ');
      ?.filter((p) => p !== "null" && p !== "undefined").map(el=>el.includes(" - ")?regex.exec(el)[0] : el);
    
      let newFresh = "{" + getStringNestedTypeEleven("function", "", freshParams, "inList").replace('inDeepMarker', '') + "}"
    
    // console.log(freshParams)
    // console.log(newFresh)
    if (freshParams) setName(freshParams);
    if (newFresh) setFilters(newFresh);
    setExceptions({})
  }, [params]);

  useEffect(() => {
    let labelArr = name.map(el => el.split(' / ')).map(el => el[el.length-1])
    // console.log(labelArr)
    if (edges && edges.length > 0) {
      setColor_list(getColors(labelArr.map(el => el)));
    }
    setTotal(data?.usagesConnection.totalCount)
  }, [edges]);

  function handleClickChip(variant, label) {
    // console.log(variant)
    // console.log(label)
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
  function filterDataByExceptionsOld(edges, exceptions, variants) {
    // console.log(edges)
    return edges
      ?.map((e) => e.node)
      ?.map((plant) => {
        // console.log(plant)
        return {
          ...plant,
          usage: plant.usage?.filter((us) => {
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
          }
        ),
        };
      }
    );
  }

  function filterDataByExceptions(edges, exceptions, variants) {
    let newEdges =  edges?.filter(us => {
      console.log(us)
      // el.node.lexeme.name === "асидиесъ"
      const activeVariants = Array.from(variants.values()).filter(v=>!!exceptions[v.verbose_name] && exceptions[v.verbose_name].length>0) || [];
      console.log(activeVariants)
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
      {/* Input для функций */}
      <Grid item xs={12}>
        <FunctionTableSettings
          onNameChanged={(v) => {
            setParams({ function: v });
          }}
          onColorChanged={handleChangeColor}
          initial={name}
          color_list={color_list}
        />
      </Grid>
      {/* Настройка графика - ТЭГИ */}
      {data && edges && edges?.length > 0 && (
        <Grid item xs={12}>
          <FunctionTableChipSettings
            data={data}
            variants={variants}
            exceptions={exceptions}
            onUpdate={handleClickChip}
          />
        </Grid>
      )}
      {/* Отображение таблицы */}
      <Grid
        item
        xs={12}
        display={"flex"}
        justifyContent={"center"}
        minHeight={420}
      >
        {data && edges && edges?.length > 0 && (
          <FunctionTable
            data={filtered_data}
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
          data?.lexemesConnection?.edges.length === 0 && (
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

export default FunctionTableContent;