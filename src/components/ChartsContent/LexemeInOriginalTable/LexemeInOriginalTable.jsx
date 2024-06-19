import CustomPagination from '../../WithPaginationBlock/CustomPagination';
import { Box, Container, Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material';

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

const LexemeInOriginalTable = ({data, name, color_list, handleChangePage, handleChangeRowsPerPage, page, total, offset}) => {
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
          <TableCell style={{width:"6%", fontWeight: "700", paddingLeft: "2%"}}>№</TableCell>
          {name.map((el, index) =>
            <TableCell key={index} style={{width: `${94/name.length}%`, fontWeight: "700"}}>
              Лексемы в {el}
            </TableCell>
          )}
        </TableRow>
      </TableHead>
      <TableBody>
        {data?.map(el => el.node).map((item, index) => (
          <TableRow key={index}>
            <TableCell style={{width:"6%", paddingLeft: "2%",
              color:`${color_list.filter(el => el.name === item.citation?.copyOfOriginal.original.encoding)[0]?.color}`}}
              >
                {page*offset+index+1}
            </TableCell>
            {name.map((el, index) => 
              <TableCell key={index} style={{width:`${94/name.length}%`,
                color:`${color_list.filter(el => el.name === item.citation?.copyOfOriginal.original.encoding)[0]?.color}`}}
              >
                {el === item.citation?.copyOfOriginal.original.encoding ? item.lexeme?.name : ""}
              </TableCell>
            )}
          </TableRow>
        ))}
      </TableBody>
      </Table>
    </Container>
  )
}

export default LexemeInOriginalTable;