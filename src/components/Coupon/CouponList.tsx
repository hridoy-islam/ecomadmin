import { useEffect, useState } from 'react';
import axiosInstance from '../../axios';
import Pagination from '../Pagination/Pagination';
import { SearchFilter } from '../SearchFilter/SearchFilter';
import moment from 'moment';
import { TiEyeOutline } from 'react-icons/ti';
import ViewModal from '../Modal/ViewModal';

const CouponList = () => {
  const [coupon, setCoupon] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [entriesPerPage, setEntriesPerPage] = useState(10);

  const fetchData = async (page, entriesPerPage, searchTerm = '') => {
    try {
      let url = `/coupons?page=${page}&limit=${entriesPerPage}`;
      // Check if searchTerm is not empty before adding to the URL
      if (searchTerm.trim() !== '') {
        url += `&searchTerm=${searchTerm}`;
      }

      const response = await axiosInstance.get(url);
      setCoupon(response.data.data.result);
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
        <div className="hidden items-center sm:flex">
          <p className="font-medium">Coupon Code</p>
        </div>
        <div className="flex items-center">
          <p className="font-medium">Discount Type</p>
        </div>
        <div className="flex items-center">
          <p className="font-medium">Discount Amount</p>
        </div>
        <div className="flex items-center">
          <p className="font-medium">Usage Limit</p>
        </div>

        <div className="flex items-center">
          <p className="font-medium">Expire Date</p>
        </div>
      </div>

      {coupon.map((item, key) => (
        <div
          className="grid grid-cols-6 border-t border-stroke py-4.5 px-4 dark:border-strokedark sm:grid-cols-8 md:px-6 2xl:px-7.5"
          key={key}
        >
          <div className="hidden items-center sm:flex">
            <p className="text-sm text-black dark:text-white">{item.code}</p>
          </div>
          <div className="flex items-center">
            <p className="text-sm text-black dark:text-white">
              {item.discount_type}
            </p>
          </div>
          <div className=" flex items-center">
            <p className="text-sm text-black dark:text-white overflow-hidden whitespace-nowrap overflow-ellipsis">
              {item.discount_amount}
            </p>
          </div>
          <div className=" flex items-center">
            <p className="text-sm text-black dark:text-white overflow-hidden whitespace-nowrap overflow-ellipsis">
              {item.usage_limit}
            </p>
          </div>

          <div className="flex items-center">
            <p className="text-sm text-black dark:text-white">
              {moment(item?.expires_at).format('MMM Do YY')}
            </p>
          </div>
        </div>
      ))}
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </div>
  );
};

export default CouponList;
