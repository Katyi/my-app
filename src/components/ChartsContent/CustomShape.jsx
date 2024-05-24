import React, { useEffect, useState } from 'react'
import createSVGPie from 'create-svg-pie';
import { getPlants } from '../../utils/ChartsUtils';

const getValuesForScatterDot = (plants=[],usages=[]) => {
  return plants.map(p=>usages.filter(u=>u.plant===p).reduce((a,e,i)=>a+=e.count,0))
}
function CustomShape(params) {
  const { cx, cy, fill, width, height, color_list,payload  } = params;
  const { tooltipPosition, tooltipPayload, zAxis, yAxis, xAxis, ...other_params  } = params;
  const plants = getPlants(payload?.usages)
  const colors = color_list.filter(c=>plants.includes(c.name)).map(c=>c.color)
  const values = getValuesForScatterDot(plants,payload?.usages)

  const [svg, setSvg] = useState('');

  useEffect(() => {
    const svgCode = createSVGPie(values, width/2, colors);
    // Преобразуем SVGSVGElement в строку
    const serializer = new XMLSerializer();
    const svgString = serializer.serializeToString(svgCode);
    // Вставляем параметры в SVG-код с использованием шаблонных строк
    const updatedSVG = svgString.replace(/<svg([^>]*)\/>/, `<svg$1 width="${width}" height="${height}" fill="${fill}" cx="${cx}"  cy="${cy}" />`);

    setSvg(updatedSVG);
  }, [cx, cy, fill, width, height, values, colors]);
if (values.length===1) return <svg viewBox="0 0 10 10" xmlns="http://www.w3.org/2000/svg" {...other_params} fill={colors[0]}>
  <circle cx="5" cy="5" r="5" />
</svg>
  return <svg dangerouslySetInnerHTML={{ __html: svg }} {...other_params}/>
}

export default CustomShape