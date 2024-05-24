import { Box, Typography } from '@mui/material'
import React from 'react'

  const color = "#028e4a";//"#d0c7b6";
function PlantSummary({kingdom, links}) {
const hasLinks = !!links?.wiki || !!links?.powo || !!links?.gbif
  return (
      <Box
      sx={{
        border: "2px solid",
        borderColor:color,
        bgcolor: "white",
        color: "black",
        borderRadius: "8px",
        minWidth: { xs: "100%", md: "80%" },
        maxWidth: "100%",
        minHeight: "100%",
        p: "22px 15px",
        mt: "10px",
        display: "flex",
        flexDirection: "column",
        gap: 1,
      }}
    >
      {
        kingdom && <Box
        sx={{
          // display: "flex",
          width: "100%",
          gap: 1,
        }}
      >
              <Typography
                // key={"plant-info"}
                // variant="usage_title"
                variant="source_summary_fullCitation"
                component="span"
                sx={{
                }}
              >
                Царство:{" "}
              </Typography>
              <Typography
                // key={"plant-info"}
                // variant="usage_title"
                variant="source_summary_mixed_info"
                component="span"
                sx={{
                }}
              >
                {kingdom}
              </Typography>
      </Box>
      }
      
      {
        hasLinks && <Box
        sx={{
          display: "flex",
          flexDirection:'column',
          width: "100%",
          gap: 1,
        }}
      >
              <Typography
                // key={"plant-info"}
                // variant="usage_title"
                variant="source_summary_fullCitation"
                component="span"
                sx={{
                }}
              >
                Растение на других ресурсах:{" "}
              </Typography>
              {
                links?.gbif && <Typography
                // key={"plant-info"}
                // variant="usage_title"
                className='link'
                target="_blank"
                variant="source_summary_mixed_info"
                component="a"
                href={links.gbif}
                sx={{
                }}
              >
                the Global Biodiversity Information Facility
              </Typography>
              }
              {
                links?.powo && <Typography
                // key={"plant-info"}
                // variant="usage_title"
                variant="source_summary_mixed_info"
                component="a"
                className='link'
                target="_blank"
                href={links.powo}
                sx={{
                }}
              >
                Plants of the World Online | Kew Science
              </Typography>
              }
              {
                links?.wiki && <Typography
                // key={"plant-info"}
                // variant="usage_title"
                variant="source_summary_mixed_info"
                component="a"
                className='link'
                target="_blank"
                href={links.wiki}
                sx={{
                }}
              >
                Wikipedia, the free encyclopedia
              </Typography>
              }
              
      </Box>
      }
    </Box>
  )
}

export default PlantSummary