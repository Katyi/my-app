import { Box, Chip, Divider, Stack, Typography } from "@mui/material";
import { collect_whole_line } from "./AdvancedResultUtils";
import { useLocation } from "react-router-dom";

export const CHART_COLORS_LIST = [
  "#1f77b4",
  "#ff7f0e",
  "#2ca02c",
  "#d62728",
  "#9467bd",
  "#8c564b",
  "#e377c2",
  "#7f7f7f",
  "#bcbd22",
  "#17becf",
  "#98df8a",
  "#ff9896",
  "#c5b0d5",
  "#c49c94",
  "#f7b6d2",
  "#dbdb8d",
  "#9edae5",
  "#ad494a",
  "#393b79",
  "#e41a1c",
];

export function getFunctionList(arr) {
  return arr
    .map((e) =>
      collect_whole_line("parent", e)
        // .reverse()
        .map((n) => n.name)
    )
    .filter((element, index, arr) => {
      const arrWithoutElement = arr
        .slice(0, index)
        .concat(arr.slice(arr.length));
      return arrWithoutElement.every(
        (el) => !JSON.stringify(el).includes(JSON.stringify(element))
      );
    });
}

export function getColors(labels) {
  return CHART_COLORS_LIST.reduce(
    (acc, color, i) => [...acc, { name: labels[i] || "", color: color }],
    []
  );
}
export function compareArrays(exceptions, arr_to_check) {
  if (!exceptions || exceptions.length === 0) return true;
  if (
    (arr_to_check?.length === 0 && exceptions.includes(null)) ||
    (arr_to_check?.length === 1 && arr_to_check[0]?.length === 0 && exceptions?.includes(null))
  )
    return true;
  if (arr_to_check.length === 0) return false;
  // Проверяем каждый элемент из массива exceptions
  for (const exception of exceptions) {
    if (
      arr_to_check.includes(exception) ||
      !!arr_to_check.find((e) => e?.includes(exception))
    ) {
      // Если хотя бы один элемент присутствует или один из элементов включает исключение, возвращаем true
      return true;
    }
  }
  // Если все элементы отсутствует, возвращаем false
  return false;
}
export const parseDomain = (parsed_data) => {
  //возвращаем массив формата [0, maxValue]
  const lexemes = Object.keys(parsed_data);
  const arrayToPick = lexemes
    .map((lexeme) => parsed_data[lexeme].map((entry) => entry.count))
    ?.flat();
  return [0, Math.max(Math.max.apply(null, arrayToPick))];
};

const getLabelByFilterField = (el, filterField) => {
  const current = el[filterField.name];
  return filterField.get(current);
};

const generateChipData = (data, filterField) => {
  return data.reduce((acc, el, index) => {
    const label = getLabelByFilterField(el, filterField);
    if (Object.hasOwn(acc, label)) {
      acc[label.join(", ")] += el.count;
    } else {
      acc[label.join(", ")] = el.count;
    }
    return acc;
  }, {});
};
export const getPlants = (usages = []) => [
  ...new Set(usages.map((u) => u.plant)).keys(),
];

export const renderTooltip = (props, color_list, variants) => {
  const { active, payload } = props;
  if (active && payload && payload.length) {
    const data = payload[0] && payload[0].payload;
    const plants = getPlants(data?.usages);
    
    return (
      <Box
        style={{
          backgroundColor: "#fff",
          border: "1px solid #999",
          margin: 0,
          padding: 10,
          minWidth: "260px",
        }}
      >
        <Stack direction={"row"} justifyContent={"space-between"}>
          <Stack direction={"column"} gap={"4px"}>
            <Typography
              sx={{
                fontWeight: 700,
              }}
            >
              {String(data.lexeme).toUpperCase()}
            </Typography>
            {plants &&
              plants.map((plant, index) => {
                const parts = data.usages.filter((usa) => usa.plant === plant);
                // chips
                const my_color = getMyColor(color_list, plant);
                return (
                  <Stack
                    direction={"column"}
                    gap={"4px"}
                    key={index}
                    border={`1px solid ${my_color}`}
                    borderRadius={"14px"}
                    p={1}
                  >
                    <Typography
                      sx={{
                        fontWeight: 400,
                        color: my_color,
                      }}
                    >
                      {plant}
                    </Typography>
                    <Divider />
                    {[...variants.keys()].map((variant) => {
                    const chips = generateChipData(parts, variants.get(variant)) || null;
                      return (
                        <Box key={variant}>
                          <Typography
                            textAlign={"left"}
                            fontSize={12}
                            color="grey"
                          >
                            {variant}
                          </Typography>

                          <Stack
                            direction={"row"}
                            sx={{ maxWidth: 420 }}
                            flexWrap={"wrap"}
                            gap={1}
                          >
                             {chips &&
                        Object.keys(chips).map((one, ind) => {
                          return (
                            <Chip
                              sx={{
                                height: "auto",
                                "& .MuiChip-label": {
                                  display: "block",
                                  whiteSpace: "normal",
                                },
                              }}
                              deleteIcon={<h3>{chips[one]}</h3>}
                              onDelete={() => {}}
                              key={"chip plant part" + ind}
                              label={one}
                              variant="outlined"
                              size="small"
                            />
                          );
                        })}
                          </Stack>
                        </Box>
                      );
                    })}
                    {/* <Typography textAlign={"left"} fontSize={12} color="grey">
                      {filterField.label}:
                    </Typography>
                    <Stack
                      direction={"row"}
                      sx={{ maxWidth: 420 }}
                      flexWrap={"wrap"}
                      gap={1}
                    >
                      {chips &&
                        Object.keys(chips).map((one, ind) => {
                          return (
                            <Chip
                              sx={{
                                height: "auto",
                                "& .MuiChip-label": {
                                  display: "block",
                                  whiteSpace: "normal",
                                },
                              }}
                              deleteIcon={<h3>{chips[one]}</h3>}
                              onDelete={() => {}}
                              key={"chip plant part" + ind}
                              label={one}
                              variant="outlined"
                              size="small"
                            />
                          );
                        })}
                    </Stack> */}
                  </Stack>
                );
              })}
          </Stack>
          <Typography
            sx={{
              fontWeight: 700,
            }}
          >
            {data.year}
          </Typography>
        </Stack>
        <Divider />
        <Stack
          direction={"row"}
          justifyContent={"space-between"}
          alignItems={"center"}
        >
          <Typography fontSize={12} color="grey">
            всего использований:{" "}
          </Typography>
          <Typography
            fontSize={"2rem"}
            sx={{
              fontWeight: 700,
            }}
          >
            {data.count}
          </Typography>
        </Stack>
      </Box>
    );
  }
  return null;
};

