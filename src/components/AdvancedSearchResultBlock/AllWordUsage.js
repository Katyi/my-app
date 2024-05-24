import { useLazyQuery } from "@apollo/client";
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { ALL_WORDUSAGE_BY_PLANT_ID } from "../../apollo/getAllWordusageByPlantId";
import PdfPartsView from "../PdfPartsView/PdfPartsView";
import ProgressBlock from "../ProgressBlock/ProgressBlock";
import RawHTML from "../SimpleResultBlock/RawHTML";
import { get_image_pdf } from "../../utils/AdvancedResultUtils";

const color = "#d0c7b6";
const buttonColor = "#028e4a";
function AllWordUsage({ id, open}) {
  const navigate = useNavigate();
  const advancedForm = useSelector((state) => state.phytolex.advancedForm);
  const yearPeriod = useSelector((state) => state.phytolex.yearPeriod);

  const [offset, setOffset] = useState(5)
  const [filteredData, setFilteredData] = useState([])
  const [getRequest, { called, loading, error, data, refetch }] = useLazyQuery(
    ALL_WORDUSAGE_BY_PLANT_ID(id,offset,advancedForm,yearPeriod)
  );
  useEffect(() => {
    if (open && !data) {
      getRequest(id,offset, advancedForm);
    }
  }, [open, offset]);

  // for "словарь коммерческий - алканна" case - remove duplicates
  useEffect(() => {
    if (data) (
      setFilteredData(data.usagesConnection.edges.filter( (wordusage, index, self) =>
        index === self.findIndex((t) => (
          t.node.citation.id === wordusage.node.citation.id
        ))
      ))
    )
  }, [data])
  
  function handleClickOneCitation(event) {
    navigate(`/citation/${event.currentTarget.id}`);
  }
  function handleNavigateSource(event) {
    navigate(`/source/${event.currentTarget.id}`);
  }
  function handleRefetch() {
    setOffset(200)
  }
  return (
    <Box>
      <Table size="small" aria-label="purchases" sx={{ width: "100%" }}>
        <TableHead
          sx={{ bgcolor: loading ? "white" : "rgba(208,199,182,0.2)" }}
        >
          <TableRow>
            <TableCell>
              {data && (
                <Box display={"flex"} justifyContent={"space-between"}>
                  <Typography
                    variant="advanced_result_table_header_text"
                    fontSize={"14px"}
                    textTransform={"lowercase"}
                  >
                    Цитат
                    {data && data.usagesConnection.edges.length > 1
                      ? `ы (${filteredData.length} из ${data.usagesConnection.edges.length !== filteredData.length
                        ? filteredData.length
                        : data.usagesConnection.totalCount
                      })`
                      : `а (1)`}
                  </Typography>
                  {
                    ((data.usagesConnection.edges.length<data.usagesConnection.totalCount)
                    && (data.usagesConnection.edges.length === filteredData.length))
                    && <Typography
                      variant="advanced_result_table_header_text"
                      fontSize={"14px"}
                      textTransform={"lowercase"}
                      onClick={handleRefetch}
                      sx={{
                        cursor: "pointer",
                        textUnderlineOffset: "4px",
                        "&:hover": {
                          textDecoration: "underline",
                        },
                      }}
                    >
                      показать все
                    </Typography>
                  }
                  
                </Box>
              )}
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody
          sx={{
            bgcolor: loading ? "white" : "rgba(200,200,200,0.1)",
          }}
        >
          {loading && (
            <ProgressBlock label="все цитаты"/>
          )}
          {data &&
            filteredData.map((wordusage, index) => {
            const imagePDF = get_image_pdf(wordusage.node.citation)
              return(
              <TableRow
                key={index + Date()}
                className="two_line_container"
                sx={{ "& > *": { borderBottom: "unset" } }}
              >
                <TableCell
                  component="th"
                  scope="row"
                  className="exact_two_line_with_dot"
                  id={wordusage.node.citation?.id}
                  onClick={handleClickOneCitation} 
                  sx={{
                    cursor:'pointer',
                        "&:hover": {
                          bgcolor:'rgb(208 199 182 / 40%)',
                        },}}
                >
                  <Typography
                    variant="source_summary_label"
                    textAlign={"end"}
                    minWidth={"100%"}
                    onClick={handleNavigateSource}
                    id={wordusage.node.citation?.copyOfOriginal.id}
                    sx={{
                    }}
                  >
                    {wordusage.node.citation?.copyOfOriginal.encoding}
                  </Typography>
                  <Typography variant="exact_two_line_with_dot"
                  sx={{
                      cursor: "pointer",
                    "&:hover": {
                      color: color,
                    },
                    "&>*, &>*>*":{display:'inline'}
                  }}>
                    <RawHTML
                      dirtyHTML={
                        wordusage.node.citation?.originalQuote ||
                        wordusage.node.citation?.copyOfOriginalQuote ||
                        wordusage.node.citation?.simplifiedQuote ||
                        "-"
                      }
                    />
                  </Typography>
                  {
                    imagePDF && <Box
                        sx={{
                        display: "flex",
                        flexDirection:'column',
                        gap: "30px",
                        p:'0 30px',
                        width:'100%',
                        }}
                        id={wordusage.node.citation?.id}
                        onClick={handleClickOneCitation} 
                      >
                      
                      <PdfPartsView images={imagePDF} />
                    </Box>
                  }
                </TableCell>
              </TableRow>
            )})}
        </TableBody>
      </Table>
    </Box>
  );
}

export default AllWordUsage;
