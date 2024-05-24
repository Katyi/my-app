import { gql } from "@apollo/client";

  function generateNotString(list) {
    return`
      Not:{
        scientificName:{
          id:{inList:["${list.join('","')}"]}
        }
      }
    `
  }
export const SIMLE_QUERY_REQUEST_CURSOR_WITH_FILTER = (params)=> {
  const filterList = params?.filterList || []
  const yearst = +params?.start_year || 1000
  const yearfin = +params?.finish_year || 1825
  const text = params?.text || ""
  const after = params?.page!==0 ? params?.after || null : null 
  const offset = params?.offset || 10
  const withList = filterList?.length>0 ?generateNotString(filterList):""
  // removed from query because of бобъ - бобокъ - турецкий боб
// Or: {
//   lexeme: {
//     parentLexeme:{
//       name:{exact: "${text}"}
//     }
//   }
// }

  return gql`
 query QuerySimpleSearchMain{
  # 
  usagesConnection(
    first: ${offset}, 
    after:${after?'"'+after+'"':after},
    filters: {
      lexeme: {
        name: {exact: "${text}"}
      }, 
      Or: {
        nameOfLatinSource: {exact: "${text}"}, 
        Or: {
          nameOfLatinRecord: {exact: "${text}"}, 
          Or: {
            scientificName: {rusNomenclatureName: {exact: "${text}"}}, 
            Or: {
              scientificName: {name: {exact: "${text}"}}, 
              
            }
          }
        }
      }, 
      And: {citation: {copyOfOriginal: {creationDateEnd:{lte:${yearfin}}}}, 
        And: {citation: {copyOfOriginal: {creationDateStart: {gte:${yearst}}}},
          And:{isNotPlant:false}
        }
      }
      ${withList}
        
        }
      order:{
        citation:{
          copyOfOriginal:{
            creationDateEnd:ASC,
            encoding:ASC
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
          json
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
          id
          name
          parentLexeme{id name}
        }
      }
    }
  }
}
`
};
export const PAGINATION_SIMLE_QUERY_REQUEST_CURSOR_WITH_FILTER = (params)=> {
  
const filterList = params?.filterList || []
const yearst = +params?.start_year || 1000
const yearfin = +params?.finish_year || 1825
const text = params?.text || ""
const after = params?.page!==0 ? params?.after || null : null
const offset = params?.offset || 10
const withList = filterList?.length>0 ?generateNotString(filterList):""

return gql`
query QueryPaginationSimpleSearchMain{

usagesConnection(
first: ${offset},
after:${after?'"'+after+'"':after},
filters: {
  lexeme: {
    name: {exact: "${text}"}
    },
    Or: {
      nameOfLatinSource: {exact: "${text}"},
      Or: {
        nameOfLatinRecord: {exact: "${text}"},
        Or: {
          scientificName: {rusNomenclatureName: {exact: "${text}"}},
          Or: {
          scientificName: {name: {exact: "${text}"}},
          }
        }
      }
    }, 
    And: {citation: {copyOfOriginal: {creationDateEnd:{lte:${yearfin}}}}, 
    And: {citation: {copyOfOriginal: {creationDateStart: {gte:${yearst}}}},
    And:{isNotPlant:false}
    }
    }
    ${withList}

  }
  order:{
    citation:{
    copyOfOriginal:{
    creationDateEnd:DESC,
    original:{
    fullName:ASC
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
  }
}
`
};