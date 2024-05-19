import { useState } from 'react';
import { SubmitHandler, useForm, Controller } from 'react-hook-form';
import divisions from '../../js/divisions.json';
import districtsData from '../../js/districts.json';
import upazilasData from '../../js/upazilas.json';
import ReactSelect from 'react-select';
import axiosInstance from '../../axios';
import toast from 'react-hot-toast';

type Inputs = {
  name: string;
  phone: string;
  division: string;
  district: string;
  upazila: string;
  car: string;
  licenseFront: FileList;
  licenseBack: FileList;
  bluebookFront: FileList;
  bluebookBack: FileList;
};

const DriverCreateForm = () => {
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

  const {
    control,
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    try {
      // Create FormData object to send files
      const formData = new FormData();
      const division = data.division.value;
      const district = data.district.value;
      const upazila = data.upazila.value;
      formData.append('name', data.name);
      formData.append('phone', data.phone);
      formData.append('division', division);
      formData.append('district', district);
      formData.append('upazila', upazila);
      formData.append('car', data.car);
      formData.append('licenseFront', data.licenseFront[0]);
      formData.append('licenseBack', data.licenseBack[0]);
      formData.append('bluebookFront', data.bluebookFront[0]);
      formData.append('bluebookBack', data.bluebookBack[0]);

      console.log('data', data);
      console.log('formdata', formData);
      // Make API request using Axios
      const response = await axiosInstance.post('/drivers', formData);

      if (response.data.success) {
        toast.success('Driver Added successfullt');
        reset();
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="grid grid-cols-1 gap-9 sm:grid-cols-2">
        <div className="flex flex-col gap-9">
          {/* <!-- Input Fields --> */}
          <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
            <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
              <h3 className="font-medium text-black dark:text-white">
                Personal Information
              </h3>
            </div>
            <div className="flex flex-col gap-5.5 p-6.5">
              <div>
                <label className="mb-3 block text-black dark:text-white">
                  Drivers Name
                </label>
                <input
                  type="text"
                  {...register('name', { required: true })}
                  placeholder="name"
                  className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                />
                {errors.name && <span>Name is required</span>}
              </div>

              <div>
                <label className="mb-3 block text-black dark:text-white">
                  Drivers Phone
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
                  Car Name
                </label>
                <input
                  type="text"
                  {...register('car', { required: true })}
                  placeholder="Toyota Premio 2020"
                  className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                />
                {errors.car && <span>Car is required</span>}
              </div>

              <div>
                <label className="mb-3 block text-black dark:text-white">
                  Driving License Front Side
                </label>
                <input
                  type="file"
                  {...register('licenseFront', { required: true })}
                  accept="image/*"
                  className="w-full border-[1.5px] border-stroke bg-transparent  text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                />
                {errors.licenseFront && (
                  <span>Please upload the driving license front side</span>
                )}
              </div>
              <div>
                <label className="mb-3 block text-black dark:text-white">
                  Driving License Back Side
                </label>
                <input
                  type="file"
                  {...register('licenseBack', { required: true })}
                  accept="image/*"
                  className="w-full border-[1.5px] border-stroke bg-transparent text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                />
                {errors.licenseBack && (
                  <span>Please upload the driving license back side</span>
                )}
              </div>

              <div>
                <label className="mb-3 block text-black dark:text-white">
                  Car Bluebook / RC Front Side
                </label>
                <input
                  type="file"
                  {...register('bluebookFront', { required: true })}
                  accept="image/*"
                  className="w-full border-[1.5px] border-stroke bg-transparent text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                />
                {errors.bluebookFront && (
                  <span>Please upload the Car Bluebook / RC Front Side</span>
                )}
              </div>
              <div>
                <label className="mb-3 block text-black dark:text-white">
                  Car Bluebook / RC Back Side
                </label>
                <input
                  type="file"
                  {...register('bluebookBack', { required: true })}
                  accept="image/*"
                  className="w-full border-[1.5px] border-stroke bg-transparent text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                />
                {errors.bluebookBack && (
                  <span>Please upload the Car Bluebook / RC Back Side</span>
                )}
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
  );
};

export default DriverCreateForm;
