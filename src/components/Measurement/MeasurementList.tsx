import { useEffect, useState } from 'react';
import axiosInstance from '../../axios';
import Pagination from '../Pagination/Pagination';
import { SearchFilter } from '../SearchFilter/SearchFilter';

import { FaRegTrashAlt } from 'react-icons/fa';

const MeasurementList = () => {
  const [measurements, setMeasurements] = useState([]);
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
      let url = `/measurements?page=${page}&limit=${entriesPerPage}`;
      // Check if searchTerm is not empty before adding to the URL
      if (searchTerm.trim() !== '') {
        url += `&searchTerm=${searchTerm}`;
      }

      const response = await axiosInstance.get(url);
      setMeasurements(response.data.data.result);
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

  return (
    <>
      <div className="rounded-sm my-4 border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
        <SearchFilter
          onSearch={handleSearch}
          onEntriesPerPageChange={handleEntriesPerPageChange}
        />
        <div className="grid grid-cols-6 border-t border-stroke py-4.5 px-4 dark:border-strokedark sm:grid-cols-8 md:px-6 2xl:px-7.5">
          <div className="col-span-1 flex items-center">
            <p className="font-medium">Name</p>
          </div>
          <div className="col-span-1 flex items-center">
            <p className="font-medium">Size</p>
          </div>
          <div className="col-span-1 flex items-center">
            <p className="font-medium">Cheast </p>
          </div>
          <div className="col-span-1 flex items-center">
            <p className="font-medium">Length</p>
          </div>
          <div className="col-span-1 flex items-center">
            <p className="font-medium">Sleeve</p>
          </div>

          <div className="col-span-1 flex items-center">
            <p className="font-medium">Actions</p>
          </div>
        </div>

        {measurements.map((item, key) => (
          <div
            className="grid grid-cols-6 border-t border-stroke py-4.5 px-4 dark:border-strokedark sm:grid-cols-8 md:px-6 2xl:px-7.5"
            key={key}
          >
            <div className="col-span-1 hidden items-center sm:flex">
              <p className="text-sm text-black dark:text-white">{item.name}</p>
            </div>
            <div className="col-span-1 hidden items-center sm:flex">
              <p className="text-sm text-black dark:text-white">{item.size}</p>
            </div>
            <div className="col-span-1 hidden items-center sm:flex">
              <p className="text-sm text-black dark:text-white">{item.chest}</p>
            </div>
            <div className="col-span-1 hidden items-center sm:flex">
              <p className="text-sm text-black dark:text-white">
                {item.length}
              </p>
            </div>
            <div className="col-span-1 hidden items-center sm:flex">
              <p className="text-sm text-black dark:text-white">
                {item.sleeve}
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
    </>
  );
};

export default MeasurementList;
