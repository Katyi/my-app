import { gql } from "@apollo/client";

export const CHARTS_DATA_BY_SCIENTIFIC = ({name}) => {
  return gql`
    query DataForChart {
      plantsConnection(filters: { name: { inList: ${JSON.stringify(name)} } }) {
        edges {
          node {
            name
            rusNomenclatureName
            usage {
              plantPart{
                name
              }
              countLexeme
              scientificName {
                name
              }
              lexeme {
                name
                etymology {
                  etymon
                }
              }
              function{
                name
                parent {
                  name
                  parent {
                    name
                  }
                }
              }
              languageAffiliation{
                name
              }
              allSocialClassRels {
                name
              }
              citation {
                copyOfOriginal {
                  creationDateEnd
                  creationDateStart
                  original {
                    genre {
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
              }
            }
          }
        }
      }
    }
  `;
};