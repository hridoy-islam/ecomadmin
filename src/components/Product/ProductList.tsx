import { useEffect, useState } from 'react';
import axiosInstance from '../../axios';
import Pagination from '../Pagination/Pagination';
import { SearchFilter } from '../SearchFilter/SearchFilter';
import { TiTick, TiEyeOutline } from 'react-icons/ti';
import ConfirmModal from '../Modal/ConfirmModal';
import ViewModal from '../Modal/ViewModal';
import { IoCheckmarkDoneCircle } from 'react-icons/io5';
import { Link } from 'react-router-dom';
import { CgEye } from 'react-icons/cg';
import * as XLSX from 'xlsx';

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [exporting, setExporting] = useState(false);
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
      let url = `/products?page=${page}&limit=${entriesPerPage}`;
      // Check if searchTerm is not empty before adding to the URL
      if (searchTerm.trim() !== '') {
        url += `&searchTerm=${searchTerm}`;
      }

      const response = await axiosInstance.get(url);
      setProducts(response.data.data.result);
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

  // const handleExport = async () => {
  //   setExporting(true);
  //   try {
  //     const response = await axiosInstance.get(
  //       '/products?limit=all&sortBy=id&sortDirection=asc',
  //     );
  //     const products = response.data.data.result; // Assuming the response is an array of product objects

  //     const headers = Object.keys(products[0]).join(',') + '\n';
  //     // Convert products to CSV format
  //     const csvContent =
  //       headers +
  //       products.map((product) => Object.values(product).join(',')).join('\n');

  //     // Create a Blob containing the CSV data
  //     const blob = new Blob([csvContent], { type: 'text/csv' });

  //     // Create a URL for the Blob
  //     const url = window.URL.createObjectURL(blob);

  //     // Create a link element to trigger the download
  //     const link = document.createElement('a');
  //     link.href = url;
  //     link.setAttribute('download', 'products.csv');

  //     // Append the link to the document and trigger the download
  //     document.body.appendChild(link);
  //     link.click();

  //     // Clean up
  //     document.body.removeChild(link);
  //     window.URL.revokeObjectURL(url);
  //   } catch (error) {
  //     console.error('Error exporting bulk products:', error);
  //     alert('Failed to export bulk products.');
  //   } finally {
  //     setExporting(false);
  //   }
  // };

  const handleExport = async () => {
    setExporting(true);
    try {
      const response = await axiosInstance.get(
        '/products?limit=all&sortBy=id&sortDirection=asc',
      );
      const products = response.data.data.result; // Assuming the response is an array of product objects

      // Convert products to worksheet
      const worksheet = XLSX.utils.json_to_sheet(products);

      // Get the range of headers
      const headersRange = XLSX.utils.decode_range(worksheet['!ref']);
      const headers = [];
      for (let col = headersRange.s.c; col <= headersRange.e.c; col++) {
        const header = XLSX.utils.encode_cell({ r: headersRange.s.r, c: col });
        headers.push(header);
      }

      // Apply bold font style to headers
      headers.forEach((header) => {
        const cell = worksheet[header];
        cell.s = { font: { bold: true } };
      });

      // Create a new workbook
      const workbook = XLSX.utils.book_new();

      // Add worksheet to workbook
      XLSX.utils.book_append_sheet(workbook, worksheet, 'Products');

      // Save workbook to file
      XLSX.writeFile(workbook, 'products.xlsx');
    } catch (error) {
      console.error('Error exporting bulk products:', error);
      alert('Failed to export bulk products.');
    } finally {
      setExporting(false);
    }
  };

  return (
    <>
      <div className="rounded-sm flex gap-2  my-5 px-5 py-3 border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
        <Link to="/dashboard/product/create" className="buttonclass">
          Add New
        </Link>
        <button className="buttonclass ">Import Products</button>
        <button
          className="buttonclass"
          onClick={handleExport}
          disabled={exporting}
        >
          {exporting ? 'Exporting...' : 'Export'}
        </button>
      </div>
      <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
        <SearchFilter
          onSearch={handleSearch}
          onEntriesPerPageChange={handleEntriesPerPageChange}
        />
        <div className="grid grid-cols-6 border-t border-stroke py-4.5 px-4 dark:border-strokedark sm:grid-cols-8 md:px-6 2xl:px-7.5">
          <div className="col-span-1 flex items-center">
            <p className="font-medium">Product Name</p>
          </div>
          <div className="col-span-1 flex items-center">
            <p className="font-medium">Thumbnail</p>
          </div>
          <div className="col-span-1 flex items-center">
            <p className="font-medium">Category</p>
          </div>

          <div className="col-span-1 flex items-center">
            <p className="font-medium">Brand</p>
          </div>

          <div className="col-span-1 flex items-center">
            <p className="font-medium">Actions</p>
          </div>
        </div>

        {products.map((item, key) => (
          <div
            className="grid grid-cols-6 border-t border-stroke py-4.5 px-4 dark:border-strokedark sm:grid-cols-8 md:px-6 2xl:px-7.5"
            key={key}
          >
            <div className="col-span-1 hidden items-center sm:flex">
              <p className="text-sm text-black dark:text-white">{item.name}</p>
            </div>
            <div className="col-span-1 hidden items-center sm:flex">
              <img src={item.image_gallery[0]} alt="" />
              Thumbnail Will come
            </div>
            <div className="col-span-1 hidden items-center sm:flex">
              <p className="text-sm text-black dark:text-white">
                {item.category.name}
              </p>
            </div>
            <div className="col-span-1 hidden items-center sm:flex">
              <p className="text-sm text-black dark:text-white">
                {item.brand.name}
              </p>
            </div>

            <div className="col-span-1 flex items-center space-x-2">
              <p
                className="text-3xl text-meta-3 cursor-pointer"
                onClick={() => handleStatus(item._id)}
              >
                <TiTick />
              </p>

              <p className="text-sm text-meta-7">
                <Link to={`/dashboard/product/detail/${item.id}`}>
                  <CgEye className="text-xl" />
                </Link>
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

export default ProductList;
