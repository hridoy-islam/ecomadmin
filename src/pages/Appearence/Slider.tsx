
import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';
import DefaultLayout from '../../layout/DefaultLayout';
import { AppearenceLayout } from '../../layout/AppearenceLayout';
import { useState } from 'react';
const Appearence = () => {

  const [fields, setFields] = useState([]);

  const addField = () => {
    setFields([...fields, '']); // Adding an empty string as a new field
  };

  const handleFieldChange = (index, value) => {
    const newFields = [...fields];
    newFields[index] = value;
    setFields(newFields);
  };

  const removeField = (index) => {
    const newFields = [...fields];
    newFields.splice(index, 1);
    setFields(newFields);
  };

  return (
    <DefaultLayout>
      <Breadcrumb pageName="Website Appearence" />
      <AppearenceLayout>
      <div>
      <button onClick={addField} className='buttonclass'>Add New Slider</button>
      {fields.map((field, index) => (
        <div key={index}>
        <input
          value={field}
          className='border-b'
          type='file'
          onChange={(e) => handleFieldChange(index, e.target.value)}
        />
        <button onClick={() => removeField(index)}>Delete</button>
      </div>
      ))}
    </div>
      </AppearenceLayout>
    </DefaultLayout>
  );
};

export default Appearence;
