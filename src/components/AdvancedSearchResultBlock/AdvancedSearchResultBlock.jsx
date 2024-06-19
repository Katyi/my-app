import {
  Box,
  Container,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { getNestedProperty } from "../../utils/QueryRequestUtils";
import { useNavigate } from "react-router-dom";
import RawHTML from "../SimpleResultBlock/RawHTML";
import ResultSettingUpBlock from "./ResultSettingUpBlock";
import { useSelector } from "react-redux";
import PdfPartsView from "../PdfPartsView/PdfPartsView";
import { arrays_equal, collect_whole_line, get_image_pdf } from "../../utils/AdvancedResultUtils";
const color = "#d0c7b6";


function AdvancedSearchResultTable(rows) {
  const fields = useSelector((state) => state.phytolex.fields);
  rows = rows.usagesConnection.edges.map((el) => el.node);
  const navigate = useNavigate();

  function handleCitation(e) {
    if (e.metaKey) { 
      window.open(`${window.location.origin}/#/citation/${e.currentTarget.id || e.target.id}`, '_blank');
    } else {
      navigate(`/citation/${e.currentTarget.id || e.target.id}`);
    }
  }

  function handleLink(e, name) {
   if (name) {
     if (e.metaKey) { 
      window.open(`${window.location.origin}/#/${name}/${e.currentTarget.id}`, '_blank');
    } else {
      navigate(`/${name}/${e.currentTarget.id}`);
    }
   }
  }

  if (!rows) return <></>;
  function generateNestedComp(key, first, second, third) {
    if (!third?.name && !second?.name)
      return (
        <Typography pr={0} fontWeight={800} key={key}>
          {first.name}
        </Typography>
      );
    return (
      <Box component={"ul"} className="treeline" key={key}>
        <li>
          <Typography pr={0} fontWeight={600}>
            {third?.name || second?.name}
          </Typography>
          <ul>
            <Typography
              component={"li"}
              pr={0}
              fontWeight={!!third?.name ? 600 : 400}
              position={"relative"}
              bottom={5}
            >
              {!!third?.name ? second?.name : first.name}
              {!!third?.name && (
                <ul>
                  <Typography component={"li"} pr={0}>
                    {first.name}
                  </Typography>
                </ul>
              )}
            </Typography>
          </ul>
        </li>
      </Box>
    );
  }
  function getOneElement({ field, item, itemInd, mainLexeme }) {
    let key = "name" + item.name + itemInd;
    if (!Object(item).hasOwnProperty("parent")) {
      const dirty =
        field.formikName === "rusNomenclatureName"
          ? item.rusNomenclatureName
          : item.name;
      return (
        <Typography
          // key={"name" + item.name + itemInd}
          key={key}
          className={field.pathLinkName ? "link_text" : ""}
          id={item.id}
          onClick={(e) => field.pathLinkName ? handleLink(e, field.pathLinkName) : undefined}
          sx={{
            fontWeight: field.rus==="Лексема" && item.id === mainLexeme?"bold":"normal",
            order: field.rus==="Лексема" && item.id === mainLexeme?0:1,
            cursor:"pointer"
          }}
          fontSize={17}
        >
          <RawHTML dirtyHTML={dirty} />
        </Typography>
      );
    } else {
      return generateNestedComp(key, item, item.parent, item.parent?.parent);
    }
  }
  return (
    <TableContainer component={Paper} elevation={0}>
      <Table aria-label="AdvancedSearchResult table" sx={{ mb: 10 }}>
        <TableHead sx={{ bgcolor: "rgba(208, 199, 182,0.6)" }}>
          <TableRow>
            <TableCell sx={{ minWidth: { xs: 100, md: 300 } }}>
              <Typography variant="advanced_result_table_header_text">
                Цитата
              </Typography>
            </TableCell>
            <TableCell
              align="left"
              colSpan={5}
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "flex-end",
              }}
            >
              <Typography variant="advanced_result_table_header_text">
                Информация
              </Typography>
              <ResultSettingUpBlock />
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row, index) => {
            const imagePDF = get_image_pdf(row.citation)
            const mainLexeme =  row?.lexeme
            return (
              <TableRow row={row} key={"row - " + index +'  ' +new Date().toUTCString()} hover={true}>
                <TableCell
                  sx={{
                    verticalAlign: "top",
                  }}
                >
                  <Box
                    id={row.citation.id}
                    onClick={handleCitation}
                    className="link_text"
                  >
                    <RawHTML
                      dirtyHTML={
                        row.citation?.originalQuote ||
                        row.citation?.copyOfOriginalQuote ||
                        row.citation?.simplifiedQuote ||
                        "-"
                      }
                    />
                    {imagePDF && (
                      <Box
                        sx={{
                          display: "flex",
                          flexDirection: "column",
                          gap: "30px",
                          p: "0 30px",
                        }}
                      >
                        <PdfPartsView images={imagePDF} />
                      </Box>
                    )}
                  </Box>
                </TableCell>
                <TableCell
                  align={"right"}
                  sx={{
                    verticalAlign: "top",
                    width: "310px",
                  }}
                >
                  <Box
                    sx={{
                      minHeight: "140px",
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "flex-end",
                      justifyContent: "flex-start",
                      "&>div": {},
                    }}
                  >
                    {fields.map((field, fieldIndex) => {
                      let res = getNestedProperty(row, field.path, field.path2);
                      if (
                        typeof res === "object" &&
                        Object(res[0]).hasOwnProperty("parent")
                      ) {
                        res = res.filter((elObject, elIndex, arr) => {
                          const element = collect_whole_line(
                            "parent",
                            elObject
                          )
                            .reverse()
                            .map((n) => n.name);

                          const arrayWithoutElement = arr
                            .map((e) =>
                              collect_whole_line("parent", e)
                                .reverse()
                                .map((n) => n.name)
                            )
                            .filter(
                              (elObject) => !arrays_equal(elObject, element)
                            );

                          const length = element.length;
                          let isValid = arrayWithoutElement.reduce(
                            (acc, el) => {
                              if (
                                acc &&
                                arrays_equal(el.slice(0, length), element)
                              )
                                return acc === false;
                              return acc;
                            },
                            true
                          );
                          return isValid;
                        });
                      }
                      return (
                        <Box
                          key={field.key + "main" + fieldIndex}
                          py={.4}
                        >
                          <Box
                          sx={{
                            display:'flex',
                            flexDirection:'column',
                          }}>
                            {res === "-" || res.length === 0 ? (
                              <Typography
                                variant="usage_caption"
                                sx={{
                                  color: "grey",
                                }}
                              >
                                {field.rus}
                              </Typography>
                            ) : (
                              <>
                                <Typography
                                  variant="usage_caption"
                                  color={color}
                                >
                                  {field.rus}
                                </Typography>
                                {typeof res === "object" ? (
                                  res.map((item, itemInd) => {
                                    return getOneElement({
                                      field,
                                      item,
                                      itemInd,
                                      "mainLexeme":mainLexeme?.id
                                    });
                                  })
                                ) : (
                                  <Box>
                                    <Typography
                                      key={"name" + res + fieldIndex}
                                      className={
                                        field.pathLinkName ? "link_text" : ""
                                      }
                                      id={getNestedProperty(
                                        row,
                                        field.pathLink
                                      )}
                                      onClick={(e) =>
                                        handleLink(e, field.pathLinkName)
                                      }
                                      fontSize={17}
                                      sx={{cursor:"pointer"}}
                                    >
                                      <RawHTML dirtyHTML={res} />
                                    </Typography>
                                  </Box>
                                )}
                              </>
                            )}
                          </Box>
                        </Box>
                      );
                    })}
                  </Box>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

function AdvancedSearchResultBlock({ dataset }) {
  if (!dataset) return <h1>nothing to wrap</h1>;

  return (
    <Container maxWidth={"lg"} disableGutters>
      {AdvancedSearchResultTable(dataset)}
    </Container>
  );
}

export default AdvancedSearchResultBlock;
