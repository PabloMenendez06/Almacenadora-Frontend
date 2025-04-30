import { SidebarDemo } from "../../components/navbars/sidevbar"
import { LoadingSpinner } from "../../components/loadingSpinner"

import '../Page.css'

export const CategoryPage = () => {
  return (
    <div className="dashboard-container">
      <SidebarDemo className="sidebar-demo" />
      <div className="welcome-message">
        <h1>¡Bienvenido a categorias!</h1>
        <p>Gracias por usar nuestro sistema. Usa el menú lateral para navegar.</p>
      </div>
    </div>
  )
}