import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { UserAuthContext } from "../../../contexts/authContext";
import ButtonSpinner from "../../../components/button-spinner";

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();

  const { user, logIn } = UserAuthContext();
  const navigate = useNavigate();
  

  const onSubmit = async (data) => {
    try {
      const { email, password } = data;
      await logIn(email, password);
      navigate("/");
    } catch (error) {
      console.error("Error during login:", error.message);
      alert("Invalid email or password. Please try again.");
    }
  };

  return (
    <>
      <h2 className='my-1 font-bold text-2xl text-main-color' >
        {" "}
        Online Movie Platform
      </h2>
      <p className=' text-xl mb-4 text-main-color'>
        To log in, you need to use your email and password
      </p>
      <p className='text-main-color mb-5'>
        New to FlickZone ?{" "}
        <Link to='/signup' className='text-primary hover:text-primary-hover outline-none border-none'>
          {" "}
          Sign up{" "}
        </Link>{" "}
      </p>
      <div className='bg-form-color p-10 rounded-lg w-full shadow-lg max-w-md '>
        <div className='relative flex flex-col min-w-0 '>
          <form onSubmit={handleSubmit(onSubmit)} noValidate>
            <div className='w-100 flex flex-col'>
              <div className='mb-6'>
                <input
                  {...register("email", {
                    required: "Email is required",
                    pattern: {
                      value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                      message: "Please enter a valid email address",
                    },
                  })}
                  type='email'
                  placeholder='Email'
                  className={`w-full p-3 mb-1 rounded-lg bg-input-color  placeholder:text-placeholder-color focus:border-blue-500 focus:ring-2 focus:ring-blue-500 outline-none  text-input-text-color transition duration-300 ease-in-out mt-2 ${
                    errors.email &&
                    " border-2 border-red-500 "
                  }`}
                />
                {errors.email && errors.email.type === "required" && (
                  <p className='text-error font-bold mt-0.5'>
                    {errors.email.message}
                  </p>
                )}
                {errors.email && errors.email.type === "pattern" && (
                  <p className='text-error font-bold mt-0.5'>
                    {errors.email.message}
                  </p>
                )}
              </div>
              <div className='mb-6 '>
                <input
                  {...register("password", {
                    required: "Password is required",
                  })}
                  type='password'
                  placeholder='Password'
                  className={`w-full p-3 mb-1 rounded-lg bg-input-color  placeholder:text-placeholder-color focus:border-blue-500 focus:ring-2 focus:ring-blue-500 outline-none  text-input-text-color transition duration-300 ease-in-out mt-2 ${
                    errors.password &&
                    " border-2 border-red-500 "
                  }`}
                />
                {errors.password && errors.password.type === "required" && (
                  <p className='text-error font-bold mt-1'>
                    {errors.password.message}
                  </p>
                )}
              </div>

              <button
                type='submit'
                disabled={isSubmitting}
                className='w-full sm:w-auto px-6 py-3 inline-flex items-center justify-center bg-primary text-gray-200 font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition duration-300 ease-in-out mt-2'>
                {isSubmitting ? <ButtonSpinner text="Is Logging in" /> : 'Log in'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};
export default Login;
