import { useCallback, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ListProviders } from "../../components/ListProvider";
import { CreateProvider } from "../../components/CreateProvider";
import { SidebarDemo } from "../../components/navbars/sidevbar";
import '../Page.css';

export const ProviderPage = () => {
  const [showForm, setShowForm] = useState(false);
  const [providerToEdit, setProviderToEdit] = useState(null);

  const handleOpenForm = useCallback(() => {
    setProviderToEdit(null);
    setShowForm(true);
  }, []);

  const handleCloseForm = useCallback(() => {
    setProviderToEdit(null);
    setShowForm(false);
  }, []);

  return (
    <div className="pro-container">
      <SidebarDemo />

      <div className="pro-content">
        <div className="header">
          <h1>Proveedores</h1>
          <button className="pro-button" onClick={handleOpenForm}>
            Registrar nuevo proveedor
          </button>
        </div>

        <div className="pro-body">
          <motion.div
            className="list-wrapper"
            animate={{ width: showForm ? "70%" : "100%" }}
            transition={{ type: "tween", duration: 0.3 }}
          >
            <ListProviders
              setProviderToEdit={setProviderToEdit}
              setShowForm={setShowForm}
            />
          </motion.div>

          <AnimatePresence>
            {showForm && (
              <motion.div
                className="form-panel"
                initial={{ x: "100%" }}
                animate={{ x: 0 }}
                exit={{ x: "100%" }}
                transition={{ type: "tween", duration: 0.3 }}
              >
                <CreateProvider
                  onClose={handleCloseForm}
                  providerToEdit={providerToEdit}
                  setProviderToEdit={setProviderToEdit}
                />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};
