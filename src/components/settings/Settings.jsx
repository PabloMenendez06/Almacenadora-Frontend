import { useUserSettings} from "../../shared/hooks";
import { UserSettings } from "../user/UserSettings.jsx";
import { LoadingSpinner } from "../loadingSpinner.jsx";
import { PasswordSettings } from "./PasswordSettings";


export const Settings = () => {
    
    const { userSettings, isFetching, saveSettings } = useUserSettings()

    if(isFetching){
        return <LoadingSpinner/>
    }

    return (
        <div className="settings-container">
            <span>Settings</span>
            <UserSettings settings={userSettings} saveSettings={saveSettings}/>
            <PasswordSettings />
            <h1>holaaaaaa</h1>
        </div>
    )
}