import { useEffect, useState } from 'react';
import axiosInstance from '../../axios';
import { SearchFilter } from '../SearchFilter/SearchFilter';
import Pagination from '../Pagination/Pagination';
import { Link } from 'react-router-dom';
import { TiEyeOutline } from 'react-icons/ti';
import ConfirmModal from '../Modal/ConfirmModal';
import { CiTrash } from 'react-icons/ci';

const DriverList = () => {
  const [driver, setDriver] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [entriesPerPage, setEntriesPerPage] = useState(10);
  const fetchData = async (page, entriesPerPage, searchTerm = '') => {
    try {
      let url = `/drivers?page=${page}&limit=${entriesPerPage}&isDeleted=false`;
      // Check if searchTerm is not empty before adding to the URL
      if (searchTerm.trim() !== '') {
        url += `&searchTerm=${searchTerm}`;
      }

      const response = await axiosInstance.get(url);
      setDriver(response.data.data.result);
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

  const [isConfirmModal, setIsConfirmModal] = useState(false);
  const [modalData, setModalData] = useState();
  const closeModal = () => {
    setIsConfirmModal(false);
  };
  const openModal = () => {
    setIsConfirmModal(true);
  };

  const handleConfirm = async () => {
    const res = await axiosInstance.patch(`/drivers/${modalData}`, {
      isDeleted: true,
    });
    if (res.data.success) {
      fetchData(currentPage, entriesPerPage, searchTerm);
    }
    setIsConfirmModal(false); // Close the modal after confirmation
  };
  const handleStatus = (id) => {
    openModal();
    setModalData(id);
  };

  return (
    <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
      <SearchFilter
        onSearch={handleSearch}
        onEntriesPerPageChange={handleEntriesPerPageChange}
      />
      <div className="grid grid-cols-6 border-t border-stroke py-4.5 px-4 dark:border-strokedark sm:grid-cols-8 md:px-6 2xl:px-7.5">
        <div className="col-span-2 flex items-center">
          <p className="font-medium">Name</p>
        </div>
        <div className="col-span-1 hidden items-center sm:flex">
          <p className="font-medium">Phone</p>
        </div>
        <div className="col-span-1 hidden items-center sm:flex">
          <p className="font-medium">Car</p>
        </div>
        <div className="col-span-1 hidden items-center sm:flex">
          <p className="font-medium">Division</p>
        </div>
        <div className="col-span-1 hidden items-center sm:flex">
          <p className="font-medium">District</p>
        </div>
        <div className="col-span-1 hidden items-center sm:flex">
          <p className="font-medium">Upazila</p>
        </div>

        <div className="col-span-1 flex items-center">
          <p className="font-medium">Actions</p>
        </div>
      </div>

      {driver.map((item, key) => (
        <div
          className="grid grid-cols-6 border-t border-stroke py-4.5 px-4 dark:border-strokedark sm:grid-cols-8 md:px-6 2xl:px-7.5"
          key={key}
        >
          <div className="col-span-2 flex items-center">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
              <p className="text-sm text-black dark:text-white">{item.name}</p>
            </div>
          </div>
          <div className="col-span-1 flex items-center">
            <p className="text-sm text-black dark:text-white">{item.phone}</p>
          </div>
          <div className="col-span-1 flex items-center">
            <p className="text-sm text-black dark:text-white">{item.car}</p>
          </div>
          <div className="col-span-1 flex items-center">
            <p className="text-sm text-black dark:text-white">
              {item.division}
            </p>
          </div>
          <div className="col-span-1 flex items-center">
            <p className="text-sm text-black dark:text-white">
              {item.district}
            </p>
          </div>
          <div className="col-span-1 flex items-center">
            <p className="text-sm text-black dark:text-white">{item.upazila}</p>
          </div>

          <div className="col-span-1 flex items-center space-x-2">
            <Link to={`/dashboard/driver/${item._id}`}>
              <p className="text-xl text-blue-500 cursor-pointer">
                <TiEyeOutline />
              </p>
            </Link>
            <p
              className="text-lg text-danger cursor-pointer"
              onClick={() => handleStatus(item._id)}
            >
              <CiTrash />
            </p>
          </div>
        </div>
      ))}
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
      <ConfirmModal
        isOpen={isConfirmModal}
        title="Confirm Delete Driver"
        message="Are you sure you want to Delete this Driver?"
        onCancel={closeModal}
        onConfirm={handleConfirm}
      />
    </div>
  );
};

export default DriverList;
