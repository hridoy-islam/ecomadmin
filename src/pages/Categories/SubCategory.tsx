import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';
import SubCategoryList from '../../components/Categories/SubCategories';
import DefaultLayout from '../../layout/DefaultLayout';

const SubCategory = () => {
  return (
    <DefaultLayout>
      <Breadcrumb pageName="Sub Categories" />
      <SubCategoryList />
    </DefaultLayout>
  );
};

export default SubCategory;
