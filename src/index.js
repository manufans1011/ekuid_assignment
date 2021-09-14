const axios = require('axios')

const calculateMeanMedia = (arrOfNum) => {
  let groupedArray = [];
  let partArray = [];
  for(let i = 0; i<arrOfNum.length; i++){
    if(arrOfNum[i]<arrOfNum[i+1]){
      partArray.push(arrOfNum[i])
    }
    else{
      partArray.push(arrOfNum[i])
      groupedArray.push(partArray);
      partArray = []
    }
  }

  let finalArray = [];
  for(let i = 0; i<groupedArray.length;i++){
    const sum = groupedArray[i].reduce((sum, val) => (sum += val));
    const len = groupedArray[i].length;

    const mid = Math.ceil(len / 2);

    const median = len % 2 == 0 ? (groupedArray[i][mid] + groupedArray[i][mid - 1]) / 2 : groupedArray[i][mid - 1];
      
    finalArray.push({
      "mean": sum/len,
      "median": median 
    })
  }

  return finalArray
}

const convertCurrency = async (arr) => {
  const host = 'api.frankfurter.app';

  let convertedCurrency = []
  for (const item of arr){
    const options = {
      url: `https://${host}/latest?amount=${item.amount}&from=${item.currency}&to=USD`,
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json;charset=UTF-8'
      }
    };
    
    const response = await axios(options)
    convertedCurrency.push(response.data.rates.USD)
  }

  return convertedCurrency
}

console.log(`Calculate Mean and Median: %O `, calculateMeanMedia([3, 4, 6, 17, 25, 21, 23]))

let data = convertCurrency(
  [
    { "amount": 15000.0, "currency": "IDR" },
    { "amount": 3.1, "currency": "EUR" }
  ]
)

data.then(function(result){
  console.log(`Convert Currency: %O `, result)
})