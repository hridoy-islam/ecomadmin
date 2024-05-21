import { useState, useEffect } from 'react';
import axiosInstance from '../../axios';

const CategoryCheckbox = ({ category, handleCheck, checkedCategories }) => {
  const isChecked = checkedCategories.includes(category.id);

  return (
    <div style={{ marginLeft: `${category.parent_id ? '20px' : '0'}` }}>
      <input
        type="checkbox"
        checked={isChecked}
        onChange={() => handleCheck(category.id)}
      />
      <label>{category.name}</label>
      {category.children && (
        <div style={{ marginLeft: '20px' }}>
          {category.children.map(child => (
            <CategoryCheckbox
              key={child.id}
              category={child}
              handleCheck={handleCheck}
              checkedCategories={checkedCategories}
            />
          ))}
        </div>
      )}
    </div>
  );
};

const CategoryChecklist = () => {
  const [categories, setCategories] = useState([]);
  const [checkedCategories, setCheckedCategories] = useState([]);

  useEffect(() => {
    // Fetch categories from API
    axiosInstance.get('/categories')
      .then(response => {
        setCategories(response.data.data.result);
      })
      .catch(error => {
        console.error('Error fetching categories:', error);
      });
  }, []);

  const handleCheck = (categoryId) => {
    const newCheckedCategories = checkedCategories.includes(categoryId)
      ? checkedCategories.filter(id => id !== categoryId)
      : [...checkedCategories, categoryId];
    setCheckedCategories(newCheckedCategories);
  };

  return (
    <div>
      <h2>Categories</h2>
      {categories.map(category => (
        <CategoryCheckbox
          key={category.id}
          category={category}
          handleCheck={handleCheck}
          checkedCategories={checkedCategories}
        />
      ))}
    </div>
  );
};

export default CategoryChecklist;
