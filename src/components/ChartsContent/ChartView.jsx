import { Box } from "@mui/material";
import React from "react";
import {
  Label,
  ResponsiveContainer,
  Scatter,
  ScatterChart,
  Tooltip,
  XAxis,
  YAxis,
  ZAxis,
} from "recharts";
import {
  parseData,
  parseDomain,
  renderCustomizedLabel,
  renderTooltip,
  sortAllData,
} from "../../utils/ChartsUtils";
import CustomShape from "./CustomShape";

function ChartScatter({ chart_data, lexeme, isLast = false, range, domain, my_color,color_list,variants }) {
  return (
    <ResponsiveContainer width={1000} height={60}>
    <ScatterChart
      data={chart_data}
      // width={1000}
      // height={60}
      margin={{
        top: 10,
        right: 0,
        bottom: 0,
        left: 100,
      }}
    >
      <XAxis
        type="category"
        dataKey="year"
        name="year"
        interval={!isLast ? 0 : "equidistantPreserveStart"}
        tick={!isLast ? { fontSize: 0 } : {}}
        tickLine={{ transform: "translate(0, -6)" }}
      />
      <YAxis
        dataKey="index"
        type="number"
        tick={false}
        tickLine={false}
        axisLine={false}
        height={10}
        width={80}
        allowDuplicatedCategory={false}
        // label={{value: lexeme, position: 'insideRight'}}
      >
        <Label
          content={(p) => renderCustomizedLabel(p, lexeme)}
          offset={0}
          position="insideRight"
        />
      </YAxis>
      <ZAxis
        type="number"
        dataKey="count"
        domain={domain}
        range={range}
        name="словоупотреблений"
        unit="count"
      />
      <Tooltip
        cursor={{ strokeDasharray: "3 3" }}
        color={my_color}
        wrapperStyle={{ zIndex: 100 }}
        content={(p)=>renderTooltip(p,color_list, variants)}
      />
      <Scatter data={chart_data} fill={my_color} shape={<CustomShape color_list={color_list}/>}/>
    </ScatterChart>
    </ResponsiveContainer>
  );
}
function getMyColor(color_list, name) {
  return color_list.find((c)=>c.name === name )?.color || "#8984D8"
}
function ChartView({ data, color_list, variants }) {
  const yearsSet = new Set();
  const parsed_chart_data = parseData(data, yearsSet);
  const countsArr = Object.keys(parsed_chart_data).map(lexeme => parsed_chart_data[lexeme][0].count);
  const maxCount = Math.max(...countsArr);
  console.log(countsArr)
  console.log(maxCount)
  const domain = parseDomain(parsed_chart_data, yearsSet);
  const range = [0, 300];
  return (
    <Box py={4}>
      {parsed_chart_data &&
        Object.keys(parsed_chart_data)
          .sort()
          .map((lexeme, index, w) => {
            const isLast = index + 1 === w.length;
            const updated_chart_data = sortAllData(parsed_chart_data[lexeme], yearsSet);
            const my_plant = parsed_chart_data[lexeme][0].plant
            const my_color = getMyColor(color_list, my_plant)
            console.log(updated_chart_data)
            const sizeRange = range.map(r => r / maxCount);
            console.log(sizeRange)
            return (
              <ChartScatter
                range={range}
                isLast={isLast}
                my_color={my_color}
                color_list={color_list}
                key={lexeme + new Date().toDateString()}
                chart_data={updated_chart_data}
                lexeme={lexeme}
                variants={variants}
                domain={domain}
              />
            );
          })}
    </Box>
  );
}

export default ChartView;
