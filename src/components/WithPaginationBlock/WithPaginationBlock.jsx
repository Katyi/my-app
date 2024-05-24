import { Box, Divider, Grid, Stack, Typography, Button } from "@mui/material";
import React, { useEffect, useMemo, useState } from "react";
import { PAGINATION_SIMLE_QUERY_REQUEST_CURSOR_WITH_FILTER } from "../../apollo/simpleCursorSearchWithFilter";
import { useLazyQuery } from "@apollo/client";
import CustomPagination from "./CustomPagination";
import { PAGINATION_ADVANCED_QUERY_REQUEST_CURSOR } from "../../apollo/advancedCursorSearch";
import ProgressCircularPercent from "../ProgressBlock/ProgressCircularPercent";

function calculateTotalPages(totalCount, offset) {
  if (totalCount <= 0 || offset <= 0) {
    return 0; // Некорректные входные данные
  }
  return Math.ceil(totalCount / offset);
}
const color = "#d0c7b6";
function WithPaginationBlock({
  value,
  page,
  onPageChange,
  onRowsPerPageChange,
  children,
  variant = "simple", //advanced
}) {
  const query = useMemo(() => {
    if (variant === "simple") {
      return PAGINATION_SIMLE_QUERY_REQUEST_CURSOR_WITH_FILTER;
    } else {
      return PAGINATION_ADVANCED_QUERY_REQUEST_CURSOR;
    }
  }, [variant]);
  const [params, setParams] = useState(value);
  const [totalCount, setTotalCount] = useState(null);
  const [cursorList, setCursorList] = useState([]);
  const [isPagesLoading, setIsPagesLoading] = useState(true);
  const [getData, { loading, error, data, refetch }] = useLazyQuery(
    query(params)
  );
  const totalPages = calculateTotalPages(totalCount, params.offset);
  const [stopRequest, setStopRequest] = useState(false);
  useEffect(() => {
    if (!stopRequest) {
      if (
        params &&
        ((params.page > 0 && cursorList.length > 0) || params.page === 0)
      ) {
        if (!isPagesLoading) setIsPagesLoading(true);
        getData(params);
      }
    }
  }, [params]);

  useEffect(() => {
    setIsPagesLoading(!stopRequest);
  }, [stopRequest]);

  useEffect(() => {
    if (
      value.text !== params.text ||
      value.offset !== params.offset ||
      value.page === 0
    ) {
      setCursorList([]);
      setParams(value);
    } else {
      if (cursorList.length === 0)
        setParams({
          ...value,
          page: 0,
        });
    }
  }, [value]);

  useEffect(() => {
    if (data) {
      if (!totalCount || totalCount !== data.usagesConnection.totalCount)
        setTotalCount(data.usagesConnection.totalCount);
      const cursors = [
        data.usagesConnection.pageInfo.startCursor,
        data.usagesConnection.pageInfo.endCursor,
      ];
      setCursorList((p) => [...p, cursors]);
      if (!stopRequest) {
        if (data.usagesConnection.pageInfo.hasNextPage) {
          setParams({
            ...params,
            page: cursorList.length + 1,
            after: data.usagesConnection.pageInfo.endCursor,
          });
        } else {
          setIsPagesLoading(false);
        }
      }
    }
  }, [data]);
  
  useEffect(() => {
    if (
      !isPagesLoading &&
      cursorList[value.page - 1]?.length === 2 &&
      cursorList[value.page - 1][1] !== value.after
    ) {
      onPageChange(value.page, cursorList[value.page - 1][1]);
    } else {
      if (!stopRequest) getData(params);
    }
  }, [isPagesLoading]);

  useEffect(() => {
    if (Math.round(totalCount / value.offset, 10) > 50) {
      setStopRequest(true);
    }
  }, [totalCount]);

  const handleChange = (event, value) => {
    onPageChange(value - 1, cursorList[value - 2] && cursorList[value - 2][1]);
  };
  return (
    <Grid mt={{ xs: 0, md: "-34px" }} pb={10} item xs={12}>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-end",
          alignItems: "flex-end",
        }}
      >
        <Stack direction={"row"}>
          <Typography
            variant="simple_search_caption"
            sx={{
              px: 2,
              display: "flex",
              alignItems: "center",
            }}
          >
            {stopRequest
              ? "Для навигации по страницам необходимо дополнительно загрузить информацию, продолжить?"
              : isPagesLoading
              ? "загружаем страницы..."
              : ""}
          </Typography>
          {stopRequest && (
            <Button
              variant="outlined"
              sx={{ fontSize: "12px" }}
              onClick={() => setStopRequest((p) => !p)}
            >
              да
            </Button>
          )}
          {isPagesLoading && (
            <ProgressCircularPercent
              currentPage={cursorList.length}
              totalPages={totalPages}
            />
          )}
        </Stack>
        <CustomPagination
          offset={value.offset}
          totalCount={totalCount}
          isPagesLoading={isPagesLoading}
          page={page}
          handleChange={handleChange}
          onRowsPerPageChange={onRowsPerPageChange}
          setIsPagesLoading={setIsPagesLoading}
        />
      </Box>
      <Divider color={color} />
      {children}
      {!isPagesLoading && (
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
            offset={value.offset}
            totalCount={totalCount}
            isPagesLoading={isPagesLoading}
            page={page}
            handleChange={handleChange}
            onRowsPerPageChange={onRowsPerPageChange}
            setIsPagesLoading={setIsPagesLoading}
          />{" "}
        </Box>
      )}{" "}
      {/* */}
    </Grid>
  );
}

export default WithPaginationBlock;
