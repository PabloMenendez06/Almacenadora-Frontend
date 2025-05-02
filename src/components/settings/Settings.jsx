import { UserSettings } from "../user/UserSettings.jsx";
import { LoadingSpinner } from "../loadingSpinner.jsx";

export const Settings = () => {
    
    const { userSettings, isFetching, saveSettings } = useChannelSettings()

    if(isFetching){
        return <LoadingSpinner/>
    }

    return (
        <div className="settings-container">
            <span>Settings</span>
            <UserSettings settings={userSettings} saveSettings={saveSettings}/>
        </div>
    )
}