import { Box, Container, Link, List, ListItem, Typography } from '@mui/material';

const ChartsLinksPage = () => {
  // const color = "#d0c7b6";
  const color = "gray";

  return (
    <>
      {/* LINKS */}
      <Box sx={{display:"flex", justifyContent:"center", gap: " 20px", height: "30px"}}>
        <Link href="/adv-search" underline="none" sx={{width: "170px"}}>Расширенный поиск</Link>  
        <Link href="/charts-links" underline="none" style={{fontWeight: 700, borderBottom: `2px solid #d0c7b6`, width:"120px"}}>Визуализация</Link>
      </Box>
      {/* ВИЗУАЛИЗАЦИЯ */}
      <Container
        maxWidth="xl"
        sx={{
          minHeight: "800px",
          display: "flex",
          flexWrap: "wrap",
          flexDirection: "column",
          justifyContent: "flex-start",
          alignItems: "center",
          gap: { xs: "16px", md: "40px" },
        }}
      >
        <Typography
          variant="about_subtitle"
          sx={{
            width: "100%",
            textAlign: "center",
            mt: { xs: 0, md: 3 },
          }}
        >
          Визуализация
        </Typography>
        <Box minWidth={"50%"} sx={{}}>
          <List>
            <ListItem sx={{width: "500px", height: "30px"}}>
              <Typography sx={{marginRight: 1, color: color}}>1.</Typography>
              <Link href="/charts" underline="none" sx={{color: color}}>Синонимия фитонимов</Link>
            </ListItem>
            <ListItem sx={{width: "500px", height: "30px"}}>
              <Typography sx={{marginRight: 1, color: color}}>2.</Typography>
              <Link href="/charts1" underline="none" sx={{color: color}}>Многозначность фитонимов</Link>
            </ListItem>
            <ListItem sx={{width: "500px", height: "30px"}}>
              <Typography sx={{marginRight: 1, color: color}}>3.</Typography>
              <Link href="/charts2" underline="none" sx={{color: color}}>Жанровое своеобразие</Link>
            </ListItem>
            <ListItem sx={{width: "500px", height: "30px"}}>
              <Typography sx={{marginRight: 1, color: color}}>4.</Typography>
              <Link href="/charts3" underline="none" sx={{color: color}}>Использование растений</Link>
            </ListItem>
            <ListItem sx={{width: "500px", height: "30px"}}>
              <Typography sx={{marginRight: 1, color: color}}>5.</Typography>
              <Link href="/charts4" underline="none" sx={{color: color}}>Сравнение источников</Link>
            </ListItem>
            <ListItem sx={{width: "500px", height: "30px"}}>
              <Typography sx={{marginRight: 1, color: color}}>6.</Typography>
              <Link href="/charts5" underline="none" sx={{color: color}}>Словообразовательные связи</Link>
            </ListItem>
          </List>
        </Box>
      </Container>
    </>
  )
}

export default ChartsLinksPage;