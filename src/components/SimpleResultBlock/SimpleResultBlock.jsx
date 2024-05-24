import { useLazyQuery } from "@apollo/client";
import {
  Box,
  Card,
  CardContent,
  Divider,
  Grid,
  Tooltip,
  Typography
} from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useSearchParams } from "react-router-dom";
import { SIMLE_QUERY_REQUEST_CURSOR_WITH_FILTER } from "../../apollo/simpleCursorSearchWithFilter";
import { AOS_INTRO_BLOCK, AOS_POST_BLOCK } from "../../dataset/Animations";
import {
  clearResultDataSet,
  setLoading,
  setResultDataSet,
} from "../../reducers/appReducer";
import { getParamsInObject } from "../../utils/SimpleResultUtils";
import PdfPartsView from "../PdfPartsView/PdfPartsView";
import ProgressBlock from "../ProgressBlock/ProgressBlock";
import SourceSummaryOneQuote from "../SourceSummaryOneQuote/SourceSummaryOneQuote";
import RawHTML from "./RawHTML";
import { get_image_pdf } from "../../utils/AdvancedResultUtils";
import WithPaginationBlock from "../WithPaginationBlock/WithPaginationBlock";
import CustomPagination from "../WithPaginationBlock/CustomPagination";
import { Buffer } from "buffer";

const clearValue = {
  text: "",
  start_year: null,
  finish_year: null,
  after: null,
  offset: 10,
  filterList: [],
  page: 0,
};

const color = "#d0c7b6";
const buttonColor = "#028e4a";

