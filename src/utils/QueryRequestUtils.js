import { gql } from "@apollo/client";
import {
  GRAPH_QUERYTYPE_FIELD_DATASET,
  QUERYTYPE_FIELD_DATASET,
  SEARCH_PARAMS_CONTAIN_LABEL,
} from "../dataset/FormDataset";
import { init } from "aos";

export function generateAdvancedSearchParams(conditions = []) {
  let obj = {};
  conditions.map((el, index) => {
    const value = [
      el.unityType === "И" ? "a" : "o",
      el.contain === "содержит" ? "c" : el.contain === "совпадает" ? "e" : "nc",
      el.text,
    ].join("_");
    let key = Object.keys(QUERYTYPE_FIELD_DATASET).filter(
      (element) => QUERYTYPE_FIELD_DATASET[element] === el.field
    );
    obj[key] = value;
  });
  return obj;
}
export function generateAdvancedFormInitialFromParams(variables) {
  let conditions = [];
  let date_filter = [];
  Object.keys(variables).map((element, index) => {
    if (!["page", "after", "offset"].includes(element)) {
      if (!element.includes("year")) {
        const [type, ...text] = variables[element].split("_");
        const tempList = text.join("").replaceAll(", ", "; ").split(",");
        const list = tempList[0] === '' ? [] : tempList.map(item => item.replaceAll("; ", ", "));
        const contain = Object.keys(SEARCH_PARAMS_CONTAIN_LABEL).find(
          (e) => SEARCH_PARAMS_CONTAIN_LABEL[e] === type
        );
        const field =
          GRAPH_QUERYTYPE_FIELD_DATASET[
            Object.keys(GRAPH_QUERYTYPE_FIELD_DATASET).find(
              (el) => element === el
            )
          ];
        conditions.push({
          field: field.rus,
          contain: contain,
          list: contain === "совпадает" ? list : [],
          unityType: "И",
          text:
            contain !== "совпадает" ||
            field.rus === "Жанр" ||
            field.rus === "Функция растения" ||
            field.rus === "Способ обработки и запасания"
              ? text.join("")
              : "",
        });
      } else {
        const date = +variables[element];
        if (element.includes("Start")) {
          date_filter[0] = date;
        } else date_filter[1] = date;
      }
    }
  });
  return { date_filter, conditions };
}
function getCurrentElementForGraph(condition, dataset = {}) {
  let elementGlobal = {};
  for (const key in dataset) {
    if (Object.hasOwnProperty.call(dataset, key)) {
      const element = dataset[key];
      if (
        element.rus === condition.field ||
        condition.field === "Временной интервал"
      )
        elementGlobal = { ...element, key: key };
    }
  }

  return {
    label: elementGlobal.key,
    formLabel: elementGlobal.formikName,
    type: elementGlobal.type,
    ...condition,
  };
}
function getStringTypeOne(label, text, list, variant) {
  const variantString =
    variant === "inList" ? JSON.stringify(list) : `"${text}"`;
  return `
  ${label}: {
    name:{
      ${variant}:${variantString}
    }
  }inDeepMarker
  `;
}
function getStringTypeTwo(label, text, list, variant) {
  const variantString =
    variant === "inList" ? JSON.stringify(list) : `"${text}"`;
  return `${label}: { ${variant}:${variantString} }inDeepMarker`;
}
function getStringTypeThree(label, text, list, variant) {
  const variantString =
    variant === "inList" ? JSON.stringify(list) : `"${text}"`;
  return `
  ${label}: {
    name:{
      ${variant}:${variantString}
    }
  }inDeepMarker
  `;
}

