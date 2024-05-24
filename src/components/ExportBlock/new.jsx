import { useLazyQuery } from "@apollo/client";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { ADVANCED_QUERY_FOR_EXPORT } from "../../apollo/advancedExport";
import {
  FIELD_NAME_FOR_EXPORT,
  FIELD_WITH_NAME_LIST,
} from "../../dataset/ExportDataSet";
import { generatePayloadToRequest } from "../../utils/QueryRequestUtils";
import ProgressBlock from "../ProgressBlock/ProgressBlock";
import saveAs from "file-saver";
import { Box } from "@mui/material";
import { sort_images_by_ox } from "../../utils/AdvancedResultUtils";

function checkJsonImageSize(json) {
  let parsedJSONList = JSON.parse(json)
  let correctJsonList = []
  parsedJSONList.forEach(image=>{
   const parsedJSON = image
    const { x1, x2, y1, y2 } = parsedJSON.position.boundingRect;
    const correctSizes = {
      width: Math.max(x1, x2) - Math.min(x1, x2),
      height: Math.max(y1, y2) - Math.min(y1, y2),
    };
    const correctJson = {
      ...parsedJSON,
      position: {
        ...parsedJSON.position,
        boundingRect: {
          ...parsedJSON.position.boundingRect,
          ...correctSizes,
        },
      },
    }
    correctJsonList.push(correctJson)
  }) 
  return JSON.stringify(correctJsonList)
}

function parseDataToXLSX(data) {
  const dataset = data
    .map((el) => el.node)
    .map((usage, usageIndex) => {
      let newField = {};
      Object.keys(usage).filter(key=>!['comment', '__typename'].includes(key)).forEach((usageKey, usageKeyIndex) => {
        const field = usage[usageKey];
        switch (typeof field) {
          case "string":
            newField[usageKey] = field.length > 0 ? field : "-";
            break;
          case "boolean":
            newField[usageKey] = field ? "да" : "нет";
            break;
          case "object":
            if (Array.isArray(field)) {
              if (field.length === 0) {
                newField[usageKey] = "-";
              } else {
                if (usageKey === "scientificName") {
                  newField["scientificName"] =
                    field.map((el) => el?.name).toString() || "-";
                  newField["rusNomenclatureName"] =
                    field.map((el) => el?.rusNomenclatureName).toString() ||
                    "-";
                } else {
                  newField[usageKey] = field.map((el) => el?.name).toString();
                }
              }
            } else {
              if (usageKey === "citation") {
                newField["creationDateStart"] =
                  field.copyOfOriginal.creationDateStart || "-";
                newField["creationDateEnd"] =
                  field.copyOfOriginal.creationDateEnd || "-";
                newField["originalQuote"] = field.originalQuote || "-";
                newField["copyOfOriginalQuote"] =
                  field.copyOfOriginalQuote || "-";
                newField["simplifiedQuote"] = field.simplifiedQuote || "-";
                newField["pagesInCopyOfOriginal"] =
                  field.pagesInCopyOfOriginal || "-";
                newField["pagesInPublication"] =
                  field.pagesInPublication || "-";
                newField["publication"] =
                  field.publication?.fullCitation || "-";
                newField["encoding"] =
                  field.copyOfOriginal.original.encoding || "-";
                newField["encodingSource"] =
                  field.copyOfOriginal.encoding || "-";
                newField["fullName"] =
                  field.copyOfOriginal.original.fullName || "-";
                newField["link"] =
                  field.id || "-";
                newField["genre"] =
                  field.copyOfOriginal.original.genre
                    .map((el) => el.name)
                    .reverse()
                    .join("/") || "-";
                // newField["json"] =
                //   field.json.indexOf("image") !== -1
                //     ? checkJsonImageSize(field.json)
                //     : "изображение отсутствует";
              } else {
                if (FIELD_WITH_NAME_LIST.includes(usageKey)) {
                  newField[usageKey] = field?.name || "-";
                }
              }
            }
            break;

          default:
            break;
        }
      });
      const filteredField = {};
      Object.keys(FIELD_NAME_FOR_EXPORT).forEach((value, ind) => {
       if(newField[value]) filteredField[FIELD_NAME_FOR_EXPORT[value]] = newField[value];
      });
      return filteredField;
    });

  return dataset;
}
const downloadxls = (data, name) => {
  import('exceljs').then((ExcelJS) => {
  // const ExcelJS = require("exceljs");
  const workbook = new ExcelJS.Workbook();
  const sheet = workbook.addWorksheet("Результаты поиска", {
    pageSetup: { paperSize: 11, orientation: "landscape" },
    views: [{ state: "frozen", xSplit: 1, ySplit: 1 }],
  });

  sheet.properties.defaultColWidth = 100;
  sheet.properties.showGridLines = true;
  sheet.getRow(1).border = {
    top: { style: "thin", color: { argb: "d0c7b6" } },
    left: { style: "thin", color: { argb: "d0c7b6" } },
    bottom: { style: "thin", color: { argb: "d0c7b6" } },
    right: { style: "thin", color: { argb: "d0c7b6" } },
  };

  sheet.getRow(1).alignment = {
    vertical: "top",
    horizontal: "left",
    wrapText: true,
  };
  sheet.getRow(1).font = {
    name: "Times New Roman",
    scheme: "minor",
    family: 2,
    size: 12,
  };
  sheet.columns = Object.keys(data[0]).map((el) => {
    switch (el) {
      case "цитата изображение":
        return {
          header: el,
          key: el,
          width: 100,
          minHeight: 40,
          wrapText: true,
        };
      case "памятник полное название":
      case "комментарий":
      case "публикация":
      case "цитата упрощенная":
      case "цитата публикации":
      case "цитата источника":
        return {
          header: el,
          key: el,
          minWidth: 20,
          maxWidth: 40,
          minHeight: 40,
          wrapText: true,
        };

      default:
        return {
          header: el,
          key: el,
          width: 30,
          minHeight: 40,
          wrapText: true,
        };
    }
  });
  for (let ind = 0; ind < data.length; ind++) {
    const result = data[ind];
    let maxHeight = 100;
    const imagePDF =null
      // result["цитата изображение"] !== "изображение отсутствует"
      //   ? sort_images_by_ox({ ...JSON.parse(result["цитата изображение"]) })
      //   : null;
    sheet.addRow(
      {
        ...result,
        "ссылка на цитату":{
          text: window.location.origin+"/#/citation/"+result["ссылка на цитату"],
          hyperlink: window.location.origin+"/#/citation/"+result["ссылка на цитату"],
          tooltip: 'ссылка на' + window.location.origin
        },
        "цитата изображение":
          result["цитата изображение"] !== "изображение отсутствует"
            ? ""
            : result["цитата изображение"],
      },
      "i"
    );
    console.log(sheet)
    if (imagePDF && Object.keys(imagePDF).length > 0) {
      Object.keys(imagePDF).map((img, imgIndex) => {
        const current = imagePDF[img];
        const imgData = current.content.image;
        const imgWidth = current.position.boundingRect.width;
        const imgHeight =
          current.position.boundingRect.y2 - current.position.boundingRect.y1;

        if (imgHeight > maxHeight) maxHeight = imgHeight + 100;
        const imageId2 = workbook.addImage({
          base64: imgData,
          extension: "png",
        });
        sheet.addImage(imageId2, {
          ext: { width: imgWidth, height: imgHeight },
          tl: { col: Object.keys(data[0]).length - 1 + imgIndex, row: ind + 1 },
        });
      });
    }
    sheet.getRow(ind + 1).minHeight = maxHeight;
  }

  workbook.xlsx.writeBuffer().then(function (buffer) {
    saveAs(
      new Blob([buffer], { type: "application/octet-stream" }),
      `${name}.xlsx`
    );
  });
})};


