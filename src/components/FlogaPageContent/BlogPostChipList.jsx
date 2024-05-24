import { Chip, Stack } from '@mui/material'
import React from 'react'
import { hexToRgb } from '../../utils/FloraUtils'

function BlogPostChipList({tags}) {
  return (
    <Stack direction={'row'} gap={1} sx={{
        display:'flex',
        maxWidth:'100%',
        flexWrap:'wrap',
    }}>
    {
        tags.map(tag=>{
            const chip_color = hexToRgb(tag.type.color,0.6)
            return <Chip 
            size="small"
            id={tag.name}
            key={tag.id}
            sx={{
                bgcolor:chip_color,
                opacity:0.6,
                color:'white',
                "& > span":{
                    fontSize:"0.6rem",
                },
                "&:hover":{
                    bgcolor:`${chip_color}!important`
                }
            }}
            label={tag.name} 
            variant={"outlined"} 
        />
        })
    }
    </Stack>
  )
}

export default BlogPostChipList