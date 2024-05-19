import { useForm, Controller } from 'react-hook-form';
import ReactSelect from 'react-select';
import axiosInstance from '../../axios';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
const BookingCreateForm = () => {
  const [users, setUsers] = useState([]);
  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm();
  const onSubmit = async (data) => {
    try {
      const userid = data.userid.value;
      const modifiedFormData = { ...data, userid };
      const response = await axiosInstance.post('/booking', modifiedFormData);

      if (response.data.success) {
        toast.success('Booking Added Successfully');
        reset();
      }
    } catch (error) {
      console.error('Error creating booking:', error);
      // Handle error, show error message, etc.
    }
  };

  const fetchData = async () => {
    const res = await axiosInstance.get('/users');
    setUsers(res.data.data.result);
  };
  useEffect(() => {
    fetchData();
  }, []);
  return (
    <div className="grid grid-cols-1 ">
      <div className="flex flex-col gap-9">
        {/* <!-- Input Fields --> */}
        <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="flex flex-col gap-5.5 p-6.5">
              <div>
                <label className="mb-3 block text-black dark:text-white">
                  Title
                </label>
                <input
                  {...register('bookingDate', { required: true })}
                  type="date"
                  placeholder="Date"
                  className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                />
                {errors.bookingDate && <span>This field is required</span>}
              </div>

              <div>
                <label className="mb-3 block text-black dark:text-white">
                  Address
                </label>
                <input
                  {...register('address', { required: true })}
                  type="text"
                  placeholder="Address"
                  className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                />
                {errors.address && <span>This field is required</span>}
              </div>

              <div>
                <label className="mb-3 block text-black dark:text-white">
                  Name
                </label>
                <input
                  {...register('name', { required: true })}
                  type="text"
                  placeholder="Name"
                  className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                />
                {errors.name && <span>This field is required</span>}
              </div>
              <div>
                <label className="mb-3 block text-black dark:text-white">
                  Phone
                </label>
                <input
                  {...register('phone', {
                    required: true,
                    maxLength: 11,
                    minLength: 11,
                  })}
                  type="text"
                  placeholder="Phone"
                  className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                />
                {errors.phone && <span>This field is required</span>}
              </div>
              <div>
                <label className="mb-3 block text-black dark:text-white">
                  Car
                </label>
                <input
                  {...register('car', { required: true })}
                  type="text"
                  placeholder="Car"
                  className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                />
                {errors.car && <span>This field is required</span>}
              </div>

              <div>
                <Controller
                  name="userid"
                  control={control}
                  render={({ field }) => (
                    <ReactSelect
                      {...field}
                      options={users.map((user) => ({
                        value: user._id,
                        label: user.name,
                      }))}
                      classNamePrefix="react-select"
                      isClearable
                      placeholder="Select User"
                    />
                  )}
                />
              </div>

              <div>
                <label className="mb-3 block text-black dark:text-white">
                  Mesage
                </label>
                <textarea
                  {...register('message', { required: true })}
                  rows={6}
                  placeholder="Message"
                  className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                ></textarea>
                {errors.message && <span>This field is required</span>}
              </div>

              <button className="btn bg-primary text-white py-2 rounded-md">
                Create Booking
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default BookingCreateForm;