export const renderCustomizedLabel = ({ viewBox }, lexeme) => {
  const { x, y } = viewBox;
  const maxLength = 25;
  let newText = "";

  if (lexeme.length > maxLength) {
    for (let i = 0; i < lexeme.length; i += maxLength) {
      newText += `<tspan x="${x}" y="${
        y + (i / maxLength) * 10
      }">${lexeme.substr(i, maxLength)}</tspan>`;
    }
    return (
      <text
        fontSize={10}
        textAnchor="middle"
        dangerouslySetInnerHTML={{ __html: newText }}
      />
    );
  }

  return (
    <text x={x} y={y} fontSize={10} textAnchor="middle">
      {lexeme}
    </text>
  );
};

function getMyColor(color_list, name) {
  return color_list.find((c) => c.name === name)?.color || "#8984D8";
}
export function ParseData(data, yearsSet) {
  const {pathname} = useLocation();
  //сортировка данных для отображения на графике
  const chart_data = data.reduce((acc, el, index) => {
    const dataIndex = el.usage.map((u) => ({
      y: pathname === "/charts" ? u.lexeme.name : pathname === "/charts1" 
        ? u.scientificName[0]?.name.length > 0  ? `${u.scientificName[0]?.name} - ${u.scientificName[0].rusNomenclatureName}` : "Не идентифицировано" : null,
      // u.citation.copyOfOriginal.original.genre[0].name,
      x: u.citation.copyOfOriginal.creationDateEnd,
      z: +u.countLexeme,
      parts: u.plantPart?.length > 0 ? u.plantPart.map((p) => p.name) : null,
      plant: el.name,
      functions: u.allFunctions?.length > 0 ? u.allFunctions.map((f) => f) : null,
      languageAffiliation: u.languageAffiliation?.length ? u.languageAffiliation.map((l) => l.name) : null,
      etymology: u.lexeme.etymology?.length > 0 ? u.lexeme.etymology.map((p) => p.etymon) : null,
      allSocialClassRels: u.allSocialClassRels?.length > 0 ? u.allSocialClassRels.map((p) => p.name) : null,
      genre: u.citation.copyOfOriginal.original.genre?.length > 0 
        ? u.citation.copyOfOriginal.original.genre.map((f) => f) 
        : null,
    }));
    return [...acc, ...dataIndex];
  }, []);

  const fixedToReturn = chart_data.reduce((acc, el, index) => {
    if (el.x) {
      if (el.z > 0) {
        yearsSet.add(el.x);
      }
      if (!acc[el.y]) acc[el.y] = [];
      if (acc[el.y].length === 0 || !acc[el.y].find((e) => e.year === el.x)) {
        acc[el.y] = [
          ...acc[el.y],
          {
            index: 1,
            year: el.x,
            lexeme: el.y,
            count: 0, //total
            usages: [],
          },
        ];
      }
      acc[el.y].find((e) => e.year === el.x).usages = [
        ...acc[el.y].find((e) => e.year === el.x).usages,
        {
          count: el.z,
          parts: el.parts,
          plant: el.plant,
          functions: el.functions,
          languageAffiliation: el.languageAffiliation,
          etymology: el.etymology,
          allSocialClassRels: el.allSocialClassRels,
          genre: el.genre,
        },
      ];
      acc[el.y].find((e) => e.year === el.x).count += el.z; //total
    }
    return acc;
  }, {});
  return fixedToReturn;
}
export function parseDataForFunctionTable(data, yearsSet) {
  //сортировка данных для отображения на графике
  const chart_data = data.reduce((acc, el, index) => {
    // const dataIndex = el.usage.map((u) => ({
    const dataIndex = {
      y: el.lexeme.name,
      allSocialClassRels: el.allSocialClassRels?.length > 0 ? el.allSocialClassRels.map((p) => p.name) : null,
      allEthnoLists: el.allEthnoLists?.length > 0 ? el.allEthnoLists.map((p) => p.name) : null,
    };
    return [...acc, dataIndex];
  }, []);

  const fixedToReturn = chart_data.reduce((acc, el, index) => {
    if (!acc[el.y]) acc[el.y] = [];
    if (acc[el.y].length === 0) {
      acc[el.y] = [
        ...acc[el.y],
        {
          lexeme: el.y,
          usages: [],
        },
      ];
    } 
    acc[el.y][0].usages = [
      ...acc[el.y][0].usages,
      {
        allSocialClassRels: el.allSocialClassRels,
        allEthnoLists: el.allEthnoLists,
      },
    ];
    return acc;
  }, {});
  return fixedToReturn;
}

