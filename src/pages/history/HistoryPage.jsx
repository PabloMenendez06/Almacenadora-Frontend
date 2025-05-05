import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ListProductHistory } from "../../components/ListProductHistory";
import { RegisterProduct } from "../../components/RegisterProduct";
import { WithdrawProduct } from "../../components/RetireProduct";
import { SidebarDemo } from "../../components/navbars/sidevbar";
import "../Page.css";

export const HistoryPage = () => {
  const [showForm, setShowForm] = useState(false);
  const [formType, setFormType] = useState(null); // "register" | "withdraw"
  const [selectedProduct, setSelectedProduct] = useState(null);

  const handleOpenForm = useCallback((type) => {
    setSelectedProduct(null);
    setFormType(type);
    setShowForm(true);
  }, []);

  const handleCloseForm = useCallback(() => {
    setSelectedProduct(null);
    setShowForm(false);
    setFormType(null);
  }, []);

  return (
    <div className="pro-container">
      <SidebarDemo />

      <div className="pro-content">
        <div className="header">
          <h1>Historial de Retiros</h1>
          <div className="pro-button-group">
            <button
              className="pro-button"
              onClick={() => handleOpenForm("register")}
            >
              Registrar Producto
            </button>
            <button
              className="pro-button"
              onClick={() => handleOpenForm("withdraw")}
            >
              Registrar Retiro
            </button>
          </div>
        </div>

        <div className="pro-body">
          <motion.div
            className="list-wrapper"
            animate={{ width: showForm ? "70%" : "100%" }}
            transition={{ type: "tween", duration: 0.3 }}
          >
            <ListProductHistory />
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
                {formType === "register" && (
                  <RegisterProduct onClose={handleCloseForm} />
                )}
                {formType === "withdraw" && (
                  <WithdrawProduct onClose={handleCloseForm} />
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};
