import { useEffect, useState } from 'react';
import axiosInstance from '../../axios';
import Pagination from '../Pagination/Pagination';
import { SearchFilter } from '../SearchFilter/SearchFilter';
import { Link } from 'react-router-dom';
import moment from 'moment';
import { TiTick, TiEyeOutline } from 'react-icons/ti';
import { CiTrash } from 'react-icons/ci';
import ConfirmModal from '../Modal/ConfirmModal';
import ViewModal from '../Modal/ViewModal';

const BookingList = () => {
  const [booking, setBooking] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [entriesPerPage, setEntriesPerPage] = useState(10);

  const [isConfirmModal, setIsConfirmModal] = useState(false);
  const [isViewModal, setIsViewModal] = useState(false);
  const [modalData, setModalData] = useState();
  const [viewModalData, setViewModalData] = useState();

  const openModal = () => {
    setIsConfirmModal(true);
  };
  const closeModal = () => {
    setIsConfirmModal(false);
  };

  const handleViewModal = (item) => {
    setViewModalData(item);
    setIsViewModal(true);
  };
  const closeViewModal = () => {
    setIsViewModal(false);
  };

  const handleConfirm = async () => {
    // Perform action when confirmed
    // For example, delete an item, submit a form, etc.
    console.log('Confirmed action', modalData);
    const res = await axiosInstance.patch(`/booking/${modalData}`, {
      status: 'approved',
    });
    if (res.data.success) {
      fetchData(currentPage, entriesPerPage, searchTerm);
    }
    setIsConfirmModal(false); // Close the modal after confirmation
  };

  const fetchData = async (page, entriesPerPage, searchTerm = '') => {
    try {
      let url = `/booking?page=${page}&limit=${entriesPerPage}`;
      // Check if searchTerm is not empty before adding to the URL
      if (searchTerm.trim() !== '') {
        url += `&searchTerm=${searchTerm}`;
      }

      const response = await axiosInstance.get(url);
      setBooking(response.data.data.result);
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
    <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
      <SearchFilter
        onSearch={handleSearch}
        onEntriesPerPageChange={handleEntriesPerPageChange}
      />
      <div className="grid grid-cols-6 border-t border-stroke py-4.5 px-4 dark:border-strokedark sm:grid-cols-8 md:px-6 2xl:px-7.5">
        <div className="col-span-1 flex items-center">
          <p className="font-medium">Booking Date</p>
        </div>
        <div className="col-span-1 flex items-center">
          <p className="font-medium">Address</p>
        </div>
        <div className="col-span-1 hidden items-center sm:flex">
          <p className="font-medium">Name</p>
        </div>
        <div className="col-span-1 flex items-center">
          <p className="font-medium">Phone</p>
        </div>
        <div className="col-span-1 flex items-center">
          <p className="font-medium">Car</p>
        </div>
        
        <div className="col-span-1 flex items-center">
          <p className="font-medium">Status</p>
        </div>
        <div className="col-span-1 flex items-center">
          <p className="font-medium">Actions</p>
        </div>
      </div>

      {booking.map((item, key) => (
        <div
          className="grid grid-cols-6 border-t border-stroke py-4.5 px-4 dark:border-strokedark sm:grid-cols-8 md:px-6 2xl:px-7.5"
          key={key}
        >
          <div className="col-span-1 flex items-center">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
              <p className="text-sm text-black dark:text-white">
                {moment(item.bookingDate).format('MMM Do YY')}
              </p>
            </div>
          </div>
          <div className="col-span-1 hidden items-center sm:flex">
            <p className="text-sm text-black dark:text-white">{item.address}</p>
          </div>
          <div className="col-span-1 hidden items-center sm:flex">
            <p className="text-sm text-black dark:text-white">{item.name}</p>
          </div>
          <div className="col-span-1 flex items-center">
            <p className="text-sm text-black dark:text-white">{item.phone}</p>
          </div>
          <div className="col-span-1 flex items-center">
            <p className="text-sm text-black dark:text-white">{item.car}</p>
          </div>
          
          <div className="col-span-1 flex items-center">
            <p
              className={`text-sm font-semibold dark:text-white ${
                item?.status == 'completed'
                  ? 'text-green-600'
                  : item?.status == 'pending'
                  ? 'text-red-500'
                  : item?.status == 'approved'
                  ? 'text-blue-500'
                  : 'text-black'
              }`}
            >
              {/* {item?.status.toUpperCase()} */}
            </p>
          </div>
          <div className="col-span-1 flex items-center space-x-2">
            <p
              className="text-3xl text-meta-3 cursor-pointer"
              onClick={() => handleStatus(item._id)}
            >
              <TiTick />
            </p>

            <p
              className="text-3xl text-meta-5 cursor-pointer"
              onClick={() => handleViewModal(item)}
            >
              <TiEyeOutline />
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
        title="Confirm Booking"
        message="Are you sure you want to approve this booking?"
        onCancel={closeModal}
        onConfirm={handleConfirm}
      />

      <ViewModal
        isOpen={isViewModal}
        title="Booking Details"
        data={viewModalData}
        onCancel={closeViewModal}
        type="booking"
      />
    </div>
  );
};

export default BookingList;
