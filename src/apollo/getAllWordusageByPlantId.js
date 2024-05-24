import { gql } from "@apollo/client";
import { generatePayloadToRequest } from "../utils/QueryRequestUtils";

export const ALL_WORDUSAGE_BY_PLANT_ID = (id,offset, filters=[],yearPeriod) =>{
  const current = generatePayloadToRequest(filters,yearPeriod)
  const final = filters.length>0?", And:"+current:""
  const first =offset===5?"first:5":""

  return gql`
    query AllWordUsageByPlantId {
      usagesConnection(
        ${first}
        filters: {
          lexeme: {
            id: {exact: "${id}"}
          }${final}
        }
      ) {
      totalCount
        edges{
          node{
          citation{
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
          }
        }
      }
    }
  `
} ;
