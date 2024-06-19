import { Box, Chip, Container } from '@mui/material'
import { AOS_INTRO_BLOCK } from '../../dataset/Animations';
import { groupBy, hexToRgb, sortByTagType } from '../../utils/FloraUtils';


function BlogTagContainer({data, filtered, active_list, setActive, timeArr, placeArr, formatArr, materialTypeArr, themeArr}) {
  const timeNonExcludableTags = timeArr;
  const placeNonExcludableTags = placeArr;
  const formatNonExcludableTags = formatArr;
  const materialNonExcludableTags = materialTypeArr;
  const themeNonExcludableTags = themeArr;
  
  if (!data) return <></>
  const tags_list = groupBy(data.reduce((acc,element,index)=>{
      return acc = [...acc,...element.tag];
  },[]),'name')
  let filtered_tags_list = Object.keys(groupBy(filtered.reduce((acc,element,index)=>{
      return acc = [...acc,...element.tag];
  },[]),'name'))
  if (timeNonExcludableTags?.includes(active_list[0])) {
    filtered_tags_list = [...filtered_tags_list, ...timeNonExcludableTags]
  } else if (placeNonExcludableTags?.includes(active_list[0])) {
    filtered_tags_list = [...filtered_tags_list, ...placeNonExcludableTags]
  } else if (formatNonExcludableTags?.includes(active_list[0])) {
    filtered_tags_list = [...filtered_tags_list, ...formatNonExcludableTags]
  } else if (materialNonExcludableTags?.includes(active_list[0])) {
    filtered_tags_list = [...filtered_tags_list, ...materialNonExcludableTags]
  } else if (themeNonExcludableTags?.includes(active_list[0])) {
    filtered_tags_list = [...filtered_tags_list, ...themeNonExcludableTags]
  }

  const sorted_tags = sortByTagType(tags_list)

  return (
    <Container>
        <Box
            {...AOS_INTRO_BLOCK}
            sx={{
                display: 'flex',
                flexDirection: 'row',
                gap:2,
                justifyContent: 'flex-start',
                maxWidth: '100%',
                flexWrap: 'wrap',
                my:2,
            }}
        >
            {
                sorted_tags && sorted_tags.length>0 && sorted_tags.map((tag,tagIndex)=>{
                    const isActive = active_list.includes(tag.name)
                    const chip_color = hexToRgb(tag.color,0.2)
                    const isDisabled = !filtered_tags_list.includes(tag.name)
                    return(<Chip 
                        id={tag.name}
                        key={tag.id}
                        disabled={isDisabled}
                        sx={{
                            order:isActive?-1:'inherit',
                            opacity:isDisabled?0.8:1,
                            bgcolor:!isActive?"rgba(2,2,2,0)":chip_color,
                            borderColor:!isActive?chip_color:'rgba(2,2,2,0)',
                            "&:hover":{
                                bgcolor:`${chip_color}!important`
                            }
                        }}
                        label={tag.name} 
                        variant={isActive?"contained":"outlined"} 
                        onClick={(e)=>{setActive(e.currentTarget.id)}} 
                    />)
                })
            }
        </Box>
    </Container>
  )
}

export default BlogTagContainer;