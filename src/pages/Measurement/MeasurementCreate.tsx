import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';
import { MeasurementForm } from '../../components/Measurement/MeasurementForm';
import DefaultLayout from '../../layout/DefaultLayout';

const MeasurementCreate = () => {
  return (
    <DefaultLayout>
      <Breadcrumb pageName="Create a Measurement Chart" />
      <MeasurementForm />
    </DefaultLayout>
  );
};

export default MeasurementCreate;
