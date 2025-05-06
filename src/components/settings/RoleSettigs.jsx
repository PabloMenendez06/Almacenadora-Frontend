import { useState } from "react";
import { useUpdateUser,useSearchUsersByName } from "../../shared/hooks";
import { InputWithField } from "../Input";
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
        const updated = await updateUser({ _id: user._id, role: "ADMIN" });
        toast.success(`${updated.name} ahora es ADMIN`);
        setSelectedUser(updated);
      } catch (error) {
        console.error("Error al cambiar el rol:", error);
      }
    };
  
    return (
      <div>
        <h2>Asignar rol ADMIN automáticamente</h2>
  
        <input
          type="text"
          placeholder="Buscar usuario por nombre"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button onClick={handleSearch} disabled={isSearching}>
          Buscar
        </button>
  
        {isSearching && <p>Buscando...</p>}
  
        {!isSearching && users.length > 0 && (
          <ul className="search-results">
            {users.map((user) => (
              <li
                key={user._id}
                onClick={() => handleSelectUser(user)}
                className={`search-item ${selectedUser?._id === user._id ? "selected" : ""}`}
              >
                {user.name} ({user.role})
              </li>
            ))}
          </ul>
        )}
  
        {selectedUser && (
          <div style={{ marginTop: "1rem" }}>
            <p style={{ fontStyle: "italic" }}>
              Usuario seleccionado: <strong>{selectedUser.name}</strong>
            </p>
            <p>Rol actual: <strong>{selectedUser.role}</strong></p>
          </div>
        )}
      </div>
    );
  };