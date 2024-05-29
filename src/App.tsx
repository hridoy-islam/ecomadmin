import { useEffect, useState } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';

import Loader from './common/Loader';
import PageTitle from './components/PageTitle';
import ECommerce from './pages/Dashboard/ECommerce';
import CustomerCreate from './pages/CustomerCreate';
import CustomerEdit from './pages/CustomerEdit';
import FormElements from './pages/Form/FormElements';
import SignIn from './pages/Authentication/SignIn';
import Contact from './pages/Contact';
import Brand from './pages/Brand';
import Categories from './pages/Categories/Categories';
import Size from './pages/Size';
import Color from './pages/Color';
import Coupon from './pages/Coupon/Coupon';
import Product from './pages/Product/Product';
import ProductCreate from './pages/ProductCreate';
import Appearence from './pages/Appearence/Appearence';

import Customer from './pages/Customer/Customer';
import CustomerDetail from './pages/Customer/CustomerDetail';
import Slider from './pages/Appearence/Slider';
import Measurement from './pages/Measurement/Measurement';
import Order from './pages/Order/Order';
import Report from './pages/Report/Report';
import CouponCreate from './pages/Coupon/CouponCreate';
import MeasurementCreate from './pages/Measurement/MeasurementCreate';
import CategoriesCreate from './pages/Categories/CategoriesCreate';
import SubCategory from './pages/Categories/SubCategory';
import SubCategoryCreate from './pages/Categories/SubCategoryCreate';
import Payment from './pages/Appearence/Payment';
import Curiour from './pages/Appearence/Curiour';

const routeConfigs = [
  { path: '/', component: SignIn, title: 'Admin' },
  {
    path: 'dashboard',
    component: ECommerce,
    title: 'eCommerce Dashboard Admin',
  },
  {
    path: 'dashboard/orders',
    component: Order,
    title: 'Orders',
  },
  {
    path: 'dashboard/reports',
    component: Report,
    title: 'Reports',
  },
  { path: 'dashboard/customer', component: Customer, title: 'Customer' },
  {
    path: 'dashboard/appearence',
    component: Appearence,
    title: 'Website Appearence',
  },
  {
    path: 'dashboard/appearence/slider',
    component: Slider,
    title: 'Website Slider',
  },
  {
    path: 'dashboard/appearence/payment',
    component: Payment,
    title: 'Payment API',
  },
  {
    path: 'dashboard/appearence/curiour',
    component: Curiour,
    title: 'Curiour API',
  },
  {
    path: 'dashboard/customer/detail/:id',
    component: CustomerDetail,
    title: 'Customer Details',
  },
  {
    path: 'dashboard/customer/create',
    component: CustomerCreate,
    title: 'Create New Customer',
  },
  {
    path: 'dashboard/customer/:id',
    component: CustomerEdit,
    title: 'Edit Customer Details',
  },
  { path: 'dashboard/product', component: Product, title: 'Product List' },
  {
    path: 'dashboard/product/create',
    component: ProductCreate,
    title: 'Create Product',
  },
  { path: 'dashboard/brand', component: Brand, title: 'Brand List' },
  {
    path: 'dashboard/categories',
    component: Categories,
    title: 'Parent Category List',
  },
  {
    path: 'dashboard/categories/create',
    component: CategoriesCreate,
    title: 'Create Parent Category ',
  },
  {
    path: 'dashboard/categories/child',
    component: SubCategory,
    title: 'Sub Category List',
  },
  {
    path: 'dashboard/categories/child/create',
    component: SubCategoryCreate,
    title: 'Sub Category Create',
  },
  { path: 'dashboard/size', component: Size, title: 'Size List' },
  { path: 'dashboard/color', component: Color, title: 'Color List' },
  { path: 'dashboard/coupon', component: Coupon, title: 'Coupon List' },
  {
    path: 'dashboard/coupon/create',
    component: CouponCreate,
    title: 'Create Coupon',
  },
  { path: 'dashboard/contact', component: Contact, title: 'Contact Form' },
  {
    path: 'dashboard/measurement',
    component: Measurement,
    title: 'Measurement Chart',
  },
  {
    path: 'dashboard/measurement/create',
    component: MeasurementCreate,
    title: 'Create Measurement Chart',
  },
  {
    path: 'dashboard/forms/form-elements',
    component: FormElements,
    title: 'Form Elements | TailAdmin - Tailwind CSS Admin Dashboard Template',
  },
];

function App() {
  const [loading, setLoading] = useState<boolean>(true);
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  useEffect(() => {
    setTimeout(() => setLoading(false), 1000);
  }, []);

  return loading ? (
    <Loader />
  ) : (
    <>
      <Routes>
        {routeConfigs.map((config, index) => (
          <Route
            key={index}
            path={config.path}
            element={
              <>
                <PageTitle title={config.title} />
                <config.component />
              </>
            }
          />
        ))}
      </Routes>
    </>
  );
}

export default App;
