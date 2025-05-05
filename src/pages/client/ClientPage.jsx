import React, { useState, useEffect } from "react";
import { createClient, listClients, deleteClient, updateClient } from "../../services/api";
import toast from "react-hot-toast";
import { SidebarDemo } from "../../components/navbars/sidevbar";
import './Client.css';

export const ClientPage = () => {
  const [clients, setClients] = useState([]);
  const [newClient, setNewClient] = useState({
    name: "",
    email: "",
    nit: "",
    phone: "",
  });
  const [editClient, setEditClient] = useState(null); 
  const [error, setError] = useState('');

  const fetchClients = async () => {
    const data = await listClients();
    if (data.error) {
      setError("Error al obtener los clientes");
    } else {
      setClients(data.clients);  
    }
  };

  useEffect(() => {
    fetchClients();  
  }, []);

  const handleAddClient = async (e) => {
    e.preventDefault();
    const { name, email, nit, phone } = newClient;

    if (!name || !email || !nit || !phone) {
      setError("Todos los campos son obligatorios");
      return;
    }

    const response = await createClient(newClient);
    if (response.error) {
      toast.error("Error al agregar el cliente.");
    } else {
      toast.success("Cliente creado correctamente");
      setNewClient({ name: "", email: "", nit: "", phone: "" });
      fetchClients();  
    }
  };

  const handleDeleteClient = async (id) => {
    const response = await deleteClient(id);
    if (response.error) {
      toast.error("Error al eliminar el cliente.");
    } else {
      toast.success("Cliente eliminado correctamente");
      fetchClients();  
    }
  };

  const handleUpdateClient = async (e) => {
    e.preventDefault();
    const { name, email, nit, phone } = editClient;

    if (!name || !email || !nit || !phone) {
      setError("Todos los campos son obligatorios !");
      return;
    }

    const response = await updateClient(editClient._id, editClient);
    if (response.error) {
      toast.error("Error al actualizar el cliente.");
    } else {
      toast.success("Cliente actualizado correctamente");
      setEditClient(null); 
      fetchClients();  
    }
  };

  const handleEditClient = (client) => {
    setEditClient(client);
  };

  return (
    <div className="dashboard-container">
      <SidebarDemo className="sidebar-demo" />
      <div className="client-page-content">
        {error && <div className="error-message">{error}</div>}

        <div className="client-form">
          <h2>{editClient ? "Actualizar Cliente" : "Crear Cliente"}</h2>
          <form onSubmit={editClient ? handleUpdateClient : handleAddClient}>
            <input
              type="text"
              placeholder="Nombre"
              value={editClient ? editClient.name : newClient.name}
              onChange={(e) => editClient ? setEditClient({ ...editClient, name: e.target.value }) : setNewClient({ ...newClient, name: e.target.value })}
            />
            <input
              type="email"
              placeholder="Correo electrónico"
              value={editClient ? editClient.email : newClient.email}
              onChange={(e) => editClient ? setEditClient({ ...editClient, email: e.target.value }) : setNewClient({ ...newClient, email: e.target.value })}
            />
            <input
              type="text"
              placeholder="NIT"
              value={editClient ? editClient.nit : newClient.nit}
              onChange={(e) => editClient ? setEditClient({ ...editClient, nit: e.target.value }) : setNewClient({ ...newClient, nit: e.target.value })}
            />
            <input
              type="text"
              placeholder="Teléfono"
              value={editClient ? editClient.phone : newClient.phone}
              onChange={(e) => editClient ? setEditClient({ ...editClient, phone: e.target.value }) : setNewClient({ ...newClient, phone: e.target.value })}
            />
            <button type="submit">{editClient ? "Actualizar Cliente" : "Agregar Cliente"}</button>
          </form>
        </div>

        <div className="client-list">
          <h2>Lista de Clientes</h2>
          <ul>
            {clients.length > 0 ? (
              clients.map((client) => (
                <li key={client._id} className="client-item">
                  <p><strong>Nombre:</strong> {client.name}</p>
                  <p><strong>Correo electrónico:</strong> {client.email}</p>
                  <p><strong>NIT:</strong> {client.nit}</p>
                  <p><strong>Teléfono:</strong> {client.phone}</p>
                  <button onClick={() => handleEditClient(client)}>Editar</button>
                  <button onClick={() => handleDeleteClient(client._id)}>Eliminar</button>
                </li>
              ))
            ) : (
              <p>No hay clientes disponibles.</p>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};
