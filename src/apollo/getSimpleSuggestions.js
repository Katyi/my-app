import { gql } from "@apollo/client";


function _collect_whole_line(parentNodeAttributeName, node) {
  if (parentNodeAttributeName in node && node[parentNodeAttributeName]) {
    return [node, ..._collect_whole_line(parentNodeAttributeName, node[parentNodeAttributeName])]
  }
  return [node]
}

// ЗАПРОС Лексема ДЛЯ СПИСКА В SELECT
export const GET_SIMPLE_SUGGESTIONS_LEXEME = {
  query: gql`
query GetSuggestionsLexeme($text: String!, $offset:Int!) {
  usages(
    pagination: {limit: 10, offset: $offset}
    filters: {
      lexeme:{name:{iStartsWith:$text},
      languageLexeme: {name: {exact: "русский" }}
      }
    },
      order: {lexeme: {name: ASC }}
  ) {
    lexeme {
      name
    }
  }
}
`, 
subQuery: gql`
query GetSuggestionsLexeme($text: String!, $offset:Int!) {
  usages(
    pagination: {limit: 10, offset: $offset}
    filters: {
      lexeme:{name:{iContains:$text},
      languageLexeme: {name: {exact: "русский" }}
      }
    },
    order: {lexeme: {name: ASC }}
  ) {
    lexeme {
      name
    }
  }
}
`,
suggestions: (item) => [item.lexeme.name]
};
// ЗАПРОС Ботаническое название растения (лат.) ДЛЯ СПИСКА В SELECT
export const GET_SIMPLE_SUGGESTIONS_SCIENTIFIC_NAME = {
  query: gql`
query GetSuggestionsScientificName($text: String!, $offset:Int!) {
  usages(
    pagination: {limit: 10, offset: $offset}
    filters: {
      scientificName:{name:{iStartsWith:$text}}}
  ) {
    scientificName {
      name
    }
  }
}
`, 
subQuery: gql`
query GetSuggestionsScientificName($text: String!, $offset:Int!) {
  usages(
    pagination: {limit: 10, offset: $offset}
    filters: {
      scientificName:{name:{iContains:$text}}}
  ) {
    scientificName {
      name
    }
  }
}
`,
suggestions: (item) => item.scientificName.map((e) => e.name)
};
// ЗАПРОС Cовременное название растения (рус.) ДЛЯ СПИСКА В SELECT
export const GET_SIMPLE_SUGGESTIONS_RUS_NOMENCLATURE_NAME = {
  query: gql`
query GetSuggestionsRusNomenclatureName($text: String!, $offset:Int!) {
  usages(
    pagination: {limit: 10, offset: $offset}
    filters: {
      scientificName:{rusNomenclatureName:{iStartsWith:$text}}
    }
  ) {
    scientificName {
      rusNomenclatureName
    }
  }
}
`,
subQuery: gql`
query GetSuggestionsRusNomenclatureName($text: String!, $offset:Int!) {
  usages(
    pagination: {limit: 10, offset: $offset}
    filters: {
      scientificName:{rusNomenclatureName:{iContains:$text}}
    }
  ) {
    scientificName {
      rusNomenclatureName
    }
  }
}
`,
 suggestions: (item) => item.scientificName.map((e) => e.rusNomenclatureName)
};
// ЗАПРОС Название в источнике (лат.) ДЛЯ СПИСКА В SELECT
export const GET_SIMPLE_SUGGESTIONS_NAME_OF_LATIN_SOURCE = {
  query: gql`
query GetSuggestionsNameOfLatinSource($text: String!, $offset:Int!) {
  usages(
    pagination: {limit: 10, offset: $offset}
    filters: {
      nameOfLatinSource:{iStartsWith:$text}}
  ) {
    nameOfLatinSource
  }
}
`,
subQuery: gql`
query GetSuggestionsNameOfLatinSource($text: String!, $offset:Int!) {
  usages(
    pagination: {limit: 10, offset: $offset}
    filters: {
      nameOfLatinSource:{iContains:$text}}
  ) {
    nameOfLatinSource
  }
}
`,
 suggestions: (item) => [item.nameOfLatinSource]
};
// ЗАПРОС Идентификация автора публикации (лат.) ДЛЯ СПИСКА В SELECT
export const GET_SIMPLE_SUGGESTIONS_NAME_OF_LATIN_RECORD = {
  query: gql`
query GetSuggestionsNameOfLatinRecord($text: String!, $offset:Int!) {
  usages(
    pagination: {limit: 10, offset: $offset}
    filters: {
      nameOfLatinRecord:{iStartsWith:$text}}
  ) {
    nameOfLatinRecord
  }
}
`,
subQuery: gql`
query GetSuggestionsNameOfLatinRecord($text: String!, $offset:Int!) {
  usages(
    pagination: {limit: 10, offset: $offset}
    filters: {
      nameOfLatinRecord:{iContains:$text}}
  ) {
    nameOfLatinRecord
  }
}
`,
 suggestions: (item) => [item.nameOfLatinRecord]
};
// Болезни ???
export const GET_SIMPLE_SUGGESTIONS_DISEASE = {
  query: gql`
  query GetSuggestionsDisease($text: String!, $offset:Int!) {
    usages(
      pagination: {limit: 10, offset: $offset}
      filters: {
        disease:{
          name: {iStartsWith:$text}
        }
      }
    ) {
      disease {
        id
        name
        parent {
          id
          name
          parent {
            id
            name
            parent {
              id
              name
              parent {
                id
                name
                parent {
                  id
                  name
                }
              }
            }
          }
        }
      }
    }
  }
`,
subQuery: gql`
  query GetSuggestionsDisease($text: String!, $offset:Int!) {
    usages(
      pagination: {limit: 10, offset: $offset}
      filters: {
        disease:{
          name: {iContains:$text}
        }
      }
    ) {
      disease {
        id
        name
        parent {
          id
          name
          parent {
            id
            name
            parent {
              id
              name
              parent {
                id
                name
                parent {
                  id
                  name
                }
              }
            }
          }
        }
      }
    }
  }`,
 suggestions: (item) => item.function.map((e) => _collect_whole_line('parent', e).reverse().map((n) => n.name).join(' / '))
};
// ЗАПРОС Функция растения ДЛЯ СПИСКА В SELECT
export const GET_SIMPLE_SUGGESTIONS_FUNCTION = {
  query: gql`
  query GetSuggestionsFunction($text: String!, $offset:Int!) {
    plantUsages(
      pagination: {limit: 10, offset: $offset}
      filters: {
        function:{
          name: {iStartsWith:$text}
        }
      }
    ) {
      function {
        id
        name
        parent {
          id
          name
          parent {
            id
            name
            parent {
              id
              name
              parent {
                id
                name
                parent {
                  id
                  name
                }
              }
            }
          }
        }
      }
    }
  }
`,
subQuery: gql`
query GetSuggestionsFunction($text: String!, $offset:Int!) {
  plantUsages(
    pagination: {limit: 10, offset: $offset}
    filters: {
      function:{
        name: {iContains:$text}
      }
    }
  ) {
    function {
      id
      name
      parent {
        id
        name
        parent {
          id
          name
          parent {
            id
            name
            parent {
              id
              name
              parent {
                id
                name
              }
            }
          }
        }
      }
    }
  }
}`,
 suggestions: (item) => item.function.map((e) => _collect_whole_line('parent', e).reverse().map((n) => n.name).join(' / '))
};
// ЗАПРОС Болезнь (как в источнике) В SELECT
export const GET_SIMPLE_SUGGESTIONS_DISEASE_AS_IN_SOURCE = {
  query: gql`
query GetSuggestionsDiseaseAsInSource($text: String!, $offset:Int!) {
  plantUsages(
    pagination: {limit: 10, offset: $offset}
    filters: {
      diseaseAsInSource:{name: {iStartsWith:$text}}}
  ) {
    diseaseAsInSource {
      name
    }
  }
}
`,
subQuery: gql`
query GetSuggestionsDiseaseAsInSource($text: String!, $offset:Int!) {
  plantUsages(
    pagination: {limit: 10, offset: $offset}
    filters: {
      diseaseAsInSource:{name: {iContains:$text}}}
  ) {
    diseaseAsInSource {
      name
    }
  }
}`,
 suggestions: (item) => item.diseaseAsInSource.map((e) => e.name)
};
// ЗАПРОС Болезнь животного (как в источнике) В SELECT
export const GET_SIMPLE_SUGGESTIONS_VET_DISEASE_AS_IN_SOURCE = {
  query: gql`
query GetSuggestionsVetDiseaseAsInSource($text: String!, $offset:Int!) {
  plantUsages(
    pagination: {limit: 10, offset: $offset}
    filters: {
      vetDiseaseAsInSource:{name: {iStartsWith:$text}}}
  ) {
    vetDiseaseAsInSource {
      name
    }
  }
}
`,
subQuery: gql`
query GetSuggestionsVetDiseaseAsInSource($text: String!, $offset:Int!) {
  plantUsages(
    pagination: {limit: 10, offset: $offset}
    filters: {
      vetDiseaseAsInSource:{name: {iContains:$text}}}
  ) {
    vetDiseaseAsInSource {
      name
    }
  }
}`,
 suggestions: (item) => item.vetDiseaseAsInSource.map((e) => e.name)
};
// ЗАПРОС Лекарственная форма В SELECT
export const GET_SIMPLE_SUGGESTIONS_MEDICINAL_FORM = {
  query: gql`
query GetSuggestionsMedicinalForm($text: String!, $offset:Int!) {
  plantUsages(
    pagination: {limit: 10, offset: $offset}
    filters: {
      medicinalForm:{name: {iStartsWith:$text}}}
  ) {
    medicinalForm {
      name
    }
  }
}
`,
subQuery: gql`
query GetSuggestionsMedicinalForm($text: String!, $offset:Int!) {
  plantUsages(
    pagination: {limit: 10, offset: $offset}
    filters: {
      medicinalForm:{name: {iContains:$text}}}
  ) {
    medicinalForm {
      name
    }
  }
}`,
 suggestions: (item) => item.medicinalForm.map((e) => e.name)
};
// ЗАПРОС Используемая часть растения В SELECT
export const GET_SIMPLE_SUGGESTIONS_PLANT_PART_USED = {
  query: gql`
query GetSuggestionsPlantPartUsed($text: String!, $offset:Int!) {
  plantUsages(
    pagination: {limit: 10, offset: $offset}
    filters: {
      plantPartUsed:{name: {iStartsWith:$text}}}
  ) {
    plantPartUsed {
      name
    }
  }
}
`,
subQuery: gql`
query GetSuggestionsPlantPartUsed($text: String!, $offset:Int!) {
  plantUsages(
    pagination: {limit: 10, offset: $offset}
    filters: {
      plantPartUsed:{name: {iContains:$text}}}
  ) {
    plantPartUsed {
      name
    }
  }
}`,
 suggestions: (item) => item.plantPartUsed.map((e) => e.name)
};
// ЗАПРОС Используемая часть растения (как в источнике) В SELECT
export const GET_SIMPLE_SUGGESTIONS_PLANT_PART_USED_IN_SOURCE = {
  query: gql`
query GetSuggestionsPlantPartUsedInSource($text: String!, $offset:Int!) {
  plantUsages(
    pagination: {limit: 10, offset: $offset}
    filters: {
      plantPartUsedInSource:{name: {iStartsWith:$text}}}
  ) {
    plantPartUsedInSource {
      name
    }
  }
}
`,
subQuery: gql`
query GetSuggestionsPlantPartUsedInSource($text: String!, $offset:Int!) {
  plantUsages(
    pagination: {limit: 10, offset: $offset}
    filters: {
      plantPartUsedInSource:{name: {iContains:$text}}}
  ) {
    plantPartUsedInSource {
      name
    }
  }
}`,
 suggestions: (item) => item.plantPartUsedInSource.map((e) => e.name)
};
// ЗАПРОС Лексема обозначает часть растения В SELECT
export const GET_SIMPLE_SUGGESTIONS_PLANT_PART = {
  query: gql`
query GetSuggestionsPlantPart($text: String!, $offset:Int!) {
  usages(
    pagination: {limit: 10, offset: $offset}
    filters: {
      plantPart:{name: {iStartsWith:$text}}}
  ) {
    plantPart {
      name
    }
  }
}
`,
subQuery: gql`
query GetSuggestionsPlantPart($text: String!, $offset:Int!) {
  usages(
    pagination: {limit: 10, offset: $offset}
    filters: {
      plantPart:{name: {iContains:$text}}}
  ) {
    plantPart {
      name
    }
  }
}`,
 suggestions: (item) => item.plantPart.map((e) => e.name)
};
// ЗАПРОС Жизненная форма (как в источнике) В SELECT
export const GET_SIMPLE_SUGGESTIONS_LIFE_FORM_IN_SOURCE = {
  query: gql`
query GetSuggestionsLifeFormInSource($text: String!, $offset:Int!) {
  usages(
    pagination: {limit: 10, offset: $offset}
    filters: {
      lifeFormInSource:{name: {iStartsWith:$text}}}
  ) {
    lifeFormInSource {
      name
    }
  }
}
`,
subQuery: gql`
query GetSuggestionsLifeFormInSource($text: String!, $offset:Int!) {
  usages(
    pagination: {limit: 10, offset: $offset}
    filters: {
      lifeFormInSource:{name: {iContains:$text}}}
  ) {
    lifeFormInSource {
      name
    }
  }
}`,
 suggestions: (item) => item.lifeFormInSource.map((e) => e.name)
};
// ЗАПРОС Способ обработки и запасания В SELECT
export const GET_SIMPLE_SUGGESTIONS_STORAGE_TYPE = {
  query: gql`
query GetSuggestionsStorageType($text: String!, $offset:Int!) {
  plantUsages(
    pagination: {limit: 10, offset: $offset}
    filters: {
      storageType:{name: {iStartsWith:$text}}}
  ) {
    storageType {
      name
      parent{
        name
        parent{
          name
        }
      }
    }
  }
}
`,
subQuery: gql`
query GetSuggestionsStorageType($text: String!, $offset:Int!) {
  plantUsages(
    pagination: {limit: 10, offset: $offset}
    filters: {
      storageType:{name: {iContains:$text}}}
  ) {
    storageType {
      name
      parent{
        name
        parent{
          name
        }
      }
    }
  }
}`,
suggestions: (item) => {
  return item.storageType.map((e) => _collect_whole_line('parent', e).reverse().map((n) => n.name).join(' / '))
}
};

