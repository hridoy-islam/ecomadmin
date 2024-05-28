import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';
import CouponList from '../../components/Coupon/CouponList';
import DefaultLayout from '../../layout/DefaultLayout';

const Coupon = () => {
  return (
    <DefaultLayout>
      <Breadcrumb pageName="Coupon" />
      <CouponList />
    </DefaultLayout>
  );
};

export default Coupon;
