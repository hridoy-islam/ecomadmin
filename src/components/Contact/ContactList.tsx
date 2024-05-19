import { useEffect, useState } from 'react';
import axiosInstance from '../../axios';
import Pagination from '../Pagination/Pagination';
import { SearchFilter } from '../SearchFilter/SearchFilter';
import moment from 'moment';
import { TiEyeOutline } from 'react-icons/ti';
import ViewModal from '../Modal/ViewModal';

const ContactList = () => {
  const [contact, setContact] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [entriesPerPage, setEntriesPerPage] = useState(10);

  const [isViewModal, setIsViewModal] = useState(false);
  const [viewModalData, setViewModalData] = useState();

  const handleViewModal = (item) => {
    setViewModalData(item);
    setIsViewModal(true);
  };
  const closeViewModal = () => {
    setIsViewModal(false);
  };

  const fetchData = async (page, entriesPerPage, searchTerm = '') => {
    try {
      let url = `/contact?page=${page}&limit=${entriesPerPage}`;
      // Check if searchTerm is not empty before adding to the URL
      if (searchTerm.trim() !== '') {
        url += `&searchTerm=${searchTerm}`;
      }

      const response = await axiosInstance.get(url);
      setContact(response.data.data.result);
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

  return (
    <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
      <SearchFilter
        onSearch={handleSearch}
        onEntriesPerPageChange={handleEntriesPerPageChange}
      />
      <div className="grid grid-cols-6 border-t border-stroke py-4.5 px-4 dark:border-strokedark sm:grid-cols-8 md:px-6 2xl:px-7.5">
        <div className="col-span-1 hidden items-center sm:flex">
          <p className="font-medium">Name</p>
        </div>
        <div className="col-span-1 flex items-center">
          <p className="font-medium">Phone</p>
        </div>
        <div className="col-span-1 flex items-center">
          <p className="font-medium">Email</p>
        </div>

        <div className="col-span-1 flex items-center">
          <p className="font-medium">Message</p>
        </div>
        <div className="col-span-1 flex items-center">
          <p className="font-medium">Requested Date</p>
        </div>
        <div className="col-span-1 flex items-center">
          <p className="font-medium">View</p>
        </div>
      </div>

      {contact.map((item, key) => (
        <div
          className="grid grid-cols-6 border-t border-stroke py-4.5 px-4 dark:border-strokedark sm:grid-cols-8 md:px-6 2xl:px-7.5"
          key={key}
        >
          <div className="col-span-1 hidden items-center sm:flex">
            <p className="text-sm text-black dark:text-white">{item.name}</p>
          </div>
          <div className="col-span-1 flex items-center">
            <p className="text-sm text-black dark:text-white">{item.phone}</p>
          </div>
          <div className="col-span-1 flex items-center">
            <p className="text-sm text-black dark:text-white">{item.email}</p>
          </div>
          <div className="col-span-1 flex items-center">
            <p className="text-sm text-black dark:text-white">{item.message}</p>
          </div>
          <div className="col-span-1 flex items-center">
            <p className="text-sm text-black dark:text-white">
              {moment(item.createdAt).format('MMM Do YY')}
            </p>
          </div>

          <div className="col-span-1 flex items-center space-x-2">
            <p
              className="text-xl text-success cursor-pointer"
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
      <ViewModal
        isOpen={isViewModal}
        title="Contact Details"
        data={viewModalData}
        onCancel={closeViewModal}
        type={'contact'}
      />
    </div>
  );
};

export default ContactList;
