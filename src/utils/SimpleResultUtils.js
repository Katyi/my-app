export const Nowrap = () => '\u00A0';

export const getPlantList = (dataset = []) => {
  let arr = [];
  let idList = [];
  dataset.map((item, index) => {
    item.node.scientificName.map((el, ind) => {
      if (idList.indexOf(el.id) === -1) {
        idList = [...idList, el.id];
        arr = [...arr, el];
      }
    });
  });
  return arr;
};

export const filterSimpleResult = (dataset, filterList=[]) => {
  let filteredDataset = []
    let flag = true
   filteredDataset = dataset.filter((elem)=>{
    let obj = true 
    for (let i = 0; i < elem.node.scientificName.length; i++) {
      const element = elem.node.scientificName[i];
      if (filterList.indexOf(`${element.id}`) !== -1) {
        obj = obj && false
      } else {
        obj = obj || true
      }
      if (obj) {
        flag=true;
        break
      }
      flag= obj
    }
    return flag
   })
  return filteredDataset
};
export function getParamsInObject(searchParams) {
  let variables = {}
    for (const [key, value] of searchParams) {
      const newValue = value==="null" ? null : value
      variables[key]=newValue
    }
  return variables
}
export const groupPlantListById = (initial) => {
  if (!initial) return null
  const arr = [...initial]
  let indexList=[]
  arr.filter((element, index)=>{
    const id = element.node?.scientificName[0]?.id 
    if (indexList.indexOf(id)!==-1) {
      return false
    } else {
      indexList.push(id);
      return true
    }
  })
}
export function makeValidDateValue(x,isOpposite=false) {
    if(isOpposite) {
        if(x<1700){
        return Number(1560+x%100/5+Math.trunc((x-1000)/100)*20)
      } return x
    } else {
      if (x < 1700)
        return Number(1000 + (x % 20) * 5 + Math.trunc((x - 1560) / 20) * 100);
      return x;
    }
  }