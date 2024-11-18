import "./navbar.css";
export default function Navbar() {
  return (
    <nav>
      <a className="nav__branding">BOOKFINDER</a>
      <ul className="nav__lists">
        <li>
          <a href="/books">Books</a>
        </li>
        <li>
          <a href="/authors">Authors</a>
        </li>
      </ul>
    </nav>
  );
}
