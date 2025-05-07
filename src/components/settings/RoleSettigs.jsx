import { useState } from "react";
import { useUpdateUser, useSearchUsersByName } from "../../shared/hooks";
import toast from "react-hot-toast";

export const RoleSettings = () => {
  const [query, setQuery] = useState("");
  const [selectedUser, setSelectedUser] = useState(null);

  const { users = [], isLoading: isSearching, search } = useSearchUsersByName();
  const { updateUser, loading: isUpdating } = useUpdateUser();

  const handleSearch = () => {
    if (query.trim()) search(query);
  };

  const handleSelectUser = async (user) => {
    if (user.role === "ADMIN") {
      toast("Este usuario ya es ADMIN");
      setSelectedUser(user);
      return;
    }

    try {
      console.log("Usuario seleccionado para actualizar rol:", user);
      const updated = await updateUser({ _id: user.uid,role: "ADMIN" });
      console.log("Respuesta del backend:", updated);

      toast.success(`${updated.username} ahora es ADMIN`);
      setSelectedUser(updated);
    } catch (error) {
      console.error("Error al cambiar el rol:", error);
      toast.error("Ocurrió un error al cambiar el rol");
    }
  };

  return (
    <div>
      <h2>Asignar rol ADMIN automáticamente</h2>

      <input
        type="text"
        placeholder="Buscar usuario por ID o nombre"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <button onClick={handleSearch} disabled={isSearching}>
        Buscar
      </button>

      {isSearching && <p>Buscando...</p>}

      {!isSearching && users.length > 0 && (
        <ul className="search-results">
          {users.map((user) => {
            console.log(user);
            return (
              <li
                key={user._id || user.username}
                onClick={() => handleSelectUser(user)}
                className={`search-item ${selectedUser?.username === user.username ? "selected" : ""}`}
              >
                {user.username} - {user.email}
              </li>
            );
          })}
        </ul>
      )}

      {selectedUser && (
        <div style={{ marginTop: "1rem" }}>
          <p style={{ fontStyle: "italic" }}>
            Usuario seleccionado: <strong>{selectedUser.username}</strong>
          </p>
          <p>Correo: <strong>{selectedUser.email}</strong></p>
          <p>Rol actual: <strong>{selectedUser.role}</strong></p>
          <p>ID: <strong>{selectedUser._id}</strong></p>
        </div>
      )}
    </div>
  );
};
