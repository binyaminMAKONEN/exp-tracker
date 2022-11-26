import _ from 'lodash'

export const getSum = (transaction,type)=>{
    let sum =_(transaction).groupBy('type').map((objs,key)=>{
       if(!type) return _.sumBy(objs,'amount')
       return{
        'type':key,
        'color':objs[0].color,
        'total': _.sumBy(objs,'amount')
       }
    }).value()
    return sum

}

export const getLabels = (transaction)=>{
    let amountSum = getSum(transaction,'type')
    let sumTotal = _.sumBy(getSum(transaction))

    let percent = _(amountSum)
    .map(objs =>_.assign(objs,{percent:(100*objs.total)/sumTotal})).value()

    console.log(amountSum);
    console.log(sumTotal);
    console.log(percent);
return percent

}

export const chartData = (transaction,custom)=>{
    
    let dataValue = getSum(transaction)
console.log(dataValue);
    let bg = _.map(transaction,obg => obg.color)
    bg = _.uniq(bg)
    console.log(bg);
    
const config = {
    data: {
      datasets: [
        {
          data: dataValue,
          backgroundColor: bg,
          hoverOffset: 4,
          borderRadius: 30,
          spacing:10
        },
        {
          cutout : 115
        }
      ],
    },
  };
  return custom ?? config

}

export function getTotal(transaction){
    return _.sum(getSum(transaction));
}