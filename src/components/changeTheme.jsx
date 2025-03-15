import { Tooltip } from "antd";
import { useTheme } from "../contexts/themeContext";
import { useState } from "react";
import { MoonFilled, SunFilled } from "@ant-design/icons";

const ChangeTheme = () => {
  const { theme, setTheme } = useTheme();
  const [isThemeVisible, setIsThemeVisible] = useState(false);

 const tooltipChangeColor = (theme)=>{
  if(theme === 'dark'){
    return 'rgba(0,0,0,0.9)';
  }else{
    return 'rgba(224,224,224,1)';
  }
 } 

  return (
    <>
      <Tooltip
      arrow={false}
      color={tooltipChangeColor(theme)}
      overlayInnerStyle={{border:`${theme==='dark' ? '1px solid rgba(224,224,224,1)' : '1px solid rgba(0,0,0,1)'}` , borderRadius:'10px'}}
        title={
          <div className='flex flex-col items-center  w-full px-4 py-4  border-1 rounded-lg overflow-hidden'>
            <p
              className='w-full  flex items-center text-main-color hover:text-main-color-hover cursor-pointer text-base mb-4'
              onClick={() => {
                setTheme("dark");
                setIsThemeVisible(false);
              }}>
              <MoonFilled className='w-7 h-7 text-xl' />
              Dark
            </p>
            <p
              className='w-full flex items-center text-main-color hover:text-main-color-hover cursor-pointer text-base mb-4'
              onClick={() => {
                setTheme("light");
                setIsThemeVisible(false);
              }}>
              <SunFilled className='w-7 h-7 text-xl' />
              Light
            </p>
          </div>
        }
        placement='bottom'
        trigger='click'
        open={isThemeVisible}
        onOpenChange={(visible) => setIsThemeVisible(visible)}>
        <p
          className='flex items-center justify-center text-main-color hover:text-main-color-hover text-2xl transform active:scale-110 transition-transform duration-200 cursor-pointer'
          onClick={() => setIsThemeVisible(!isThemeVisible)}>
          {theme === "dark" ? (
            <MoonFilled className='text-2xl sm:text-3xl text-main-color hover:text-main-color-hover' />
          ) : (
            <SunFilled className='text-2xl sm:text-3xl text-main-color hover:text-main-color-hover' />
          )}
        </p>
      </Tooltip>
    </>
  );
};
export default ChangeTheme;
