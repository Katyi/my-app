import { useQuery } from "@apollo/client";
import {
  Box,
  CircularProgress,
  Container,
  Grid,
  Typography,
} from "@mui/material";
import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { GET_ONE_LEXEME } from "../../apollo/oneLexeme";
import CustomHelmet from "../../components/Helmet/CustomHelmet";
import PdfPartsView from "../../components/PdfPartsView/PdfPartsView";
import RawHTML from "../../components/SimpleResultBlock/RawHTML";
import { getValidDatasetForOneLexeme } from "../../utils/OneLexemeUtils";
import { PlantChip } from "../../components/SimpleResultBlock/PlantChip";
import { AOS_LOADER_BLOCK } from "../../dataset/Animations";
import { get_image_pdf } from "../../utils/AdvancedResultUtils";

const borderColor="#028e4a"

function LexemePage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { loading, error, data } = useQuery(GET_ONE_LEXEME, {
    variables: { id: id },
  });
  function handleClickCitation(event) {
    navigate(`/citation/${event.currentTarget.id}`);
  }
  function handleClickOnePlant(event) {
    navigate(`/plant/${event.currentTarget.id}`);
  }
  function handleNavigateSource(event) {
    navigate(`/source/${event.currentTarget.id}`);
  }
  if (loading) {
    return (
      <Container
        maxWidth="lg"
        sx={{
          mt: 4,
          mb: 4,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <CircularProgress size={200} color="primary" />{" "}
      </Container>
    );
  }
  if (error) {
    throw new Error("Лексема не найдена! "+error?.message);
  }
  if (data) {
    const dataset = getValidDatasetForOneLexeme(data);
    const { name, items, plants } = dataset;
    return (
      <Container
        maxWidth="lg"
        sx={{
          mt: 4,
          mb: "100px",
          minHeight:'70vh',
        }}
      >
        <CustomHelmet title={name}/>

        <Grid container rowSpacing={4}>
          <Grid
            item
            xs={12}
            sx={{
              order: { xs: -1, md: "inherit" },
              display: "flex",
              flexDirection: "column",
              alignItems: { xs: "flex-start", md: "flex-end" },
            }}
          >
            <Typography variant="usage_caption" component={"div"}>
              лексема
            </Typography>
            <Typography variant="usage_plant_label">{name}</Typography>
          </Grid>
          <Grid item xs={12} sx={{}}>
            {plants.length > 0 && (
              <Box
                sx={{ display: "flex", flexDirection: "column", gap: "4px",flexWrap:'wrap',overflow:'hidden' }}
              >
                <Typography variant="usage_caption" component={"div"}>
                  растени{plants.length > 1 ? "я" : "е"} (бот. название)
                </Typography>
                <Box
                 sx={{ display: "flex", flexWrap:'wrap', gap: "8px",overflow:'hidden' }}
                >

                {plants.map((plant, index) => {
                  return (
                    <PlantChip
                      {...AOS_LOADER_BLOCK}
                      key={"plant-chip-" + index}
                      plant={plant}
                      handleNavigateToOnePlant={handleClickOnePlant}
                    />
                  );
                })}
                </Box>
              </Box>
            )}
          </Grid>
          <Grid item xs={12} sx={{}}>
            {items.length > 0 && (
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "12px",
                  flexWrap: "wrap",
                  overflow: "hidden",
                }}
              >
                <Typography
                  variant="usage_lexeme_citation_caption"
                  component={"div"}
                  sx={{
                    borderBottom:'1px solid',
                    borderColor:borderColor,
                  }}
                >
                  Cвязанные словоупотребления ({items.length}):
                </Typography>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "8px",
                    width:'100%',
                    flexWrap: "wrap",
                    overflow: "hidden",
                    pl: {xs:0,md:5},
                  }}
                >
                  {items.map((citation, index) => {
                  const imagePDF = get_image_pdf(citation)
                    return (
                     <Box
                      key={citation?.copyOfOriginal.id + "" + index + Date()}
                      className="with_hover"
                      sx={{
                        borderRadius:'4px',
                        cursor: "pointer",
                        display: "flex",
                        flexDirection: "column",
                        gap: "8px",
                        width:'100%',
                        flexWrap: "wrap",
                        overflow: "hidden",
                        pl: {xs:0,md:5},
                        pr: 5,
                        pt:1,
                        pb:4,
                        "&:hover":{
                          bgcolor:'rgb(105 101 94 / 6%)',
                        }
                      }}
                     >
                        <Box display={'flex'} width={'100%'} justifyContent={'flex-end'}>
                          <Typography
                          onClick={handleNavigateSource}
                          id={citation?.copyOfOriginal.id}
                          variant="source_summary_label"
                          textAlign={"end"}
                          width={"auto"}
                          sx={{
                            "&:hover": {
                              color: "black!important",
                              textDecoration:'underline'
                            },
                          }}
                        >
                          {citation?.copyOfOriginal.encoding}
                        </Typography>
                          </Box>
                        <Box 
                          display={'flex'}
                          flexDirection={'column'}
                          height={'auto'}
                        >
                            <Typography
                            variant="usage_lexeme_citation_name"
                            key={"citation-" + citation + index}
                            id={citation.id}
                            onClick={handleClickCitation}
                            sx={{maxWidth:{xs:'auto',md:'auto'}}}
                          >
                            <RawHTML
                              dirtyHTML={
                                citation.originalQuote ||
                                citation.simplifiedQuote ||
                                citation.copyOfOriginalQuote ||
                                ""
                              }
                            />
                        </Typography>
                            <Box
                          sx={{
                          display: "flex",
                          flexDirection:'column',
                          gap: "30px",
                          p:'0 30px',
                          width:'100%',
                          }}
                            id={citation.id}
                            onClick={handleClickCitation}
                        >
                        <PdfPartsView images={imagePDF}/>
                        </Box>
                        </Box>
                     </Box> 
                     );
                  })}
                </Box>
              </Box>
            )}
          </Grid>
        </Grid>
      </Container>
    );
  } else {
    return (
      <div>
        <CircularProgress size={200} color="primary" />{" "}
      </div>
    );
  }
}

export default LexemePage;
