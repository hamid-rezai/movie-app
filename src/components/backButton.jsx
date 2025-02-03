import { LeftCircleFilled } from "@ant-design/icons";
import { useTheme } from "../contexts/themeContext";

const BackButton=()=>{

  const {theme}=useTheme();

  return(
    <button className={`cursor-pointer text-4xl ${theme==='dark' ?'text-white' : 'text-dark' }  duration-200 hover:scale-125 active:scale-100`} title="Go Back">
  <LeftCircleFilled />
</button>
  )
}

export default BackButton;