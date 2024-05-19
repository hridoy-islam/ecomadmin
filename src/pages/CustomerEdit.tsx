import { useParams } from 'react-router-dom';
import Breadcrumb from '../components/Breadcrumbs/Breadcrumb';
import CustomerEditForm from '../components/Customer/CustomerEditForm';
import DefaultLayout from '../layout/DefaultLayout';
import { useEffect, useState } from 'react';
import axiosInstance from '../axios';

const CustomerEdit = () => {
  let { id } = useParams();
  const [userData, setUserData] = useState(null);
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axiosInstance.get(`/users/${id}`);
        setUserData(response.data.data);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };
    if (id) {
      fetchUserData();
    }
  }, [id]);

  return (
    <DefaultLayout>
      <Breadcrumb pageName="Edit Customer" />
      <CustomerEditForm userData={userData} />
    </DefaultLayout>
  );
};

export default CustomerEdit;
