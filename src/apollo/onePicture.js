import { gql } from "@apollo/client";

export const GET_ONE_PICTURE = gql`
 query onePicture($id: GlobalID) {
  pictures (
    filters:{
      id:{exact:$id}
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
