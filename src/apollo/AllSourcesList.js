import { gql } from "@apollo/client";

export const ALL_SOURCES_LIST = (params) => {
    const after = params?.page !== 0 ? params?.after || null : null;
    const offset = params?.offset || 10;
    const filter = params?.filter || "";

    return gql`
        query AllSourcesList {
            originalConnection(
                filters: {encoding:
                  {iContains: "${filter}"},
                  Or: {fullName: {iContains: "${filter}"}}}
                  first: ${offset}, 
                  after:${after ? '"' + after + '"' : after},
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
                    encoding
                    id
                    fullName
                    author
                    creationDateStart
                    creationDateEnd
                    copyOfOriginal {
                      publication{
                        fullCitation
                      }
                      encoding
                      id
                    }
                  }
                }
              }
            }
    `;
}


