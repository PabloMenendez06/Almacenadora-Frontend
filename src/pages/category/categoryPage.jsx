import React, { useEffect, useState } from "react";
import { getCategories, addCategory } from "../../services/api"; // Asegúrate de tener estas funciones en api.js
import { SidebarDemo } from "../../components/navbars/sidevbar";
import './category.css'

export const CategoryPage = () => {
  const [categories, setCategories] = useState([]); // Estado de categorías
  const [newCategory, setNewCategory] = useState(''); // Estado para el nombre de la nueva categoría
  const [error, setError] = useState(''); // Estado para manejar errores

  // Función para obtener las categorías
  const fetchCategories = async () => {
    const data = await getCategories(); // Obtener las categorías de la API
    if (data.error) {
      setError("Error al obtener las categorías");
    } else {
      setCategories(data.categories);  // Actualizamos el estado con las categorías obtenidas
    }
  };

  useEffect(() => {
    fetchCategories();  // Llamar a la API para obtener las categorías al cargar el componente
  }, []); // Solo se ejecuta una vez al cargar el componente

  // Función para agregar una categoría
  const handleAddCategory = async () => {
    if (!newCategory.trim()) return; // Si el nombre está vacío, no hacemos nada

    const data = await addCategory(newCategory);  // Llamamos a la función de agregar categoría
    if (data.error) {
      setError("Error al agregar la categoría");
    } else {
      // Actualizamos las categorías directamente agregando la nueva categoría
      const newCategoryData = { name: newCategory, _id: data._id };  // Usamos el _id generado por el backend
      setCategories((prevCategories) => [...prevCategories, newCategoryData]);  // Añadimos la nueva categoría a la lista
      setNewCategory('');  // Limpiamos el input
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
            onChange={(e) => setNewCategory(e.target.value)}  // Actualizamos el nombre de la nueva categoría
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
