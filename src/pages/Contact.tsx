import Breadcrumb from '../components/Breadcrumbs/Breadcrumb';
import ContactList from '../components/Contact/ContactList';
import DefaultLayout from '../layout/DefaultLayout';

const Contact = () => {
  return (
    <DefaultLayout>
      <Breadcrumb pageName="Contact Form" />
      <ContactList />
    </DefaultLayout>
  );
};

export default Contact;
