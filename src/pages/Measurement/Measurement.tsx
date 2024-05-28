import { Link } from 'react-router-dom';
import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';
import MeasurementList from '../../components/Measurement/MeasurementList';
import DefaultLayout from '../../layout/DefaultLayout';

const Measurement = () => {
  return (
    <DefaultLayout>
      <Breadcrumb pageName="Measurement Chart" />
      <div className="rounded-sm my-5 px-5 py-3 border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
        <Link
          to="/dashboard/measurement/create"
          className="inline-flex items-center justify-center bg-secondary py-2 px-5 text-center font-medium text-white hover:bg-opacity-90 lg:px-8 xl:px-10"
        >
          Add New
        </Link>
      </div>
      <MeasurementList />
    </DefaultLayout>
  );
};

export default Measurement;
