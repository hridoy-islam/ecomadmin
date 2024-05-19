import Breadcrumb from '../components/Breadcrumbs/Breadcrumb';
import ConsultancyCreateForm from '../components/Consultancy/ConsultancyCreate';
import DefaultLayout from '../layout/DefaultLayout';

const ConsultancyCreate = () => {
  return (
    <DefaultLayout>
      <Breadcrumb pageName="Create Consultancy " />
      <ConsultancyCreateForm />
    </DefaultLayout>
  );
};

export default ConsultancyCreate;
