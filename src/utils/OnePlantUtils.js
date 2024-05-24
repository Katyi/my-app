export function getValidDatasetForOnePlant(dataset) {
  const edges = dataset?.usagesConnection?.edges || []
  if (edges.length===0 && dataset?.plantDepicted[0]) return {
    name:dataset?.plantDepicted[0].plantName.name,
    nameRus:dataset?.plantDepicted[0].plantName.rusNomenclatureName,
    kingdom:null,
    links:{},
    items:[],
    pictures:[...dataset.plantDepicted.map(pict=>pict.picture)]
  }
  let namePlant = null
  let nameRusPlant = null
  let kingdom = null
  let links= null
  let pictures = []
  let arr = []
  let idList = []
  if (edges.length<1) return arr
  edges.forEach((element,elIndex) => {
    if (elIndex===0){
      namePlant = element.node.scientificName[0].name
      nameRusPlant = element.node.scientificName[0].rusName
      kingdom = element.node.scientificName[0].kingdom
      links = {
        wiki:element.node.scientificName[0].wiki,
        powo:element.node.scientificName[0].powo,
        gbif:element.node.scientificName[0].gbif
      }
      pictures = [...element.node.scientificName[0].picture]
    }
    const id = element.node.lexeme.id
    if (!idList.includes(id)) {
      arr.push({...element.node.lexeme})
      idList.push(id)
    }
  });
  return {
    name:namePlant ,
    nameRus:nameRusPlant ,
    kingdom:kingdom,
    links:{...links},
    items:[...arr],
    pictures
  }
}