import BookingCreateForm from '../components/Booking/BookingCreateForm';
import Breadcrumb from '../components/Breadcrumbs/Breadcrumb';
import DefaultLayout from '../layout/DefaultLayout';

const BookingCreate = () => {
  return (
    <DefaultLayout>
      <Breadcrumb pageName="Create Booking" />
      <BookingCreateForm />
    </DefaultLayout>
  );
};

export default BookingCreate;
