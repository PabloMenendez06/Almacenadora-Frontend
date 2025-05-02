import { SidebarDemo } from "../../components/navbars/sidevbar"
import { LoadingSpinner } from "../../components/loadingSpinner"

import '../Page.css'

export const HistoryPage = () => {
  return (
    <div className="dashboard-container">
      <SidebarDemo className="sidebar-demo" />
      <div className="welcome-message">
        <h1>¡Bienvenido al historial!</h1>
        <p>Gracias por usar nuestro sistema. Usa el menú lateral para navegar.</p>
      </div>
    </div>
  )
}