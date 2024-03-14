import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faGithub,
  faLinkedin,
  faMedium,
} from "@fortawesome/free-brands-svg-icons";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import "./Footer.css";

function Footer() {
  return (
    <footer className="app-footer">
      <div className="social-links">
        <a
          href="https://github.com/dxtaner"
          target="_blank"
          rel="noopener noreferrer">
          <FontAwesomeIcon icon={faGithub} /> GitHub
        </a>
        <a
          href="https://www.linkedin.com/in/tanerozer16/"
          target="_blank"
          rel="noopener noreferrer">
          <FontAwesomeIcon icon={faLinkedin} /> LinkedIn
        </a>
        <a
          href="https://medium.com/@dxtaner"
          target="_blank"
          rel="noopener noreferrer">
          <FontAwesomeIcon icon={faMedium} /> Medium
        </a>
      </div>

      <p>
        Ayrıca, e-posta ile iletişime geçmek için aşağıdaki bağlantıyı
        kullanabilirsiniz
      </p>
      <a
        href="mailto:tanerozer16@gmail.com"
        target="_blank"
        rel="noopener noreferrer">
        <FontAwesomeIcon icon={faEnvelope} /> tanerozer16@gmail.com
      </a>

      <p>
        Bu proje{" "}
        <a
          href="https://github.com/dxtaner"
          target="_blank"
          rel="noopener noreferrer"
          className="github-link">
          dxtaner
        </a>{" "}
        tarafından tasarlanmıştır.
      </p>
    </footer>
  );
}

export default Footer;
