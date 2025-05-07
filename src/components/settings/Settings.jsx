import { useUserSettings } from "../../shared/hooks";
import { UserSettings } from "../user/UserSettings.jsx";
import { LoadingSpinner } from "../loadingSpinner.jsx";
import { PasswordSettings } from "./PasswordSettings";
import { SidebarDemo } from "../../components/navbars/sidevbar.jsx";
import { UserSearchAndDelete } from "./DeleteSettings.jsx";
import { RoleSettings } from "./RoleSettigs.jsx";
import "../../pages/dashboard/dashboardPage.css";

export const Settings = () => {
    const { userSettings, isFetching, saveSettings } = useUserSettings();

    if (isFetching) {
        return <LoadingSpinner />;
    }

    const user = JSON.parse(localStorage.getItem("user"));
    const isAdmin = user?.role === "ADMIN";

    return (
        <div className="settings-wrapper">
            <SidebarDemo />
            <div className="settings-container">
                <span>Settings</span>

                {!isAdmin && (
                    <>
                        <p className="admin-msg">Contacte al administrador para cambiar su rol.</p>
                    </>
                )}

                <UserSettings settings={userSettings} saveSettings={saveSettings} />
                <PasswordSettings />

                {isAdmin && (
                    <>
                        <UserSearchAndDelete />
                        <RoleSettings />
                    </>
                )}
            </div>
        </div>
    );
};
