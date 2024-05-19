import Breadcrumb from '../components/Breadcrumbs/Breadcrumb';
import DefaultLayout from '../layout/DefaultLayout';
import SizeList from '../components/Size/Size';

const Size = () => {
  return (
    <DefaultLayout>
      <Breadcrumb pageName="Size" />
        <SizeList />
    </DefaultLayout>
  );
};

export default Size;
