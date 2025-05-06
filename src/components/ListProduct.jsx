import { useEffect, useState, useRef } from "react";
import {
  useListProducts,
  useDeleteProduct,
  useRecentProducts,
  useFilterProductsByCategory,
  useSearchProductsByName
} from "../shared/hooks";
import { LoadingSpinner } from "./loadingSpinner";
import toast from "react-hot-toast";

export const ListProducts = ({ setProductToEdit, setShowForm }) => {
  const [selected, setSelected] = useState([]);
  const [viewMode, setViewMode] = useState("all");
  const [categoryFilter, setCategoryFilter] = useState("");
  const [nameFilter, setNameFilter] = useState("");
  const shownMessages = useRef(new Set()); // <--- Corrección clave

  const { products: allProducts, isLoading: loadingAll, refetch } = useListProducts();
  const { products: recentProducts, isLoading: loadingRecent } = useRecentProducts();
  const {
    products: filteredProducts,
    isLoading: loadingFiltered,
    filter,
  } = useFilterProductsByCategory();
  const {
    products: filteredProductsN,
    isLoading: loadingFilteredN,
    search,
  } = useSearchProductsByName();
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
    const productList = getActiveProducts();
    const productToEdit = productList.find((p) => p._id === selected[0]);
    if (!productToEdit) return toast.error("Producto no encontrado");
    setProductToEdit(productToEdit);
    setShowForm(true);
  };

  const getActiveProducts = () => {
    if (viewMode === "recent") return recentProducts;
    if (viewMode === "category") return filteredProducts;
    if (viewMode === "name") return filteredProductsN;
    return allProducts;
  };

  const isLoading =
    (viewMode === "recent" && loadingRecent) ||
    (viewMode === "category" && loadingFiltered) ||
    (viewMode === "name" && loadingFilteredN) ||
    (viewMode === "all" && loadingAll);

  const handleCategorySearch = () => {
    if (!categoryFilter) return toast.error("Ingresa una categoría");
    setSelected([]);
    filter(categoryFilter);
  };

  const handleNameSearch = () => {
    if (!nameFilter) return toast.error("Ingresa un nombre");
    setSelected([]);
    search(nameFilter);
  };

  useEffect(() => {
    const activeProducts = getActiveProducts();

    activeProducts.forEach((product) => {
      if (product.stock < 5) {
        const stockMsg = `🛒 ${product.name} tiene bajo stock (${product.stock}).`;
        if (!shownMessages.current.has(stockMsg)) {
          toast.error(stockMsg);
          shownMessages.current.add(stockMsg);
        }
      }
      const daysToExpire =
        (new Date(product.expirationDate) - new Date()) / (1000 * 60 * 60 * 24);

      if (daysToExpire < 7) {
        const expireMsg = `⏰ ${product.name} está por expirar en (${Math.ceil(
          daysToExpire
        )} días).`;
        if (!shownMessages.current.has(expireMsg)) {
          toast.error(expireMsg);
          shownMessages.current.add(expireMsg);
        }
      }
    });
  }, [viewMode, allProducts, recentProducts, filteredProducts, filteredProductsN]);

  return (
    <div className="list-product-container">
      <h2 className="list-product-title">Lista de Productos</h2>

      <div className="filters" style={{ marginBottom: "1rem" }}>
        <label>
          <select
            value={viewMode}
            onChange={(e) => {
              setViewMode(e.target.value);
              setSelected([]);
              setCategoryFilter("");
              setNameFilter("");
            }}
          >
            <option value="all">Todos</option>
            <option value="recent">Recientes</option>
            <option value="category">Por Categoría</option>
            <option value="name">Por Nombre</option>
          </select>
        </label>

        {viewMode === "category" && (
          <div style={{ display: "inline-block", marginLeft: "1rem" }}>
            <input
              type="text"
              placeholder="Categoría"
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="input"
            />
            <button onClick={handleCategorySearch} className="search-button">
              Buscar
            </button>
          </div>
        )}

        {viewMode === "name" && (
          <div style={{ display: "inline-block", marginLeft: "1rem" }}>
            <input
              type="text"
              placeholder="Nombre"
              value={nameFilter}
              onChange={(e) => setNameFilter(e.target.value)}
              className="input"
            />
            <button onClick={handleNameSearch} className="search-button">
              Buscar
            </button>
          </div>
        )}
      </div>

      {selected.length > 0 && (
        <div className="action-buttons" style={{ marginBottom: "1rem" }}>
          <button className="edit-button" onClick={handleEdit}>Editar</button>
          <button className="delete-button" onClick={handleDelete} disabled={isDeleting}>
            {isDeleting ? "Eliminando..." : "Eliminar"}
          </button>
        </div>
      )}

      {isLoading ? (
        <LoadingSpinner />
      ) : (
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
              {getActiveProducts().map(
                ({
                  _id,
                  name,
                  description,
                  price,
                  stock,
                  provider,
                  category,
                  entryDate,
                  expirationDate,
                }) => (
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
                )
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};
