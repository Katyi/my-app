import { useEffect, useState } from 'react';
import { useLazyQuery } from '@apollo/client';
import { GET_SCIENTIFICNAME_BY_LEXEME } from '../../../apollo/lexemeByLexeme';
import CustomPagination from '../../WithPaginationBlock/CustomPagination';
import { Box, Container, Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material';
import { useNavigate } from 'react-router-dom';

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

const LexemeInLexemeTable = ({data, name, color_list, handleChangePage, handleChangeRowsPerPage, page, total, offset}) => {
  const navigate = useNavigate();
  const [lexeme, setLexeme] = useState([""]);
  const [getScientificName, {data: scientificNameData }] = useLazyQuery(GET_SCIENTIFICNAME_BY_LEXEME, {
    variables: { name: lexeme },
  });

  const edges = scientificNameData?.usagesConnection.edges.map(el => el.node);
  
  function handleNavigateOneLexeme(event) {
    navigate(`/lexeme/${event.currentTarget.id}`);
  }

  useEffect(() => {
    setLexeme(name)
  },[])

  useEffect(() => {
    getScientificName(lexeme)
  },[lexeme])

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
      {/* TABLE HEADER */}
      <TableHead style={styles.thead}>
        <TableRow>
          <TableCell style={{width:"6%", fontWeight: "700", paddingLeft: "2%"}}>№</TableCell>
          {name.map((el, index) =>
            <TableCell key={index} style={{width: `${94/name.length}%`, fontWeight: "700"}}>
              {el}
            </TableCell>
          )}
        </TableRow>
      </TableHead>
      {/* TABLE BODY */}
      <TableBody>
        {data?.map((item, index) => (
          <TableRow key={index}>
            {/* Нумерация в таблице */}
            <TableCell style={{width:"6%", paddingLeft: "2%",
              color:`${color_list[color_list?.findIndex(elem => item?.scientificName.map(m => m.name).
                some(s => edges?.filter(e => e.lexeme.name === elem.name).map(r=>r.scientificName.map(k=>k.name)).flat().includes(s))
              )]?.color}`
            }}
              >
                {page*offset+index+1}
            </TableCell>
            {/* столбцы со связанными лексемами */}
            {name.map((el, index) =>     
              <TableCell key={index} 
                style={{width:`${94/name.length}%`,
                  color:`${color_list.filter(e => e.name === el)[0]?.color}`,
                  cursor: "pointer"}}
                id={item.lexeme.id}
                onClick={handleNavigateOneLexeme}
              >
                {item.scientificName.map(m => m.name).some(s => edges?.filter(e => e.lexeme.name === el)
                  .map(r=>r.scientificName.map(k=>k.name)).flat().includes(s))
                  ? item?.lexeme.name
                  : ""
                }
              </TableCell>
            )}
          </TableRow>
        ))}
      </TableBody>
      </Table>
    </Container>
  )
}

export default LexemeInLexemeTable;