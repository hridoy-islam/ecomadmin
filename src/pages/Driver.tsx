import Breadcrumb from '../components/Breadcrumbs/Breadcrumb';
import DriverList from '../components/Driver/DriverList';
import DefaultLayout from '../layout/DefaultLayout';

const Driver = () => {
  return (
    <DefaultLayout>
      <Breadcrumb pageName="Driver" />
      <DriverList />
    </DefaultLayout>
  );
};

export default Driver;
