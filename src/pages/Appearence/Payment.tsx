import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';
import DefaultLayout from '../../layout/DefaultLayout';
import { AppearenceLayout } from '../../layout/AppearenceLayout';

const Payment = () => {
  return (
    <DefaultLayout>
      <Breadcrumb pageName="Payment Details" />
      <AppearenceLayout>
        <div className="border-b border-meta-9 pb-2 mb-2">
          <h2>Connect Payment API Here </h2>
        </div>
        <form action="" className="space-y-3">
          <div className="space-y-2">
            <label htmlFor="">SSLCOMMERZ</label>
            <input type="text" className="inputclass" placeholder="xxx" />
          </div>
          <div className="space-y-2">
            <label htmlFor="">amarpay</label>
            <input type="text" className="inputclass" placeholder="xxx" />
          </div>

          <div className="space-y-2">
            <label htmlFor="">bKash</label>
            <input type="text" className="inputclass" placeholder="xxx" />
          </div>

          <div className="space-y-2">
            <label htmlFor="">Nagad</label>
            <input type="text" className="inputclass" placeholder="xxx" />
          </div>

          <div className="space-y-2">
            <label htmlFor="">Rocket</label>
            <input type="text" className="inputclass" placeholder="xxx" />
          </div>

          <div className="mt-10">
            <button type="submit" className="buttonclass">
              Save
            </button>
          </div>
        </form>
      </AppearenceLayout>
    </DefaultLayout>
  );
};

export default Payment;
