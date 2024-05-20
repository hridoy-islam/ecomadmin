import Breadcrumb from '../components/Breadcrumbs/Breadcrumb';
import DefaultLayout from '../layout/DefaultLayout';
import ProductCreateForm from '../components/Product/ProductCreateForm';

const ProductCreate = () => {
  return (
    <DefaultLayout>
      <Breadcrumb pageName="Create Product" />
      <ProductCreateForm />
    </DefaultLayout>
  );
};

export default ProductCreate;
