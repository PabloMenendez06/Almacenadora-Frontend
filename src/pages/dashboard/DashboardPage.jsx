import { useEffect } from "react"
import { SidebarDemo } from "../../components/navbars/sidevbar"
import { LoadingSpinner } from "../../components/loadingSpinner"

import { useUserDetails } from "../../shared/hooks"
import './dashboardPage.css'

export const DashboardPage = () => {





  return (
    <div className="dashboard-container">
        <SidebarDemo />
    </div>
  )
}