function getStringTypeThreeOne(label, text, list, variant) {
  // scientificName > rusNomenclatureName
  const variantString =
    variant === "inList" ? JSON.stringify(list) : `"${text}"`;
  return `
  scientificName: {
    ${label}:{
      ${variant}:${variantString}
    }
  }inDeepMarker
  `;
}
function getStringTypeFour(label, text, list, variant) {
  const variantString =
    variant === "inList" ? JSON.stringify(list) : `"${text}"`;
  return `
  plantUsage: {
    ${label}: {
      name:{${variant}:${variantString}}
    }
  }inDeepMarker`;
}
// function getStringTypeFour(label, text, list, variant) {
//   const variantString =
//     variant === "inList" ? JSON.stringify(list) : `"${text}"`;
//   return `
//   ${label}: {originalQuote: {${variant}:${variantString}}}
//       Or:{
//          ${label}:{
//           simplifiedQuote:{${variant}:${variantString}}
//         }
//         Or:{
//            ${label}:{
//             copyOfOriginalQuote:{${variant}:${variantString}}
//           }inDeepMarker
//         }
//       }
//   `;
// }
function getStringTypeFive(label, text, list, variant) {
  const variantString =
    variant === "inList" ? JSON.stringify(list) : `"${text}"`;
  return `
  citation:{
        copyOfOriginal:{
          encoding:{
            ${variant}:${variantString}
          }
        }
      }inDeepMarker
  `;
}
function getStringTypeSix(label, text, list, variant) {
  const variantString =
    variant === "inList" ? JSON.stringify(list) : `"${text}"`;
  return `
  citation:{
        copyOfOriginal:{
          copyOfOriginalType:{
            name:{
              ${variant}:${variantString}
            } 
          }
        }
      }inDeepMarker
  `;
}
function getStringTypeSeven(label, text, list, variant) {
  const variantString =
    variant === "inList" ? JSON.stringify(list) : `"${text}"`;
  return `
  citation:{
        copyOfOriginal:{
          original:{
            author:{${variant}:${variantString}}
          }
        }
      }inDeepMarker
  `;
}
function getStringTypeEight(label, text, list, variant) {
  const variantString =
    variant === "inList" ? JSON.stringify(list) : `"${text}"`;
  return `
  citation:{
        copyOfOriginal:{
          original:{
            encoding:{${variant}:${variantString}}
          }
        }
      }inDeepMarker
  `;
}
function getStringTypeNine(label, text, list, variant) {
  const variantString =
    variant === "inList" ? JSON.stringify(list) : `"${text}"`;
  return `
    plantUsage: {
      place:{
        name:{${variant}:${variantString}}
      }
    }inDeepMarker
  `;
}
function getStringTypeYearPeriod(text) {
  return `
  citation:{
      copyOfOriginal:{
        creationDateStart:{gt:${text[0]}}
        creationDateEnd:{lt:${text[1]}}
      }
    },
    isNotPlant:false
  `;
}
const templateName = (text, variant) => `
  name:{${variant}: [${text.map(e => `"${e}"`)}]}
  inDeepMarker
  `;
const templateHeader = (text) => `
  parent:{${text}}
  `;

const templateNameText = (text, variant) => `
  name:{${variant}:"${text}"}
  inDeepMarker`;
const templateHeaderText = (text) => `
  parent:{${text}}
  `;

function getMultipleStringForNested(arrOfValues = [], variant) {
  const value = arrOfValues[0];
  if (!value) return ``;
  if (value && arrOfValues.length === 1)
    return templateName(value, variant).replace("inDeepMarker", "");
  return templateName(value, variant).replace(
    "inDeepMarker",
    templateHeader(
      getMultipleStringForNested(
        [...arrOfValues.filter((_, i) => i !== 0)],
        variant
      )
    )
  );
}
function getMultipleStringForNestedText(arrOfValues = [], variant) {
  const value = arrOfValues[0];
  if (!value) return ``;
  if (value && arrOfValues.length === 1)
    return templateNameText(value, variant).replace("inDeepMarker", "");
  return templateNameText(value, variant).replace(
    "inDeepMarker",
    templateHeaderText(
      getMultipleStringForNestedText(
        [...arrOfValues.filter((_, i) => i !== 0)],
        variant
      )
    )
  );
}

