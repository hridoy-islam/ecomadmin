import { useEffect, useState } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';

import Loader from './common/Loader';
import PageTitle from './components/PageTitle';
import ECommerce from './pages/Dashboard/ECommerce';
import Customer from './pages/Customer';
import CustomerCreate from './pages/CustomerCreate';
import CustomerEdit from './pages/CustomerEdit';
import CarCreate from './pages/CarCreate';
import FormElements from './pages/Form/FormElements';
import SignIn from './pages/Authentication/SignIn';
import DriverCreate from './pages/DriverCreate';
import Driver from './pages/Driver';
import { DriverView } from './pages/DriverView';
import Bookings from './pages/Bookings';
import Contact from './pages/Contact';
import BookingCreate from './pages/BookingCreate';
import Brand from './pages/Brand';
import Categories from './pages/Categories';
import Size from './pages/Size';
import Color from './pages/Color';

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
          path="dashboard/brand"
          element={
            <>
              <PageTitle title="Brand List" />
              <Brand />
            </>
          }
        />

        <Route
          path="dashboard/brand/create"
          element={
            <>
              <PageTitle title="Create Car" />
              <CarCreate />
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
          path="dashboard/categories/create"
          element={
            <>
              <PageTitle title="Create Category" />
              <CarCreate />
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
          path="dashboard/size/create"
          element={
            <>
              <PageTitle title="Create Size" />
              <CarCreate />
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
          path="dashboard/color/create"
          element={
            <>
              <PageTitle title="Create color" />
              <CarCreate />
            </>
          }
        />

        <Route
          path="dashboard/booking"
          element={
            <>
              <PageTitle title="All Bookings" />
              <Bookings />
            </>
          }
        />
        <Route
          path="dashboard/booking"
          element={
            <>
              <PageTitle title="All Bookings" />
              <Bookings />
            </>
          }
        />

        <Route
          path="dashboard/booking/create"
          element={
            <>
              <PageTitle title="Create Service Booking" />
              <BookingCreate />
            </>
          }
        />

        <Route
          path="dashboard/driver"
          element={
            <>
              <PageTitle title=" Driver List" />
              <Driver />
            </>
          }
        />

        <Route
          path="dashboard/driver/create"
          element={
            <>
              <PageTitle title="Create Driver" />
              <DriverCreate />
            </>
          }
        />
        <Route
          path="dashboard/driver/:id"
          element={
            <>
              <PageTitle title="Driver Details" />
              <DriverView />
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
