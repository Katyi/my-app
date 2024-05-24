import { CardMedia } from "@mui/material";
import React from "react";
import Zoom from 'react-medium-image-zoom'
import 'react-medium-image-zoom/dist/styles.css'

function PdfPartsView({ images, zoomable=false }) {
  return (
    <>
      {images &&
        Object.keys(images)
        .map((key, index) => {
          const image = images[key].content.image;
          const { y1, y2, x1, x2 } = images[key].position.boundingRect;
          const imageHeight = Math.abs(y1 - y2);
          const imageWidth = Math.abs(x1 - x2);
          //const imageWidth = images[key].position.boundingRect.width
          if(zoomable) {
            return <Zoom 
              key={"screen-pdf-cut-out-piece" + index}>
                <CardMedia 
                  component={'img'}
                  alt={"index" + index}
                  sx={{
                    maxWidth: imageWidth || "fit-content",
                    height: imageHeight || "inherit",
                  }}
                  src={image}
                  key={"screen-pdf-cut-out-piece" + index}
                />

            </Zoom>
          }
          return (
            <CardMedia 
              component={'img'}
              alt={"index" + index}
              sx={{
                maxWidth: imageWidth || "fit-content",
                height: imageHeight || "inherit",
              }}
              src={image}
              key={"screen-pdf-cut-out-piece" + index}
            />
          );
        })}
    </>
  );
}

export default PdfPartsView;