import Breadcrumb from '../components/Breadcrumbs/Breadcrumb';
import DefaultLayout from '../layout/DefaultLayout';
import ColorList from '../components/Color/Color';

const Color = () => {
  return (
    <DefaultLayout>
      <Breadcrumb pageName="Color" />
        <ColorList />
    </DefaultLayout>
  );
};

export default Color;
