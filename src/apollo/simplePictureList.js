import { gql } from "@apollo/client";

export const SIMLE_QUERY_REQUEST_PICTURELIST = gql`
query QueryWithCursorAndOrPuctureList($text: String!) {
  pictures(
    filters: {
      plantDepicted:{
        plantName:{
          rusNomenclatureName:{iExact:$text}
        }
      },
      Or:{
        plantDepicted:{
          plantName:{
            name:{iExact:$text}
          }
        }
      }
    }
  ) {
    id
    name
    placeWhereStored{
      name
    }
    collection
    pagesFromPublication
    publicationSource{
      title
      shortName
      fullCitation
    }
    img{
      url
      miniature
      representation
    }
    plantDepicted{
      id
      plantName{
        id
        name
        rusNomenclatureName
      }
    }
  }
}
`;
