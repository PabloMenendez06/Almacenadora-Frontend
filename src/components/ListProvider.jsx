import { useState } from "react";
import { useListProviders } from "../shared/hooks";
import { useDeleteProvider } from "../shared/hooks";
import { LoadingSpinner } from "./loadingSpinner";
import toast from "react-hot-toast";

export const ListProviders = ({ setProviderToEdit, setShowForm }) => {
  const [selected, setSelected] = useState([]);
  const { providers, isLoading, refetch } = useListProviders();
  const { deleteProvider, isDeleting } = useDeleteProvider();

  const toggleSelect = (id) =>
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((sid) => sid !== id) : [...prev, id]
    );

  const handleDelete = async () => {
    if (selected.length === 0) {
      toast.error("Selecciona al menos un proveedor para eliminar");
      return;
    }

    if (!confirm("¿Estás seguro de eliminar el proveedor?")) return;

    const success = await deleteProvider(selected[0]);
    if (success) {
      setSelected([]);
      refetch(); 
    }
  };

  const handleEdit = () => {
    if (selected.length === 0) {
      toast.error("Selecciona un proveedor para editar");
      return;
    }

    const providerToEdit = providers.find((p) => p._id === selected[0]);
    if (!providerToEdit) {
      toast.error("Proveedor no encontrado");
      return;
    }

    setProviderToEdit(providerToEdit);
    setShowForm(true);
  };

  if (isLoading) return <LoadingSpinner />;

  return (
    <div className="list-provider-container">
      <h2 className="list-provider-title">Lista de Proveedores</h2>

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
              <th>Correo</th>
              <th>Número</th>
            </tr>
          </thead>
          <tbody>
            {providers.map(({ _id, name, email, number }) => (
              <tr key={_id}>
                <td>
                  <input
                    type="checkbox"
                    checked={selected.includes(_id)}
                    onChange={() => toggleSelect(_id)}
                  />
                </td>
                <td>{name}</td>
                <td>{email}</td>
                <td>{number}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
