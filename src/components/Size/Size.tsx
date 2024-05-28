import { useEffect, useState } from 'react';
import axiosInstance from '../../axios';
import Pagination from '../Pagination/Pagination';
import { SearchFilter } from '../SearchFilter/SearchFilter';

import { FaRegTrashAlt } from 'react-icons/fa';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';

const SizeList = () => {
  const [size, setSize] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [entriesPerPage, setEntriesPerPage] = useState(10);

  const [isConfirmModal, setIsConfirmModal] = useState(false);
  const [isSoldModal, setIsSoldModal] = useState(false);
  const [isViewModal, setIsViewModal] = useState(false);
  const [modalData, setModalData] = useState();
  const [viewModalData, setViewModalData] = useState();

  const openModal = () => {
    setIsConfirmModal(true);
  };
  const closeModal = () => {
    setIsConfirmModal(false);
  };
  const closeModalSold = () => {
    setIsSoldModal(false);
  };

  const handleSold = () => {
    setIsSoldModal(true);
  };

  const handleViewModal = (item) => {
    setViewModalData(item);
    setIsViewModal(true);
  };
  const closeViewModal = () => {
    setIsViewModal(false);
  };

  const handleConfirm = async () => {
    const res = await axiosInstance.patch(`/sizes/${modalData}`, {
      status: 'approve',
    });
    if (res.data.success) {
      fetchData(currentPage, entriesPerPage, searchTerm);
    }
    setIsConfirmModal(false); // Close the modal after confirmation
  };

  const handleConfirmSold = async () => {
    const res = await axiosInstance.patch(`/sizes/${modalData}`, {
      status: 'sold',
    });
    if (res.data.success) {
      fetchData(currentPage, entriesPerPage, searchTerm);
    }
    setIsSoldModal(false); // Close the modal after confirmation
  };

  const fetchData = async (page, entriesPerPage, searchTerm = '') => {
    try {
      let url = `/sizes?page=${page}&limit=${entriesPerPage}`;
      // Check if searchTerm is not empty before adding to the URL
      if (searchTerm.trim() !== '') {
        url += `&searchTerm=${searchTerm}`;
      }

      const response = await axiosInstance.get(url);
      setSize(response.data.data.result);
      setTotalPages(response.data.data.meta.totalPage);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    fetchData(currentPage, entriesPerPage, searchTerm);
  }, [currentPage, entriesPerPage, searchTerm]);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };
  const handleEntriesPerPageChange = (event) => {
    setEntriesPerPage(event.target.value);
  };

  const handleStatus = (id) => {
    openModal();
    setModalData(id);
  };

  const {
    handleSubmit,
    register,
    reset,
    formState: { errors },
  } = useForm(); // Initialize the form
  const onSubmit = async (data) => {
    try {
      const response = await axiosInstance.post('/sizes', data);
      if (response.data.success) {
        toast.success('Size Created successfully');
        reset();
        fetchData(currentPage, entriesPerPage, searchTerm);
      }
    } catch (error) {
      toast.error(error.response.data.message.name);
    }
  };

  return (
    <>
      <div className="flex gap-4 ">
        <div className="w-1/3 h-32 rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
          <form onSubmit={handleSubmit(onSubmit)} className="p-4 space-y-3">
            <input
              {...register('name', { required: true })}
              type="text"
              placeholder="Size"
              className="inputclass"
            />
            <button type="submit" className="buttonclass">
              Add New
            </button>
          </form>
        </div>
        <div className="w-2/3 rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
          <SearchFilter
            onSearch={handleSearch}
            onEntriesPerPageChange={handleEntriesPerPageChange}
          />
          <div className="grid grid-cols-6 border-t border-stroke py-4.5 px-4 dark:border-strokedark sm:grid-cols-8 md:px-6 2xl:px-7.5">
            <div className="col-span-7 flex items-center">
              <p className="font-medium">Size</p>
            </div>

            <div className="col-span-1 flex items-center">
              <p className="font-medium">Actions</p>
            </div>
          </div>

          {size.map((item, key) => (
            <div
              className="grid grid-cols-6 border-t border-stroke py-4.5 px-4 dark:border-strokedark sm:grid-cols-8 md:px-6 2xl:px-7.5"
              key={key}
            >
              <div className="col-span-7 hidden items-center sm:flex">
                <p className="text-sm text-black dark:text-white">
                  {item.name}
                </p>
              </div>

              <div className="col-span-1 flex items-center space-x-2">
                <p
                  className="text-xl text-meta-1 cursor-pointer"
                  onClick={() => handleStatus(item._id)}
                >
                  <FaRegTrashAlt />
                </p>
              </div>
            </div>
          ))}

          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
          {/* <ConfirmModal
            isOpen={isConfirmModal}
            title="Approve Car"
            message="Are you sure you want to approve this car listing?"
            onCancel={closeModal}
            onConfirm={handleConfirm}
          /> */}
        </div>
      </div>
    </>
  );
};

export default SizeList;
