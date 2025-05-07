import { useState } from "react";
import { useDeleteUser, useSearchUsersByName } from "../../shared/hooks";
import toast from "react-hot-toast";
import { Input } from "../Input";

export const UserSearchAndDelete = () => {
  const [query, setQuery] = useState("");
  const [selectedUser, setSelectedUser] = useState(null);
  const [password, setPassword] = useState("");

  const { users = [], isLoading: isSearching, search } = useSearchUsersByName();
  const { deleteUser, loading: isDeleting } = useDeleteUser();

  const handleSearch = async (e) => {
    const value = e.target.value;
    setQuery(value);
    if (value.trim().length === 0) return;
    await search(value); 
  };

  const handleSelectUser = (user) => {
    setSelectedUser(user); 
  };

  const handleDelete = async () => {
    if (!selectedUser || !password) {
      return toast.error("Debe seleccionar un usuario y escribir su contraseña");
    }
    try {
      await deleteUser({ userId: selectedUser.uid, password });
      toast.success(`Usuario ${selectedUser.name} eliminado correctamente`);
      setSelectedUser(null);
      setPassword("");
      setQuery(""); 
    } catch (err) {
      console.error("Error al eliminar usuario:", err);
      toast.error("Error al eliminar usuario");
    }
  };

  return (
    <div>
      <h2>Buscar y eliminar usuario</h2>

      <Input
        field="search"
        label="Buscar Usuario"
        type="text"
        value={query}
        onChange={handleSearch}
      />

      {isSearching && <p>Buscando...</p>}

      {!isSearching && users.length > 0 && (
        <ul className="search-results">
          {users.map((user) => (
            <li
              key={user._id}
              onClick={() => handleSelectUser(user)}
              className={`search-item ${selectedUser?._id === user._id ? "selected" : ""}`}
            >
              {user.name}
            </li>
          ))}
        </ul>
      )}

      {selectedUser && (
        <div style={{ marginTop: "1rem" }}>
          <p style={{ fontStyle: "italic" }}>
            Usuario seleccionado: <strong>{selectedUser.name}</strong>
          </p>
          <input
            type="password"
            placeholder="Confirma tu contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button onClick={handleDelete} disabled={isDeleting}>
            {isDeleting ? "Eliminando..." : "Eliminar Usuario"}
          </button>
        </div>
      )}
    </div>
  );
};
