import { Card, CardContent, Divider, Grid, Typography } from "@mui/material";
import { Box } from "@mui/system";
import DOMPurify from "dompurify";
import React, { useEffect, useState } from "react";
import RawHTML from "./RawHTML";

function SimpleResultItem({ data, index, isLast }) {
    // const [currentQuote, setCurrentQuote] = useState(data.citation.simplifiedQuote || data.citation.original || data.citation.copyOfOriginalQuote)
    const currentQuote = data.citation.originalQuote || data.citation.simplifiedQuote || data.citation.copyOfOriginalQuote || "dd"
    return (
    <>
      <Card elevation={0}>
        <CardContent>
          <Grid container>
            <Grid item xs={12}>
              <Typography variant="h6">{data.lexeme.name}</Typography>
              {data.scientificName.map((plant, ind) => {
                return (
                  <>
                    <Typography variant="body2">{plant.name}</Typography>
                    <Typography variant="caption" component={"p"}>
                      {plant.rusNomenclatureName}
                    </Typography>
                  </>
                );
              })}
            </Grid>
            <Grid item xs={12}>
              <Box
                sx={{
                  width: "100%",
                  height: "90px",
                  overflow: "hidden",
                  "&>*, &>*>*":{display:'inline'}
                }}
              >
                <RawHTML dirtyHTML={currentQuote}/>
              </Box>
            </Grid>
          </Grid>

        </CardContent>
      </Card>
      {isLast && <Divider />}
    </>
  );
}

export default SimpleResultItem;