// @BOOLEAN VALUE
// export const GET_SIMPLE_SUGGESTIONS_PLANT_DESCRIPTION = {
//   query: gql`
// query GetSuggestionsPlantDescription($text: String!, $offset:Int!) {
//   usages(
//     pagination: {limit: 10, offset: $offset}
//     filters: {
//       plantDescription:{iStartsWith:$text}}
//   ) {
//     plantDescription
//   }
// }
// `,
// subQuery: gql``,
//  suggestions: (item) => [item.plantDescription]
// };


// ЗАПРОС Этноним В SELECT
export const GET_SIMPLE_SUGGESTIONS_ETHNO_LIST = {
  query: gql`
query GetSuggestionsEthnoList($text: String!, $offset:Int!) {
  plantUsages(
    pagination: {limit: 10, offset: $offset}
    filters: {
      ethnoList:{
        name: {iStartsWith:$text},
      }
    }
  ) {
    ethnoList {
      id
      name
      parent {
        id
        name
        parent {
          id
          name
          parent {
            id
            name
            parent {
              id
              name
            }
          }
        }
      }
    }
  }
}
`,
subQuery: gql`
query GetSuggestionsEthnoList($text: String!, $offset:Int!) {
  plantUsages(
    pagination: {limit: 10, offset: $offset}
    filters: {
      ethnoList:{
        name: {iContains:$text},
      }
    }
  ) {
    ethnoList {
      id
      name
      parent {
        id
        name
        parent {
          id
          name
          parent {
            id
            name
            parent {
              id
              name
            }
          }
        }
      }
    }
  }
}`,
 suggestions: (item) => item.ethnoList.map((e) => _collect_whole_line('parent', e).reverse().map((n) => n.name).join(' / '))
};

