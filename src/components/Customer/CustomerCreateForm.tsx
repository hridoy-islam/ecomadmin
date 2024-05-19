import { SubmitHandler, useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import axiosInsance from '../../axios';
import { useNavigate } from 'react-router-dom';

type Inputs = {
  name: string;
  email: string;
  phone: string;
  password: string;
};
const CustomerCreateForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  const navigate = useNavigate();

  const postData = async (formData) => {
    await axiosInsance
      .post('/auth/signup', formData)
      .then(function (response) {
        toast.success('customer added successfully');
        navigate('/dashboard/customer');
      })
      .catch(function (error) {
        toast.error(error.response.data.message);
      });
  };

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    postData(data);
  };

  return (
    <div className="grid grid-cols-1 gap-9 sm:grid-cols-2">
      <div className="flex flex-col gap-9">
        {/* <!-- Input Fields --> */}
        <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
          <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
            <h3 className="font-medium text-black dark:text-white">
              Insert Customer Details
            </h3>
          </div>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="flex flex-col gap-5.5 p-6.5">
              <div>
                <label className="mb-3 block text-black dark:text-white">
                  Name
                </label>
                <input
                  type="text"
                  {...register('name', { required: true })}
                  placeholder="Name"
                  className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                />
                {errors.name && <span>Name is required</span>}
              </div>
              <div>
                <label className="mb-3 block text-black dark:text-white">
                  Email
                </label>
                <input
                  type="email"
                  {...register('email', { required: true })}
                  placeholder="Email"
                  className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                />
                {errors.email && <span>Email is required</span>}
              </div>
              <div>
                <label className="mb-3 block text-black dark:text-white">
                  Phone
                </label>
                <input
                  type="text"
                  {...register('phone', {
                    required: true,
                    maxLength: 11,
                    minLength: 11,
                  })}
                  placeholder="Phone"
                  className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                />
                {errors.phone && (
                  <span>Please insert correct phone number</span>
                )}
              </div>
              <div>
                <label className="mb-3 block text-black dark:text-white">
                  Password
                </label>
                <input
                  type="text"
                  placeholder="Password"
                  {...register('password', { required: true, minLength: 4 })}
                  className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                />
                {errors.password && <span>Password minimum 4 characters</span>}
              </div>
              <div>
                <input
                  type="submit"
                  className="rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black cursor-pointer"
                />
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CustomerCreateForm;
