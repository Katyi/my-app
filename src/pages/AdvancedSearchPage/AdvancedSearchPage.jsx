import { useLazyQuery } from "@apollo/client";
import {
  Box,
  Container,
  Typography,
  Grid,
  Divider,
  Link
} from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { ADVANCED_QUERY_REQUEST_CURSOR } from "../../apollo/advancedCursorSearch";
import AdvancedSearchBlock from "../../components/AdvancedSearchBlock/AdvancedSearchBlock";
import AdvancedSearchResultBlock from "../../components/AdvancedSearchResultBlock/AdvancedSearchResultBlock";
import { generatePayloadToRequest } from "../../utils/QueryRequestUtils";
import isEqual from "lodash/isEqual";
import ProgressBlock from "../../components/ProgressBlock/ProgressBlock";
import ExportBlock from "../../components/ExportBlock/ExportBlock";
import CustomHelmet from "../../components/Helmet/CustomHelmet";
import { useSearchParams, useLocation, matchPath } from "react-router-dom";
import { getParamsInObject } from "../../utils/SimpleResultUtils";
import CustomPagination from "../../components/WithPaginationBlock/CustomPagination";
import { Buffer } from "buffer";
const color = "#d0c7b6";

function AdvancedSearchPage() {
  const advancedForm = useSelector((state) => state.phytolex.advancedForm);
  const yearPeriod = useSelector((state) => state.phytolex.yearPeriod);
  let [searchParams, setSearchParams] = useSearchParams();
  const variables = getParamsInObject(searchParams);
  const viewBlockRef = useRef(null);
  const [values, setValues] = useState(null);
  const [dataset, setDataset] = useState(null);
  
  const [getRequest, { called, loading, error, data }] = useLazyQuery(
    ADVANCED_QUERY_REQUEST_CURSOR({
      filters: values,
      page: +searchParams.get("page") || 0,
      offset: +searchParams.get("offset") || 10,
      after:
        searchParams.get("after") !== "undefined"
          ? searchParams.get("after")
          : null,
    })
  );

  useEffect(() => {
    if (error && +searchParams.get("page") > 0)
      setSearchParams({
        ...variables,
        page: 0,
        offset: 10,
      });
    else if (error) throw new Error(error);
  }, [error]);

  useEffect(() => {
    if (values) {
      getRequest();
    }
  }, [values, variables.page, variables.offset, variables.after]);

  useEffect(() => {
    if (data && data.usagesConnection.edges.length > 0) {
      if (!isEqual(data, dataset)) {
        setDataset(data);
      }
    } else setDataset(null);
  }, [data]);

  useEffect(() => {
    if (advancedForm.length > 0) {
      setValues(generatePayloadToRequest(advancedForm, yearPeriod));
    } else {
      setValues(null);
    }
  }, [advancedForm, yearPeriod]);

  useEffect(() => {
    dataset &&
    viewBlockRef &&
    viewBlockRef?.current?.scrollIntoView({
        behavior: "smooth",
        block: "start",
        inline: "nearest",
      });
  }, [dataset]);

  const handleChangePage = (newPage, cursor) => {
    setSearchParams({
      ...variables,
      page: newPage,
      offset: +variables?.offset || 10,
      after: cursor,
    });
  };

  const handleChangeRowsPerPage = (newOffset) => {
    setSearchParams({
      ...variables,
      page: 0,
      offset: newOffset,
    });
  };

  const handleChange = (event, value) => {
    let rowsPerPage = +variables?.offset || 10
    let s = undefined;
    if (value > 1) {
      let b = Buffer.from(`arrayconnection:${value * rowsPerPage - rowsPerPage - 1}`);
      s = b.toString('base64');
    }
    handleChangePage(value - 1, s);
  };

  return (
    <>
      {/* LINKS */}
      <Box sx={{display:"flex", justifyContent:"center", gap: " 20px", height: "30px"}}>
        <Link href="/adv-search" underline="none" style={{fontWeight: 700, borderBottom: `2px solid ${color}`, width: "170px"}}>Расширенный поиск</Link>  
        <Link href="/charts-links" underline="none" sx={{width:"120px"}}>Визуализация</Link>
      </Box>
      {/* РАСШИРЕННЫЙ ПОИСК */}
      <Container
        maxWidth="xl"
        sx={{
          minHeight: "800px",
          display: "flex",
          flexWrap: "wrap",
          flexDirection: "column",
          justifyContent: "flex-start",
          alignItems: "center",
          gap: { xs: "16px", md: "40px" },
        }}
      >
        <CustomHelmet
          title={
            dataset?.usagesConnection?.totalCount > 0
              ? `(${dataset?.usagesConnection?.totalCount})Результаты поиска`
              : "Расширенный поиск"
          }
        />
        <Typography
          variant="about_subtitle"
          sx={{
            width: "100%",
            textAlign: "center",
            mt: { xs: 0, md: 3 },
          }}
        >
          Расширенный поиск
        </Typography>
        <AdvancedSearchBlock />
        <Box minWidth={"100%"}>
          {/* {Object.keys(variables).length> 0 && dataset?.usagesConnection?.totalCount > 0 && ( */}
          {Object.keys(variables).length> 0 && (
          <Box>
            <Typography variant="simple_result_text" sx={{lineHeight:"40px"}}>
              Найдено: (<b>{dataset?.usagesConnection?.totalCount || 0}</b>)
            </Typography>
          </Box>)}
          {Object.keys(variables).length> 0 && (
            <Grid mt={{ xs: 0, md: "-40px" }} pb={10} item xs={12}>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "flex-end",
                  alignItems: "flex-end"
                }}
                ref={viewBlockRef}
              >
                <CustomPagination           
                  offset={+variables?.offset || 10}
                  totalCount={dataset?.usagesConnection?.totalCount}
                  page={+variables?.page || 0}
                  handleChange={handleChange}
                  onRowsPerPageChange={handleChangeRowsPerPage}
                />
              </Box>
              <Divider color={color} />
              {dataset && dataset?.usagesConnection?.totalCount > 0 
              ? (
                <Box sx={{ pt: 8, minHeight: "800px" }}>
                  {!loading && data?.usagesConnection?.totalCount > 0 && (
                    <AdvancedSearchResultBlock dataset={dataset} />
                  )}
                  
                  {/* <ExportBlock /> */}
                </Box>
              ) 
              : (
                <Box sx={{ pt: 8, minHeight: "800px" }}>
                  {loading && (
                    <ProgressBlock
                      label="данные"
                      mb={10}
                    />
                  )}
                  {called &&
                    !loading &&
                    data?.usagesConnection?.totalCount === 0 && (
                      <Typography
                        variant="error_text"
                        width={"100%"}
                        textAlign={"center"}
                        component={"div"}
                        mb={10}
                      >
                        Словоупотребления не найдены <br />
                        Попробуйте изменить условия поиска
                      </Typography>
                    )}
                </Box>
              )}
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "flex-end",
                  alignItems: "flex-end",
                }}
              >
                {" "}
                <CustomPagination
                  offset={+variables?.offset || 10}
                  totalCount={dataset?.usagesConnection?.totalCount}
                  page={+variables?.page || 0}
                  handleChange={handleChange}
                  onRowsPerPageChange={handleChangeRowsPerPage}
                />{" "}
              </Box>
            </Grid>
          )}
        </Box>
      </Container>
    </>
  )
}

export default AdvancedSearchPage;