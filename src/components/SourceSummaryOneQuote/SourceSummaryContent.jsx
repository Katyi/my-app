import { Box, Typography } from "@mui/material";
import React from "react";
import { datePeriodOrNot } from "../../utils/OneQuoteUtils";

function SourceSummaryContent({ citation, isSourcePage = false }) {
    console.log('====================================');
    console.log(citation);
    console.log('====================================');
    const {
      publication,
      copyOfOriginal, 
      pagesInCopyOfOriginal, 
      pagesInPublication 
    } = citation
  const isManuscript =
    copyOfOriginal?.copyOfOriginalType?.name === "рукопись" || copyOfOriginal?.copyOfOriginalType?.name === "печатное издание";
 
    return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        width: "100%",
        gap: 1,
      }}
    >
      {isManuscript && (
        <Typography
          key={"source-original-full-name-field"}
          variant="source_summary_fullCitation"
          className="sourceName"
        >
          {copyOfOriginal.original.fullName
            ? copyOfOriginal.original.fullName
            : copyOfOriginal.original.scientificName}
        </Typography>
      )}
      {(!isManuscript ||
        (copyOfOriginal.creationDateStart &&
          copyOfOriginal.creationDateEnd)) && (
        <Typography
          key={"source-date-period-field"}
          variant="source_summary_mixed_info"
          className="sourceName"
        >
          {datePeriodOrNot(
            copyOfOriginal.creationDateStart,
            copyOfOriginal.creationDateEnd
          )}
        </Typography>
      )}
      {isManuscript && (
        <Box
          sx={{
            display: "flex",
            gap: "4px",
            flexWrap: "wrap",
            "& :not(:last-child)::after": {
              content: "','",
            },
            "& :last-child::after": {
              content: "'.'",
            },
          }}
        >
          {copyOfOriginal?.placeOfArchiving?.name && (
            <Typography
              key={"source-info-mix-field-placeOfArchiving"}
              // variant="usage_title"
              variant="source_summary_mixed_info"
              component="div"
            >
              {copyOfOriginal.placeOfArchiving.name}
            </Typography>
          )}
          {copyOfOriginal?.issueNumberOrName && (
            <Typography
              key={"source-info-mix-field-issueNumberOrName"}
              // variant="usage_title"
              variant="source_summary_mixed_info"
              component="div"
            >
              {copyOfOriginal.issueNumberOrName}
            </Typography>
          )}
          {copyOfOriginal.callNumber && (
            <Typography
              key={"source-info-mix-field-callNumber"}
              // variant="usage_title"
              variant="source_summary_mixed_info"
              component="div"
              sx={{
                display: "flex",
                flexWrap: "wrap",
              }}
            >
              {copyOfOriginal.callNumber}
              {!!pagesInCopyOfOriginal ? (
                <>. Л. {pagesInCopyOfOriginal.replace(".", "")}</>
              ) : (
                <></>
              )}
            </Typography>
          )}
        </Box>
      )}
      {isManuscript && (!!publication && publication ) && (
        <Box
          sx={{
            display: "flex",
            gap: "4px",
            flexWrap: "wrap",
          }}
        >
          <Typography
            key={"source-date-period-field"}
            variant="source_summary_mixed_info"
            className="sourceName"
          >
            (Цит. по:
            {" " +
              (publication?.fullCitation ||
                "Полная цитата отсутствует")
              } {!isSourcePage && 
              " С. " +
              pagesInPublication}
            )
          </Typography>
        </Box>
      )}
      {!isManuscript && (
        <Box
          sx={{
            display: "flex",
            gap: "4px",
            flexWrap: "wrap",
          }}
        >
          <Typography
            key={"source-date-period-field"}
            variant="source_summary_mixed_info"
            className="sourceName"
          >
            {" " +
              (
                publication?.fullCitation||
                copyOfOriginal.publication?.fullCitation ||
                "Полная цитата отсутствует2")
                 } {!isSourcePage &&  " С. " +
                 (pagesInPublication || pagesInCopyOfOriginal)}
          </Typography>
        </Box>
      )}
      
       {copyOfOriginal.additionalInfo && (
        <Typography
          variant="source_summary_fullCitation"
          className="sourceName"
        >
          {copyOfOriginal.additionalInfo}
        </Typography>
      )}

      {/* {isManuscript && (
        <>
          {citation.copyOfOriginal.original?.fullName && (
            <>
              <Typography
                variant="source_summary_fullCitation"
                className="sourceName"
              >
                {citation.copyOfOriginal.original.fullName}
              </Typography>
              {citation.copyOfOriginal.creationDateStart && (
                <Typography variant="source_summary_mixed_info" className="sourceName">
                  {datePeriodOrNot(
                    citation.copyOfOriginal.creationDateStart,
                    citation.copyOfOriginal.creationDateEnd || null
                  )}
                </Typography>
              )}
            </>
          )}
          {citation.copyOfOriginal?.placeOfArchiving?.name && (
            <Typography
              variant="source_summary_fullCitation"
              className="sourceName"
            >
              <span>место хранения:</span>
              {citation.copyOfOriginal.placeOfArchiving.name}
              {". "}
              {citation.copyOfOriginal.issueNumberOrName
                ? citation.copyOfOriginal.callNumber
                  ? `${citation.copyOfOriginal.issueNumberOrName.replaceAll(
                      /([\.]$)/gm,
                      ", "
                    )} № ${citation.copyOfOriginal.callNumber}`
                  : citation.copyOfOriginal.issueNumberOrName
                : ""}
            </Typography>
          )}
        </>
      )} */}
    </Box>
  );
}

export default SourceSummaryContent;
