import { useContext } from "react";
import { ThemeContext } from "../components/Pages/CityForeCastPage/AllCitiesWrapper";
import { getThemeData } from "../services/themes";

const useTheme =()=>{
const {theme, setTheme} = useContext(ThemeContext);

const getBgColor=()=>{
  return getThemeData(theme.theme,theme.time).bgHex;

}
const getBgImage=()=>{
    return getThemeData(theme.theme,theme.time).bgImage;
  }

return {bg:getBgColor(),bgOpacity:getBgColor()+'70',bgImage:getBgImage() ,setTheme};
}

export default useTheme;