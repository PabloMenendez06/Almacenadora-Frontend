import React, { useEffect, useState } from "react";
import { getCategories, addCategory } from "../../services/api"; 
import { SidebarDemo } from "../../components/navbars/sidevbar";
import './category.css'

export const CategoryPage = () => {
  const [categories, setCategories] = useState([]); 
  const [newCategory, setNewCategory] = useState('');
  const [error, setError] = useState(''); 

  const fetchCategories = async () => {
    const data = await getCategories(); 
    if (data.error) {
      setError("Error al obtener las categorías");
    } else {
      setCategories(data.categories);  
    }
  };

  useEffect(() => {
    fetchCategories();  
  }, []); 

  const handleAddCategory = async () => {
    if (!newCategory.trim()) return; 

    const data = await addCategory(newCategory);  
    if (data.error) {
      setError("Error al agregar la categoría");
    } else {
      const newCategoryData = { name: newCategory, _id: data._id };  
      setCategories((prevCategories) => [...prevCategories, newCategoryData]);  
      setNewCategory('');  
    }
  };

  return (
    <div className="category-container">
      <SidebarDemo className="sidebar-demo" />
      
      <div className="category-content">
        {error && <div className="error-message" style={{ color: 'red' }}>{error}</div>}

        <div className="category-form">
          <input
            type="text"
            placeholder="Escribe el nombre de la categoría"
            value={newCategory}
            onChange={(e) => setNewCategory(e.target.value)}  
            className="category-input"
          />
          <button onClick={handleAddCategory} className="category-button">Agregar Categoría</button>
        </div>

        <div className="category-list">
          <h2>Lista de Categorías</h2>
          <ul>
                {categories.length > 0 ? (
                  categories.map((category, index) => (
                    <li key={category._id || `${category.name}-${index}`} className="category-item">{category.name}</li>
                  ))
                ) : (
                  <p>No hay categorías disponibles.</p>
                )}
          </ul>
        </div>
      </div>
    </div>
  );
};
