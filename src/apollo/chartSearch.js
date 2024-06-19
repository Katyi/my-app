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
              allFunctions {
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

export const CHARTS_DATA_BY_LEXEME = ({name}) => {
  return gql`
    query DataForChartByLexeme {
      lexemesConnection(filters: { name: { inList: ${JSON.stringify(name)} } }) {
        edges {
          node {
            name
            usage {
              plantPart {
                name
              }
              countLexeme  
              scientificName {
                name
                rusNomenclatureName
              }
              lexeme {
                name
                etymology {
                  etymon
                }
              }
              allFunctions {
                name
                parent {
                  name
                  parent {
                    name
                  }
                }
              }
              languageAffiliation {
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
  `
};

export const CHARTS_DATA_BY_FUNCTION = (obj) => {
  const {filters="", page, offset, after} = obj
  let afterString = page !== 0 ? after || null : null;
  
  return gql`
    query DataForChartByFunction1 {
      usagesConnection (
        first: ${offset}
        after:${afterString ? '"' + afterString + '"' : afterString},
        filters: ${filters}
      ) {
        totalCount
        edges {
          node {
            lexeme {
              name
            }
            allFunctions {
             name
            }
            scientificName {
              name
              rusNomenclatureName
            }
            plantPart {
                name
            }
            allStorageTypes {
              name
            }
            storageType {
              name
            }
            medicinalForm {
              name
            }
            allSocialClassRels {
              name
            }
            allEthnoLists {
              name
            }
          }
        }
      }
    }
  `
};

export const CHARTS_DATA_BY_ORIGINAL = (params) => {
  const {filters="", page, offset, after} = params;
  let afterString = page !== 0 ? after || null : null;
  
  return gql`
    query DataForTableByOriginal {
      usagesConnection (
        first: ${offset}
        after:${afterString ? '"' + afterString + '"' : afterString}
        filters: {
          citation: {
            copyOfOriginal: {
              original: {
                encoding: {inList: ${JSON.stringify(filters)} }
              }
            }
          }
        }
        order: {
          lexeme: {
            name: ASC
          }
        }
      ) {
        totalCount
        edges {
          node {
            lexeme {
              name
            }
            citation {
              copyOfOriginal {
                original {
                  encoding
                }
              }
            }
          }
        }
      }
    }
  `
};