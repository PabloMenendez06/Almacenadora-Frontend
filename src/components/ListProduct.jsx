import { useState } from "react";
import { useDeleteProduct, useListProducts } from "../shared/hooks";
import { LoadingSpinner } from "./loadingSpinner";
import toast from "react-hot-toast";

export const ListProducts = ({ setProductToEdit, setShowForm }) => {
  const [selected, setSelected] = useState([]);
  const { products, isLoading, refetch } = useListProducts();
  const { deleteProduct, isDeleting } = useDeleteProduct();

  const toggleSelect = (id) =>
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((sid) => sid !== id) : [...prev, id]
    );

  const handleDelete = async () => {
    if (selected.length === 0) return toast.error("Selecciona al menos un producto para eliminar");
    if (!confirm("¿Estás seguro de eliminar el producto?")) return;

    const success = await deleteProduct(selected[0]);
    if (success) {
      setSelected([]);
      refetch();
    }
  };

  const handleEdit = () => {
    if (selected.length === 0) return toast.error("Selecciona un producto para editar");

    const productToEdit = products.find((p) => p._id === selected[0]);
    if (!productToEdit) return toast.error("Producto no encontrado");

    setProductToEdit(productToEdit);
    setShowForm(true);
  };

  if (isLoading) return <LoadingSpinner />;

  return (
    <div className="list-product-container">
      <h2 className="list-product-title">Lista de Productos</h2>

      {selected.length > 0 && (
        <div className="action-buttons" style={{ marginBottom: "1rem" }}>
          <button className="edit-button" onClick={handleEdit}>Editar</button>
          <button className="delete-button" onClick={handleDelete} disabled={isDeleting}>
            {isDeleting ? "Eliminando..." : "Eliminar"}
          </button>
        </div>
      )}

      <div className="table-container">
        <table className="table">
          <thead>
            <tr>
              <th>Seleccionar</th>
              <th>Nombre</th>
              <th>Descripción</th>
              <th>Precio</th>
              <th>Stock</th>
              <th>Proveedor</th>
              <th>Categoría</th>
              <th>Entrada</th>
              <th>Expiración</th>
            </tr>
          </thead>
          <tbody>
            {products.map(({ _id, name, description, price, stock, provider, category, entryDate, expirationDate }) => (
                <tr key={_id}>
                <td>
                    <input
                    type="checkbox"
                    checked={selected.includes(_id)}
                    onChange={() => toggleSelect(_id)}
                    />
                </td>
                <td>{name}</td>
                <td>{description}</td>
                <td>${price}</td>
                <td>{stock}</td>
                <td>{provider?.name || "-"}</td>
                <td>{category?.name || "-"}</td>
                <td>{new Date(entryDate).toLocaleDateString()}</td>
                <td>{new Date(expirationDate).toLocaleDateString()}</td>
                </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
