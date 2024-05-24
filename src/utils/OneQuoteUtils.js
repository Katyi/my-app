export function datePeriodOrNot(start, finish) {
    if ((!finish && start) || (start === finish)) {
      return  `${start} г.`;
    } else {
      return `${start} - ${finish} гг.`;
    }
  }
 export  const typesList = ["Цитата (как в источнике)", "Цитата (упрощенная)"];
export const getOptionList = (data) => {
  const citation = data.citations[0];
  let optList = [];
  let quoteList = [];
  if (!citation) return optList;
  if (citation.originalQuote || citation.copyOfOriginalQuote) {
    optList.push(typesList[0]);
    quoteList.push(citation.originalQuote || citation.copyOfOriginalQuote);
  }
  if (citation.simplifiedQuote) {
    optList.push(typesList[1]);
    quoteList.push(citation.simplifiedQuote);
  }
  return {
    options: optList,
    quote: quoteList,
  };
};
export function generatePageOfSource(citation) {
    if (!!citation.publication) {
      if (citation.pagesInPublication?.length > 0) {
        return `Л.${citation.pagesInPublication}`;
      } else {
        return `Л.${citation.pagesInCopyOfOriginal}`;
      }
    }
    if (citation.pagesInPublication?.length > 0)
      return `Л.${citation.pagesInPublication}`;
    if (citation.pagesInCopyOfOriginal?.length > 0)
      return `Л.${citation.pagesInCopyOfOriginal}`;
    return null;
  }