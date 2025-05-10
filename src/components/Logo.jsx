import logo from '../assets/img/logo_size_invert.jpg';

export const Logo = ({text}) => {
    return (
        <div className="auth-form-logo-container">
            <img src={logo} alt="Escudo kinal" />
            <span>{text}</span>
        </div>
    )
}