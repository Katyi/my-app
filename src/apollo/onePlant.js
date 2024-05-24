import { gql } from "@apollo/client";

export const GET_ONE_PLANT = gql`
  query OnePlant($id: GlobalID) {
  usagesConnection(filters: {scientificName: {id: {exact: $id}}}) {
    pageInfo {
      startCursor
      endCursor
      hasNextPage
      hasPreviousPage
    }
    totalCount
    edges {
      node {
        scientificName{
        name,
        rusName:rusNomenclatureName,
        kingdom,
        powo:catalogueOfLifeId,
        gbif,
        wiki:linkToExternalDb,
        picture{
          id
          name
          plantDepicted{
            plantName{
              name
              rusNomenclatureName
              id
            }
          }
          placeWhereStored{name}
          collection
          publicationSource{
            id
            title
            shortName
          }
          pagesFromPublication
          img{
            miniature
            representation
          }
        }
      }
      lexeme {
        name
        id
      }
      }
    }
  }
   plantDepicted(
    filters: {
      plantName:{
         id: {exact: $id}
      }
    }
  ) {
		id
    plantName {
      id
      name
      rusNomenclatureName
    }
   	picture {
      id
      name
      plantDepicted {
        plantName {
          name
          rusName: rusNomenclatureName
          id
        }
      }
      placeWhereStored {
        name
        __typename
      }
      collection
      publicationSource {
        id
        title
        shortName
        __typename
      }
      pagesFromPublication
      img {
        miniature
        representation
        __typename
      }
      __typename
    }
    
  }
}
`;
