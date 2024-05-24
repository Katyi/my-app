export function getValidDatasetForOneLexeme(dataset) {
  const edges = dataset?.usagesConnection?.edges || []
  let nameLexeme = null
  let nameRusLexeme = null
  if (edges.length<1) return []
  let arr = []
  let arrPlantList = []
  let idPlantList = []
  let idList = []
  edges.forEach(element => {
    if (!nameLexeme) nameLexeme = element.node.lexeme.name
    if (!nameRusLexeme) nameRusLexeme = element.node.lexeme.nameRus
    const id = element.node.citation.id
    if (!idList.includes(id)) {
      arr.push({...element.node.citation})
      idList.push(id)
    }
    const plantList = element.node.scientificName
    plantList.forEach(el => {
      const alreadyInList = idPlantList.includes(el.id)
    if (!alreadyInList) {
      idPlantList.push(el.id);
      arrPlantList.push(el)
    }
    });
  });
  return {
    name:nameLexeme,
    items:[...arr],
    plants:[...arrPlantList]
  }
}