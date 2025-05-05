import { useCallback, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ListProducts } from "../../components/ListProduct";
import { CreateProduct } from "../../components/CreateProduct";
import { SidebarDemo } from "../../components/navbars/sidevbar";
import "../Page.css";

export const ProductPage = () => {
  const [showForm, setShowForm] = useState(false);
  const [productToEdit, setProductToEdit] = useState(null);

  const handleOpenForm = useCallback(() => {
    setProductToEdit(null);
    setShowForm(true);
  }, []);

  const handleCloseForm = useCallback(() => {
    setProductToEdit(null);
    setShowForm(false);
  }, []);

  return (
    <div className="pro-container">
      <SidebarDemo />

      <div className="pro-content">
        <div className="header">
          <h1>Productos</h1>
          <button className="pro-button" onClick={handleOpenForm}>
            Registrar nuevo producto
          </button>
        </div>

        <div className="pro-body">
          <motion.div
            className="list-wrapper"
            animate={{ width: showForm ? "70%" : "100%" }}
            transition={{ type: "tween", duration: 0.3 }}
          >
            <ListProducts
              setProductToEdit={setProductToEdit}
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
                <CreateProduct
                  onClose={handleCloseForm}
                  productToEdit={productToEdit}
                />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};