// ЗАПРОС Сословие В SELECT
export const GET_SIMPLE_SUGGESTIONS_SOCIAL_CLASS = {
  query: gql`
query GetSuggestionsSocialClass($text: String!, $offset:Int!) {
  usages(
    pagination: {limit: 10, offset: $offset}
    filters: {
      socialClassRel: {name: {iStartsWith:$text}}
    }
  ) {
    socialClassRel {
      name
    }
  }
}
`,
subQuery: gql`
query GetSuggestionsSocialClass($text: String!, $offset:Int!) {
  usages(
    pagination: {limit: 10, offset: $offset}
    filters: {
      socialClassRel: {name: {iContains:$text}}
    }
  ) {
    socialClassRel {
      name
    }
  }
}`,
//  suggestions: (item) => item.socialClassRel
 suggestions: (item) => item.socialClassRel.map((e) => e.name)
};

// ЗАПРОС Место произрастания В SELECT
export const GET_SIMPLE_SUGGESTIONS_PLACE_DISTRIBUTION = {
  query: gql`
query GetSuggestionsPlaceDistribution($text: String!, $offset:Int!) {
  usages(
    pagination: {limit: 10, offset: $offset}
    filters: {
      placeDistribution:{name: {iStartsWith:$text}}}
  ) {
    placeDistribution {
      name
    }
  }
}
`,
subQuery: gql`
query GetSuggestionsPlaceDistribution($text: String!, $offset:Int!) {
  usages(
    pagination: {limit: 10, offset: $offset}
    filters: {
      placeDistribution:{name: {iContains:$text}}}
  ) {
    placeDistribution {
      name
    }
  }
}`,
 suggestions: (item) => [item.placeDistribution[0].name]
};
// ЗАПРОС Место купли В SELECT
export const GET_SIMPLE_SUGGESTIONS_PLACE_ACQUISITION = {
  query: gql`
query GetSuggestionsPlaceAcquisition($text: String!, $offset:Int!) {
  usages(
    pagination: {limit: 10, offset: $offset}
    filters: {
      placeAcquisition:{name: {iStartsWith:$text}}}
  ) {
    placeAcquisition {
      name
    }
  }
}
`,
subQuery: gql`
query GetSuggestionsPlaceAcquisition($text: String!, $offset:Int!) {
  usages(
    pagination: {limit: 10, offset: $offset}
    filters: {
      placeAcquisition:{name: {iContains:$text}}}
  ) {
    placeAcquisition {
      name
    }
  }
}`,
 suggestions: (item) => [item.placeAcquisition[0].name]
};
// ЗАПРОС Место использования В SELECT
export const GET_SIMPLE_SUGGESTIONS_PLACE = {
  query: gql`
query GetSuggestionsPlaceAcquisition($text: String!, $offset:Int!) {
  plantUsages(
    pagination: {limit: 10, offset: $offset}
    filters: {
      place:{name: {iStartsWith:$text}}}
  ) {
    place {
      name
    }
  }
}
`,
subQuery: gql`
query GetSuggestionsPlaceAcquisition($text: String!, $offset:Int!) {
  plantUsages(
    pagination: {limit: 10, offset: $offset}
    filters: {
      place:{name: {iContains:$text}}}
  ) {
    place {
      name
    }
  }
}`,
 suggestions: (item) => [item?.place?.name]
};
// ЗАПРОС Слово в оригинале (если перевод) В SELECT
export const GET_SIMPLE_SUGGESTIONS_ORIGINAL_WORD = {
  query: gql`
query GetSuggestionsOriginalWord($text: String!, $offset:Int!) {
  usages(
    pagination: {limit: 10, offset: $offset}
    filters: {
      originalWord:{iStartsWith:$text}}
  ) {
    originalWord
  }
}
`,
subQuery: gql`
query GetSuggestionsOriginalWord($text: String!, $offset:Int!) {
  usages(
    pagination: {limit: 10, offset: $offset}
    filters: {
      originalWord:{iContains:$text}}
  ) {
    originalWord
  }
}`,
 suggestions: (item) => [item.originalWord]
};
// ЗАПРОС Способы передачи инояз. фитонима В SELECT
export const GET_SIMPLE_SUGGESTIONS_TRANSMISSION_METHOD = {
  query: gql`
query GetSuggestionsTransmissionMethod($text: String!, $offset:Int!) {
  usages(
    pagination: {limit: 10, offset: $offset}
    filters: {
      transmissionMethod: {name: {iStartsWith:$text}}}
  ) {
    transmissionMethod {
      name
    } 
  }
}
`,
subQuery: gql`
query GetSuggestionsTransmissionMethod($text: String!, $offset:Int!) {
  usages(
    pagination: {limit: 10, offset: $offset}
    filters: {
      transmissionMethod: {name: {iContains:$text}}}
  ) {
    transmissionMethod {
      name
    } 
  }
}`,
 suggestions: (item) => [item.transmissionMethod.name]
};
// ЗАПРОС Язык, с которого сделан перевод В SELECT
export const GET_SIMPLE_SUGGESTIONS_LANGUAGE = {
  query: gql`
query GetSuggestionsLanguage($text: String!, $offset:Int!) {
  usages(
    pagination: {limit: 10, offset: $offset}
    filters: {
      language: {name: {iStartsWith:$text}}}
  ) {
    language {
      name
    } 
  }
}
`,
subQuery: gql`
query GetSuggestionsLanguage($text: String!, $offset:Int!) {
  usages(
    pagination: {limit: 10, offset: $offset}
    filters: {
      language: {name: {iContains:$text}}}
  ) {
    language {
      name
    } 
  }
}`,
 suggestions: (item) => [item.language.name]
};
// ЗАПРОС Языковая принадлежность фитонима (в источнике) В SELECT
export const GET_SIMPLE_SUGGESTIONS_LANGUAGE_AFFILIATION = {
  query: gql`
query GetSuggestionsLanguageAffiliation($text: String!, $offset:Int!) {
  usages(
    pagination: {limit: 10, offset: $offset}
    filters: {
      languageAffiliation: {name: {iStartsWith:$text}}}
  ) {
    languageAffiliation {
      name
    } 
  }
}
`,
subQuery: gql`
query GetSuggestionsLanguageAffiliation($text: String!, $offset:Int!) {
  usages(
    pagination: {limit: 10, offset: $offset}
    filters: {
      languageAffiliation: {name: {iContains:$text}}}
  ) {
    languageAffiliation {
      name
    } 
  }
}`,
 suggestions: (item) => item.languageAffiliation.map((e) => e.name)
};
// ЗАПРОС Язык эквивалентных фитонимов В SELECT
export const GET_SIMPLE_SUGGESTIONS_LANGUAGE_FOR_OTHER_NAMES = {
  query: gql`
query GetSuggestionsLanguageForOtherNames($text: String!, $offset:Int!) {
  usages(
    pagination: {limit: 10, offset: $offset}
    filters: {
      languageForOtherNames: {name: {iStartsWith:$text}}}
  ) {
    languageForOtherNames {
      name
    } 
  }
}
`,
subQuery: gql`
query GetSuggestionsLanguageForOtherNames($text: String!, $offset:Int!) {
  usages(
    pagination: {limit: 10, offset: $offset}
    filters: {
      languageForOtherNames: {name: {iContains:$text}}}
  ) {
    languageForOtherNames {
      name
    } 
  }
}`,
 suggestions: (item) => item.languageForOtherNames.map((e) => e.name)
};

