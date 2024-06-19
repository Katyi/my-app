import {
  Box,
  CircularProgress,
  Container,
  Grid,
  InputBase,
  MenuItem,
  Select,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useNavigate, useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { GET_ONE_CITATION } from "../../apollo/oneCitation";
import RawHTML from "../../components/SimpleResultBlock/RawHTML";
import { getOptionList } from "../../utils/OneQuoteUtils";
import SourceSummaryOneQuote from "../../components/SourceSummaryOneQuote/SourceSummaryOneQuote";
import PdfPartsView from "../../components/PdfPartsView/PdfPartsView";
import CustomHelmet from "../../components/Helmet/CustomHelmet";
import { ErrorFallback } from "../../components/fallback/ErrorFallback";
import { get_image_pdf } from "../../utils/AdvancedResultUtils";

const CustomSelect = ({ options, handleChange, currentIndex }) => {
  return (
    <Select
      variant="filled"
      className="quoteType"
      input={<InputBase variant="outlined" />}
      name={`quoteType`}
      value={options.options[currentIndex]}
      IconComponent={ExpandMoreIcon}
      onChange={handleChange}
      sx={{ maxWidth: "300px", opacity: 0.6, color: "#4BAE60" }}
    >
      {options.options.map((el, ind) => {
        return (
          <MenuItem
            key={"opt-item-quoteType" + el + ind}
            value={el}
            id={ind}
          >
            {el}
          </MenuItem>
        );
      })}
    </Select>
  );
};

function CitationPage() {
  const navigate = useNavigate();

  const { id } = useParams();
  const [options, setOptions] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const { loading, error, data } = useQuery(GET_ONE_CITATION, {
    variables: { id: id },
  });

  useEffect(() => {
    if (data) {
      setOptions(getOptionList(data));
      if(!!data.citation && !!data.usagesConnection.edges.length) {
      } else {
        // throw new Error(`Цитата не найдена`)
      }
    } else {
    // throw new Error(`Цитата не найдена`)
  }
  }, [data]);

  const handleChange = (event, newValue) => {
    setCurrentIndex(options.options.indexOf(event.target.value));
    // setAge();
  };

  function handleNavigateOneLexeme(event) {
    navigate(`/lexeme/${event.currentTarget.id}`);
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
    throw new Error("Цитата не найдена! "+error?.message);
  }
  if (!data || !options || options.length===0) return <ErrorFallback error={'Цитата не найдена'} sub_message={"Цитата не найдена"}></ErrorFallback>;
  if (data) {
    const lexemeList = data.usagesConnection.edges.map(e=>e.node.lexeme)
    const oneQuote = data.citations[0];
    const imagePDF = get_image_pdf(oneQuote)
     return (
      <Container
        maxWidth="lg"
        sx={{
          mt: 4,
          mb: "100px",
        }}
      >
        <CustomHelmet title={"Цитата"}/>
        <Grid container rowSpacing={4}>
          <Grid
            item
            xs={12}
            md={6}
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-start",
            }}
          >
            <Typography variant="usage_caption" component={"div"}>
              информация об источнике
            </Typography>
            <SourceSummaryOneQuote citation={oneQuote} />
          </Grid>

          <Grid
            item
            xs={12}
            md={6}
            sx={{
              order: { xs: -1, md: "inherit" },
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-end"
            }}
          >
            {
              lexemeList && lexemeList.length > 0 && (
                <Typography 
                  variant="usage_caption" 
                  component={"div"}
                >
                  связанн{lexemeList.length === 1 ? "ая лексема" : `ые лексемы (${lexemeList.length})`}
                </Typography>
              )
            }
                
              {lexemeList && lexemeList.length > 0 && (
              <Box
                className="withScroll"
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "4px",
                  overflow: "hidden",
                  width:'100%',
                  textAlign:'right',
                  maxHeight:'40vh',
                  overflowY:'scroll',
                  position:'relative',
                  left:'14px'
                }}
              >
                {lexemeList.map((lexeme, index) => {
                  return (
                    <Typography
                      variant="plant_name"
                      key={"lexeme-" + lexeme + index}
                      id={lexeme.id}
                      onClick={handleNavigateOneLexeme}
                      sx={{}}
                    >
                      <span>{lexeme.name}</span>
                    </Typography>
                  );
                })}
              </Box>
            )}
             </Grid>

          <Grid
            item
            xs={12}
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: "30px",
            }}
          >
            {options && options?.options && (
              <CustomSelect
                options={options}
                handleChange={handleChange}
                currentIndex={currentIndex}
              />
            )}
            <Typography variant="usage_quote_text" sx={{ ml: {xs:0,md:10} }}>
              <RawHTML dirtyHTML={options.quote[currentIndex]} />
            </Typography>
          </Grid>
          <Grid
            item
            xs={12}
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: "30px",
              p:'1rem 0',
              overflowX:'hidden'
            }}
          >
            <Box
              sx={{
              display: "flex",
              flexDirection:'column',
              gap: "30px",
              p:'0 30px',
              width:'100%',
              }}
            >
            {
              imagePDF && <PdfPartsView images={imagePDF} zoomable={true}/>
            } 
            </Box>
          </Grid>
          
        </Grid>
      </Container>
    );
  }
}

export default CitationPage;
