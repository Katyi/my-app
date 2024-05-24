import { gql } from "@apollo/client";

export const ADVANCED_QUERY_FOR_EXPORT = (filters="{}",page, after) => {
  if (after) after=`"${after}"`
  return(gql`query AdvancedForExport {
  usagesConnection(
  after:${after},
    filters: 
    ${filters}
    , 
  ) {
    totalCount
    pageInfo {
			hasNextPage
      endCursor
    }
    edges {
      node {
        languageAffiliation{
          name
        }
        nameOfLatinSource
        nameOfLatinRecord
        diseaseAsInSource{
          name
        }
        vetDiseaseAsInSource{
          name
        }
        storageType{
          name
        }
        medicinalForm{
          name
        }
        transmissionMethod{
          name
        }
        folkloreMaterial
        plantDescription
        placeDistribution{
          name
        }
        placeAcquisition{
          name
        }
        socialClass
        ethnoList{
          name
        }
        lifeFormInSource{
          name
        }
        function{
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
          pagesInPublication
          pagesInCopyOfOriginal
          publication{
            fullCitation
          }
          copyOfOriginal {
            id
            encoding
            creationDateStart
            creationDateEnd
            original {
              fullName
              encoding
              genre{
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
        }
        scientificName {
          name
          rusNomenclatureName
        }
        plantPart{
          name
        }
        plantPartUsed{
          name
        }
        plantPartUsedInSource{
          name
        }
        comment
        lexeme {
          name
        }
      }
    }
  }
}
`
)
};
