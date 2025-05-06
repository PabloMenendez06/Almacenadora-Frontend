import { useEffect, useState } from "react";
import { getProductHistory } from "../../services/api";
import { SidebarDemo } from "../../components/navbars/sidevbar";
import { Bar, Pie } from "react-chartjs-2";
import "chart.js/auto";
import "./StatisticsPage.css";

export const StatisticsPage = () => {
  const [mostMoved, setMostMoved] = useState([]);
  const [activityStats, setActivityStats] = useState({});

  useEffect(() => {
    const fetchData = async () => {
        const data = await getProductHistory();
        if (!data || data.error) return;
      
        const counts = {};
      
        data.history.forEach((entry) => {
          const productName = entry.productName || "Desconocido";
          counts[productName] = (counts[productName] || 0) + 1;
        });
      
        const sorted = Object.entries(counts)
          .sort((a, b) => b[1] - a[1])
          .map(([name, movements]) => ({ name, movements }))
          .slice(0, 5);
      
          let highActivity = 0;
          let lowActivity = 0;
          
          Object.entries(counts).forEach(([_, movements]) => {
            if (movements > 2) {
              highActivity += 1;
            } else {
              lowActivity += 1;
            }
          });          
      
        setMostMoved(sorted);
        setActivityStats({ highActivity, lowActivity });
      };
      
      
      

    fetchData();
  }, []);

  const barData = {
    labels: mostMoved.map((p) => p.name),
    datasets: [
      {
        label: "Movimientos",
        data: mostMoved.map((p) => p.movements),
        backgroundColor: "#5E8271",
      },
    ],
  };

  const pieData = {
    labels: ["Alta actividad", "Baja actividad"],
    datasets: [
      {
        data: [activityStats.highActivity, activityStats.lowActivity],
        backgroundColor: ["#33454E", "#9E9C71"],
      },
    ],
  };

  return (
    <div className="dashboard-container">
      <SidebarDemo />
      <div className="statistics-content">
        <h2>Estadísticas de Productos</h2>
        <div className="chart-section">
          <h3>Productos más movidos</h3>
          <Bar data={barData} />
        </div>
        <div className="chart-section">
          <h3>Actividad de productos</h3>
          <Pie data={pieData} />
        </div>
      </div>
    </div>
  );
};
