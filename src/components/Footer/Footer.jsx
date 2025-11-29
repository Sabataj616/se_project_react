import "./Footer.css";


function Footer() {
  return (
    <footer className="footer">
      <p>Developed by Tajgi Fields</p>
      <p>{new Date().getFullYear()}</p>
    </footer>
  );
}

export default Footer;
