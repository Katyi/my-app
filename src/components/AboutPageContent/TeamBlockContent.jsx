import { Box, Grid, Typography, Link } from "@mui/material";
import React from "react";

const TEAM_LIST_WITH_LINKS = [
  {
    name: "Кира Коваленко (руководитель)",
    links: [
      {
        name: "ЕУСПб",
        url: "https://eusp.org/people/kira-kovalenko",
      },
      {
        name: "ИЛИ РАН",
        url: "https://iling.spb.ru/persons/kovalenko-kira-iosifovna",
      },
    ],
  },
  {
    name: "Вячеслав Козак",
    links: [
      {
        name: "ЕУСПб",
        url: "https://eusp.org/people/kira-kovalenko",
      },
      {
        name: "ИЛИ РАН",
        url: "https://iling.spb.ru/persons/kovalenko-kira-iosifovna",
      },
    ],
  },
];

const TEAM_LIST = [
  {
    name: "Кира Коваленко (руководитель)",
    links: [
      {
        name: "ЕУСПб",
        url: "https://eusp.org/people/kira-kovalenko",
      },
      {
        name: "ИЛИ РАН",
        url: "https://iling.spb.ru/persons/kovalenko-kira-iosifovna",
      },
    ],
  },
  { name: "Ольга Беличенко", links: [] },
  { name: "Евгения Карнаухова", links: [] },
  { name: "Яна Коваленко", links: [] },
  {
    name: "Вячеслав Козак",
    links: [
      {
        name: "ИЛИ РАН",
        url: "https://iling.spb.ru/persons/kozak-vyacheslav-viktorovich",
      },
    ],
  },
  {
    name: "Валерия Колосова",
    links: [
      {
        name: "ИЛИ РАН",
        url: "https://iling.spb.ru/persons/kolosova-valeriya-borisovna",
      },
    ],
  },
  { name: "Александр Кононов", links: [] },
  // {
  //   name: "Ирина Кузнецова",
  //   links: [
  //     {
  //       name: "ИЛИ РАН",
  //       url: "https://iling.spb.ru/persons/kuznecova-irina-evgenevna",
  //     },
  //   ],
  // },
  { name: "Алексей Куприянов", links: [] },
  { name: "Анастасия Левченко", links: [] },
  {
    name: "Денис Мельников",
    links: [
      {
        name: "БИН РАН",
        url: "https://www.binran.ru/sotrudniki/6112/?sphrase_id=1011",
      },
    ],
  },
  {
    name: "Георгий Мольков",
    links: [
      {
        name: "ИЛИ РАН",
        url: "https://iling.spb.ru/persons/molkov-georgiy-anatolevich",
      },
    ],
  },
  {
    name: "Петр Ольшевский",
    links: [
      {
        name: "ЕУСПб",
        url: "https://eusp.org/people/petr-olshevskiy",
      },
    ],
  },
  { name: "Мария Пироговская", links: [] },
  {
    name: "Михаил Рогозов",
    links: [
      {
        name: "ЕУСПб",
        url: "https://eusp.org/people/rogozov-mikhail",
      },
    ],
  },
  {
    name: "Андрей Сытин",
    links: [
      {
        name: "БИН РАН",
        url: "https://www.binran.ru/sotrudniki/4985/?sphrase_id=1010",
      },
    ],
  },
  { name: "Иван Усалко", links: [] },
  {
    name: "Анна Федотова",
    links: [
      {
        name: "ИЛИ РАН",
        url: "https://iling.spb.ru/persons/fedotova-anna-kirillovna",
      },
    ],
  },
  { name: "Кирилл Худин", links: [] },
  {
    name: "Алексей Щекин",
    links: [
      {
        name: "ИЛИ РАН",
        url: "https://iling.spb.ru/persons/schekin-aleksey-sergeevich",
      },
    ],
  },
];
function TeamBlockContent() {
  return (
    <Box id="about-project-team-block" className="aboutBlock" mt={10} mb={10}>
      <Grid
        container
        rowSpacing={6}
        columnSpacing={0}
        sx={{ position: "relative" }}
      >
        <Grid item xs={12} sm={12} sx={{}}>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
            }}
          >
            <Typography variant="about_title" paragraph>
              Участники проекта
            </Typography>
            <ul>
              {TEAM_LIST.map((member, index) => (
                <Box
                  key={
                    new Date().toDateString() + "team-member" + member + index
                  }
                  sx={{
                    display: "flex",
                    flexDirection: { xs: "column", sm: "row" },
                    alignItems: "baseline",
                    gap: { xs: "0", sm: "10px" },
                  }}
                >
                  <Typography
                    component={"li"}
                    variant="about_subtitle"
                    sx={{
                      fontSize: {
                        xs: "14px",
                        sm: "18px",
                        md: "24px",
                      },
                    }}
                  >
                    {member.name}
                  </Typography>
                  <Box display={"flex"} gap={1}>
                    {member.links.length > 0 &&
                      member.links.map((link, index) => (
                        <Link
                          key={"team-member-link" + member + index}
                          href={link.url}
                          target="_blank"
                          rel="noopener"
                          sx={{
                            "&:hover": {
                              color: "black",
                            },
                            fontSize: {
                              xs: "12px",
                              sm: "14px",
                            },
                          }}
                        >
                          {link.name}
                        </Link>
                      ))}
                  </Box>
                </Box>
              ))}
            </ul>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}

export default TeamBlockContent;
