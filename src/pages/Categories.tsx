import Breadcrumb from '../components/Breadcrumbs/Breadcrumb';
import DefaultLayout from '../layout/DefaultLayout';
import CategoryList from '../components/Categories/Categories';

const Categories = () => {
  return (
    <DefaultLayout>
      <Breadcrumb pageName="Categories" />
        <CategoryList />
    </DefaultLayout>
  );
};

export default Categories;
