import { useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from '../../assets/img/logo_size.jpg'
import { useUserDetails } from "../../shared/hooks";

export const Navbar = () => {
    const { isLogged, logout } = useUserDetails();
    const navigate = useNavigate();
    const [menuOpen, setMenuOpen] = useState(false);

    const handleNavigate = (path) => {
        navigate(path);
        setMenuOpen(false);
    };

    const handleLogout = () => {
        logout();
        setMenuOpen(false);
    };

    return (
        <div className="nav-container">
            <div className="nav-logo-container" onClick={() => handleNavigate("/")}>
                <img className="nav-logo" src={logo} alt="Logo almacen" />
                <span className="nav-title">Almacén</span>
                <div className="mobile-toggle" onClick={() => setMenuOpen(!menuOpen)}>
                    ☰
                </div>
            </div>

            <div className={`nav-buttons-container ${menuOpen ? "open" : ""}`}>
                {!isLogged ? (
                    <span className="nav-button" onClick={() => handleNavigate("/auth")}>Login</span>
                ) : (
                    <>
                        <span></span>
                        <span className="nav-button" onClick={() => handleNavigate("/settings")}>My Account</span>
                        <span className="nav-button" onClick={handleLogout}>Logout</span>
                    </>
                )}
            </div>
        </div>
    );
};
