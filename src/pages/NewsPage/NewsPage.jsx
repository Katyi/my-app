import { useQuery } from "@apollo/client";
import {
  Box,
  CardMedia,
  Container,
  Divider,
  Skeleton,
  Typography,
} from "@mui/material";
import React from "react";
import { GET_ALL_NEWS } from "../../apollo/allNews";
import NotFoundOneItemBlock from "../../components/NotFoundOneItemBlock/NotFoundOneItemBlock";
import RawHTML from "../../components/SimpleResultBlock/RawHTML";
import { getFormatedDate, sortByDate } from "../../utils/FloraUtils";
import ProgressBlock from "../../components/ProgressBlock/ProgressBlock";
import CustomHelmet from "../../components/Helmet/CustomHelmet";
import { AOS_INTRO_BLOCK, AOS_POST_BLOCK } from "../../dataset/Animations";

function NewsBlock({post, length, index}) {
  const { id, pubDate, text, img } = post
  const date = getFormatedDate(pubDate)
  return (
    <Box
    key={id+'news post block'}
    {...AOS_POST_BLOCK}
      gap={8}
      display={"flex"}
      flexDirection={"column"}
      alignItems={"center"}
    >
      <Box>
        <Typography
          component="div"
          textAlign={"right"}
          variant="news_date"
          width={"100%"}
        >
          {date}
        </Typography>
        <Box
          sx={{
            display: "flex",
            flexDirection: {
              xs: "column",
              md: "row",
            },
            gap: 3,
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: {
                xs: "row",
                sm: "row",
              },
              flexWrap: "wrap",
              gap: "5px",
            }}
          >
            {img &&
              img.map(({ image, id }, index) => {
                return (
                  <Box
                    key={"image" + id + image.path}
                    id="news-image"
                    display={"flex"}
                    sx={{
                      width: "300px",
                    }}
                  >
                    <CardMedia
                      component="img" // height="380px"
                      sx={{
                        objectFit: "contain",
                        objectPosition: "50% 0%",
                      }}
                      src={image.path}
                    />
                  </Box>
                );
              })}
          </Box>
          <Typography
            variant="news_text"
            component="div"
            sx={{
              width: "fit-content",
            }}
          >
            <RawHTML dirtyHTML={text} />
          </Typography>
        </Box>
      </Box>
      {index !== length - 1 && <Divider variant="body2" />}
    </Box>
  );
}

function NewsPage() {
  const { loading, error, data } = useQuery(GET_ALL_NEWS);
  // if (loading) return ;
  if (error) return ;
  return (
    <Container
      maxWidth="lg"
      {...AOS_INTRO_BLOCK}
      sx={{
        minHeight: "800px",
        display: "flex",
        flexDirection: "column",
        gap: 6,
        pt: 12,
        pb: 12,
      }}
    >
      <CustomHelmet title={"Новости"} />
      {
        loading && <ProgressBlock label="новости" />
      }
      {
        error && <NotFoundOneItemBlock error={error} />
      }
     
     {
        !loading && !error && <Typography
        variant="about_subtitle"
        sx={{
          width: "100%",
          textAlign: "center",
        }}
      >
        Новости
      </Typography>
      }
      {
        !loading && !error && <Box
        pl={{ xs: 0 }}
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 6,
        }}
      >
        {!data && (
          <Box
            key={"Skeleton" + Date()}
            gap={8}
            display={"flex"}
            flexDirection={"column"}
          >
            <Skeleton animation="wave" height={"200px"} />
            <Divider variant="body2" />
            <Skeleton animation="wave" height={"200px"} />
          </Box>
        )}
        {data &&
          data.news &&
          sortByDate([...data.news]).map(
            (post, index) => {
              return (
                <NewsBlock
                  key={post.id + "-" + index + Date()}
                  length={data.news.length}
                  post={post}
                  index={index}
                />
              );
            }
          )}
      </Box>
      }
     
    </Container>
  );
}

export default NewsPage;
