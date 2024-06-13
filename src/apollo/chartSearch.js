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

export const CHARTS_DATA_BY_FUNCTION_OLD = ({name}) => {
  return gql`
    query DataForChartByFunction {
      functionsConnection(filters: { name: { inList: ${JSON.stringify(name)} } }) {
        edges {
          node {
            name
            usage {
              lexeme {
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
    }
  `
};
export const CHARTS_DATA_BY_FUNCTION = (obj) => {
  const {filters="", page, offset, after} = obj
  let afterString = page !== 0 ? after || null : null;
  // let afterString = after;
  // console.log(afterString)
  // console.log(offset)
  // console.log(filters)
  
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
// filters: {plantUsage: {function: { name: { inList: ${JSON.stringify(name)}}}}}
export const ALL_GENRES_NAMES = () => {
  return gql`
    query getAllGenresNames {
      genre(filters: {name: {iStartsWith: ""}}) {
        name
      }
    }
  `
};