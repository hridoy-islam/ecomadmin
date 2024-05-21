import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';
import DefaultLayout from '../../layout/DefaultLayout';
import ProductList from '../../components/Product/ProductList';

const Product = () => {
  return (
    <DefaultLayout>
      <Breadcrumb pageName="Product" />
      <ProductList />
    </DefaultLayout>
  );
};

export default Product;
