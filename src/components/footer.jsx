import '../styles/App.scss';
import logo from '../assets/logo.png';

function Footer () {
    const footerText = "MB Studio — Architectes du web depuis 2025";
 return (
    <footer className="footer">
        <div className="content-logo-footer">
        <img src={logo} alt="" className="logo-footer" />
        <p>{footerText}</p>
        </div>
        <div className="content-link-footer"></div>
    </footer>
 );
}

export default Footer;