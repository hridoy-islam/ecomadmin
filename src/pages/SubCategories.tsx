import Breadcrumb from '../components/Breadcrumbs/Breadcrumb';
import DefaultLayout from '../layout/DefaultLayout';
import CategoryList from '../components/Categories/Categories';

const SubCategories = () => {
  return (
    <DefaultLayout>
      <Breadcrumb pageName="Sub Categories" />
      <CategoryList />
    </DefaultLayout>
  );
};

export default SubCategories;
