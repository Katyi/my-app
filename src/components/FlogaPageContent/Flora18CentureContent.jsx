import { Box,  Divider, Typography } from "@mui/material";
import DOMPurify from "dompurify";
import React, { useEffect, useState } from "react";
import { AOS_POST_BLOCK } from "../../dataset/Animations";
import BlogPostChipList from "./BlogPostChipList";
import PdfCOntent from "./PdfCOntent";
import TextContent from "./TextContent";
import VideoContent from "./VideoContent";

function Flora18CentureContent({data,isOther}) {
  const [status, setStatus] = useState(data.map(({id})=>({id,showMore:true})))

  // console.log(status)

  function checkShowMoreIconStatus(collection) {
    let result = []
    collection.forEach((typographyElement)=>{
      const {id} = typographyElement
      const typographyWidth = typographyElement.getBoundingClientRect().width;
      const typographyFontSize = parseFloat(getComputedStyle(typographyElement).fontSize);
      const typographyStyles = window.getComputedStyle(typographyElement);

      const typographyLineHeight = parseInt(typographyStyles.getPropertyValue('line-height')) || 1;
      const typographyHeight = typographyElement.clientHeight;

      const lines = Math.floor(typographyHeight / typographyLineHeight);
      
      const approximateCharsInView = Math.floor(typographyWidth / typographyFontSize)*lines;
      // console.log(approximateCharsInView)
      const cleanHTML = DOMPurify.sanitize(data.filter(p=>p.id===id)?.['0']?.text, {
        USE_PROFILES: { html: true },
      });
      // console.log(cleanHTML.length)
      result.push({
        id,
        showMore:cleanHTML.length>= approximateCharsInView-3
      })
    });
    setStatus(result.length===data.length?result:data.map(({id})=>({id,showMore:true})))
  }

  useEffect(() => {
    const collection = [...document.getElementsByClassName('pre-view')]
    checkShowMoreIconStatus(collection)
  }, [data])
  
  return (
    <Box  display={'flex'} flexDirection={'column'}gap={'0'}>
     {
      isOther &&  <Typography
        variant="flora_page"
        className="header"
        sx={{
          width: "100%",
          textAlign: 'center',
        }}>
      Разное
      </Typography>
     }

    {
        data && data.map((post,postIndex) => {
            const isYoutube = !!post.youtubeLink
            const isVideo = post.video.length>0
            const isPdf = post?.pdf?.length>0
            return (
            <Box key={postIndex} 
            {...AOS_POST_BLOCK}
            sx={{
              "& >* ":{
                my:2
              }
            }}>
              <BlogPostChipList tags={post.tag}/>
                {
                    isYoutube && <VideoContent post={{...post, video:post.youtubeLink,showMore:status[postIndex]?.showMore}} />//<YoutubeContent post={post}/>
                }
                {
                    isPdf && <PdfCOntent post={{...post,showMore:status[postIndex]?.showMore}} />
                }
                {
                    // isVideo && <VideoContent post={{...post, video:"https://phytolex.eusp.org/"+post.video[0].video.url}}/>
                    isVideo && <VideoContent post={{...post, video:post.video[0].video.url,showMore:status[postIndex]?.showMore}} />
                }
                {
                    !isVideo && !isYoutube && !isPdf && <TextContent post={{...post,showMore:status[postIndex]?.showMore}} />
                }
                {
                  postIndex+1 !== data.length && <Divider sx={{my:"4rem"}} />
                }
            </Box>)
        })
    }
    </Box>
  );
}

export default Flora18CentureContent;
