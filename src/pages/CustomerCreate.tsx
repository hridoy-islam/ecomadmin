import Breadcrumb from '../components/Breadcrumbs/Breadcrumb';
import CustomerCreateForm from '../components/Customer/CustomerCreateForm';
import DefaultLayout from '../layout/DefaultLayout';

const CustomerCreate = () => {
  return (
    <DefaultLayout>
      <Breadcrumb pageName="Create New Customer" />
      <CustomerCreateForm />
    </DefaultLayout>
  );
};

export default CustomerCreate;
