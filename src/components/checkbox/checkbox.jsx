import "./checkbox.css";

const Checkbox = ({ text ,setRememberLogin ,rememberLogin}) => {
  return (
    <div className='checkbox-wrapper-46'>
      <input
        className='inp-cbx'
        id='cbx-46'
        type='checkbox'
        checked={rememberLogin}
        onChange={(e) => setRememberLogin(e.target.checked)}
      />
      <label className='cbx' htmlFor='cbx-46'>
        <span>
          <svg width='12px' height='10px' viewBox='0 0 12 10'>
            <polyline points='1.5 6 4.5 9 10.5 1'></polyline>
          </svg>
        </span>
        <span className="text-text-color">{text}</span>
      </label>
    </div>
  );
};
export default Checkbox;
