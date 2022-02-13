export function UpperCaseFirstLettersSentence(str){
    return str.split(' ')
        .map( word=>{
            return word.charAt(0).toUpperCase() + word.slice(1);
        })
        .join(' ');
}
export function unixToDateTime(unix){
  let date = new Date(unix * 1000)
  return date
}

export const weekdays = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];