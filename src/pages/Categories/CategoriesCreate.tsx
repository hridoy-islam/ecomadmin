import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';
import { CreateParent } from '../../components/Categories/CreateParent';
import DefaultLayout from '../../layout/DefaultLayout';

const CategoriesCreate = () => {
  return (
    <DefaultLayout>
      <Breadcrumb pageName="Create Parent Categories" />
      <CreateParent />
    </DefaultLayout>
  );
};

export default CategoriesCreate;
