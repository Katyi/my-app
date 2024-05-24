import { useLazyQuery } from "@apollo/client";
import {
  Box,
  CircularProgress,
  Container,
  Grid,
  TablePagination,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { GET_ONE_SOURCE } from "../../apollo/oneSource";
import CitationList from "../../components/CitationList/CitationList";
import CustomHelmet from "../../components/Helmet/CustomHelmet";
import ProgressBlock from "../../components/ProgressBlock/ProgressBlock";
import SourceSummaryOneSource from "../../components/SourceSummaryOneQuote/SourceSummaryOneSource";

const borderColor = "#d0c7b6";
// const borderColor = "#028e4a";
function SourcePage() {
  const { id } = useParams();
  const [offset, setOffset] = useState(10);
  const [page, setPage] = useState(0);
  const [lastCursor, setLastCursor] = useState(null);
  const [edges, setEdges] = useState([]);
  const [getRequest, { loading, error, data, refetch, networkStatus }] =
    useLazyQuery(GET_ONE_SOURCE, {
      variables: { id: id, offset: offset, after: null },
      nextFetchPolicy: "cache-first", // Used for subsequent executions
    });
  const [total, setTotal] = useState(
    data?.citationsConnection.totalCount || null
  );
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [page]);

  useEffect(() => {
    getRequest({ id: id, offset: offset, after: null });
  }, []);

  useEffect(() => {
    if (total !== data?.citationsConnection.totalCount)
      setTotal(data?.citationsConnection.totalCount);
    if (data && data?.citationsConnection && data?.citationsConnection?.edges)
      setEdges([...data?.citationsConnection.edges]);

    if (
      data?.citationsConnection &&
      data.citationsConnection.pageInfo.hasNextPage &&
      data.citationsConnection.pageInfo.endCursor !== lastCursor
    )
      setLastCursor(data.citationsConnection.pageInfo.endCursor);
  }, [data]);

  useEffect(() => {
    if (page > 0) {
      setEdges([]);
      refetch({ id: id, first: offset, after: lastCursor });
    } else {
      refetch({ id: id, first: offset, after: null });
    }
  }, [page, offset]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setOffset(parseInt(event.target.value, 10));
    setPage(0);
  };
  if (error) throw new Error("Источник не найден" + error?.message);
  if (loading)
    return (
      <Container
        maxWidth="lg"
        sx={{
          mt: 4,
          mb: "100px",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <CircularProgress size={120} />
      </Container>
    );
  if (!data) return <></>;
  const copyOfOriginal = { ...data.copyOfOriginal[0] };
  const publication = data.publications?.[0] ? { ...data.publications?.[0] } : copyOfOriginal.publication[0] ? copyOfOriginal.publication[0] : null;
    return (
    <Container
      maxWidth="lg"
      sx={{
        mt: 4,
        mb: "30px",
      }}
    >
      <CustomHelmet title={copyOfOriginal && copyOfOriginal?.encoding} />

      <Grid container rowSpacing={4}>
        <Grid
          item
          xs={12}
          md={6}
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            gap: 2,
          }}
        >
          <Typography variant="usage_caption" component={"div"}>
            информация об источнике
          </Typography>
          <Box
            sx={{
              border: "2px solid rgba(75, 174, 96, 0.4)",
              p: "22px 15px",
              borderRadius: "8px",
            }}
          >
            <SourceSummaryOneSource
              citation={{ copyOfOriginal, publication }}
            />
          </Box>
        </Grid>
        <Grid
          item
          xs={12}
          md={6}
          sx={{
            order: { xs: -1, md: "inherit" },
            display: "flex",
            flexDirection: "column",
            alignItems: { xs: "flex-start", md: "flex-end" },
          }}
        >
          <Box display={"flex"} gap={1}>
            <Typography variant="usage_caption" component={"div"}>
              источник
            </Typography>
            {copyOfOriginal?.copyOfOriginalType?.name !==
              "публикация как источник" && (
              <Typography variant="usage_caption">
                ({copyOfOriginal.copyOfOriginalType?.name})
              </Typography>
            )}
          </Box>
          <Typography variant="usage_plant_label" textAlign={"end"}>
            {copyOfOriginal.encoding}
          </Typography>
        </Grid>
        <Grid
          item
          xs={12}
          md={12}
          sx={{
            display: "flex",
            flexDirection: "column",
            rowGap: "30px",
          }}
        >
          <Typography
            variant="usage_plant_lexeme_caption"
            component={"div"}
            sx={{
              flexGrow: 1,
              borderBottom: "1px solid",
              borderColor: borderColor,
            }}
          >
            Цитаты источника:
          </Typography>
          {total !== 0 && (
            <TablePagination
              component="div"
              count={total || 0}
              page={page}
              shape="rounded"
              size="medium"
              showFirstButton={true}
              showLastButton={true}
              // backIconButtonProps={{ style: { display: "none" } }}
              onPageChange={handleChangePage}
              rowsPerPage={offset}
              labelRowsPerPage={"показывать по"}
              labelDisplayedRows={(from = page) =>
                `${from.from}-${from.to === -1 ? from.count : from.to} из ${
                  from.count
                }`
              }
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          )}
          {total === 0 ? (
            <Box
              width={"100%"}
              display={"flex"}
              flexDirection={"column"}
              alignItems={"center"}
            >
              <Typography
                variant="usage_plant_label"
                fontSize={20}
                color="#d0c7b6"
              >
                Источник просмотрен. Названия растений не выявлены.
              </Typography>
            </Box>
          ) : edges.length > 0 ? (
            <CitationList list={edges} page={page} />
          ) : (
            <ProgressBlock label={`цитаты источника, ${page + 1} страница`} />
          )}
        </Grid>
      </Grid>
      {total !== 0 && (
        <TablePagination
          component="div"
          count={total || 0}
          page={page}
          shape="rounded"
          size="medium"
          showFirstButton={true}
          showLastButton={true}
          // backIconButtonProps={{ style: { display: "none" } }}
          onPageChange={handleChangePage}
          rowsPerPage={offset}
          labelRowsPerPage={"показывать по"}
          labelDisplayedRows={(from = page) =>
            `${from.from}-${from.to === -1 ? from.count : from.to} из ${
              from.count
            }`
          }
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      )}
    </Container>
  );
}

export default SourcePage;
