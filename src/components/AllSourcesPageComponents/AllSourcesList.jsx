import React, { useState, useEffect } from "react";
import { ALL_SOURCES_LIST } from "../../apollo/AllSourcesList";
import { useLazyQuery } from "@apollo/client";
import { useNavigate, useSearchParams } from "react-router-dom";
import {
  Container,
  Typography,
  TablePagination,
  Box,
  Input,
  Button,
} from "@mui/material";
import { useFormik } from "formik";
import AllSourcesItem from "./AllSourcesItem";
import { getParamsInObject } from "../../utils/SimpleResultUtils";
import ProgressBlock from "../ProgressBlock/ProgressBlock";


function AllSourcesList() {
  let [searchParams, setSearchParams] = useSearchParams();
  const paramsInObject = getParamsInObject(searchParams)
  const navigate = useNavigate();
  const [page, setPage] = useState(+paramsInObject?.page || 0);
  const [rowsPerPage, setRowsPerPage] = useState(+paramsInObject?.offset || 10);
  const [value, setValue] = useState(paramsInObject || {});
  const [getSources, { loading, error, data, refetch }] = useLazyQuery(
    ALL_SOURCES_LIST(value)
  );

  useEffect(() => {
    const paramsInObject = getParamsInObject(searchParams)
        setValue(paramsInObject)
  }, [searchParams]);


  useEffect(() => {
    const afterPosition = page !== 0 && !!data  ? data?.originalConnection?.pageInfo?.endCursor : paramsInObject?.after || null
    let tempValue = {
      filter:paramsInObject?.filter ? paramsInObject.filter : "",
      offset:rowsPerPage,
      after: afterPosition,
      page:!afterPosition?0:page,
    }
   if((!afterPosition || afterPosition.indexOf("null")>=0 || afterPosition==="undefined") && page!==0) {
    setPage(0)
    navigate('/all-sources')
   } else {
    setSearchParams({
      ...tempValue,
    })
  }
    }, [page, rowsPerPage]);

    useEffect(() => {
      if (Object.keys(value).length > 0) {
        if (!data && !loading) {
          getSources(value)
        } else {
          if (!loading) refetch(value)
        }
      }
    }, [value])

  const handleChangePage = (event, newPage) => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      filter: getParamsInObject(searchParams)?.filter || "",      
    },
    onSubmit: (values) => {
      setPage(0)
      setSearchParams({
        page: 0,
        after: null,
        offset: rowsPerPage,
        filter: values.filter,
      })
    },
  });

  return (
    <>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          gap: "10px",
          width: "fit-content",
          p: 2,
          mb: 2,
        }}
      >
        <form
          onSubmit={(e) => {
            e.preventDefault();
            formik.handleSubmit(e);
          }}
        >
          <Input
            name="filter"
            type="text"
            placeholder="Поиск"
            value={formik.values.filter}
            onChange={(e) => {
              formik.handleChange(e);
            }}
          />
          <Button type="submit">Найти</Button>
        </form>
      </Box>
      {loading && (
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
          <ProgressBlock label="список источников"/>
        </Container>
      )}
      {data?.originalConnection?.totalCount === 0 && (
        <Container
          maxWidth="lg"
          sx={{
            mt: 4,
            mb: 4,
            display: "flex",
            justifyContent: "center",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography variant="simple_result_text" color="primary">
            Источник не найден
          </Typography>
        </Container>
      )}
     {
      !loading && !!data && <TablePagination
      component="div"
      count={data?.originalConnection?.totalCount || 0}
      page={page}
      shape="rounded"
      size="medium"
      showFirstButton={true}
      showLastButton={false}
      backIconButtonProps={{ style: { display: "none" } }}
      onPageChange={handleChangePage}
      rowsPerPage={rowsPerPage}
      labelRowsPerPage={"показывать по"}
      labelDisplayedRows={(from = page) =>
        `${from.from}-${from.to === -1 ? from.count : from.to} из ${
          from.count
        }`
      }
      onRowsPerPageChange={handleChangeRowsPerPage}
      sx={{
        alignSelf: "flex-end",
      }}
    />
     }
      <Box
        sx={{
          width: "100%",
          alignSelf: "flex-start",
        }}
      >
        {data &&
          data?.originalConnection?.edges?.map(({ node }) => (
            <AllSourcesItem
              key={node.id}
              node={node}
            />
          ))}
      </Box>
{
  !loading && data && (<TablePagination
        component="div"
        count={data?.originalConnection?.totalCount}
        page={page}
        shape="rounded"
        size="medium"
        showFirstButton={true}
        showLastButton={false}
        backIconButtonProps={{ style: { display: "none" } }}
        onPageChange={handleChangePage}
        rowsPerPage={rowsPerPage}
        labelRowsPerPage={"показывать по"}
        labelDisplayedRows={(from = page) =>
          `${from.from}-${from.to === -1 ? from.count : from.to} из ${
            from.count
          }`
        }
        onRowsPerPageChange={handleChangeRowsPerPage}
        sx={{
          alignSelf: "flex-end",
        }}
      />)
}
      
    </>
  );
}

export default AllSourcesList;
