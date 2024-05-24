import React, { useState } from "react";
import { useQuery } from "@apollo/client";
import { Box, Divider } from "@mui/material";
import { GET_ALL_ARTICLES } from "../../apollo/getArticles";
import { sortByDate } from "../../utils/FloraUtils";
import ProgressBlock from "../ProgressBlock/ProgressBlock";
import BlogTagContainer from "./BlogTagContainer";
import Flora18CentureContent from "./Flora18CentureContent";
import { AOS_INTRO_BLOCK } from "../../dataset/Animations";

function FloraPageContent() {
  const { loading, error, data } = useQuery(GET_ALL_ARTICLES);
  const [active, setActive] = useState([]);
  const timeArr = ["XII", "XIII", "XIV", "XV", "XVI век", "XVII век", "XVIII век", "XIX век", "XX век", "XXI век"];
  const placeArr = ["Новгородская республика", "Московское княжество", "Израиль", "Россия", "Российская империя"];
  const formatArr = ["DjVU", "PDF", "видео", "заметка", "доклад", "книга"];
  // const materialTypeArr = ["заметка", "доклад", "книга"];
  const themeArr = ["обряды", "литература", "базы данных"];
  
  
  const sortedData = data && data?.articles ? sortByDate([...data.articles]) : null;
  
  const handleSetActive = (tag_name) => {
    // setActive(active.includes(tag_name)?[]:[tag_name])
    // // ## tabs style
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
  // const filteredData4 = filteredData3?.filter(post => post.tag.some(i => 
  //   active?.filter(j => materialTypeArr.includes(j)).length > 0 
  //   ? active?.filter(j => materialTypeArr.includes(j)).includes(i.name)
  //   : post
  // ))
  // console.log(filteredData4)
  const filteredData = filteredData3?.filter(post => post.tag.some(i => 
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
