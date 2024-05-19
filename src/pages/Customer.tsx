import Breadcrumb from '../components/Breadcrumbs/Breadcrumb';
import CustomerList from '../components/Customer/CustomerList';
import DefaultLayout from '../layout/DefaultLayout';

const Customer = () => {
  return (
    <DefaultLayout>
      <Breadcrumb pageName="Customer" />
      <CustomerList />
    </DefaultLayout>
  );
};

export default Customer;
