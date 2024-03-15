import Nav from "./Nav.jsx";
import "./Header.css";

function Header() {
  return (
    <header>
      <div className="app-name-container">
        <h1>NoteApp</h1>
      </div>
      <Nav />
    </header>
  );
}

export default Header;
