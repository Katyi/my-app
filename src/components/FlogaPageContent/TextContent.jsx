import { Box, CardMedia, Grid, Typography } from "@mui/material";
import React, { useState } from "react";
import { getFormatedDate } from "../../utils/FloraUtils";

import RawHTML from "../SimpleResultBlock/RawHTML";
import IconsBlock from "./IconsBlock";
import MoreIcon from "./MoreIcon";

function TextContent({ post, pageView = false }) {
  const { title, author, pubDate, preview, text, img, id, showMore } = post;
  const [fullView, setFullView] = useState(pageView);
  const image =
    img && img[0]?.image?.name ? "https://phytolex.eusp.org/media/" + img[0].image.name : null;
    // img && img[0]?.image?.name ? "/media/" + img[0].image.name : null;
  const date = getFormatedDate(pubDate);

  return (
    <Grid container bgcolor={"white"}>
      <Grid item xs={12}>
        {/* <p> */}
          <CardMedia
            component={"img"}
            sx={{
              width: 300,
              // maxHeight: 300,
              margin: "0 8px 8px 0",
              float: "left",
              objectFit: "cover",
              objectPosition: "center top",
            }}
            src={image}
            alt="post image alt"
          />
          <Typography
            // component={"p"}
            variant="flora_page"
            className="post_caption"
            sx={{
              textAlign: "end",
            }}
          >
            {date}
          </Typography>
          <Typography
            // component={"p"}
            variant="flora_page"
            className="post_title"
            width={"100%"}
            pb={2}
            sx={{
              textAlign: "end",
            }}
          >
            <RawHTML dirtyHTML={title} />
            <br />
          </Typography>
          <Typography
            // component={"p"}
            width={"100%"}
            variant="flora_page"
            className="post_content"
            lineHeight={2}
            sx={{
              textAlign: "end",
            }}
          >
            <RawHTML dirtyHTML={`${preview}`} />
            <br />
          </Typography>

          <Typography
            // component={"p"}
            variant="flora_page"
            className={`post_content ${fullView ? "" : "pre-view"}`}  id={id}
            sx={{
              textAlign: "justify!important",
              height: "auto",
              "&.pre-view": {
                textAlign: "justify!important",
                // display: "block" /* Fallback for non-webkit */,
                display: "-webkit-box",
                height: "5.3em" /* Fallback for non-webkit, line-height * 2 */,
                lineHeight: "1.3em",
                // "-webkit-line-clamp": 4 /* if you change this, make sure to change the fallback line-height and height */,
                // "-webkit-box-orient": "vertical",
                WebkitBoxOrient:'vertical',
                WebkitLineClamp:4,
                lineClamp: 4,
                overflow: "hidden",
                textOverflow: "ellipsis",
                transition: "all 0.5s ease-out",
              },
              transition: "all 0.5s ease-out",
            }}
            lineHeight={2}
            pb={0}
          >
            <RawHTML dirtyHTML={text} />
          </Typography>
          {
          !pageView && !!showMore &&<Box
            sx={{
              display: "flex",
              justifyContent: "flex-end",
            }}
          >
            <MoreIcon fullView={fullView} setFullView={setFullView} />
          </Box>

          }
          
        {/* </p> */}
      </Grid>
      <Grid
        item
        xs={12}
        sx={{
          display: "flex",
          justifyContent: !author ? "flex-end" : "space-between",
          alignItems: "center",
        }}
      >
        {!!author && (
          <Typography
            variant="flora_page"
            className="post_caption"
            alignSelf={"center"}
          >
            автор: {author}
          </Typography>
        )}
        <IconsBlock
          fullView={fullView}
          setFullView={setFullView}
          postId={id}
          pageView={true}
        />
      </Grid>
    </Grid>
  );
}

export default TextContent;
