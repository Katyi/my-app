import { gql } from "@apollo/client";

export const GET_ALL_ARTICLES = gql`
    query getArticles {
        articles (
          filters:{
            published:true
          }
        ) {
            id
            title
            preview
            text
            youtubeLink
            author
            pubDate
            tag{
              id
              name
              type{
                id
                type
                color
              }
            }
            img{
              image{
                name
              }
            }
            pdf{
              title
              image{
                name
              }
              pdf{
                name
              }
            }
            video{
              id
              video{
                url
              }
            }
        }
    }
`;
export const GET_ARTICLE_BY_ID = gql`
    query getArticles ($id: GlobalID){
        articles (filters: {id: {exact: $id}}) {
            id
            title
            preview
            text
            youtubeLink
            author
            pubDate
            tag{
              id
              name
              type{
                id
                type
                color
              }
            }
            img{
              image{
                name
              }
            }
            pdf{
              title
              image{
                name
              }
              pdf{
                name
              }
            }
            video{
              id
              video{
                url
              }
            }
        }
    }
`;