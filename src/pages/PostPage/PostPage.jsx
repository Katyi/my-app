import { useQuery } from '@apollo/client'
import { Box, Container } from '@mui/material'
import React from 'react'
import { useParams } from 'react-router-dom'
import { GET_ARTICLE_BY_ID } from '../../apollo/getArticles'
import BlogPostChipList from '../../components/FlogaPageContent/BlogPostChipList'
import PdfCOntent from '../../components/FlogaPageContent/PdfCOntent'
import TextContent from '../../components/FlogaPageContent/TextContent'
import VideoContent from '../../components/FlogaPageContent/VideoContent'
import CustomHelmet from '../../components/Helmet/CustomHelmet'
import ProgressBlock from '../../components/ProgressBlock/ProgressBlock'

function PostPage() {
    const { id } = useParams();
 
  const {loading, error, data} = useQuery(GET_ARTICLE_BY_ID, {
    variables: { id: id },
  })
if(!data && loading)return<ProgressBlock label='пост из блога'/>
if(!data) return <Container sx={{my:8}}><h4>Произошла ошибка</h4></Container>
    const post = data?.articles[0]
    const isYoutube = !!post.youtubeLink
    const isVideo = post.video.length>0
    const isPdf = post?.pdf?.length>0
    
  return (
    <Container sx={{my:8}}>
        <CustomHelmet title={post && post?.title}/>
      <Box my={2}>
              <BlogPostChipList tags={post.tag}/>
      </Box>

        {
            isYoutube && <VideoContent post={{...post, video:post.youtubeLink}} pageView={true}/>
        }
        {
            isPdf && <PdfCOntent post={post} pageView={true}/>
        }
        {
            isVideo && <VideoContent post={{...post, video:post.video[0].video.url}} pageView={true}/>
        }
        {
            !isVideo && !isYoutube && !isPdf && <TextContent post={post} pageView={true}/>
        }
    </Container>
  )
}

export default PostPage