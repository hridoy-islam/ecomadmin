
import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';
import DefaultLayout from '../../layout/DefaultLayout';
import { AppearenceLayout } from '../../layout/AppearenceLayout';
const Appearence = () => {
  return (
    <DefaultLayout>
      <Breadcrumb pageName="Website Appearence" />
      <AppearenceLayout>
      <form action="" className='space-y-2'>
            <label htmlFor="" className="mb-3 block text-black dark:text-white">Website Name</label>
                <input type="text" className='inputclass' placeholder='Website Name'/>
            <label htmlFor="" className="mb-3 block text-black dark:text-white">Phone Number</label>
            <input type="text" className='inputclass' placeholder='Phone Number'/>
            <label htmlFor="" className="mb-3 block text-black dark:text-white">Facebook </label>
            <input type="text" className='inputclass' placeholder='Facebook Link'/>
            <label htmlFor="" className="mb-3 block text-black dark:text-white">Instagram </label>
            <input type="text" className='inputclass' placeholder='Instagram Link'/>
            <label htmlFor="" className="mb-3 block text-black dark:text-white">Pinterest </label>
            <input type="text" className='inputclass' placeholder='Pinterest Link'/>
            <label htmlFor="" className="mb-3 block text-black dark:text-white">Youtube </label>
            <input type="text" className='inputclass' placeholder='Youtube Link'/>

            <button type='submit' className='buttonclass'>Save</button>
          </form>
      </AppearenceLayout>
    </DefaultLayout>
  );
};

export default Appearence;
