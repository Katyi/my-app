import React, { useState } from "react";
import { useQuery } from "@apollo/client";
import { Box, Divider } from "@mui/material";
import { GET_ALL_ARTICLES, GET_ARTICLES_TAGS_BY_TYPE } from "../../apollo/getArticles";
import { sortByDate } from "../../utils/FloraUtils";
import ProgressBlock from "../ProgressBlock/ProgressBlock";
import BlogTagContainer from "./BlogTagContainer";
import Flora18CentureContent from "./Flora18CentureContent";
import { AOS_INTRO_BLOCK } from "../../dataset/Animations";

function FloraPageContent() {
  const { loading, error, data: data } = useQuery(GET_ALL_ARTICLES);
  const [active, setActive] = useState([]);
  // const timeArr = ["XII", "XIII", "XIV", "XV", "XVI век", "XVII век", "XVIII век", "XIX век", "XX век", "XXI век"]; // время
  // const placeArr = ["Новгородская республика", "Московское княжество", "Израиль", "Россия", "Российская империя"]; // местоположение
  // const formatArr = ["DjVU", "PDF", "видео"]; // формат
  // const materialTypeArr = ["заметка", "доклад", "книга"]; // тип материала
  // const themeArr = ["обряды", "литература", "базы данных"]; // тематика
  const {data: timeTagsData} = useQuery(GET_ARTICLES_TAGS_BY_TYPE, {variables: { type: "время" }});
  const {data: placeTagsData} = useQuery(GET_ARTICLES_TAGS_BY_TYPE, {variables: { type: "местоположение" }});
  const {data: formatTagsData} = useQuery(GET_ARTICLES_TAGS_BY_TYPE, {variables: { type: "формат" }});
  const {data: materialTypeTagsData} = useQuery(GET_ARTICLES_TAGS_BY_TYPE, {variables: { type: "тип материала" }});
  const {data: themeTagsData} = useQuery(GET_ARTICLES_TAGS_BY_TYPE, {variables: { type: "тематика" }});
  
  const sortedData = data && data?.articles ? sortByDate([...data.articles]) : null;
  console.log(sortedData)
  const timeArr = timeTagsData?.tagarticles.map(el => el.name)
  const placeArr = placeTagsData?.tagarticles.map(el => el.name)
  const formatArr = formatTagsData?.tagarticles.map(el => el.name)
  const materialTypeArr = materialTypeTagsData?.tagarticles.map(el => el.name)
  const themeArr = themeTagsData?.tagarticles.map(el => el.name)
    
  const handleSetActive = (tag_name) => {
    setActive(
      active.includes(tag_name)
        ? active.filter((tag) => tag !== tag_name)
        : [...active, tag_name]
    );
  };

  const filteredData1 = sortedData?.filter(post => post.tag.some(i =>
    active?.filter(j => timeArr.includes(j)).length > 0
    ? active?.filter(j => timeArr.includes(j)).includes(i.name)
    : post
  ))
  // console.log(filteredData1)
  const filteredData2 = filteredData1?.filter(post => post.tag.some(i => 
    active?.filter(j => placeArr.includes(j)).length > 0 
    ? active?.filter(j => placeArr.includes(j)).includes(i.name)
    : post
  ))
  // console.log(filteredData2)
  const filteredData3 = filteredData2?.filter(post => post.tag.some(i => 
    active?.filter(j => formatArr.includes(j)).length > 0 
    ? active?.filter(j => formatArr.includes(j)).includes(i.name)
    : post
  ))
  // console.log(filteredData3)
  const filteredData4 = filteredData3?.filter(post => post.tag.some(i => 
    active?.filter(j => materialTypeArr.includes(j)).length > 0 
    ? active?.filter(j => materialTypeArr.includes(j)).includes(i.name)
    : post
  ))
  // console.log(filteredData4)
  const filteredData = filteredData4?.filter(post => post.tag.some(i => 
    active?.filter(j => themeArr.includes(j)).length > 0 
    ? active?.filter(j => themeArr.includes(j)).includes(i.name)
    : post
  ))
  console.log(active)
  console.log(filteredData)
  
  return (
    <Box>
      {loading && !data && !sortedData  && !filteredData ? (
        <ProgressBlock label="статьи блога" />
      ) : (
        <>
          {/* buttons for tags array */}
          <BlogTagContainer
            data={sortedData}
            filtered={filteredData}
            active_list={active}
            setActive={handleSetActive}
            timeArr={timeArr}
            placeArr={placeArr}
            formatArr={formatArr}
            materialTypeArr={materialTypeArr}
            themeArr={themeArr}
          />
          <Divider />
          <Box className="floraBlock" id="flora-page-content" {...AOS_INTRO_BLOCK}>
            <Flora18CentureContent data={filteredData} />{" "}
          </Box>
        </>
      )}
    </Box>
  );
}

export default FloraPageContent;