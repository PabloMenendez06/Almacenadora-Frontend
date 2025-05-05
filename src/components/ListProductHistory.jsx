import { useState } from "react";
import { useListHistory } from "../shared/hooks";
import { LoadingSpinner } from "./loadingSpinner";

export const ListProductHistory = () => {
  const [selected, setSelected] = useState([]);
  const { history, isLoading } = useListHistory();

  const toggleSelect = (id) =>
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((sid) => sid !== id) : [...prev, id]
    );

  if (isLoading) return <LoadingSpinner />;

  return (
    <div className="list-product-container">
      <h2 className="list-product-title">Historial de Retiros</h2>

      <div className="table-container">
        <table className="table">
          <thead>
            <tr>
              <th>Seleccionar</th>
              <th>Producto</th>
              <th>Cantidad</th>
              <th>Motivo</th>
              <th>Destino</th>
              <th>Empleado</th>
              <th>Fecha</th>
            </tr>
          </thead>
          <tbody>
            {history.map(
              ({ _id, productName, quantity, motive, destiny, employeeName, date }) => (
                <tr key={_id}>
                  <td>
                    <input
                      type="checkbox"
                      checked={selected.includes(_id)}
                      onChange={() => toggleSelect(_id)}
                    />
                  </td>
                  <td>{productName || "-"}</td>
                  <td>{quantity}</td>
                  <td>{motive || "-"}</td>
                  <td>{destiny || "-"}</td>
                  <td>{employeeName || "-"}</td>
                  <td>{new Date(date).toLocaleString()}</td>
                </tr>
              )
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};