export function getStringNestedTypeEleven(label, text, list, variant) {
  let newArr = [];
  let newArr1 = [];
  let newText = "";
  // console.log(list)
  // console.log(variant)
  // console.log(text)
  // console.log(label)

  if (variant === "iContains") {
    variant = "exact";
    const splittedList = [text]
    .map((init) => {
      if (typeof init === "string" && !init.includes("/")) {
        return [init];
      } else {
        newText = init.split("/").map((e) => e.trim()).reverse()[0];
        return init.split("/").map((e) => e.trim());
      }
    })
    .map((block) => {
      if (block.length > 0) {
        return getMultipleStringForNestedText(block.reverse(), variant);
      }
    });

    if (!splittedList[0]) return `
     ${label}:{name: {exact: ""}}inDeepMarker
    `;

    return `  
      plantUsage: {
        ${label}:{${splittedList[0]}}
      }inDeepMarker
    `;
  } else {
    variant = "inList";
    newArr = list.map(init => {
      if (typeof init === "string" && !init.includes("/")) {
        return [init]
      } else {
        return init.split("/").map(e => e.trim()).reverse();
      }
    })

    let maxLength = Math.max(...newArr.map(item => item.length));

    for (let i = 0; i < maxLength; i++) {
      let childArr = []
      for (let j = 0; j < newArr.length; j++) {
        if (newArr[j][i]) {
          childArr.push(newArr[j][i])
        }
      }
      newArr1.push(childArr)
    }

    const splittedList = newArr1?.map(_ => getMultipleStringForNested(newArr1, variant));

    if (!splittedList[0])
    return `
      ${label}:{name: {inList: []}}inDeepMarker
    `;

    return `
      plantUsage: {
        ${label}:{${splittedList[0]}}
      }inDeepMarker
    `;
  }
}

function getStringNestedTypeTwelve(label, text, list, variant) {
  let newArr = [];
  let newArr1 = [];
  if (variant === "iContains") {
    variant = "iStartsWith"
    const splittedList = [text]
    .map((init) => {
      if (typeof init === "string" && !init.includes("/")) {
        return [init];
      } else {
        return init.split("/").map((e) => e.trim());
      }
    })
    .map((block) => {
      if (block.length > 0) {
        return getMultipleStringForNestedText(block.reverse(), variant);
      }
    });

    if (!splittedList[0]) return `
      citation:{
        copyOfOriginal:{
          original:{
            genre: {name: {iStartsWith: ""}}
          }
        } 
      }inDeepMarker
    `;

    return `
      citation:{
        copyOfOriginal:{
          original:{
            genre:{${splittedList[0]}}
          }
        } 
      }inDeepMarker
    `;
  } else {
    variant = "inList";
    newArr = list.map(init => {
      if (typeof init === "string" && !init.includes("/")) {
        return [init]
      } else {
        return init.split("/").map(e => e.trim()).reverse();
      }
    })

    let maxLength = Math.max(...newArr.map(item => item.length));

    for (let i = 0; i < maxLength; i++) {
      let childArr = []
      for (let j = 0; j < newArr.length; j++) {
        if (newArr[j][i]) {
          childArr.push(newArr[j][i])
        }
      }
      newArr1.push(childArr)
    }

    const splittedList = newArr1.map(_ => getMultipleStringForNested(newArr1, variant));

    if (!splittedList[0]) return `
      citation:{
        copyOfOriginal:{
          original:{
            genre: {name: {inList: []}}
          }
        } 
      }inDeepMarker
    `;
    return `
      citation:{
        copyOfOriginal:{
          original:{
            genre:{${splittedList[0]}}
          }
        } 
      }inDeepMarker
    `;
  }
}

