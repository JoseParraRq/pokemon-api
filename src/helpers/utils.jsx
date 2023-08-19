// import moment from 'moment'

export const hasContentVar = (str) => {
  return (typeof str === "undefined" || str == null)?false:true;
}

export const filterValueSelect = (opts, id) => {
  if(id == "N/A"){
    return null;
  }else{
    return opts.find(o => o.id === id);
  }
}

export const changeKeysOptionsSelect = (data, nameLabel) => {
  data.forEach((element, i) => {
      if(typeof data[i][nameLabel] !== "undefined" && typeof data[i]["id"] !== "undefined"){
        Object.defineProperty(data[i], "label", Object.getOwnPropertyDescriptor(data[i], nameLabel));
        Object.defineProperty(data[i], "value", Object.getOwnPropertyDescriptor(data[i], "id"));
        delete data[i][nameLabel];
        delete data[i]["id"];
      }
  });
  return data;
}

String.prototype.toCapitalize = function() {
  return this.charAt(0).toUpperCase() + this.slice(1)
}

export const currencyFormat = (num) => {
  return '$' + parseFloat(num).toFixed(0).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
}

export const decimalFormat = (num) => {
  return parseFloat(num).toFixed(0).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
}

// export const formatDate = (fecha) => {
//   const formatDate = moment(fecha).format("YYYY-MM-DD");
//   return formatDate;
// }

export const uniqueArrayObjs = (arr) => {
  let array = arr;
  return arr.filter((value, index) => {
    const _value = JSON.stringify(value);
    return index === array.findIndex(obj => { return JSON.stringify(obj) === _value });
  });
}

// var { env } = require('./config_env.js');
import { config } from "./config_env";
export const urlAPI = config.API_URL;


export const formatCash = Intl.NumberFormat("es-CO", {
  style: "currency",
  currency: "COP",
  minimumFractionDigits: 0
});

export const isNumber = (value) => {
  if (typeof value === "string") return !isNaN(value);
}

export const primerMayuscula = (word) =>{
return word[0].toUpperCase() + word.substring(1)
}