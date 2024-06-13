import { gql } from "@apollo/client";
import { _collect_whole_line } from "./getSimpleSuggestions";

export const GET_SUGGESTIONS_LAT_NAME_OF_LATIN_SOURCE = gql`
query GetSuggestionsLatUsageNameOfLatinSource($text: String!,$textSub: String!,$offset:Int!) {
  usages(
    pagination: {limit: 20, offset: $offset}
    filters: {
      nameOfLatinSource:{iStartsWith:$text},
      Or:{
        nameOfLatinSource:{iContains:$textSub}}
      }
  ) {
    nameOfLatinSource
  }
}
`;
export const GET_SUGGESTIONS_LAT_SCIENTIFIC_NAME = gql`
query GetSuggestionsLatScientificName($text: String!,$textSub: String!,$offset:Int!) {
  usages(
     pagination: {limit: 20, offset: $offset}
     filters: {
       scientificName:{
         name:{iStartsWith:$text}
       },
       Or:{
         scientificName:{
         name:{iContains:$textSub}
         }}}
   ) {
     scientificName{
       name
     }
   }
 }
`;
// Поиск для select для графика для scientificName и rusNomenclatureName
export const GET_CHARTS_SUGGESTIONS_LAT_SCIENTIFIC_NAME = gql`
query GetSuggestionsLatScientificName($text: String!,$textSub: String!,$offset:Int!) {
  usages(
    pagination: {limit: 20, offset: $offset}
    filters: {
      scientificName: {name: {iStartsWith: $text}}, 
      Or: {
        scientificName: {name: {iContains: $textSub}},
        Or: {
          scientificName:{
            rusNomenclatureName:{iStartsWith: $text}
          },
          Or: {
            scientificName:{
              rusNomenclatureName:{iContains: $textSub}
            }
          }
        }
      }
    }
   ) {
     scientificName{
       name,
       rusNomenclatureName
     }
   }
 }
`;
export const GET_CHARTS_SUGGESTIONS_LAT_SCIENTIFIC_NAME1 = gql`
query GetSuggestionsLatScientificName($text: String!,$textSub: String!,$offset:Int!) {
  usages(
    pagination: {limit: 20, offset: $offset}
    filters: {
      scientificName: {name: {iStartsWith: $text}}, 
      Or: {
        scientificName: {name: {iContains: $textSub}}
      }
    }
   ) {
     scientificName{
       name,
       rusNomenclatureName
     }
   }
 }
`;
export const GET_SUGGESTIONS_CYR_LEXEME = gql`
query GetSuggestionsCyrLexeme($text: String!,$textSub: String!,$offset:Int!) {
  usages(
    pagination: {limit: 20, offset: $offset}
    order:{
      lexeme:{name:ASC}
    }
    filters: {
      lexeme:{name:{iStartsWith:$text}},
      Or:{
        lexeme:{name:{iContains:$textSub}}
        }
    }
  ) {
    lexeme {
      name
    }
  }
}
`;
export const GET_SUGGESTIONS_CYR_USAGE_PLANT_NAME = gql`
query GetSuggestionsCyrUsagePlantName($text: String!,$textSub: String!,$offset:Int!) {
  usages(
    pagination: {limit: 20, offset: $offset}
    filters: {
      scientificName:{
      rusNomenclatureName:{iStartsWith:$text}
      },
      Or:{
        scientificName:{
        rusNomenclatureName:{iContains:$textSub}}
      }}
  ) {
    scientificName{
      rusNomenclatureName
    }
  }
}
`;
export const GET_SUGGESTIONS_CYR_PICTURE_PLANT_NAME = gql`
query GetSuggestionsCyrPicturePlantName($text: String!,$textSub: String!,$offset:Int!) {
  pictures(
     pagination: {limit: 20, offset: $offset}
     filters: {
      plantDepicted:{
        plantName:{
          rusNomenclatureName:{iStartsWith:$text}
        }
      },
      Or:{
        plantDepicted:{
          plantName:{
            rusNomenclatureName:{iContains:$textSub}
          }
        },
      }
    }
  ) {
    plantDepicted{
      plantName{
        rusNomenclatureName
      }
    }
  }
}
`;

export const GET_SUGGESTIONS_NAME_OF_LATIN_RECORD = gql`
query GetSuggestionsLatUsageNameOfLatinRecord($text: String!,$textSub: String!,$offset:Int!) {
  usages(
    pagination: {limit: 20, offset: $offset}
    filters: {
      nameOfLatinRecord:{iStartsWith:$text},
      Or:{
        nameOfLatinRecord:{iContains:$textSub}
      }
    }
  ) {
    nameOfLatinRecord
  }
}
`;

export const GET_SUGGESTIONS_LAT_PICTURE_PLANT = gql`
query GetSuggestionsLatPlantName($text: String!,$textSub: String!,$offset:Int!) {
  pictures(
      pagination: {limit: 20, offset: $offset}
      filters: {
       plantDepicted:{
         plantName:{
           name:{iStartsWith:$text}
         }
       },
       Or:{
         plantDepicted:{
           plantName:{
             name:{iContains:$textSub}
           }
       }
       }}
   ) {
     plantDepicted{
       plantName{
         name
       }
     }
   }
 }
`;
export const GET_SUGGESTIONS_FUNCTION =
  gql`
  query GetSuggestionsCyrLexeme($text: String!,$textSub: String!,$offset:Int!) {
    plantUsages (
      pagination: {limit: 20, offset: $offset}
      order:{
        function:{name:ASC}
      }
      filters: {
        function:{name:{iStartsWith:$text}},
        Or:{
          function:{name:{iContains:$textSub}}
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
`;