import { gql } from "@apollo/client";

export const GET_LEXEMES_BY_SCIENTIFICNAME = gql`
  query lexemeByscientificName($name: [String!], $offset: Int, $afterString: String) {
    usagesConnection(
      first: $offset,
      after: $afterString,
      filters: {scientificName:{name:{inList:$name}}}
      order: {lexeme: {name: ASC}}
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
          lexeme {
            id
            name
          }
          scientificName {
            name
          }
        }
      }
    }
  }
`;

export const GET_SCIENTIFICNAME_BY_LEXEME = gql`
  query getScientificName ($name: [String!]) {
    usagesConnection (
      filters: {lexeme: {name: {inList: $name } } }
    ) {
      totalCount
      edges {
        node {
          lexeme {
            name
          }
          scientificName {
            name
          }
        }
      }
    }
  }
`;
