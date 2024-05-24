import { gql } from "@apollo/client";

export const GET_ALL_NEWS = gql`
 query allNews {
  news {
    id
    text
    pubDate
    img {
      id
      image{
        path
        name
      }
    }
  }
}
`;
