import { Controller, useForm } from 'react-hook-form';
import divisions from '../../js/divisions.json';
import districtsData from '../../js/districts.json';
import upazilasData from '../../js/upazilas.json';
import ReactSelect from 'react-select';
import makeAnimated from 'react-select/animated';
import { useEffect, useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import axiosInstance from '../../axios';
import toast from 'react-hot-toast';
import { Link } from 'react-router-dom';
import { IoMdArrowBack } from 'react-icons/io';

import SelectOption from '../SelectOption/SelectOption';
import CategoryChecklist from '../Categories/CategoryCheckbox';

const ProductCreateForm = () => {
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

  const [title, setTitle] = useState('');
  const [url, setUrl] = useState('');
  const [meta, setMeta] = useState('');
  const [urlManuallyEdited, setUrlManuallyEdited] = useState(false);
  const [urlExists, setUrlExists] = useState(false);

  const MAX_TITLE_LENGTH = 60;
  const MAX_URL_LENGTH = 75;
  const MAX_META_LENGTH = 160;

  const handleChange = (e, setter, maxLength) => {
    const inputValue = e.target.value;
    if (inputValue.length <= maxLength) {
      setter(inputValue);
    }
  };

  const generateSlug = (title) => {
    return title
      .toLowerCase()
      .replace(/\s+/g, '-') // Replace spaces with dash
      .replace(/[^\w-]+/g, ''); // Remove non-word characters except dash
  };

  const handleTitleChange = (e) => {
    const newTitle = e.target.value;
    setTitle(newTitle);
    // Generate slug only if URL input has not been manually edited
    if (!urlManuallyEdited) {
      const newSlug = generateSlug(newTitle);
      setUrl(newSlug);
    }
  };

  const handleUrlChange = (e) => {
    const newUrl = e.target.value;
    setUrl(newUrl);
    setUrlManuallyEdited(true); // Set the flag indicating URL has been manually edited
  };

  const checkUrlExistence = async (url) => {
    try {
      const response = await axiosInstance.get(
        `https://api.shahinkhan.xyz/api/products?url=${encodeURIComponent(
          url,
        )}`,
      );
      setUrlExists(response.data.exists);
    } catch (error) {
      console.error('Error checking URL existence:', error);
      // Handle error
    }
  };

  useEffect(() => {
    // Check URL existence when URL changes
    if (url) {
      checkUrlExistence(url);
    }
  }, [url]);

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
        <div className="flex gap-9">
          {/* <!-- Input Fields --> */}
          <div className="w-3/4">
            <div className="sectionbg">
              <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
                <h3 className="font-medium text-black dark:text-white">
                  Product Details
                </h3>
              </div>

              <div className="flex flex-col gap-5.5 p-6.5">
                <div>
                  <label className="mb-3 block text-black dark:text-white">
                    Product Name
                  </label>
                  <input
                    {...register('name', { required: true })}
                    type="text"
                    placeholder="Product Name"
                    className="inputclass"
                  />
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

            <div className="sectionbg my-2">
              <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
                <h3 className="font-medium text-black dark:text-white">
                  Product Varient
                </h3>
              </div>
              <div className="flex py-4 px-6.5">
                <div className="grid grid-cols-6 gap-1">
                  <Controller
                    name="Size"
                    control={control}
                    render={({ field }) => (
                      <SelectOption
                        dataType="sizes"
                        control={control}
                        name="Size"
                      />
                    )}
                  />
                  <Controller
                    name="Color"
                    control={control}
                    render={({ field }) => (
                      <SelectOption
                        dataType="colors"
                        control={control}
                        name="Color"
                      />
                    )}
                  />
                  <input type="text" className="border-b" placeholder="SKU" />{' '}
                  <input type="text" className="border-b" placeholder="Stock" />
                  <input type="text" className="border-b" placeholder="price" />
                  <input type="file" className="" />
                </div>
              </div>
            </div>
            <div className="sectionbg my-2">
              <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
                <h3 className="font-medium text-black dark:text-white">
                  SEO Details
                </h3>
              </div>
              <div className="flex flex-col gap-5.5 p-6.5">
                <div>
                  <label className="mb-3 text-black dark:text-white flex justify-between">
                    <span>SEO Title</span>
                    <span>
                      {title.length}/{MAX_TITLE_LENGTH}
                    </span>
                  </label>
                  <input
                    {...register('name', { required: true })}
                    type="text"
                    placeholder="Product Name"
                    className="inputclass"
                    value={title}
                    onChange={handleTitleChange}
                  />
                </div>

                <div>
                  <label className="mb-3 text-black dark:text-white flex justify-between">
                    <span>URL</span>
                    <span>
                      {url.length}/{MAX_URL_LENGTH}
                    </span>
                  </label>
                  <input
                    className="inputclass"
                    id=""
                    value={url}
                    onChange={handleUrlChange}
                  />
                </div>

                <div>
                  <label className="mb-3 text-black dark:text-white flex justify-between">
                    <span>SEO Meta Description</span>
                    <span>
                      {meta.length}/{MAX_META_LENGTH}
                    </span>
                  </label>
                  <textarea
                    name=""
                    className="inputclass"
                    value={meta}
                    onChange={(e) => handleChange(e, setMeta, MAX_META_LENGTH)}
                    rows={4}
                    cols={50}
                  ></textarea>
                  {urlExists && <p>URL exists</p>}
                </div>
              </div>
            </div>
          </div>
          <div className="w-1/4 ">
            <div className="sectionbg">
              <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
                <h3 className="font-medium text-black dark:text-white">
                  Publish Product
                </h3>
              </div>
            </div>
            <div className="sectionbg">
              <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
                <h3 className="font-medium text-black dark:text-white">
                  Brand
                </h3>
              </div>
              <div className="py-4 px-6.5 border-b border-stroke">
                <Controller
                  name="brand"
                  control={control}
                  render={({ field }) => (
                    <SelectOption
                      dataType="brands"
                      control={control}
                      name="brands"
                    />
                  )}
                />
              </div>
              <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
                <h3 className="font-medium text-black dark:text-white">
                  Select brand
                </h3>
              </div>

              <div className="py-4 px-6.5 border-b border-stroke">
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

              <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
                <h3 className="font-medium text-black dark:text-white">
                  Select Category
                </h3>
              </div>
              <CategoryChecklist />

              <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
                <h3 className="font-medium text-black dark:text-white">
                  Select Tag
                </h3>
              </div>
            </div>
          </div>
        </div>
      </form>
    </>
  );
};

export default ProductCreateForm;
