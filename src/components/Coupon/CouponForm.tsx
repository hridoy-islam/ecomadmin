import { Controller, useForm } from 'react-hook-form';
import makeAnimated from 'react-select/animated';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import axiosInstance from '../../axios';
import toast from 'react-hot-toast';
import { Link } from 'react-router-dom';
import { IoMdArrowBack } from 'react-icons/io';

const CouponForm = () => {
  const {
    handleSubmit,
    register,
    reset,
    formState: { errors },
  } = useForm(); // Initialize the form
  const onSubmit = async (data) => {
    try {
      const response = await axiosInstance.post('/coupons', data);
      if (response.data.success) {
        toast.success('Coupon Create successfully');
        reset();
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <>
      <div className="rounded-sm my-5 px-5 py-3 border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
        <Link to="/dashboard/coupon" className="buttonclass">
          <IoMdArrowBack />
          Back To List
        </Link>
      </div>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="">
          {/* <!-- Input Fields --> */}
          <div className="">
            <div className="sectionbg">
              <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
                <h3 className="font-medium text-black dark:text-white">
                  Coupon Details
                </h3>
              </div>

              <div className="grid grid-cols-5 gap-5.5 p-6.5">
                <div>
                  <label className="mb-3 block text-black dark:text-white">
                    Coupon Code
                  </label>
                  <input
                    {...register('code', { required: true })}
                    type="text"
                    placeholder="EID100"
                    className="inputclass"
                  />
                </div>
                <div>
                  <label className="mb-3 block text-black dark:text-white">
                    Discount Type
                  </label>

                  <select
                    {...register('discount_type', { required: true })}
                    className="inputclass"
                  >
                    <option>Select Type</option>
                    <option value={'fixed'}>Fixed</option>
                    <option value={'percentage'}>Percentage</option>
                  </select>
                </div>
                <div>
                  <label className="mb-3 block text-black dark:text-white">
                    Discount Amount
                  </label>
                  <input
                    {...register('discount_amount', { required: true })}
                    type="text"
                    placeholder="94.23"
                    className="inputclass"
                  />
                </div>
                <div>
                  <label className="mb-3 block text-black dark:text-white">
                    Usage Limit
                  </label>
                  <input
                    {...register('usage_limit', { required: true })}
                    type="text"
                    placeholder="80"
                    className="inputclass"
                  />
                </div>

                <div>
                  <label className="mb-3 block text-black dark:text-white">
                    Expire Date
                  </label>
                  <input
                    {...register('expires_at', { required: true })}
                    type="date"
                    className="inputclass"
                  />
                </div>
                <div>
                  <button type="submit" className="buttonclass">
                    Create{' '}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </form>
    </>
  );
};

export default CouponForm;
