import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Logo from '../../images/logo/logo.png';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '../../store/user/UserSlice.js';

type Inputs = {
  phone: string;
  password: string;
};

const SignIn: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error, user } = useSelector((state) => state.user);

  useEffect(() => {
    if (user !== null && user !== undefined) {
      navigate('/dashboard');
    }
  }, [user]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();
  const onSubmit: SubmitHandler<Inputs> = (data) =>
    dispatch(loginUser(data)).then((result) => {
      
      if (result.payload.token !== undefined && result.payload !== null) {
        navigate('/dashboard');
      }
    });

  return (
    <div className="rounded-sm border h-screen xl:pt-20 border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
      
        

        <div className="w-5/12 mx-auto border border-stroke shadow-lg">
          <div className="w-full p-4 sm:p-12.5 xl:p-17.5">
            <h2 className="mb-9 text-2xl text-center font-bold text-black dark:text-white sm:text-title-xl2">
              Admin Login
            </h2>

            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="mb-4">
                <label className="mb-2.5 block font-medium text-black dark:text-white">
                  Email
                </label>
                <div className="relative">
                  <input
                    type="text"
                    {...register('email', { required: true })}
                    placeholder="Enter your Email"
                    className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                  />
                  {errors.email && <span>Please Check Email</span>}
                </div>
              </div>

              <div className="mb-6">
                <label className="mb-2.5 block font-medium text-black dark:text-white">
                  Password
                </label>
                <div className="relative">
                  <input
                    type="password"
                    {...register('password', { required: true })}
                    placeholder="6+ Characters, 1 Capital letter"
                    className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                  />
                  {errors.password && <span>Password is required</span>}
                </div>
              </div>

              <div className="mb-5">
                <input
                  type="submit"
                  value={loading ? 'Loading...' : 'Sign In'}
                  className="w-full cursor-pointer rounded-lg border border-secondary bg-secondary p-4 text-white transition hover:bg-opacity-90"
                />
              </div>
            </form>
            {error && <p>{error}</p>}
          </div>
        </div>
      
    </div>
  );
};

export default SignIn;
