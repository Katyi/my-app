import { Pagination, Stack } from "@mui/material";
import React from "react";
import ElementPerPageSelector from "./ElementPerPageSelector";

function CustomPagination({
  offset,
  totalCount,
  page,
  handleChange,
  onRowsPerPageChange,
}) {
  return (
    <Stack direction={{xs:'column',md:"row"}} alignItems={{xs:'flex-start',md:"center"}} gap={1} overflow={"hidden"}>
      <ElementPerPageSelector
        offset={offset}
        handler={(offset) => {
          onRowsPerPageChange(offset);
        }}
      />
      <Pagination
        showFirstButton
        showLastButton
        count={Math.ceil(totalCount / offset) || 1}
        siblingCount={2}
        page={page + 1}
        onChange={handleChange}
      ></Pagination>
    </Stack>
  );
}

export default CustomPagination;
