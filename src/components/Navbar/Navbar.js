import "../../style.css";
import Logo from "./Logo";
import Search from "./Search";
import NumResutls from "./NumResults";

function Navbar({movies}) {
  return (
    <nav className="nav-bar">
      <Logo />
      <Search />
      <NumResutls movie={movies} />
    </nav>
  );
}

export default Navbar;
