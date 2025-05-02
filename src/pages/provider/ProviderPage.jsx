import { SidebarDemo } from "../../components/navbars/sidevbar"
import { LoadingSpinner } from "../../components/loadingSpinner"
import {CreateProvider} from "../../components/CreateProvider"
import { useUserDetails } from "../../shared/hooks"

import '../Page.css'

export const ProviderPage = () => {

  const handleAuthPageToggle = () => {
    setIsLogin((prev) => !prev)
  }
  return (
    <div className="dashboard-container">
      <SidebarDemo className="sidebar-demo" />
      <div className="welcome-message">
        <h1>¡Bienvenido a proveedores!</h1>
        <p>Gracias por usar nuestro sistema. Usa el menú lateral para navegar.</p>
      </div>
      <CreateProvider switchAuthHandler={handleAuthPageToggle}/>
    </div>
  )
}