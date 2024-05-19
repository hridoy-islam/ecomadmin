import { useEffect, useState } from 'react';
import Breadcrumb from '../components/Breadcrumbs/Breadcrumb';
import DefaultLayout from '../layout/DefaultLayout';
import axiosInstance from '../axios';
import { DriverDetails } from '../components/Driver/DriverDetails';
import { useParams } from 'react-router-dom';

export const DriverView = () => {
  let { id } = useParams();
  const [driver, setDriver] = useState(null);
  const fetchData = async () => {
    try {
      const response = await axiosInstance.get(`/drivers/${id}`);
      setDriver(response.data.data);
    } catch (error) {
      console.error('Error fetching driver data:', error);
    }
  };
  useEffect(() => {
    fetchData();
  }, [id]);
  console.log(driver);
  return (
    <DefaultLayout>
      <Breadcrumb pageName="Driver" />
      <DriverDetails driver={driver} />
    </DefaultLayout>
  );
};
