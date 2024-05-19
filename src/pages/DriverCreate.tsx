import Breadcrumb from '../components/Breadcrumbs/Breadcrumb';
import DriverCreateForm from '../components/Driver/DriverCreate';
import DefaultLayout from '../layout/DefaultLayout';

const DriverCreate = () => {
  return (
    <DefaultLayout>
      <Breadcrumb pageName="Create Driver" />
      <DriverCreateForm />
    </DefaultLayout>
  );
};

export default DriverCreate;
