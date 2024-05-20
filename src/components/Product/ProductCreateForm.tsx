import { Controller, useForm } from 'react-hook-form';
import divisions from '../../js/divisions.json';
import districtsData from '../../js/districts.json';
import upazilasData from '../../js/upazilas.json';
import ReactSelect from 'react-select';
import makeAnimated from 'react-select/animated';
import { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import axiosInstance from '../../axios';
import toast from 'react-hot-toast';
import { useSelector } from 'react-redux';
import CloudinaryUploadWidget from '../CloudinaryUploadWidget';
import { Cloudinary } from '@cloudinary/url-gen';
import { AdvancedImage, responsive, placeholder } from '@cloudinary/react';
import { Link } from 'react-router-dom';
import { IoMdArrowBack } from 'react-icons/io';

const ProductCreateForm = () => {
  const [publicIds, setPublicIds] = useState([]);

  // Replace with your own cloud name and upload preset
  const cloudName = 'dneodtbad';
  const uploadPreset = 'postcar';

  const uwConfig = {
    cloudName,
    uploadPreset,
    // You can add more configuration options here
  };

  const handlePublicIdUpdate = (newPublicId) => {
    setPublicIds((prevIds) => [...prevIds, newPublicId]);
  };

  const cld = new Cloudinary({
    cloud: { cloudName },
  });

  const { user } = useSelector((state) => state.user);
  const [carDetails, setCarDetails] = useState('');
  const animatedComponents = makeAnimated();
  const condition = [
    { value: 'used', label: 'Used' },
    { value: 'recondition', label: 'Recondition' },
  ];
  const transmition = [
    { value: 'automatic', label: 'Automatic' },
    { value: 'manual', label: 'Manual' },
  ];
  const fuelType = [
    { value: 'gas', label: 'Gas' },
    { value: 'octen', label: 'Octen' },
    { value: 'petrol', label: 'Petrol' },
    { value: 'dissel', label: 'Dissel' },
    { value: 'lpg', label: 'LPG' },
  ];
  const {
    handleSubmit,
    control,
    register,
    reset,
    formState: { errors },
  } = useForm(); // Initialize the form
  const onSubmit = async (data) => {
    try {
      const division = data.division.value;
      const district = data.district.value;
      const upazila = data.upazila.value;
      const brand = data.brand.value;
      const condition = data.condition.value;
      const transmition = data.transmition.value;
      // const userid = user?._id;
      const gallery = publicIds;

      const formData = {
        ...data,
        division,
        district,
        upazila,
        brand,
        condition,
        transmition,
        // userid,
        gallery,
      };

      const response = await axiosInstance.post('/cars', formData);

      if (response.data.success) {
        toast.success('Car Posted successfully');
        reset();
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };
  const [selectedDivision, setSelectedDivision] = useState(null);
  const [districts, setDistricts] = useState([]);
  const [upazilas, setUpazilas] = useState([]);
  const handleDivisionChange = (selectedOption) => {
    setSelectedDivision(selectedOption);
    const filteredDistricts = districtsData.filter(
      (district) => district.division_id === selectedOption.id,
    );
    setDistricts(filteredDistricts);
    // Reset selected district and upazila when division changes
    setUpazilas([]);
  };

  const handleDistrictChange = (selectedOption) => {
    // Filter upazilas based on selected district
    const filteredUpazilas = upazilasData.filter(
      (upazila) => upazila.district_id === selectedOption.id,
    );
    setUpazilas(filteredUpazilas);
  };
  const car_brands = [
    { value: 'Toyota', label: 'Toyota' },
    { value: 'Honda', label: 'Honda' },
    { value: 'Nissan', label: 'Nissan' },
    { value: 'Suzuki', label: 'Suzuki' },
    { value: 'Mitsubishi', label: 'Mitsubishi' },
    { value: 'Hyundai', label: 'Hyundai' },
    { value: 'Kia', label: 'Kia' },
    { value: 'Ford', label: 'Ford' },
    { value: 'Chevrolet', label: 'Chevrolet' },
    { value: 'Volkswagen', label: 'Volkswagen' },
    { value: 'Mercedes-Benz', label: 'Mercedes-Benz' },
    { value: 'BMW', label: 'BMW' },
    { value: 'Audi', label: 'Audi' },
    { value: 'Mazda', label: 'Mazda' },
    { value: 'Lexus', label: 'Lexus' },
    { value: 'Isuzu', label: 'Isuzu' },
    { value: 'Proton', label: 'Proton' },
    { value: 'Tata', label: 'Tata' },
    { value: 'Mahindra', label: 'Mahindra' },
    { value: 'Renault', label: 'Renault' },
  ];
  return (
    <>
      <div className="rounded-sm my-5 px-5 py-3 border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
        <Link
          to="/dashboard/product"
          className="inline-flex items-center justify-center gap-2.5 bg-secondary py-2 px-5 text-center font-medium text-white hover:bg-opacity-90 lg:px-8 xl:px-10"
        >
          <IoMdArrowBack />
          Back To List
        </Link>
      </div>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid grid-cols-1 gap-9 sm:grid-cols-2">
          <div className="flex flex-col gap-9">
            {/* <!-- Input Fields --> */}
            <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
              <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
                <h3 className="font-medium text-black dark:text-white">
                  Car Details
                </h3>
              </div>
              <div className="flex flex-col gap-5.5 p-6.5">
                <div>
                  <label className="mb-3 block text-black dark:text-white">
                    Car Name
                  </label>
                  <input
                    {...register('title', { required: true })}
                    type="text"
                    placeholder="Title"
                    className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                  />
                </div>

                <div>
                  <label className="mb-3 block text-black dark:text-white">
                    Car Brand
                  </label>
                  <Controller
                    name="brand"
                    control={control}
                    defaultValue=""
                    render={({ field }) => (
                      <ReactSelect
                        {...field}
                        options={car_brands}
                        styles={{
                          control: (baseStyles, state) => ({
                            ...baseStyles,
                            borderColor: state.isFocused ? 'black' : 'grey',
                          }),
                        }}
                        theme={(theme) => ({
                          ...theme,
                          borderRadius: 5,
                          colors: {
                            ...theme.colors,
                            primary: 'black',
                          },
                          fontSize: '14px',
                        })}
                        placeholder="Car Brand"
                      />
                    )}
                  />
                  {errors.brand && <span>This field is required</span>}
                </div>

                <div>
                  <label className="mb-3 block text-black dark:text-white">
                    Color
                  </label>
                  <input
                    type="text"
                    {...register('color', { required: true })}
                    placeholder="Color "
                    className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                  />
                  {errors.color && <span>This field is required</span>}
                </div>

                <div>
                  <label className="mb-3 block text-black dark:text-white">
                    Model
                  </label>
                  <input
                    {...register('model', { required: true })}
                    placeholder="Model"
                    className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                  />
                  {errors.model && <span>This field is required</span>}
                </div>
                <div>
                  <label className="mb-3 block text-black dark:text-white">
                    Registration Year
                  </label>
                  <input
                    {...register('registration_year', { required: true })}
                    placeholder="Registration Year"
                    className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                  />
                  {errors.registration_year && (
                    <span>This field is required</span>
                  )}
                </div>
                <div>
                  <label className="mb-3 block text-black dark:text-white">
                    Production Year
                  </label>
                  <input
                    {...register('production_year', { required: true })}
                    placeholder="Production Year"
                    className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                  />
                  {errors.production_year && (
                    <span>This field is required</span>
                  )}
                </div>
                <div>
                  <label className="mb-3 block text-black dark:text-white">
                    Price
                  </label>
                  <input
                    {...register('price')}
                    className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                  />
                  {errors.price && <span>This field is required</span>}
                </div>
                <div>
                  <label className="mb-3 block text-black dark:text-white">
                    Phone
                  </label>
                  <input
                    {...register('phone')}
                    className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                  />
                  {errors.phone && <span>This field is required</span>}
                </div>
                <div>
                  <label className="mb-3 block text-black dark:text-white">
                    Engine Capacity
                  </label>
                  <input
                    type="text"
                    {...register('engine_capacity')}
                    className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                  />
                  {errors.engine_capacity && (
                    <span>This field is required</span>
                  )}
                </div>
                <div>
                  <label className="mb-3 block text-black dark:text-white">
                    Kilometer
                  </label>
                  <input
                    {...register('kilometer')}
                    type="text"
                    className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                  />
                  {errors.kilometer && <span>This field is required</span>}
                </div>
                <div>
                  <label className="mb-3 block text-black dark:text-white">
                    Details
                  </label>

                  <Controller
                    name="details"
                    control={control}
                    defaultValue=""
                    render={({ field }) => (
                      <ReactQuill
                        theme="snow"
                        value={field.value}
                        onChange={field.onChange}
                      />
                    )}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-9">
            {/* <!-- Input Fields --> */}
            <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
              <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
                <h3 className="font-medium text-black dark:text-white">
                  Other Details
                </h3>
              </div>
              <div className="flex flex-col gap-5.5 p-6.5">
                <div>
                  <label className="mb-3 block text-black dark:text-white">
                    Condition
                  </label>
                  <Controller
                    name="condition"
                    control={control}
                    defaultValue=""
                    render={({ field }) => (
                      <ReactSelect
                        {...field}
                        options={condition}
                        styles={{
                          control: (baseStyles, state) => ({
                            ...baseStyles,
                            borderColor: state.isFocused ? 'black' : 'grey',
                          }),
                        }}
                        theme={(theme) => ({
                          ...theme,
                          borderRadius: 5,
                          colors: {
                            ...theme.colors,
                            primary: 'black',
                          },
                          fontSize: '14px',
                        })}
                        placeholder="Car Condition"
                      />
                    )}
                  />
                </div>

                <div>
                  <label className="mb-3 block text-black dark:text-white">
                    Transmition
                  </label>
                  <Controller
                    name="transmition"
                    control={control}
                    defaultValue=""
                    render={({ field }) => (
                      <ReactSelect
                        {...field}
                        options={transmition}
                        styles={{
                          control: (baseStyles, state) => ({
                            ...baseStyles,
                            borderColor: state.isFocused ? 'black' : 'grey',
                          }),
                        }}
                        theme={(theme) => ({
                          ...theme,
                          borderRadius: 5,
                          colors: {
                            ...theme.colors,
                            primary: 'black',
                          },
                          fontSize: '14px',
                        })}
                        placeholder="Transmition Type"
                      />
                    )}
                  />
                </div>
                <div>
                  <label className="mb-3 block text-black dark:text-white">
                    Fuel Type
                  </label>
                  <Controller
                    name="fuelType"
                    control={control}
                    defaultValue=""
                    render={({ field }) => (
                      <ReactSelect
                        {...field}
                        isMulti
                        options={fuelType}
                        styles={{
                          control: (baseStyles, state) => ({
                            ...baseStyles,
                            borderColor: state.isFocused ? 'black' : 'grey',
                          }),
                        }}
                        theme={(theme) => ({
                          ...theme,
                          borderRadius: 5,
                          colors: {
                            ...theme.colors,
                            primary: 'black',
                          },
                        })}
                        components={animatedComponents}
                        placeholder="Fuel Type"
                      />
                    )}
                  />
                </div>

                <div>
                  <label className="mb-3 block text-black dark:text-white">
                    Division
                  </label>
                  <Controller
                    name="division"
                    control={control}
                    defaultValue=""
                    render={({ field }) => (
                      <ReactSelect
                        {...field}
                        options={divisions}
                        styles={{
                          control: (baseStyles, state) => ({
                            ...baseStyles,
                            borderColor: state.isFocused ? 'black' : 'grey',
                          }),
                        }}
                        theme={(theme) => ({
                          ...theme,
                          borderRadius: 5,
                          colors: {
                            ...theme.colors,
                            primary: 'black',
                          },
                        })}
                        placeholder="Division"
                        onChange={(selectedOption) => {
                          field.onChange(selectedOption);
                          handleDivisionChange(selectedOption);
                        }}
                        value={field.value}
                      />
                    )}
                  />
                </div>

                <div>
                  <label className="mb-3 block text-black dark:text-white">
                    District
                  </label>
                  <Controller
                    name="district"
                    control={control}
                    defaultValue=""
                    render={({ field }) => (
                      <ReactSelect
                        {...field}
                        options={districts}
                        styles={{
                          control: (baseStyles, state) => ({
                            ...baseStyles,
                            borderColor: state.isFocused ? 'black' : 'grey',
                          }),
                        }}
                        theme={(theme) => ({
                          ...theme,
                          borderRadius: 5,
                          colors: {
                            ...theme.colors,
                            primary: 'black',
                          },
                        })}
                        placeholder="District"
                        onChange={(selectedOption) => {
                          field.onChange(selectedOption);
                          handleDistrictChange(selectedOption);
                        }}
                        value={field.value}
                      />
                    )}
                  />
                </div>

                <div>
                  <label className="mb-3 block text-black dark:text-white">
                    Upazila
                  </label>
                  <Controller
                    name="upazila"
                    control={control}
                    defaultValue=""
                    render={({ field }) => (
                      <ReactSelect
                        {...field}
                        options={upazilas}
                        placeholder="Upazila"
                        styles={{
                          control: (baseStyles, state) => ({
                            ...baseStyles,
                            borderColor: state.isFocused ? 'black' : 'grey',
                          }),
                        }}
                        theme={(theme) => ({
                          ...theme,
                          borderRadius: 5,
                          colors: {
                            ...theme.colors,
                            primary: 'black',
                          },
                        })}
                        onChange={(selectedOption) => {
                          field.onChange(selectedOption);
                        }}
                        value={field.value}
                      />
                    )}
                  />
                </div>

                <div>
                  <CloudinaryUploadWidget
                    uwConfig={uwConfig}
                    setPublicId={handlePublicIdUpdate}
                  />
                  <div className="image-grid">
                    {publicIds.map((publicId, index) => (
                      <div key={index} className="image-item">
                        <AdvancedImage
                          style={{
                            maxWidth: '20%',
                            float: 'left',
                            margin: '0 5px',
                          }}
                          cldImg={cld.image(publicId)}
                          plugins={[responsive(), placeholder()]}
                        />
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <input
                    type="submit"
                    placeholder="Create Driver"
                    className="rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </form>
    </>
  );
};

export default ProductCreateForm;
