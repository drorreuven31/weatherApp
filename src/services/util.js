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

export function calcLocalTime(dt,timezone_offset){
  let offset=new Date().getTimezoneOffset()*60
  const time = dt+timezone_offset+offset
  return time;
}


export const getLeftRightTextMargin =(lang,rem)=>{
  let dir =lang.dir=='right'?'Left':'Right'
  let styles={};
  styles[`margin${dir}`]=rem
  return styles;
}
export function oppositeDirection(dir){
  if(dir==="right")
    return "left"

  return "right";
}

export const weekdays = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];

