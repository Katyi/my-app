export function collect_whole_line(parentNodeAttributeName, node) {
  if (parentNodeAttributeName in node && node[parentNodeAttributeName]) {
    return [
      node,
      ...collect_whole_line(
        parentNodeAttributeName,
        node[parentNodeAttributeName]
      ),
    ];
  }
  return [node];
}
export function arrays_equal(a, b) {
  a = Array.isArray(a) ? a : [];
  b = Array.isArray(b) ? b : [];
  return a.length === b.length && a.every((el, ix) => el === b[ix]);
}
export function sort_images_by_ox(images) {
  if (!images || Object.keys(images).length === 1) return images;
  // Сортировка по номеру страницы - position.boundingRect.pageNumber
  // Сортировка по отступам углов картинки слева - x1,x2 и сверху - y1,y2. 
  // Чем меньше x тем картинка левее, чем меньше y тем картинка выше.
  const sortedKeys = Object.keys(images).sort((a, b) => {
    const page1 = images[a].position.boundingRect.pageNumber;
    const page2 = images[b].position.boundingRect.pageNumber;
    const x1A = images[a].position.boundingRect.x1;
    const x1B = images[b].position.boundingRect.x1;
    const x2A = images[a].position.boundingRect.x2;
    const x2B = images[b].position.boundingRect.x2;
    const y1A = images[a].position.boundingRect.y1;
    const y1B = images[b].position.boundingRect.y1;

    // Если картинка на двух колонках то один из x будет более 300, в этом случае сортировка по x,
    // иначе сортировка по y
    if (page1 !== page2) {
      return page1 - page2;
    } else if(page1 === page2) {
      if (x1A > 300 || x1B > 300) {
        if (x1A === x1B) return x2A - x2B;
        return x1A - x1B;
      } 
      else {
        return y1A - y1B;
      }
    }
  });

  const sortedObj = {};
  sortedKeys.forEach((key, index) => {
    sortedObj[index] = images[key];
  });
  return sortedObj;
}
export function get_image_pdf({ json }) {
  return json ? sort_images_by_ox({ ...JSON.parse(json) }) : null;
}