// @BIG TEXT VALUE
// export const GET_SIMPLE_SUGGESTIONS_CITATION = {
//   query: gql`
// query GetSuggestionsCitation($text: String!, $offset:Int!) {
//   usages(
//     pagination: {limit: 10, offset: $offset}
//     filters: {
//       citation: {copyOfOriginalQuote: {iStartsWith:$text}}}
//   ) {
//     citation {
//       copyOfOriginalQuote
//     } 
//   }
// }
// `,
// subQuery: gql``,
//  suggestions: (item) => [item.citation.copyOfOriginalQuote]
// };

//// @BOOLEAN VALUE
// export const GET_SIMPLE_SUGGESTIONS_FOLKLORE_MATERIAL = {
//   query: gql`
// query GetSuggestionsLanguageForOtherNames($text: String!, $offset:Int!) {
//   usages(
//     pagination: {limit: 10, offset: $offset}
//     filters: {
//       folkloreMaterial: $text}
//   ) {
//     folkloreMaterial
//   }
// }
// `,
// subQuery: gql``,
//  suggestions: (item) => item.languageForOtherNames.map((e) => e.name)
// };


// ЗАПРОС Переносное значение В SELECT
export const GET_SIMPLE_SUGGESTIONS_FIGURATIVE_MEANING = {
  query: gql`
query GetSuggestionsFigurativeMeaning($text: String!, $offset:Int!) {
  usages(
    pagination: {limit: 10, offset: $offset}
    filters: {
      figurativeMeaning:{
        name:{iStartsWith:$text}
      }}
  ) {
    figurativeMeaning {
      name
    }
  }
}
`,
subQuery: gql`
query GetSuggestionsFigurativeMeaning($text: String!, $offset:Int!) {
  usages(
    pagination: {limit: 10, offset: $offset}
    filters: {
      figurativeMeaning:{
        name:{iContains:$text}
      }}
  ) {
    figurativeMeaning {
      name
    }
  }
}`,
 suggestions: (item) => [item.figurativeMeaning[0].name]
};
// Этимон
export const GET_SIMPLE_SUGGESTIONS_ETYMON = {
  query: gql`
query GetSuggestionsEtymon($text: String!, $offset:Int!) {
  usages(
    pagination: {limit: 10, offset: $offset}
    filters: {
      lexeme: {
        etymology: {
          etymon: {iStartsWith: $text}
        }
      }
    }
  ) {
    lexeme {
      etymology {
        etymon
      }
    }
  }
}
`,
subQuery: gql`
query GetSuggestionsEtymon($text: String!, $offset:Int!) {
  usages(
    pagination: {limit: 10, offset: $offset}
    filters: {
      lexeme: {
        etymology: {
          etymon: {iContains: $text}
        }
      }
    }
  ) {
    lexeme {
      etymology {
        etymon
      }
    }
  }
}`,
 suggestions: (item) => [item.lexeme.etymology.etymon]
};
// Часть речи
export const GET_SIMPLE_SUGGESTIONS_PART_OF_SPEECH = {
  query: gql`
query GetSuggestionsPartOfSpeech($text: String!, $offset:Int!) {
  usages(
    pagination: {limit: 10, offset: $offset}
    filters: {
      lexeme: {
        partOfSpeech: {
          iStartsWith: $text
        }
      }
    }
  ) {
    lexeme {
      partOfSpeech
    }
  }
}
`,
subQuery: gql`
query GetSuggestionsPartOfSpeech($text: String!, $offset:Int!) {
  usages(
    pagination: {limit: 10, offset: $offset}
    filters: {
      lexeme: {
        partOfSpeech: {
          iContains: $text
        }
      }
    }
  ) {
    lexeme {
      partOfSpeech
    }
  }
}`,
 suggestions: (item) => [item.lexeme.partOfSpeech]
};
// ЗАПРОС Источник В SELECT
export const GET_SIMPLE_SUGGESTIONS_COPY_OF_ORIGINAL = {
  query: gql`
query GetSuggestionsCopyOfOriginal($text: String!, $offset:Int!) {
  usages(
    pagination: {limit: 10, offset: $offset}
    filters: {
      citation: {
        copyOfOriginal: {
          encoding: {iStartsWith: $text}
        }
      }
    }
  ) {
    citation {
      copyOfOriginal {
        encoding
      }
    }
  }
}
`,
subQuery: gql`
query GetSuggestionsCopyOfOriginal($text: String!, $offset:Int!) {
  usages(
    pagination: {limit: 10, offset: $offset}
    filters: {
      citation: {
        copyOfOriginal: {
          encoding: {iContains: $text}
        }
      }
    }
  ) {
    citation {
      copyOfOriginal {
        encoding
      }
    }
  }
}`,
 suggestions: (item) => [item.citation.copyOfOriginal.encoding]
};
// ЗАПРОС Тип источника В SELECT
export const GET_SIMPLE_SUGGESTIONS_COPY_OF_ORIGINAL_TYPE = {
  query: gql`
query GetSuggestionsCopyOfOriginalType($text: String!, $offset:Int!) {
  usages(
    pagination: {limit: 10, offset: $offset}
    filters: {
      citation: {
        copyOfOriginal: {
          copyOfOriginalType: {
            name: {iStartsWith: $text}
          }
        }
      }
    }
  ) {
    citation {
      copyOfOriginal {
        copyOfOriginalType {
          name
        }
      }
    }
  }
}
`,
subQuery: gql`
query GetSuggestionsCopyOfOriginalType($text: String!, $offset:Int!) {
  usages(
    pagination: {limit: 10, offset: $offset}
    filters: {
      citation: {
        copyOfOriginal: {
          copyOfOriginalType: {
            name: {iContains: $text}
          }
        }
      }
    }
  ) {
    citation {
      copyOfOriginal {
        copyOfOriginalType {
          name
        }
      }
    }
  }
}`,
 suggestions: (item) => [item.citation.copyOfOriginal.copyOfOriginalType.name]
};
// ЗАПРОС Памятник В SELECT
export const GET_SIMPLE_SUGGESTIONS_ORIGINAL = {
  query: gql`
query GetSuggestionsOriginal($text: String!, $offset:Int!) {
  usages(
    pagination: {limit: 10, offset: $offset}
    filters: {
      citation: {
        copyOfOriginal: {
          original: {
            encoding: {iStartsWith: $text}
          }
        }
      }
    }
  ) {
    citation {
      copyOfOriginal {
        original {
          encoding
        }
      }
    }
  }
}
`,
subQuery: gql`
query GetSuggestionsOriginal($text: String!, $offset:Int!) {
  usages(
    pagination: {limit: 10, offset: $offset}
    filters: {
      citation: {
        copyOfOriginal: {
          original: {
            encoding: {iContains: $text}
          }
        }
      }
    }
  ) {
    citation {
      copyOfOriginal {
        original {
          encoding
        }
      }
    }
  }
}`,
 suggestions: (item) => [item.citation.copyOfOriginal.original.encoding]
};
// Оригинал / перевод
export const GET_SIMPLE_SUGGESTIONS_ORIGINAL_TYPE = {
  query: gql`
query GetSuggestionsOriginalType($text: String!, $offset:Int!) {
  usages(
    pagination: {limit: 10, offset: $offset}
    filters: {
      citation: {
        copyOfOriginal: {
          original: {
            originalType: {iStartsWith: $text}
          }
        }
      }
    }
  ) {
    citation {
      copyOfOriginal {
        original {
          originalType
        }
      }
    }
  }
}
`,
subQuery: gql`
query GetSuggestionsOriginalType($text: String!, $offset:Int!) {
  usages(
    pagination: {limit: 10, offset: $offset}
    filters: {
      citation: {
        copyOfOriginal: {
          original: {
            originalType: {iContains: $text}
          }
        }
      }
    }
  ) {
    citation {
      copyOfOriginal {
        original {
          originalType
        }
      }
    }
  }
}`,
 suggestions: (item) => [item.citation.copyOfOriginal.original.originalType]
};
// ЗАПРОС Автор В SELECT
export const GET_SIMPLE_SUGGESTIONS_AUTHOR = {
  query: gql`
query GetSuggestionsAuthor($text: String!, $offset:Int!) {
  usages(
    pagination: {limit: 10, offset: $offset}
    filters: {
      citation: {
        copyOfOriginal: {
          original: {
            author: {iStartsWith: $text}
          }
        }
      }
    }
  ) {
    citation {
      copyOfOriginal {
        original {
          author
        }
      }
    }
  }
}
`,
subQuery: gql`
query GetSuggestionsAuthor($text: String!, $offset:Int!) {
  usages(
    pagination: {limit: 10, offset: $offset}
    filters: {
      citation: {
        copyOfOriginal: {
          original: {
            author: {iContains: $text}
          }
        }
      }
    }
  ) {
    citation {
      copyOfOriginal {
        original {
          author
        }
      }
    }
  }
}`,
 suggestions: (item) => [item.citation.copyOfOriginal.original.author]
};
// ЗАПРОС Жанр В SELECT
export const GET_SIMPLE_SUGGESTIONS_GENRE = {
  query: gql`
query GetSuggestionsAuthor($text: String!, $offset:Int!) {
  usages(
    pagination: {limit: 10, offset: $offset}
    filters: {
      citation: {
        copyOfOriginal: {
          original: {
            genre: {
              name: {iStartsWith: $text}
            }
          }
        }
      }
    }
  ) {
    citation {
      copyOfOriginal {
        original {
          genre {
            id
            name
            parent {
              id
              name
              parent {
                id
                name
                parent {
                  id
                  name
                  parent {
                    id
                    name
                    parent {
                      id
                      name
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }
}
`,
subQuery: gql`
query GetSuggestionsAuthor($text: String!, $offset:Int!) {
  usages(
    pagination: {limit: 10, offset: $offset}
    filters: {
      citation: {
        copyOfOriginal: {
          original: {
            genre: {
              name: {iContains: $text}
            }
          }
        }
      }
    }
  ) {
    citation {
      copyOfOriginal {
        original {
          genre {
            id
            name
            parent {
              id
              name
              parent {
                id
                name
                parent {
                  id
                  name
                  parent {
                    id
                    name
                    parent {
                      id
                      name
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }
}`,
 suggestions: (item) => item.citation.copyOfOriginal.original.genre.map((e) => _collect_whole_line('parent', e).reverse().map((n) => n.name).join(' / '))
};
