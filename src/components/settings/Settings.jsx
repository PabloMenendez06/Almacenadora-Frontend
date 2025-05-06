import { useUserSettings } from "../../shared/hooks";
import { UserSettings } from "../user/UserSettings.jsx";
import { LoadingSpinner } from "../loadingSpinner.jsx";
import { PasswordSettings } from "./PasswordSettings";
import { SidebarDemo } from "../../components/navbars/sidevbar.jsx"; 

import '../../pages/dashboard/dashboardPage.css';

export const Settings = () => {
    const { userSettings, isFetching, saveSettings } = useUserSettings();

    if (isFetching) {
        return <LoadingSpinner />;
    }

    return (
        <div className="settings-wrapper">
            <SidebarDemo />
            <div className="settings-container">
                <span>Settings</span>
                <h1>contactase con el admin para que le haga admin (Desde el Backend)</h1 >
                <h1>contactase con el admin para que elimine usuarios (Desde el Backend)</h1 >
                <UserSettings settings={userSettings} saveSettings={saveSettings} />
                <PasswordSettings />
            </div>
        </div>
    );    
};