export function sortAllData(chart_data, yearsSet) {
  //сортируем массив по году
  return [
    ...chart_data,
    ...[...yearsSet]
      .filter((y) => !chart_data.map((d) => d.year).includes(y))
      .map((y) => ({ year: y, count: 0 })),
  ].sort((a, b) => a.year - b.year);
}
export function getChartsChip(data, filterField) {
  const variant = filterField?.name || "parts";
  const yearsSet = new Set();
  const parsed_chart_data = ParseData(
    data?.map((e) => e.node),
    yearsSet
  );

  let general_data = new Set();
  for (const key in parsed_chart_data) {
    if (Object.hasOwn(parsed_chart_data, key)) {
      const element = parsed_chart_data[key];
      
      if (Array.isArray(element)) {
        element.forEach((elem) => {
          elem.usages.forEach((usage) => {
            if (Array.isArray(usage[variant])) {
              usage[variant].forEach((p) => {
                if (typeof p === "object") {
                  const functionList = getFunctionList([p]).map((arr) =>
                    arr.reverse().join(" / ")
                  );
                  functionList.forEach((usageFunc) => {
                    general_data.add(usageFunc);
                  });
                } else {
                  general_data.add(p);
                }
              });
            } else general_data.add(null);
          });
        });
      }
    }
  }
  return [...general_data];
}
export function getChartsChipForFunctionTable(data, filterField) {
  const variant = filterField?.name || "allSocialClassRels";
  const yearsSet = new Set();
  const parsed_chart_data = parseDataForFunctionTable(
    data?.map((e) => e.node),
    yearsSet
  );

  let general_data = new Set();
  for (const key in parsed_chart_data) {
    if (Object.hasOwn(parsed_chart_data, key)) {
      const element = parsed_chart_data[key];
      if (Array.isArray(element)) {
        element?.forEach((elem) => {
          elem.usages?.forEach((usage) => {
            if (Array.isArray(usage[variant])) {  
              usage[variant].forEach((p) => {
                if (typeof p === "object") {
                  const functionList = getFunctionList([p]).map((arr) =>
                    arr.reverse().join(" / ")
                  );
                  functionList.forEach((usageFunc) => {
                    general_data.add(usageFunc);
                  });
                } else {
                  general_data.add(p);
                }
              });
            } else general_data.add(null);
          });
        });
      }
    }
  }
  return [...general_data];

}

export function getAllChartsChip(data, variants = new Map()) {
  if (!data) return null;
  const allChips = {};
  for (let key of variants.keys()) {
    const el = variants.get(key);
    allChips[key] = getChartsChip(data, el);
  }
  return allChips;
}
export function getAllChartsChipForFunctionTable(data, variants = new Map()) {
  if (!data) return null;
  const allChips = {};
  for (let key of variants.keys()) {
    const el = variants.get(key);
    allChips[key] = getChartsChipForFunctionTable(data, el);
  }
  return allChips;
}
// export function getAllChartsChipByLexeme(data, variants = new Map()) {
//   if (!data) return null;
//   const allChips = {};
//   for (let key of variants.keys()) {
//     const el = variants.get(key);
//     allChips[key] = getChartsChipByLexeme(data, el);
//   }
//   return allChips;
// }

export function deleteExceptionDots(data, exceptions = []) {
  return data;
}

export function getArraysTotalLengthFromObject(object) {
  // Инициализируем переменную для хранения суммы длин массивов
  let totalLength = 0;

  // Перебираем свойства объекта
  for (const key in object) {
    if (object.hasOwnProperty(key) && Array.isArray(object[key])) {
      // Проверяем, является ли свойство массивом
      totalLength += object[key].length;
    }
  }

  return totalLength;

}