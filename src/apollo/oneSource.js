import { gql } from "@apollo/client";

export const GET_ONE_SOURCE = gql`
query OneSource($id: GlobalID, $after: String = "", $first: Int = 10) {
  copyOfOriginal(filters: {id: {exact: $id}}) {
    callNumber
    copyOfOriginalType {
      name
    }
    creationDateEnd
    creationDateStart
    encoding
    id
    publication{
      id
      fullCitation
      title
      shortName
      publicationYear
      creationDateStart
      creationDateEnd
    }
    issueNumberOrName
    original {
      author
      creationDateEnd
      creationDateStart
      editor
      encoding
      extraName
      fullName
      genre {
        name
        parent {
          name
          parent {
            name
            parent {
              name
            }
          }
        }
      }
    }
    placeOfArchiving {
      name
    }
    additionalInfo
    comment
    curator {
      firstName
      lastName
    }
    pages
    penman
    readiness
  }
   publications(filters: {copyOfOriginal: {id: {exact: $id}}}) {
    id
    fullCitation
    title
    shortName
    publicationYear
    creationDateStart
    creationDateEnd
    __typename
  }
	citationsConnection(
    first:$first,
  	after:$after,
		filters: {
      copyOfOriginal:{
        id:{exact:$id}
      }
    }
  ) {
    totalCount
    pageInfo {
      hasNextPage
      hasPreviousPage
      startCursor
      endCursor
      __typename
    }
    edges{
      node{
        id
        originalQuote
        copyOfOriginalQuote
        simplifiedQuote
        json
      }
    }
  }
}
`;
