import BookingList from '../components/Booking/BookingList';
import Breadcrumb from '../components/Breadcrumbs/Breadcrumb';
import DefaultLayout from '../layout/DefaultLayout';

const Bookings = () => {
  return (
    <DefaultLayout>
      <Breadcrumb pageName="Bookings" />
      <BookingList />
    </DefaultLayout>
  );
};

export default Bookings;
