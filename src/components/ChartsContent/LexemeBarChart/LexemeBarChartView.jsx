import { Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { getFunctionList } from "../../../utils/ChartsUtils";
import LexemeBarChartTooltip from "./LexemeBarChartTooltip";
import { COLORS_FOR_CHARTS } from "../../../utils/ColorConfig";
import LexemeBarChartLegend from "./LexemeBarChartLegend";

function LexemeBarChartView({ data, color_list, variants }) {
  // DATA FOR BARCHART
  let chartData = []
  let allLexemesArr = []
  let bigData = data.map(el => el.usage).flat()
  chartData = [...new Set(bigData.map(el => el.citation?.copyOfOriginal.creationDateEnd).sort((a,b) => a-b))]
    .map(v => v = {year: v, amt: 0, genres: []});
  
  for (let i = 0; i < bigData.length; i++) {
    let ind = chartData.findIndex(el => el.year === bigData[i].citation?.copyOfOriginal.creationDateEnd);
    let genresArr = [...new Set(getFunctionList(bigData[i].citation.copyOfOriginal.original.genre).flat())];
    let lexeme = bigData[i].lexeme.name;
    allLexemesArr.push(lexeme);
    if (chartData[ind].hasOwnProperty(lexeme)) {
      chartData[ind].amt +=1
      chartData[ind][`${lexeme}`] +=1
      chartData[ind].genres.concat(genresArr)
    } else {
      chartData[ind].amt += 1
      chartData[ind][`${lexeme}`] = 1
      chartData[ind].genres = genresArr
    }
  }
  
  for (let i = 0; i < chartData.length; i++) {
    let total = 0;
    let keysArr = Object.keys(chartData[i]);
    for (let j = 0; j < keysArr.length; j++) {
      if (keysArr[j] !== 'amt' && keysArr[j] !== 'year' && keysArr[j] !== 'genres') {
        let val = chartData[i][keysArr[j]];
        if (j < keysArr.length - 1) {
          chartData[i][keysArr[j]] = (100 / chartData[i].amt * val);
          total += chartData[i][keysArr[j]]
        } 
        else {
          chartData[i][keysArr[j]] = (100 - total);
          total += chartData[i][keysArr[j]] // для проверки суммы процентов - она должна быть ровно 100
          
        }
      }
    }
    chartData[i].amt = 100;
  }
  // console.log(chartData)
  
  // KEYS FOR BARS
  let dataKeyArr = [...new Set(allLexemesArr)]
  // console.log(dataKeyArr)
  
  // GET COLORS FOR BARS
  let colors = COLORS_FOR_CHARTS();
  
  return (
    <ResponsiveContainer width="100%" height="100%" >
      <BarChart
        width={1000}
        height={600}
          data={chartData}
          // style={{minHeight: `${dataKeyArr.length * 17}px`}}
          margin={{
            top: 5,
            right: 5,
            left: 5,
            bottom: 20,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="year" interval={chartData.length > 30 ? 5 : 0} style={{fontSize: "10px", writingMode:"vertical-rl", textOrientation:"mixed"}} tickMargin={7} />
          <YAxis domain={[0,100]} tickCount={6} tick={[0, 20, 40, 60, 80, 100]} style={{fontSize:"10px"}}
            tickFormatter={(tick) => {
              return `${tick.toFixed()}%`;
              }}
          />
          <Tooltip
            cursor={{fill: 'transparent'}}
            content={<LexemeBarChartTooltip active={false} payload={[]} label={""}/>}
          />
          <Legend
            wrapperStyle={{ fontSize: '10px' }}
            iconSize={"7px"}
            layout='vertical'
            verticalAlign='top'
            align="left"
            // height={"100px"}
            content={<LexemeBarChartLegend payload={[]} colors={colors}/>}
          />
          
          {dataKeyArr.map((el,i) => 
            <Bar key={i} dataKey={el} stackId="x" fill={colors[i]} barSize={chartData.length > 30 ? 10 : 30} style={{fontSize:"10px"}} activeBar={false}/>
          )}
      </BarChart>
    </ResponsiveContainer>
  )
}

export default LexemeBarChartView;