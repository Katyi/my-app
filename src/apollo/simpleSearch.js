import { gql } from "@apollo/client";

export const SIMLE_QUERY_REQUEST = gql`
  query MyQuery($start_year: Int, $finish_year: Int, $text: String!) {
  usages(
    pagination: {limit: 50, offset: 0}
    filters: {
      lexeme:{name:{contains:$text}}
      citation: {copyOfOriginal: {
        creationDateEnd: {lte: $finish_year}
        creationDateStart:{gte: $start_year}
      }}}
  ) {
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
  }
}
`;
