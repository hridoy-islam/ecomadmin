import Breadcrumb from '../components/Breadcrumbs/Breadcrumb';
import DefaultLayout from '../layout/DefaultLayout';
import CouponList from '../components/Coupon/CouponList';

const Coupon = () => {
  return (
    <DefaultLayout>
      <Breadcrumb pageName="Coupon" />
      <CouponList />
    </DefaultLayout>
  );
};

export default Coupon;