function ExportContent({ clb = () => {} }) {
  const advancedForm = useSelector((state) => state.phytolex.advancedForm);
  const yearPeriod = useSelector((state) => state.phytolex.yearPeriod);
  const values = generatePayloadToRequest(advancedForm, yearPeriod);
  const [page, setPage] = useState(0);
  const [endCursor, setEndCursor] = useState(null);
  const [dataset, setDataset] = useState([]);
  const [getRequestForExport, { loading, error, data, refetch }] = useLazyQuery(
    ADVANCED_QUERY_FOR_EXPORT(values, page, endCursor)
  );
  useEffect(() => {
    if (data) {
      if (data?.usagesConnection?.pageInfo?.hasNextPage) {
        setDataset((prev) => [...prev, ...data.usagesConnection.edges]);
        setEndCursor(data.usagesConnection.pageInfo.endCursor);
        setPage((prev) => prev + 1);
      } else {
        setDataset((prev) => [...prev, ...data.usagesConnection.edges]);
      }
    }
  }, [data]);
  async function makeExport(data, name) {
    downloadxls(data, name);
  }
  useEffect(() => {
    if (dataset.length === data?.usagesConnection?.totalCount) {
      makeExport(parseDataToXLSX(dataset), "phytolex-results").then(clb(false));
    }
  }, [dataset]);

  useEffect(() => {
    if (!!values) getRequestForExport(values, page, endCursor);
  }, [page]);

  return (
    <Box sx={{ flexGrow: 1 }}>
      {dataset.length !== data?.usagesConnection?.totalCount && (<>
        <ProgressBlock label="данные и формируем XLSX документ" />
      </>
      )}
    </Box>
  );
}

export default ExportContent;
