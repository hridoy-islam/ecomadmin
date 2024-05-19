import Breadcrumb from '../components/Breadcrumbs/Breadcrumb';
import ConsultancyList from '../components/Consultancy/ConsultancyList';
import DefaultLayout from '../layout/DefaultLayout';

const Consultancy = () => {
  return (
    <DefaultLayout>
      <Breadcrumb pageName="Consultancy" />
      <ConsultancyList />
    </DefaultLayout>
  );
};

export default Consultancy;
