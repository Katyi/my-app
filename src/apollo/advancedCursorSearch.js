import { gql } from "@apollo/client";

export const ADVANCED_QUERY_REQUEST_CURSOR = (params) => {
  const {filters="{}",page,offset,after} = params
  let afterString = page !== 0 ? after || null : null;
  return gql`query AdvancedWithCursor {
  usagesConnection(
    first: ${offset}
    after:${afterString ? '"' + afterString + '"' : afterString},
    filters: ${filters}
    order: {
      citation: {
        pageNumberInPublication: ASC, 
        pageNumberInCopyOfOriginal: ASC, 
        copyOfOriginal: {
          creationDateEnd:ASC,
          original:{
            encoding:ASC
          }
          volume:ASC
        }
      }
    }
  ) {
    pageInfo {
      startCursor
      endCursor
      hasNextPage
      hasPreviousPage
    }
    totalCount
    edges {
      node {
        nameOfLatinSource
        nameOfLatinRecord
        allDiseaseAsInSource {
          name
        }
        allFunctions {
          name
          parent{
            name
            parent{
              name
            }
          }  
        }
        citation {
          id
          originalQuote
          copyOfOriginalQuote
          simplifiedQuote
          json
          copyOfOriginal {
            id
            encoding
            creationDateStart
            creationDateEnd
            copyOfOriginalType {
              name
            }
            original {
              fullName
              encoding
              author
              genre {
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
          pagesInPublication
          pagesInCopyOfOriginal
          lexema:usagesByCitation {
            name
            id
          }
        }
        scientificName {
          id
          name
          rusNomenclatureName
        }
        lexeme {
          name
          id
        }
        allVetDiseaseAsInSource {
          name
        }
        allMedicinalForms {
          name
        }
        allPlantPartUsedInSource {
          name
        }
        allPlantPartUsed {
          name
        }
        plantPart {
          name
        }
        lifeFormInSource {
          name
        }
        allStorageTypes {
          name
          parent{
            name
            parent{
              name
            }
          }  
        }
        allEthnoLists {
          name
        }
        allSocialClassRels {
          name
        }
        placeDistribution {
          name
        }
        placeAcquisition {
          name
        }
        allPlaces {
          name
        }
        originalWord
        transmissionMethod {
          name
        }
        language {
          name
        }
        languageAffiliation {
          name
        }
        languageForOtherNames {
          name
        }
        figurativeMeaning {
          name
        }
      }
    }
  }
}
`
};

export const PAGINATION_ADVANCED_QUERY_REQUEST_CURSOR = (params) => {
  const {text="{}",page,offset,after} = params
  let afterString = page !== 0 ? after || null : null;
  return gql`query AdvancedWithCursorPagination {
  usagesConnection(
    first: ${offset}
    after:${afterString ? '"' + afterString + '"' : afterString},
    filters: ${text}
    order: {
      citation: {
        pageNumberInPublication: ASC, 
        pageNumberInCopyOfOriginal: ASC, 
        copyOfOriginal: {
          encoding:ASC,
          creationDateEnd:DESC,
          original:{fullName:ASC}
        }
      }
    }
    ) {
    pageInfo {
      startCursor
      endCursor
      hasNextPage
      hasPreviousPage
    }
    totalCount
  }
}
`
};
