export const CONTAIN_DATASET = ["содержит","не содержит", "совпадает"];
export const UNITYTYPE_DATASET = ["И", "ИЛИ"];
export const FIELD_DATASET = [
  "Лексема",
  "Ботаническое название (лат.)",
  "Cовременное название растения (рус.)",
  "Название в источнике (лат.)",
  "Идентификация автора публикации (лат.)",
  "Функция растения",
  "Болезнь (как в источнике)",
  "Болезнь животного (как в источнике)",
  "Лекарственная форма",
  "Используемая часть растения",
  "Используемая часть растения (как в источнике)",
  "Лексема обозначает часть растения",
  "Жизненная форма (как в источнике)",
  "Способ обработки и запасания",
  // "Описание растения",
  // "Сословие",
  "Этноним",
  "Место произрастания",
  "Место купли",
  "Слово в оригинале (если перевод)",
  "Способы передачи инояз. фитонима",
  "Язык, с которого сделан перевод",
  "Языковая принадлежность фитонима (в источнике)",
  "Язык эквивалентных фитонимов",
  // "Поиск по цитате",
  // "Фольклорные материалы",
  "Переносное значение",
  "Этимон",
  "Часть речи",
  "Источник",
  "Тип источника",
  "Памятник",
  "Оригинал / перевод",
  "Автор",
  "Жанр"
];
export const QUERYTYPE_FIELD_DATASET = {
lexeme:"Лексема",
scientific_name:"Ботаническое название (лат.)",
rus_nomenclature_name:"Cовременное название растения (рус.)",
name_of_latin_source:"Название в источнике (лат.)",
name_of_latin_record:"Идентификация автора публикации (лат.)",
function:"Функция растения",
disease_as_in_source:"Болезнь (как в источнике)",
vet_disease_as_in_source:"Болезнь животного (как в источнике)",
medicinal_form:"Лекарственная форма",
plant_part_used:"Используемая часть растения",
plant_part_used_in_source:"Используемая часть растения (как в источнике)",
plant_part:"Лексема обозначает часть растения",
life_form_in_source:"Жизненная форма (как в источнике)",
storage_type:"Способ обработки и запасания",
plant_description:"Описание растения",
// social_class:"Сословие",
ethno_list:"Этноним",
place_distribution:"Место произрастания",
place_acquisition:"Место купли",
original_word:"Слово в оригинале (если перевод)",
transmission_method:"Способы передачи инояз. фитонима",
language:"Язык, с которого сделан перевод",
language_affiliation:"Языковая принадлежность фитонима (в источнике)",
language_for_other_names:"Язык эквивалентных фитонимов",
citation:"Поиск по цитате",
folklore_material:"Фольклорные материалы",
figurative_meaning:"Переносное значение",
temporary_name_Atimon:"Этимон",
temporary_name_PartSpeech:"Часть речи",
copyOfOriginal:"Источник",
temporary_name_SuplyType:"Тип источника",
monument:"Памятник",
temporary_name_OriginalOrTranslated:"Оригинал / перевод",
author:"Автор",
genre:"Жанр",
yearStart:"год начала",
yearEnd:'год конца'
};
export const SEARCH_PARAMS_CONTAIN_LABEL={
  "содержит":"IN",
  "не содержит":"OUT",
  "совпадает":"EXACT",
}
export const GRAPH_QUERYTYPE_FIELD_DATASET = {
lexeme:{
  rus:"Лексема",
  formikName:"lexeme",
  type:1,
  path: "citation.lexema",
  pathLink: "lexeme.id",
  pathLinkName: "lexeme",
},
scientificName:{
  rus:"Ботаническое название растения (лат.)",
  formikName:"scientificName",
  type:3,
  path: "scientificName",
},
rusNomenclatureName:{
  rus:"Cовременное название растения (рус.)",
  formikName:"rusNomenclatureName",
  type:31,
  path: "scientificName",
  path2: "scientificName.rusNomenclatureName",
},
nameOfLatinSource:{
  rus:"Название в источнике (лат.)",
  formikName:"nameOfLatinSource",
  type:2,
  path: "nameOfLatinSource",
},
nameOfLatinRecord:{
  rus:"Идентификация автора публикации (лат.)",
  formikName:"nameOfLatinRecord",
  type:2,
  path: "nameOfLatinRecord",
},
function:{
  rus:"Функция растения",
  formikName:"function",
  type:11,
  path: "allFunctions",
},
diseaseAsInSource:{
  rus:"Болезнь (как в источнике)",
  formikName:"diseaseAsInSource",
  type:4,
  path: "allDiseaseAsInSource",
},
vetDiseaseAsInSource:{
  rus:"Болезнь животного (как в источнике)",
  formikName:"vetDiseaseAsInSource",
  type:4,
  path: "vetDiseaseAsInSource",
},
medicinalForm:{
  rus:"Лекарственная форма",
  formikName:"medicinalForm",
  type:4,
  path: "medicinalForm",

},
plantPartUsed:{
  rus:"Используемая часть растения",
  formikName:"plantPartUsed",
  type:4,
  path: "plantPartUsed",
},
plantPartUsedInSource:{
  rus:"Используемая часть растения (как в источнике)",
  formikName:"plantPartUsedInSource",
  type:4,
  path: "plantPartUsedInSource",
},
plantPart:{
  rus:"Лексема обозначает часть растения",
  formikName:"plantPart",
  type:1,
  path: "plantPart",
},
lifeFormInSource:{
  rus:"Жизненная форма (как в источнике)",
  formikName:"lifeFormInSource",
  type:1,
  path: "lifeFormInSource",
},
storageType:{
  rus:"Способ обработки и запасания",
  formikName:"storageType",
  type:13,
  path: "storageType",
},
ethnoList:{
  rus:"Этноним",
  formikName:"ethnoList",
  type:4,
  path: "ethnoList",
},
socialClassRel :{
  rus:"Сословие",
  formikName:"socialClassRel",
  type:1,
  path: "socialClassRel",
},
placeDistribution:{
  rus:"Место произрастания",
  formikName:"placeDistribution",
  type:1,
  path: "placeDistribution",
},
placeAcquisition:{
  rus:"Место купли",
  formikName:"placeAcquisition",
  type:1,
  path: "placeAcquisition",
},
place:{
  rus:"Место использования",
  formikName:"place",
  type:9,
  path: "place",
},
originalWord:{
  rus:"Слово в оригинале (если перевод)",
  formikName:"originalWord",
  type:2,
  path: "originalWord",
},
transmissionMethod:{
  rus:"Способы передачи инояз. фитонима",
  formikName:"transmissionMethod",
  type:1,
  path: "transmissionMethod.name",
},
language:{
  rus:"Язык, с которого сделан перевод",
  formikName:"language",
  type:1,
  path: "language.name"
},
languageAffiliation:{
  rus:"Языковая принадлежность фитонима (в источнике)",
  formikName:"languageAffiliation",
  type:1,
  path: "languageAffiliation"
},
languageForOtherNames:{
  rus:"Язык эквивалентных фитонимов",
  formikName:"languageForOtherNames",
  type:1,
  path: "languageForOtherNames",
},
figurativeMeaning:{
  rus:"Переносное значение",
  formikName:"figurativeMeaning",
  type:1,
  path: "figurativeMeaning",
},
// citation:{
//   rus:"Поиск по цитате",
//   formikName:"originalQuote",
//   type:4,
//   path: "citation.originalQuote",
//   pathLink: "citation.id",
//   pathLinkName: "citation",
// },
copyOfOriginal:{//цитаты - копиоф ариджинал - енкодинг
  rus:"Источник",
  formikName:"copyOfOriginal",
  type:5,
  path: "citation.copyOfOriginal.encoding",
  pathLink: "citation.copyOfOriginal.id",
},
copyOfOriginalType:{//цитаты - копи оф  ориджингал - копи оф  ориджингал type - name
  rus:"Тип источника",
  formikName:"copyOfOriginalType",
  type:6,
  path: "citation.copyOfOriginal.copyOfOriginalType.name"
},
author:{//цитаты - копи оф  ориджингал - ориджинал - автор
  rus:"Автор",
  formikName: "author",
  graphqlName:"author",
  type:7,
  path: "citation.copyOfOriginal.original.author",
},
monument:{//цитаты - копи оф  ориджингал - ориджинал - (фуллнейм + енкодинг)
  rus:"Памятник",
  formikName: "monument",
  graphqlName:"monument",
  type:8,
  path: "citation.copyOfOriginal.original.fullName"
  // path2: "citation.copyOfOriginal.original.encoding"
},
genre:{//цитаты - копи оф  ориджингал - ориджинал - жанр - name
  rus:"Жанр",
  formikName: "genre",
  graphqlName:"genre",
  type:12,
  path: "citation.copyOfOriginal.original.genre"
},
yearPeriod:{
  rus:"Время создания",
  formikName: "yearPeriod",
  creationDate:"yearPeriod",
  type:10,
  path: "citation.copyOfOriginal.creationDateStart",
  path2: "citation.copyOfOriginal.creationDateEnd",
},
// temporary_name_Atimon:{5
//   rus:"Этимон",
//   graphqlName:"",
// },
// temporary_name_PartSpeech:{4
//   rus:"Часть речи",
//   graphqlName:"",
// },
// social_class:{4
//   rus:"Сословие",
//   graphqlName:"socialClass",
// },
// temporary_name_OriginalOrTranslated:"Оригинал / перевод", boolean
// plant_description:"Описание растения", boolean
// folklore_material:"Фольклорные материалы", boolean
};
export const YEAR_SLIDER_MARKS = [
  {
    value: 1560,
    label: "1000",
  },
  {
    value: 1580,
    label: "1100",
  },
  {
    value: 1600,
    label: "1200",
  },
  {
    value: 1620,
    label: "1300",
  },
  {
    value: 1640,
    label: "1400",
  },
  {
    value: 1660,
    label: "1500",
  },
  {
    value: 1680,
    label: "1600",
  },
  {
    value: 1700,
    label: "1700",
  },
  {
    value: 1725,
    label: "1725",
  },
  {
    value: 1750,
    label: "1750",
  },
  {
    value: 1775,
    label: "1775",
  },
  {
    value: 1800,
    label: "1800",
  },
  {
    value: 1825,
    label: "1825",
  },
];
export function valuetext(value) {
  return `${value} год`;
}