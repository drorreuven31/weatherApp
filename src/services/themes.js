

export const themes = [
  {
    "name": "Clear",
    "day": {
      "bgImage": require('../resources/backgrounds/Clear.jpg'),
      "bgHex": "#187bcd"
    },
    "night": {
      "bgImage": require('../resources/backgrounds/ClearNight.jpg'),
      "bgHex": "#0e101c"
    }
  },
  {
    "name": "Clouds",
    "day": {
      "bgImage": require('../resources/backgrounds/Clouds.jpg'),
      "bgHex": "#636363"
    },
    "night": {
      "bgImage": require('../resources/backgrounds/NightClouds.jpg'),
      "bgHex": "#18252c"
    }
  },
  {
    "name": "Rain",
    "day": {
      "bgImage": require('../resources/backgrounds/Clouds.jpg'),
      "bgHex": "#636363"
    },
    "night": {
      "bgImage": require('../resources/backgrounds/Clouds.jpg'),
      "bgHex": "#636363"
    }
  },
  {
    "name": "Snow",
    "day": {
      "bgImage": require('../resources/backgrounds/Clouds.jpg'),
      "bgHex": "#636363"
    },
    "night": {
      "bgImage": require('../resources/backgrounds/Clouds.jpg'),
      "bgHex": "#636363"
    }
  },
]

export function getThemeData(theme,time){
  const defaultTheme ='Clouds';
  const themedata = themes.filter(x=>x.name===theme)[0][time]

  if(themedata!==undefined)
    return themedata;

  return themes.filter(x=>x.name===defaultTheme)[0][time];
}
export function getWeatherTime (iconString){
  var onlyLetters = iconString.replace(/[^a-zA-Z]+/g, '');
  return onlyLetters==='d'?"day":"night"
}