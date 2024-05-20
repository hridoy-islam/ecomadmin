import React, { useEffect, useState } from 'react';
import axiosInstance from '../../axios';
import { Link } from 'react-router-dom';

export const CustomerView = ({ id }) => {
  const [customer, setCustomer] = useState();
  const fetchData = async () => {
    try {
      let url = `/user/${id}`;
      const response = await axiosInstance.get(url);
      setCustomer(response.data.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [id]);

  return (
    <>
      <div className="rounded-sm my-5 px-5 py-3 border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
        <Link
          to="/dashboard/customer/"
          className="inline-flex items-center justify-center bg-secondary py-2 px-5 text-center font-medium text-white hover:bg-opacity-90 lg:px-8 xl:px-10"
        >
          Back To List
        </Link>
      </div>
      <div className="flex gap-3">
        <div className="w-2/3 ">
          <div className="space-y-3 rounded-sm my-5 px-5 py-3 border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
            <p>Name : {customer?.name}</p>
            <p>Email : {customer?.email}</p>
            <p>Phone : {customer?.phone}</p>
            <p>Status : {customer?.status}</p>
          </div>
          <div className="space-y-3 rounded-sm my-5 px-5 py-3 border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
            <h2>User Details</h2>
          </div>
          <div className="space-y-3 rounded-sm my-5 px-5 py-3 border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
            <h2>Orders By This Customer</h2>
          </div>
        </div>

        <div className="w-1/3  rounded-sm my-5 px-5 py-3 border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
          Action With User
        </div>
      </div>
    </>
  );
};
