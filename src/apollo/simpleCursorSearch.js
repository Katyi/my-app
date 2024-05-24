import { gql } from "@apollo/client";

export const SIMLE_QUERY_REQUEST_CURSOR = gql`
 query QueryWithCursorAndOr($yearst: Int,$yearfin: Int,$text:String, $after:String, $offset: Int) {
  # 
  usagesConnection(
    first: $offset, 
    after:$after,
    filters: {
      lexeme:{
        name:{contains:$text}
      }
        Or:{
          nameOfLatinSource:{contains:$text}
          Or:{
            nameOfLatinRecord:{contains:$text}
            Or:{
              scientificName:{
              rusNomenclatureName:{contains:$text}
            }
            Or:{
              scientificName:{
                name:{contains:$text}
              }
            }
            }
      		}
        }
      And:{
        citation:{
          copyOfOriginal: {
            creationDateEnd: {lte: $yearfin}
            creationDateStart:{gte: $yearst}
          }
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
        citation {
          id
          originalQuote
          copyOfOriginalQuote
          simplifiedQuote
          copyOfOriginal {
            id
            encoding
            creationDateStart
            creationDateEnd
            issueNumberOrName
            callNumber
            copyOfOriginalType {
              name
            }
            original {
              fullName
              encoding
            }
          }
          publication{
            id
            fullCitation
            shortName
          }
        pagesInPublication
        pagesInCopyOfOriginal
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
      }
    }
  }
}
`;