function getStringNestedTypeThirteen(label, text, list, variant) {
  let newArr = [];
  let newArr1 = [];

  if (variant === "iContains") {
    variant = "iStartsWith";
    const splittedList = [text]
      .map((init) => {
        if (typeof init === "string" && !init.includes("/")) {
          return [init];
        } else {
          return init.split("/").map((e) => e.trim());
        }
      })
      .map((block) => {
        if (block.length > 0) {
          return getMultipleStringForNestedText(block.reverse(), variant);
        }
      });
    if (!splittedList[0]) return `
      storageType:{
        name:{iStartsWith: ""}
      }inDeepMarker
    `;
    
    return `
      plantUsage: {
        storageType: {
          ${splittedList[0]}
        }
      }inDeepMarker
    `;
  } else {
    variant = "inList";
    newArr = list.map(init => {
      if (typeof init === "string" && !init.includes("/")) {
        return [init]
      } else {
        return init.split("/").map(e => e.trim()).reverse();
      }
    })

    let maxLength = Math.max(...newArr.map(item => item.length));

    for (let i = 0; i < maxLength; i++) {
      let childArr = []
      for (let j = 0; j < newArr.length; j++) {
        if (newArr[j][i]) {
          childArr.push(newArr[j][i])
        }
      }
      newArr1.push(childArr)
    }

    const splittedList = newArr1.map(_ => getMultipleStringForNested(newArr1, variant));
    
    if (!splittedList[0]) return `
      storageType:{
        name:{inList: []}
      }inDeepMarker
    `;

    return `
      plantUsage: {
        storageType: {
          ${splittedList[0]}
        }
      }inDeepMarker
    `;
  }
}

function getUnityType(condition) {
  const { unityType, contain } = condition;
  if (contain === "не содержит") return "Not";

  switch (unityType) {
    case "И":
      return "And";
    case "ИЛИ":
      return "Or";
    default:
      return "Or";
  }
}
function getVariant(condition) {
  const { contain } = condition;
  switch (contain) {
    case "содержит":
    case "не содержит":
      return "iContains";
    case "совпадает":
      return "inList";
    default:
      return "iContains";
  }
}
function getComplexString(deep, conditions) {
  const {
    label,
    text,
    list = [],
  } = getCurrentElementForGraph(conditions[0], GRAPH_QUERYTYPE_FIELD_DATASET);

  const type = getCurrentElementForGraph(
    conditions[0],
    GRAPH_QUERYTYPE_FIELD_DATASET
  ).type;
  console.log(type)
  const variant = getVariant(conditions[0]);
  let string = "";
  let arr = ``;
  switch (type) {
    case 1:
      string = getStringTypeOne(label, text, list, variant);
      arr = getStringTypeOne(label, text, list, variant);
      break;
    case 2:
      string = getStringTypeTwo(label, text, list, variant);
      arr = getStringTypeTwo(label, text, list, variant);
      break;
    case 3:
      string = getStringTypeThree(label, text, list, variant);
      arr = getStringTypeThree(label, text, list, variant);
      break;
    case 31:
      string = getStringTypeThreeOne(label, text, list, variant);
      arr = getStringTypeThreeOne(label, text, list, variant);
      break;
    case 4:
      string = getStringTypeFour(label, text, list, variant);
      arr = getStringTypeFour(label, text, list, variant);
      break;
    case 5:
      string = getStringTypeFive(label, text, list, variant);
      arr = getStringTypeFive(label, text, list, variant);
      break;
    case 6:
      string = getStringTypeSix(label, text, list, variant);
      arr = getStringTypeSix(label, text, list, variant);
      break;
    case 7:
      string = getStringTypeSeven(label, text, list, variant);
      arr = getStringTypeSeven(label, text, list, variant);
      break;
    case 8:
      string = getStringTypeEight(label, text, list, variant);
      arr = getStringTypeEight(label, text, list, variant);
      break;
    case 9:
      string = getStringTypeNine(label, text, list, variant);
      arr = getStringTypeNine(label, text, list, variant);
      break;
    case 10:
      string = getStringTypeYearPeriod(text);
      arr = getStringTypeYearPeriod(text);
      break;
    case 11:
      string = getStringNestedTypeEleven(label, text, list, variant);
      arr = getStringNestedTypeEleven(label, text, list, variant);
      break;
    case 12:
      string = getStringNestedTypeTwelve(label, text, list, variant);
      arr = getStringNestedTypeTwelve(label, text, list, variant);
      break;
    case 13:
      string = getStringNestedTypeThirteen(label, text, list, variant);
      arr = getStringNestedTypeThirteen(label, text, list, variant);
      break;
    default:
      break;
  }
  if (deep === 1) {
    string = string.replace("inDeepMarker", ``);
  } else {
    const newConditions = conditions.filter((_, i) => i !== 0);
    const unityType = getUnityType(newConditions[0]);
    string = arr.replace(
      "inDeepMarker",
      `, ${unityType}: {${getComplexString(deep - 1, [...newConditions])}}`
    );
  }
  return string;
}

