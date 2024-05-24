import { gql } from "@apollo/client";

export const GET_ONE_CITATION = gql`
query OneCitation($id: GlobalID = "Q2l0YXRpb246OTA=") {
  citations(filters: {id: {exact: $id}}) {
    id
    originalQuote
    copyOfOriginalQuote
    simplifiedQuote
    json
    publication {
      id
      fullCitation
      shortName
      author
      creationDateEnd
      title
      creationDateStart
      editor
      numberOfPages
      publicationYear
      url
    }
    pagesInPublication
    pagesInCopyOfOriginal
    copyOfOriginal {
      id
      encoding
      issueNumberOrName
      callNumber
      copyOfOriginalType {
        name
      }
      placeOfArchiving {
        name
        shortName
        website
      }
      original {
        fullName
        encoding
        author
        scientificName
      }
      creationDateStart
      creationDateEnd
    }
  }
  usagesConnection(filters: {citation:{id:{exact:$id}}}) {
    edges{
      node{
        lexeme{
          id
          name
        }
      }
    }
  }
}
`;
