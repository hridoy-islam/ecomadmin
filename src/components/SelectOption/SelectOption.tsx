import AsyncSelect from 'react-select/async';
import axiosInstance from '../../axios';

const SelectOption = ({ dataType, control, name }) => {
  const loadOptions = async (inputValue) => {
    try {
      const response = await axiosInstance.get(`/${dataType}?searchTerm=${inputValue}`);
      const data = response.data.data.result.map(item => ({
        value: item.id,
        label: item.name
      }));
      return data;
    } catch (error) {
      console.error(`Error fetching ${dataType}:`, error);
      return [];
    }
  };

  const handleChange = (selectedOption) => {
    control.setValue(name, selectedOption);
  };

  return (
    <AsyncSelect
      loadOptions={loadOptions}
      placeholder={name}
      isClearable
      cacheOptions
      onChange={(selectedOption) => {
        
        control.onChange(selectedOption);

        handleChange(selectedOption);
      }}
      
    />
  );
};

export default SelectOption;
