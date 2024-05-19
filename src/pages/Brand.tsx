import Breadcrumb from '../components/Breadcrumbs/Breadcrumb';
import DefaultLayout from '../layout/DefaultLayout';
import BrandList from '../components/Brand/Brand';

const Brand = () => {
  return (
    <DefaultLayout>
      <Breadcrumb pageName="Brand" />
        <BrandList/>
    </DefaultLayout>
  );
};

export default Brand;
