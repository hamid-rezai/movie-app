import { useTheme } from "../../../contexts/themeContext";

const Logout = ({onCloseLogout , onConfirmLogout})=>{
  const {theme}=useTheme();
return (
  <div
  className={`w-[500px] flex flex-col p-4 relative items-center justify-center ${theme==='dark' ? 'bg-slate-800 border-gray-800' : 'bg-slate-200'} shadow-lg rounded-2xl`}
>
  <div className="">
    <div className="text-center p-3 flex-auto justify-center">
    <svg
  xmlns="http://www.w3.org/2000/svg"
  fill="none"
  viewBox="0 0 24 24"
  strokeWidth="1.5"
  stroke="currentColor"
  className='w-12 h-12 flex items-center text-main-color mx-auto'
>
  <path
    strokeLinecap="round"
    strokeLinejoin="round"
    d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-9A2.25 2.25 0 002.25 5.25v13.5A2.25 2.25 0 004.5 21h9a2.25 2.25 0 002.25-2.25V15M12 9l3 3m0 0l-3 3m3-3H8.25"
  />
</svg>
      <h2 className={`text-xl font-bold py-4 ${theme==='dark'? 'text-gray-200' : 'text-main-color'}`}>Are you sure?</h2>
      <p className={`text-sm ${theme==='dark'?'text-light-gray': 'text-gray-500'} px-2`}>
        Do you really want to log out of your account? This process cannot be undone
      </p>
    </div>
    <div className="p-2 mt-2 text-center space-x-1 md:block">
      <button
      onClick={onCloseLogout}
        className={`mb-2 md:mb-0 bg-gray-700 px-5 py-2 text-sm shadow-sm font-medium tracking-wider border-2 border-gray-600 hover:border-gray-700 text-gray-300 rounded-full hover:shadow-lg hover:bg-gray-800 transition ease-in duration-300`}
      >
        Cancel
      </button>
      <button
        onClick={onConfirmLogout}
        className="bg-primary hover:bg-primary-hover px-5 ml-4 py-2 text-sm shadow-sm hover:shadow-lg font-medium tracking-wider border-2 border-primary  text-white rounded-full transition ease-in duration-300"
      >
        Confirm
      </button>
    </div>
  </div>
</div>
)
}

export default Logout;