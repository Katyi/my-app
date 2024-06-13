import { Table, TableHead, TableRow, TableCell, Container, TableBody, Box } from '@mui/material';
import React, { useState } from 'react'
import CustomPagination from '../../WithPaginationBlock/CustomPagination';

const styles = {
  table: {
    border: '0.1px solid #ddd',
    borderCollapse: 'collapse',
    width: '100%',
    boxShadow: "0px 0px 15px -10px rgba(0, 0, 0, 0.75)",
    WebkitBoxShadow: "0px 0px 15px -10px rgba(0, 0, 0, 0.75)"
  },
  thead: {
    backgroundColor: '#f1f1f1',
    height: "20px"
  },
  pagination: {
    display: 'flex',
    justifyContent: 'center',
    marginTop: '10px',
  },
};

const FunctionTable = ({data, color_list, handleChangePage, handleChangeRowsPerPage, page, total, offset}) => {
  console.log(data)
  // console.log(total)
  console.log(color_list)
  
  return (
    <Container sx={{paddingBottom:"20px"}}>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-end",
          alignItems: "flex-end",
          pb: "15px"
        }}
      >
        <CustomPagination           
          offset={offset || 10}
          totalCount={total}
          page={page || 0}
          handleChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Box>
      <Table style={styles.table}>
        <TableHead style={styles.thead}>
          <TableRow>
            <TableCell style={{width:"6%", fontWeight: "700", paddingLeft: "3%"}}>№</TableCell>
            <TableCell style={{width:"20%", fontWeight: "700"}}>Лексема</TableCell>
            <TableCell style={{width:"20%", fontWeight: "700"}}>Название растения</TableCell>
            <TableCell style={{width:"20%", fontWeight: "700"}}>Часть растения</TableCell>
            <TableCell style={{width:"17%", fontWeight: "700"}}>Способ обработки</TableCell>
            <TableCell style={{width:"17%", fontWeight: "700"}}>Лекарственная форма</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data?.map((item, index) => (
            <TableRow key={index}>
              <TableCell style={{width:"6%", paddingLeft: "3%", 
                color:`${color_list.filter(el => item.allFunctions?.some(r => r.name === el.name))[0]?.color}`}}
                >
                  {page*offset+index+1}
              </TableCell>
              {/* <TableCell style={{width:"6%", paddingLeft: "3%", color: "red"}}>{page*offset+index+1}</TableCell> */}
              <TableCell style={{width:"20%",
                color:`${color_list.filter(el => item.allFunctions?.some(r => r.name === el.name))[0]?.color}`}}
              >
                {item.lexeme?.name}
              </TableCell>
              <TableCell style={{width:"20%",
                color:`${color_list.filter(el => item.allFunctions?.some(r => r.name === el.name))[0]?.color}`}}
              > 
                {item?.scientificName?.length>0 ? item?.scientificName[0]?.name : ""}
                 - {item?.scientificName?.length>0 ? item?.scientificName[0]?.rusNomenclatureName : ""}
              </TableCell>
              <TableCell style={{width:"20%",
                color:`${color_list.filter(el => item.allFunctions?.some(r => r.name === el.name))[0]?.color}`}}
              >
                {item.plantPart?.length > 0 
                  ? item.plantPart.map((el, i) =>  i !== item.plantPart.length-1 ? `${el.name}, ` : `${el.name}`) 
                  : ""
                }
              </TableCell>
              <TableCell style={{width:"17%",
                color:`${color_list.filter(el => item.allFunctions?.some(r => r.name === el.name))[0]?.color}`}}
                >
                {item.allStorageTypes?.length > 0 
                  ? item.allStorageTypes.map((el, i) => i < item.allStorageTypes.length-1 ? `${el.name}, ` : `${el.name}`) 
                  : ""
                }
              </TableCell>
              <TableCell style={{width:"17%",
                color:`${color_list.filter(el => item.allFunctions?.some(r => r.name === el.name))[0]?.color}`}}
              >
                {item.medicinalForm?.length > 0 
                  ? item.medicinalForm.map((el, i)  => i < item.medicinalForm.length-1 ?  `${el.name}, ` : `${el.name}`) 
                  : ""
                }
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-end",
          alignItems: "flex-end"
        }}
      >
        <CustomPagination           
          offset={offset || 10}
          totalCount={total}
          page={page || 0}
          handleChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Box>
    </Container>
  )
}

export default FunctionTable;