import { useEffect, useState, useCallback } from "react";
import { listProviders } from "../services";
import { useDeleteProvider } from "../shared/hooks";
import { LoadingSpinner } from "./loadingSpinner";
import toast from "react-hot-toast";

export const ListProviders = ({ setProviderToEdit, setShowForm }) => {
  const [providers, setProviders] = useState([]);
  const [selected, setSelected] = useState([]);
  const [loading, setLoading] = useState(true);
  const { deleteProvider, isDeleting } = useDeleteProvider();

  const fetchProviders = useCallback(async () => {
    setLoading(true);
    try {
      const { success, providers } = await listProviders();
      success ? setProviders(providers) : toast.error("No se pudieron cargar los proveedores");
    } catch {
      toast.error("Error al cargar proveedores");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchProviders();
  }, [fetchProviders]);

  const toggleSelect = (id) =>
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((sid) => sid !== id) : [...prev, id]
    );

  const handleDelete = async () => {
    if (selected.length === 0) return toast.error("Selecciona al menos un proveedor para eliminar");
    if (!confirm("¿Estás seguro de eliminar el proveedor?")) return;

    const success = await deleteProvider(selected[0]);
    if (success) {
      setSelected([]);
      fetchProviders();
    }
  };
  const handleEdit = () => {
    if (selected.length === 0) return toast.error("Selecciona un proveedor para editar");

    const providerToEdit = providers.find((p) => p._id === selected[0]);
    if (!providerToEdit) return toast.error("Proveedor no encontrado");

    setProviderToEdit(providerToEdit);
    setShowForm(true);
  };

  if (loading) return <LoadingSpinner />;

  return (
    <div className="list-provider-container">
      <h2 className="list-provider-title">Lista de Proveedores</h2>

      {selected.length > 0 && (
        <div className="action-buttons" style={{ marginBottom: "1rem" }}>
          <button className = "edit-button" onClick={handleEdit}>Editar</button>
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
