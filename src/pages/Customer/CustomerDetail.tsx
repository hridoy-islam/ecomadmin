import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';
import { CustomerView } from '../../components/Customer/CustomerView';
import DefaultLayout from '../../layout/DefaultLayout';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
const CustomerDetail = () => {
  const { id } = useParams();

  return (
    <DefaultLayout>
      <Breadcrumb pageName="Customer Detail" />
      <CustomerView id={id} />
    </DefaultLayout>
  );
};

export default CustomerDetail;
