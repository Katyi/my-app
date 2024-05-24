import { Box, Grid, Typography } from "@mui/material";
import React, { useState } from "react";
import ReactPlayer from "react-player";
import { getFormatedDate } from "../../utils/FloraUtils";
import RawHTML from "../SimpleResultBlock/RawHTML";
import IconsBlock from "./IconsBlock";
import MoreIcon from "./MoreIcon";

function VideoContent({ post,pageView=false }) {
  const { title, author, pubDate, preview, video, text, id, showMore } = post;
  const [fullView, setFullView] = useState(pageView);
  const date = getFormatedDate(pubDate);
  

  return (
    <Grid container bgcolor={"white"} rowGap={2}>
        <Grid item xs={12}>
        {/* <p> */}
        <Box
          sx={{
            minWidth: "300px",
            maxWidth: "300px",
            position: "relative",
            minHeight: "300px",
            maxHeight: "300px",
            float:'left',
            display:'flex',
            justifyContent: 'flex-start',
            alignItems: 'center',
            mr:2,
          }}
        >
          <ReactPlayer
            width={"100%"}
            height="100%"
            url={video}
            playing={false}
            controls={true}
            muted={false}
          />
        </Box>
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
                height: "3.9em" /* Fallback for non-webkit, line-height * 2 */,
                lineHeight: "1.3em",
                // "-webkit-line-clamp": 3 /* if you change this, make sure to change the fallback line-height and height */,
                // "-webkit-box-orient": "vertical",
                WebkitBoxOrient:'vertical',
                WebkitLineClamp:4,
                overflow: "hidden",
                textOverflow: "ellipsis",
                transition: "all 0.5s ease-out",
              },
              transition: "all 0.5s ease-out",
            }}
            lineHeight={2}
            pb={0}
          >
            {/* <RawHTML dirtyHTML={text+(!showMore ? "" : "...")} /> */}
            <RawHTML dirtyHTML={text} />
          </Typography>
          {
          !pageView && !!showMore   &&<Box
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
        }}
      >
        {!!author && (
          <Typography
            variant="flora_page"
            className="post_caption"
            alignSelf={"end"}
          >
            автор: {author}
          </Typography>
        )}
        <IconsBlock fullView={fullView} setFullView={setFullView} postId={id} pageView={true}/>
      </Grid>
    </Grid>
  );
}

export default VideoContent;
