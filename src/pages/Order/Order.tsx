import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';
import OrderList from '../../components/Order/OrderList';
import DefaultLayout from '../../layout/DefaultLayout';

const Order = () => {
  return (
    <DefaultLayout>
      <Breadcrumb pageName="Orders" />
      <OrderList />
    </DefaultLayout>
  );
};

export default Order;
