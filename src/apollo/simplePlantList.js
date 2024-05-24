import { gql } from "@apollo/client";

export const SIMLE_QUERY_REQUEST_PLANTLIST = (params) => {
  const yearst = params?.start_year || 1000
  const yearfin = params?.finish_year || 1825
  const text = params?.text || ""

  return gql`
 query QueryWithCursorAndOrPlantList2{
  usagesConnection(
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
              scientificName: {name: {exact: "${text}"}}
            }
          }
        }
      }, 
      And: {citation: {copyOfOriginal: {creationDateEnd: {lte: ${yearfin}}}}, 
        And: {citation: {copyOfOriginal: {creationDateStart: {gte: ${yearst}}}},
          And:{isNotPlant:false}
        }
      }
    }
  ) {
    totalCount
    edges{
      node{
        scientificName{
          id
          name
          rusNomenclatureName
          picture{
            id
            name
            img{
              miniature
            }
          }
        }
        }
      }
    }
}
`
};
