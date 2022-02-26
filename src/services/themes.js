

export const themes = [
  {
    "name": "Clear",
    "day": {
      "bgImage": require('../resources/backgrounds/Clear.jpg'),
      "bgHex": "#187bcd"
    },
    "night": {
      "bgImage": require('../resources/backgrounds/Clear.jpg'),
      "bgHex": "#187bcd"
    }
  },
  {
    "name": "Clouds",
    "day": {
      "bgImage": require('../resources/backgrounds/DarkClouds.jpg'),
      "bgHex": "#636363"
    },
    "night": {
      "bgImage": require('../resources/backgrounds/DarkClouds.jpg'),
      "bgHex": "#636363"
    }
  },
]

export function getThemeData(theme,time){

  return themes.filter(x=>x.name===theme)[0][time]

}
export function getWeatherTime (iconString){
  var onlyLetters = iconString.replace(/[^a-zA-Z]+/g, '');
  return onlyLetters==='d'?"day":"night"
}