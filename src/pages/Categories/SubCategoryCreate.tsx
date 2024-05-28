import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';
import { CreateChild } from '../../components/Categories/CreateChild';
import DefaultLayout from '../../layout/DefaultLayout';

const SubCategoryCreate = () => {
  return (
    <DefaultLayout>
      <Breadcrumb pageName="Create Sub Categories" />
      <CreateChild />
    </DefaultLayout>
  );
};

export default SubCategoryCreate;