function SimpleResultBlock() {
  const containerRef = useRef(null);
  let [searchParams, setSearchParams] = useSearchParams();
  const variables = getParamsInObject(searchParams);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [value, setValue] = useState({ ...clearValue });
  const [getRequest, { loading, error, data, refetch }] = useLazyQuery(
    SIMLE_QUERY_REQUEST_CURSOR_WITH_FILTER(value)
  );
  const simpleFilter = useSelector((state) => state.phytolex.simpleFilter);
  const result = useSelector(
    (state) => state.phytolex.result?.usagesConnection
  );

  const rowsPerPage = Number(variables.offset) || 10;

  const filteredResult = result?.edges;
  const total = result?.totalCount;

  useEffect(() => {
    data &&
      containerRef &&
      containerRef?.current?.scrollIntoView({
        behavior: "smooth",
        block: "start",
        inline: "nearest",
      });
  }, [total, data]);

  useEffect(() => {
    dispatch(setLoading(loading));
  }, [loading]);

  useEffect(() => {
    const variables = getParamsInObject(searchParams);
    if (!!Object.keys(variables).length) {
      const requestData = {
        text: variables.text,
        start_year: +variables.yearStart,
        finish_year: +variables.yearEnd,
        after: +variables.page !== 0 ? variables.after : null,
        offset: +variables.offset || 10,
        filterList: simpleFilter,
        page: +variables.page || 0,
      };
      setValue({ ...requestData });
    } else {
      setValue(null);
      dispatch(clearResultDataSet());
    }
  }, [searchParams, simpleFilter]);

  useEffect(() => {
    if (value?.text.length > 0) {
      getRequest(value);
    }
  }, [value]);

  useEffect(() => {
    if (error) {
      if (value.page > 0) handleChangePage(0);
    }
    if (value && data && !loading && !error) dispatch(setResultDataSet(data));
  }, [data, loading, error]);

  const handleNavigateQuote = (e) => {
    if (e.metaKey)
      window.open(
        `${window.location.origin}/#/citation/${e.currentTarget.id}`,
        "_blank"
      );
    else navigate(`/citation/${e.currentTarget.id}`);
  };
  function handleNavigatePlant(e) {
    if (e.metaKey)
      window.open(
        `${window.location.origin}/#/plant/${e.currentTarget.id}`,
        "_blank"
      );
    else navigate(`/plant/${e.currentTarget.id}`);
  }
  function handleNavigateLexeme(e) {
    if (e.metaKey)
      window.open(
        `${window.location.origin}/#/lexeme/${e.currentTarget.id}`,
        "_blank"
      );
    else navigate(`/lexeme/${e.currentTarget.id}`);
  }
  function handleNavigateSource(e) {
    if (e.metaKey)
      window.open(
        `${window.location.origin}/#/source/${e.currentTarget.id}`,
        "_blank"
      );
    else navigate(`/source/${e.currentTarget.id}`);
  }

  if (!result) return <></>;
  const handleChangePage = (newPage, cursor) => {
    setSearchParams({
      ...variables,
      page: newPage,
      offset: rowsPerPage,
      after: cursor,
    });
  };

  const handleChangeRowsPerPage = (newOffset) => {
    setSearchParams({
      ...variables,
      offset: newOffset,
      page: 0,
    });
  };

  const handleChange = (event, value) => {
    let rowsPerPage = +variables?.offset || 10
    console.log(value)
    let s = undefined;
    if (value > 1) {
      let b = Buffer.from(`arrayconnection:${value * rowsPerPage - rowsPerPage - 1}`);
      s = b.toString('base64');
    }
    console.log(s)
    handleChangePage(value - 1, s);
  };

  return (
    <Grid
      ref={containerRef}
      container
      sx={{ bgcolor: "white" }}
      {...AOS_INTRO_BLOCK}
    >
      {error && (
        <Typography variant="simple_search_caption">
          не правильная ссылка на страницу, загружаю первую странцу
        </Typography>
      )}
      {total > 0 && (
          <Grid
            item
            // xs={12}
            {...AOS_INTRO_BLOCK}
            sx={{
              mt: "20px",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              flexDirection: { xs: "column", md: "row" }
            }}
          >
            <Typography variant="simple_result_text" sx={{lineHeight:"40px"}}>
              Словоупотребления (<b>{total}</b>)
            </Typography>
          </Grid>
          
      )}
      <Divider color={color}/>
      {(!total || total === 0) && loading && (
        <ProgressBlock label="результаты" />
      )}
      
      {total > 0 && (
        <Grid mt={{ xs: 0, md: "-40px" }} pb={10} item xs={12}>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "flex-end",
              alignItems: "flex-end"
            }}
          >
            <CustomPagination           
              offset={+variables?.offset || 10}
              totalCount={total}
              page={+variables?.page || 0}
              handleChange={handleChange}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </Box>
          <Divider color={color}/>
          {loading ? (
            <ProgressBlock label="новую страницу" />
          ) : (
            <Grid
              item
              xs={12}
              sx={{
                borderRadius: "8px",
                p: { xs: 0, md: "30px" },
                display: "flex",
                flexDirection: "column",
                gap: { xs: "0px", md: "30px" },
              }}
            >
              {filteredResult.map((useageword, index) => {
                useageword = { ...useageword.node };
                let imagePDF = get_image_pdf(useageword.citation);
                if (
                  imagePDF &&
                  Object.hasOwnProperty.call(imagePDF, "content")
                )
                  imagePDF = { 0: { ...imagePDF } };
                return (
                  <Box
                    key={"worduseage-" + index + new Date()}
                    id={index}
                    {...AOS_POST_BLOCK}
                  >
                    <Card elevation={0}>
                      <CardContent
                        sx={{
                          display: "flex",
                          flexDirection: "column",
                          gap: 2,
                        }}
                      >
                        <Box
                          sx={{
                            display: "flex",
                            justifyContent: "space-between",
                            flexDirection: { xs: "column", md: "row" },
                          }}
                        >
                          <Box
                            sx={{
                              display: "flex",
                              flexWrap: "wrap",
                              justifyContent: "flex-start",
                              maxWidth: { xs: "100%", md: "50%" },
                              gap: 4,
                            }}
                          >
                            <Typography
                              variant="lexema_label_simple"
                              sx={{
                                width: { xs: "100%", md: "100%" },
                                cursor: "pointer",
                                textUnderlineOffset: "4px",
                                "&:hover": {
                                  textDecoration: "underline",
                                  color: color,
                                },
                              }}
                              id={useageword.lexeme.id}
                              onClick={handleNavigateLexeme}
                            >
                              {useageword.lexeme.name}
                            </Typography>
                            <Box
                              sx={{
                                display: "flex",
                                gap: 1,
                              }}
                            >
                              {useageword.scientificName.map((plant, ind) => {
                                return (
                                  <Box
                                    key={
                                      "worduseage-scientificName-" +
                                      ind +
                                      new Date()
                                    }
                                    sx={{
                                      display: "flex",
                                      flexDirection: "column",
                                      borderRadius: "8px",
                                      p: 1,
                                      border: `1px solid ${buttonColor}`,
                                      minWidth: "150px",
                                      cursor: "pointer",
                                      textUnderlineOffset: "4px",
                                      "&:hover": {
                                        border: `1px solid ${color}`,
                                        color: color,
                                      },
                                    }}
                                    id={plant.id}
                                    onClick={handleNavigatePlant}
                                  >
                                    <Typography variant="wordusage_chip_title">
                                      {plant.name}
                                    </Typography>
                                    <Typography
                                      variant="wordusage_chip_title_rus"
                                      component={"p"}
                                    >
                                      {plant.rusNomenclatureName}
                                    </Typography>
                                  </Box>
                                );
                              })}
                            </Box>
                          </Box>
                          <Box
                            sx={{
                              display: "flex",
                              gap: 0,
                              flexWrap: "wrap",
                              justifyContent: "flex-end",
                              maxWidth: { xs: "100%", md: "50%" },
                              order: { xs: -1, md: 2 },
                            }}
                          >
                            <Tooltip
                              title={
                                <SourceSummaryOneQuote
                                  citation={useageword.citation}
                                  isPopper={true}
                                />
                              }
                              placement="bottom-end"
                            >
                              <Typography
                                variant="source_link"
                                component="div"
                                sx={{
                                  width: "100%",
                                  minHeight: "20px",
                                  maxHeight: "30px",
                                  textAlign: "end",
                                }}
                                id={useageword.citation.copyOfOriginal.id}
                                onClick={handleNavigateSource}
                              >
                                {useageword.citation.copyOfOriginal
                                  .encoding || ""}
                              </Typography>
                            </Tooltip>
                          </Box>
                        </Box>
                        <Box className="cut_out_text with_hover"
                            id={useageword.citation.id}
                            onClick={handleNavigateQuote}>
                          <Typography
                            variant="simple_result_text"
                            className="cut_out_text"
                            sx={{
                              cursor: "pointer",
                              "&>*": {
                                display: "inline",
                              },
                              "&:hover": {
                                color: color,
                              },
                            }}
                          >
                            <RawHTML
                              dirtyHTML={
                                useageword.citation.originalQuote ||
                                useageword.citation.simplifiedQuote ||
                                useageword.citation.copyOfOriginalQuote ||
                                ""
                              }
                            />
                          </Typography>

                          {imagePDF && <PdfPartsView images={imagePDF} />}
                        </Box>
                      </CardContent>
                    </Card>
                    {index + 1 !== filteredResult.length && (
                      <Divider
                        color={color}
                        sx={{ opacity: "0.3", mt: "30px" }}
                      />
                    )}
                  </Box>
                );
              })}
            </Grid>
          )}

          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "flex-end",
              alignItems: "flex-end",
            }}
          >
            <CustomPagination
              offset={+variables?.offset || 10}
              totalCount={total}
              page={+variables?.page || 0}
              handleChange={handleChange}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </Box>
        </Grid>
      )}

      {(!total || total === 0) && (
        <Grid item xs={12} sx={{ height: "200px", py: 8 }}>
          <Typography
            variant="error_text"
            width={"100%"}
            textAlign={"center"}
            component={"div"}
          >
            Словоупотребления не найдены <br />
            Попробуйте увеличить временной диапазон
          </Typography>
        </Grid>
      )}
    </Grid>
  );
}

export default SimpleResultBlock;
