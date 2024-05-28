import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';
import CouponForm from '../../components/Coupon/CouponForm';
import DefaultLayout from '../../layout/DefaultLayout';

const CouponCreate = () => {
  return (
    <DefaultLayout>
      <Breadcrumb pageName="Create Coupon" />
      <CouponForm />
    </DefaultLayout>
  );
};

export default CouponCreate;
