import { useEffect } from "react"
import { Navbar } from "../../components/navbars/Navbar"
import { LoadingSpinner } from "../../components/LoadingSpinner"

import { useUserDetails } from "../../shared/hooks"
import './dashboardPage.css'

export const DashboardPage = () => {





  return (
    <div className="dashboard-container">
        <Navbar />
    </div>
  )
}