export const generatePayloadToRequest = (conditions, yearPeriod) => {
  if (conditions.length === 0) return "{}";
  //костыль, если условия с негативным запросом на первом месте, не срабатывает Not, добавляю пустое условия в начало
  const negativeHack = conditions[0].contain === "не содержит"?[{
      field: conditions[0].field,
      unityType: "И",
      contain: "входит",
      text: "",
  }]:[] 
  // добавляем условия для фильтрации по году создания
  const conditionsWithDate = [
    ...negativeHack,
    ...conditions,
    {
      field: "Временной интервал",
      unityType: "И",
      contain: "входит",
      text: yearPeriod,
    },
  ];

  const deep = conditionsWithDate.length;
  console.log("### глубина",deep)

  // if (deep === 1) {
  //   const { label, type, text } = getCurrentElementForGraph(
  //     conditions[0],
  //     GRAPH_QUERYTYPE_FIELD_DATASET
  //   );

  //   const variant = getVariant(conditions[0]);

  //   switch (type) {
  //     case 1:
  //       return `{${getStringTypeOne(label, text, variant).replace(
  //         "inDeepMarker",
  //         ""
  //       )}}`;
  //     case 2:
  //       return `{${getStringTypeTwo(label, text, variant).replace(
  //         "inDeepMarker",
  //         ""
  //       )}}`;
  //     case 3:
  //       return `{${getStringTypeThree(label, text, variant).replace(
  //         "inDeepMarker",
  //         ""
  //       )}}`;
  //     case 31:
  //       return `{${getStringTypeThreeOne(label, text, variant).replace(
  //         "inDeepMarker",
  //         ""
  //       )}}`;
  //     case 4:
  //       return `{${getStringTypeFour(label, text, variant).replace(
  //         "inDeepMarker",
  //         ""
  //       )}}`;

  //     case 5:
  //       return `{${getStringTypeFive(label, text, variant).replace(
  //         "inDeepMarker",
  //         ""
  //       )}}`;

  //     case 6:
  //       return `{${getStringTypeSix(label, text, variant).replace(
  //         "inDeepMarker",
  //         ""
  //       )}}`;

  //     case 7:
  //       return `{${getStringTypeSeven(label, text, variant).replace(
  //         "inDeepMarker",
  //         ""
  //       )}}`;

  //     case 8:
  //       return `{${getStringTypeEight(label, text, variant).replace(
  //         "inDeepMarker",
  //         ""
  //       )}}`;

  //     case 9:
  //       return `{${getStringTypeNine(label, text, variant).replace(
  //         "inDeepMarker",
  //         ""
  //       )}}`;

  //     default:
  //       return undefined;
  //   }
  // }
  const complexString = getComplexString(deep, conditionsWithDate);

  return "{" + complexString + "}";
};

export function getClearDataset(dataset) {
  let processedDataset = [];
  dataset?.usagesConnection?.edges.forEach((element) => {
    const sameLexeme = processedDataset.find(
      (el) => el.lexeme.id === element.node.lexeme.id
    );
    const notUnicum = !!sameLexeme;
    if (!notUnicum) {
      processedDataset.push({
        ...element.node,
      });
    } else {
    }
  });
  return processedDataset;
}


export const getNestedProperty = (
  obj,
  path1,
  path2 = "-",
  defaultValue = "-"
) => {
  // console.log(obj)
  if (path2 === "-") {
    const value = path1
      ?.split(".")
      .reduce((o, p) => o?.hasOwnProperty(p) && o[p], obj);
    return value ? value : defaultValue;
  } else {
    const value1 = path1
      ?.split(".")
      .reduce((o, p) => o?.hasOwnProperty(p) && o[p], obj);
    const value2 = path2
      ?.split(".")
      .reduce((o, p) => o?.hasOwnProperty(p) && o[p], obj);
    if (path2.split(".")[1] === "rusNomenclatureName") return value1;
    if (value1 === value2 && !isNaN(value1)) {
      return value1;
    } else {
      return `${value1} ${value2}`;
    }
  }
};
