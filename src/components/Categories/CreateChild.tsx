import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { IoMdArrowBack } from 'react-icons/io';
import { Link } from 'react-router-dom';
import axiosInstance from '../../axios';

export const CreateChild = () => {
  const {
    handleSubmit,
    register,
    reset,
    formState: { errors },
  } = useForm(); // Initialize the form
  const onSubmit = async (data) => {
    try {
      const response = await axiosInstance.post('/chart', data);
      if (response.data.success) {
        toast.success('Chart Created successfully');
        reset();
      }
    } catch (error) {
      toast.error(error?.response?.data.message.name);
    }
  };

  return (
    <>
      <div className="rounded-sm my-5 px-5 py-3 border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
        <Link
          to="/dashboard/categories/child"
          className="inline-flex items-center justify-center gap-2.5 bg-secondary py-2 px-5 text-center font-medium text-white hover:bg-opacity-90 lg:px-8 xl:px-10"
        >
          <IoMdArrowBack />
          Back To List
        </Link>
      </div>

      <div className="sectionbg">
        <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
          <h3 className="font-medium text-black dark:text-white">
            Create Sub Category
          </h3>
        </div>
        <div>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="grid grid-cols-5 gap-4 px-4.5 py-3"
          >
            <input
              {...register('name', { required: true })}
              type="text"
              className="inputclass"
              placeholder="name"
            />
            <select>Parent Category</select>
            <button type="submit" className="buttonclass">
              Create
            </button>
          </form>
        </div>
      </div>
    </>
  );
};
