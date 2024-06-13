function getUniqueColor(n) {
  const rgb = [0, 0, 0];
  for (let i = 0; i < 24; i++) {
      rgb[i%3] <<= 1;
      rgb[i%3] |= n & 0x01;
      n >>= 1;
  }
  return '#' + rgb.reduce((a, c) => (c > 0x0f ? c.toString(16) : '0' + c.toString(16)) + a, '');
};

export const COLORS_FOR_CHARTS = () => {
  let colors = [];
  for (let i = 0; i < 500; i++) {
    const randomColor = getUniqueColor(i);
    colors.push(randomColor);
  }
  return colors.map((el, i) => i === 0 ? el ='#1f77b4' : el );
};

// random colors
// const colors = [];
// for (let i = 0; i < dataKeyArr.length; i++) {
//   const randomColor = "#" + Math.floor(Math.random() * 16777215).toString(16);
//   colors.push(randomColor);
// }
// console.log(colors)
