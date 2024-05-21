import { useEffect, useState } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';

import Loader from './common/Loader';
import PageTitle from './components/PageTitle';
import ECommerce from './pages/Dashboard/ECommerce';
import Customer from './pages/Customer';
import CustomerCreate from './pages/CustomerCreate';
import CustomerEdit from './pages/CustomerEdit';
import FormElements from './pages/Form/FormElements';
import SignIn from './pages/Authentication/SignIn';
import Contact from './pages/Contact';
import Brand from './pages/Brand';
import Categories from './pages/Categories';
import Size from './pages/Size';
import Color from './pages/Color';
import Coupon from './pages/Coupon';
import Product from './pages/Product';
import ProductCreate from './pages/ProductCreate';
import SubCategories from './pages/SubCategories';
import Appearence from './pages/Appearence/Appearence';

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
        <Route
          path="/"
          element={
            <>
              <PageTitle title="Admin" />
              <SignIn />
            </>
          }
        />
        <Route
          path="dashboard"
          element={
            <>
              <PageTitle title="eCommerce Dashboard Admin " />
              <ECommerce />
            </>
          }
        />
        <Route
          path="/dashboard/appearence"
          element={
            <>
              <PageTitle title="Website Appearence" />
              <Appearence />
            </>
          }
        />
        <Route
          path="dashboard/customer"
          element={
            <>
              <PageTitle title="Customer" />
              <Customer />
            </>
          }
        />
        <Route
          path="dashboard/customer/create"
          element={
            <>
              <PageTitle title="Create New Customer" />
              <CustomerCreate />
            </>
          }
        />
        <Route
          path="dashboard/customer/:id"
          element={
            <>
              <PageTitle title="Edit Customer Details" />
              <CustomerEdit />
            </>
          }
        />
        <Route
          path="dashboard/product"
          element={
            <>
              <PageTitle title="Product List" />
              <Product />
            </>
          }
        />

        <Route
          path="dashboard/product/create"
          element={
            <>
              <PageTitle title="Create Product" />
              <ProductCreate />
            </>
          }
        />

        <Route
          path="dashboard/brand"
          element={
            <>
              <PageTitle title="Brand List" />
              <Brand />
            </>
          }
        />

        <Route
          path="dashboard/categories"
          element={
            <>
              <PageTitle title="Category List" />
              <Categories />
            </>
          }
        />
        <Route
          path="dashboard/categories/child"
          element={
            <>
              <PageTitle title="Sub Category List" />
              <SubCategories />
            </>
          }
        />

        <Route
          path="dashboard/size"
          element={
            <>
              <PageTitle title="Size List" />
              <Size />
            </>
          }
        />

        <Route
          path="dashboard/color"
          element={
            <>
              <PageTitle title="Color List" />
              <Color />
            </>
          }
        />

        <Route
          path="dashboard/coupon"
          element={
            <>
              <PageTitle title="Coupon List" />
              <Coupon />
            </>
          }
        />

        <Route
          path="dashboard/contact"
          element={
            <>
              <PageTitle title="Contact Form" />
              <Contact />
            </>
          }
        />
        <Route
          path="dashboard/forms/form-elements"
          element={
            <>
              <PageTitle title="Form Elements | TailAdmin - Tailwind CSS Admin Dashboard Template" />
              <FormElements />
            </>
          }
        />
      </Routes>
    </>
  );
}

export default App;
