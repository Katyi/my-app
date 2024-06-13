import {
  Container,
  Stack,
  IconButton,
  Typography,
  Collapse,
  Box,
} from "@mui/material";
import React, { useState } from "react";
import FilterAltOutlinedIcon from "@mui/icons-material/FilterAltOutlined";
import ChipList from "../ChipList";
import { getAllChartsChipForFunctionTable, getArraysTotalLengthFromObject } from "../../../utils/ChartsUtils";

function FunctionTableChipSettings({
  variants=new Map(),
  exceptions,
  onUpdate,
  data
}) {
const [openSetting, setOpenSetting] = useState(false)
// const allChips = getAllChartsChipForFunctionTable(data.functionsConnection.edges,variants)
const allChips = getAllChartsChipForFunctionTable(data.usagesConnection.edges,variants)
const length = getArraysTotalLengthFromObject(exceptions)

console.log(data)
console.log(allChips)

  return (
    <Container maxWidth="lg" sx={{}}>
      {/* кнопка открыть/свернуть */}
      <Box
        display={'flex'}
        width={"100%"}
        alignItems={"center"}
        justifyContent={"flex-end"}
      >
        <Stack
          as={IconButton}
          borderRadius={0}
          direction={"row"}
          transition={'all 1.3s ease'}
          position={'relative'}
          onClick={() => {
            setOpenSetting(p=>!p)
            console.log("!");
          }}
        >
          <Typography
            variant="simple_search_caption"
            sx={{
              transition: "all .5s linear",
            }}
          >
           {openSetting?"свернуть":"настройка графика"} 
          </Typography>
         {length>0 && <Box 
          sx={{
            width:'1.4rem',
            position:'absolute',
            top:0,
            right:0,
            height:'1.4rem',
            display:"flex",
            justifyContent:'center',
            alignItems:'center',
            borderRadius:'100%',
            bgcolor:"#D0C7B6",
            color:'white',
            fontWeight:300,
            fontSize:'12px',
            transform:'scale(.8)'
          }}
          >{length}</Box>}
          <FilterAltOutlinedIcon />
        </Stack>

      </Box>
      {/* блок настройки графика - тэги */}
      <Collapse in={openSetting} timeout="auto" unmountOnExit orientation="vertical">
        <Box borderLeft={'2px solid #D0C7B6'} pl={2} gap={2} display={'flex'} flexDirection={'column'} alignItems={'flex-start'} >
        {
          Object.keys(allChips).map((option,index)=>{
            const options = allChips[option]
            return (<Box key={option + index} display={'flex'} flexDirection={'column'} alignItems={'flex-start'} gap={1}>
          <Typography
            variant="simple_search_caption"
            sx={{
              transition: "all .5s linear",
            }}
          >
            {option}
          </Typography>
           <ChipList
            options={options}
            variant={variants.get(option)}
            exceptions={exceptions}
            handleClick={(text)=>onUpdate(option,text)}
          />
            </Box>)
          })
        }
        </Box>
      </Collapse>
      {/* блок активных чипов - видно при закрытии тэгов */}
      <Collapse in={!openSetting} unmountOnExit orientation="vertical" timeout={{ enter: 1000, exit: -200 }}>
        <Box borderLeft={'2px solid #D0C7B6'} pl={2} gap={1} display={'flex'} flexDirection={'column'} alignItems={'flex-start'} >
          {
          Object.keys(exceptions).map((option,index)=>{
            const options = exceptions[option]
            if (!options || options.length === 0) return undefined
            return (<Box key={option + index} display={'flex'} flexDirection={'column'} alignItems={'flex-start'} gap={1}>
          <Typography
            variant="simple_search_caption"
            sx={{
              transition: "all .5s linear",
            }}
          >
            {option}
          </Typography>
           <ChipList
            options={options}
            variant={variants.get(option)}
            exceptions={exceptions}
            handleClick={(text)=>onUpdate(option,text)}
          />
            </Box>)
          })
        }</Box>
      </Collapse>
    </Container>
  );
}

export default FunctionTableChipSettings;