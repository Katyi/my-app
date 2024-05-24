import { Box, CircularProgress, Typography } from '@mui/material'
import React, { useEffect } from 'react'
import { AOS_LOADER_BLOCK } from '../../dataset/Animations'
const color="#d0c7b6"

function ProgressBlock({label="",scrollRef=null, ...props}) {
  useEffect(() => {
    return () => {
      scrollRef?.current?.scrollTo(0, 0)
    }
  }, [])
  
  return (
    <Box
    {...props}
      width={"100%"}
      minHeight={"200px"}
      display={'flex'}
      flexDirection={'column'}
      alignItems={'center'}
      py={8}
      gap={10}
      {...AOS_LOADER_BLOCK}
    >
      <Typography
      variant='usage_plant_label' fontSize={20} color={color}>
        Загружаем {label}...
      </Typography>
      <CircularProgress size={120}/>
    </Box>
  )
}

export default ProgressBlock