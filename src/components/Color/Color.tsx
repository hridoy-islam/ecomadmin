import { useEffect, useState } from 'react';
import axiosInstance from '../../axios';
import Pagination from '../Pagination/Pagination';
import { SearchFilter } from '../SearchFilter/SearchFilter';
import { TiTick, TiEyeOutline } from 'react-icons/ti';
import ConfirmModal from '../Modal/ConfirmModal';
import ViewModal from '../Modal/ViewModal';
import { IoCheckmarkDoneCircle } from 'react-icons/io5';
import { Link } from 'react-router-dom';

const ColorList = () => {
  const [colors, setColors] = useState([]);
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
    const res = await axiosInstance.patch(`/colors/${modalData}`, {
      status: 'approve',
    });
    if (res.data.success) {
      fetchData(currentPage, entriesPerPage, searchTerm);
    }
    setIsConfirmModal(false); // Close the modal after confirmation
  };

  const handleConfirmSold = async () => {
    const res = await axiosInstance.patch(`/colors/${modalData}`, {
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
      setColors(response.data.data.result);
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
      <div className="rounded-sm my-5 px-5 py-3 border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
        <Link
          to="/dashboard/color/create"
          className="inline-flex items-center justify-center bg-secondary py-2 px-5 text-center font-medium text-white hover:bg-opacity-90 lg:px-8 xl:px-10"
        >
          Add New
        </Link>
      </div>
      <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
        <SearchFilter
          onSearch={handleSearch}
          onEntriesPerPageChange={handleEntriesPerPageChange}
        />
        <div className="grid grid-cols-6 border-t border-stroke py-4.5 px-4 dark:border-strokedark sm:grid-cols-8 md:px-6 2xl:px-7.5">
          <div className="col-span-7 flex items-center">
            <p className="font-medium">Color</p>
          </div>

          <div className="col-span-1 flex items-center">
            <p className="font-medium">Actions</p>
          </div>
        </div>

        {colors.map((item, key) => (
          <div
            className="grid grid-cols-6 border-t border-stroke py-4.5 px-4 dark:border-strokedark sm:grid-cols-8 md:px-6 2xl:px-7.5"
            key={key}
          >
            <div className="col-span-7 hidden items-center sm:flex">
              <p className="text-sm text-black dark:text-white">{item.name}</p>
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
              {item?.status === 'approve' && (
                <p
                  className="text-3xl text-meta-1 cursor-pointer"
                  onClick={() => handleSold(item._id)}
                >
                  <IoCheckmarkDoneCircle />
                </p>
              )}
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
          title="Approve Car"
          message="Are you sure you want to approve this car listing?"
          onCancel={closeModal}
          onConfirm={handleConfirm}
        />
        <ConfirmModal
          isOpen={isSoldModal}
          title="Confirm Sold"
          message="Are you sure is this car sold?"
          onCancel={closeModalSold}
          onConfirm={handleConfirmSold}
        />

        <ViewModal
          isOpen={isViewModal}
          title="Car Details"
          data={viewModalData}
          onCancel={closeViewModal}
          type="car"
        />
      </div>
    </>
  );
};

export default ColorList;
