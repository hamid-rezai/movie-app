import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import {  useState } from "react";
import Checkbox from "../../../components/checkbox/checkbox";
import { UserAuthContext } from "../../../contexts/authContext";
import ButtonSpinner from "../../../components/button-spinner";

const SignUp = () => {
  const [rememberLogin, setRememberLogin] = useState(true);

  const { user, signUp } = UserAuthContext();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm();

  

  const onSubmit = async (data) => {
    try {
      const{email,password} = data;
      await signUp(email, password);
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <h2 className='my-1 font-bold text-2xl text-main-color'>
        {" "}
        Online Movie Platform
      </h2>
      <p className=' text-xl mb-4 text-main-color'>
        Sign up to use the features of FlickZone platform
      </p>
      <p className='text-main-color mb-5'>
        Already subscribed to FlickZone ?{" "}
        <Link to='/login' className='text-primary hover:text-primary-hover outline-none border-none'>
          {" "}
          Log in{" "}
        </Link>{" "}
      </p>
      <div className='bg-form-color p-10 rounded-lg w-full max-w-md '>
        <div className='relative flex flex-col min-w-0 '>
          <form onSubmit={handleSubmit(onSubmit)} noValidate>
            <div className='w-100 flex flex-col'>
              <div className='mb-6 '>
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

              <div className='mb-6'>
                <input
                  {...register("password", {
                    required: "Password is required",
                    minLength: 6,
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
                {errors.password && errors.password.type === "minLength" && (
                  <p className='text-error font-bold mt-1'>
                    Password must have at least 6 characters
                  </p>
                )}
              </div>

              <div className='mb-6'>
                <input
                  {...register("confirmPassword", {
                    required: "Repeat password is required",
                    validate: (value) => {
                      if (watch("password") !== value) {
                        return "Passwords do not match";
                      }
                    },
                    message: "Please confirm your password",
                  })}
                  type='password'
                  placeholder='Confirm Password'
                  className={`w-full p-3 mb-1 rounded-lg bg-input-color  placeholder:text-placeholder-color focus:border-blue-500 focus:ring-2 focus:ring-blue-500 outline-none  text-input-text-color transition duration-300 ease-in-out mt-2 ${
                    errors.confirmPassword &&
                    " border-2 border-red-500 "
                  }`}
                />
                {errors.confirmPassword &&
                  errors.confirmPassword.type === "required" && (
                    <p className='text-error font-bold mt-1'>
                      {errors.confirmPassword.message}
                    </p>
                  )}
                {errors.confirmPassword &&
                  errors.confirmPassword.type === "validate" && (
                    <p className='text-error font-bold mt-1'>
                      Repeat password does not match
                    </p>
                  )}
              </div>

              <button
                type='submit'
                disabled={isSubmitting}
                className='w-full sm:w-auto px-6 py-3 inline-flex bg-primary text-gray-200 font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500  items-center text-center justify-center focus:ring-offset-2 transition duration-300 ease-in-out mt-2'>
                {isSubmitting? <ButtonSpinner text="Is Submitting"/> : "Sign up" }
              </button>

              <p className='mt-6'>
                <Checkbox
                  setRememberLogin={setRememberLogin}
                  rememberLogin={rememberLogin}
                  text='Remember me'
                />
              </p>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};
export default SignUp;
