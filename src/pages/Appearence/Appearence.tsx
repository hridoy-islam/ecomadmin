import { Link } from 'react-router-dom';
import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';
import DefaultLayout from '../../layout/DefaultLayout';

const Appearence = () => {
  return (
    <DefaultLayout>
      <Breadcrumb pageName="Website Appearence" />
      <div className="flex gap-3">
        <div className="w-1/6">
          <div className="rounded-sm my-5 px-5 py-3 border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
            <Link
              to="/dashboard/brand/create"
              className="inline-flex items-center justify-center bg-secondary py-2 px-5 text-center font-medium text-white hover:bg-opacity-90 lg:px-8 xl:px-10"
            >
              Add New
            </Link>
          </div>
        </div>
        <div className="w-5/6">
          <div className="rounded-sm my-5 px-5 py-3 border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
          Hello
          </div>
        </div>
      </div>
    </DefaultLayout>
  );
};

export default Appearence;
