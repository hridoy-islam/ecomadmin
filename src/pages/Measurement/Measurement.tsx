import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';
import { MeasurementCreate } from '../../components/Measurement/MeasurementCreate';
import MeasurementList from '../../components/Measurement/MeasurementList';
import DefaultLayout from '../../layout/DefaultLayout';

const Measurement = () => {
  return (
    <DefaultLayout>
      <Breadcrumb pageName="Measurement Chart" />
      <MeasurementCreate />
      <MeasurementList />
    </DefaultLayout>
  );
};

export default Measurement;
