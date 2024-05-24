import { gql } from "@apollo/client";

export const GET_ONE_LEXEME = gql`
query OneLexeme($id: GlobalID) {
  usagesConnection(filters: {lexeme:{id:{exact:$id}}}) {
    pageInfo {
      startCursor
      endCursor
      hasNextPage
      hasPreviousPage
    }
    totalCount
    edges {
      node {
        scientificName{id,name,rusNomenclatureName}
        citation {
          id
          originalQuote
          copyOfOriginalQuote
          simplifiedQuote
          json
          copyOfOriginal{
            id
            encoding
          }
        }
        lexeme {
          name
        }
        
      }
    }
  }
}
`;
