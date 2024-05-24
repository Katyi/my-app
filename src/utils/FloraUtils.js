export function sortByDate(array) {
  const result = array.sort((a, b) => new Date(b.pubDate).getTime() - new Date(a.pubDate).getTime())
  return result;
}

export function hexToRgb(hex, opacity=1) {
  //   r: parseInt(result[1], 16),
  //   g: parseInt(result[2], 16),
  //   b: parseInt(result[3], 16),
var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
return result ? `rgba(${parseInt(result[1], 16)},${parseInt(result[2], 16)},${parseInt(result[3], 16)},${opacity})`
: null;
}
export const groupBy = function(xs, key) {
  return xs.reduce(function(rv, x) {
    (rv[x[key]] = rv[x[key]] || []).push(x);
    return rv;
  }, {});
};

export function compare( a, b ) {
  if ( a.type < b.type ){
    return -1;
  }
  if ( a.type > b.type ){
    return 1;
  }
  return 0;
}
export function sortByTagType(tags) {
  return Object.keys(tags).map(key => {
      const tag = tags[key];
      return {
          id: tag[0].id,
          name:tag[0].name,
          type:tag[0]?.type.type,
          color:tag[0]?.type.color
      }
  }).sort(compare);
}
export function getFormatedDate(string,format="post") {
  if(string) switch (format) {
    case "post":
        return new Intl.DateTimeFormat("ru", {
            month: "long",
            day: "numeric",
            year: "numeric",
          }).format(new Date(string));
  
    default:
        break;
  }
  return "";
}