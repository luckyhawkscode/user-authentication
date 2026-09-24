import { useState } from "react";
import { NavLink } from "react-router-dom";

const navLinks = [
  { name: "Home",      path: "/" },
  { name: "User data",     path: "/userdata" },
  { name: "Blacklist", path: "/blacklist" },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  const linkClass = ({ isActive }) =>
    `px-5 py-2 rounded-xl text-sm font-semibold transition-all duration-200
    ${isActive
      ? "bg-gradient-to-r from-emerald-400 to-lime-400 text-emerald-900 shadow-md shadow-emerald-900/30"
      : "text-emerald-200 hover:text-white hover:bg-white/10"
    }`;

  const mobileLinkClass = ({ isActive }) =>
    `w-full block px-4 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200
    ${isActive
      ? "bg-gradient-to-r from-emerald-400 to-lime-400 text-emerald-900"
      : "text-emerald-200 hover:text-white hover:bg-white/10"
    }`;

  return (
    <nav
      className="w-full px-6 md:px-12 py-4 flex items-center justify-between relative z-50"
      style={{ background: "linear-gradient(90deg, #064e3b 0%, #065f46 50%, #166534 100%)" }}
    >
      {/* Logo */}
      <NavLink to="/" className="flex items-center gap-2.5 no-underline">
        <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-emerald-400 to-lime-400 flex items-center justify-center shadow-md shadow-emerald-900/40">
          <span className="text-emerald-900 font-extrabold text-base">F</span>
        </div>
        <span className="text-white font-bold text-lg tracking-wide">
          Feed<span className="text-lime-400">back</span>
        </span>
      </NavLink>

      {/* Desktop Nav Links */}
      <ul className="hidden md:flex items-center gap-1 list-none m-0 p-0">
        {navLinks.map((link) => (
          <li key={link.name}>
            <NavLink to={link.path} className={linkClass} end={link.path === "/"}>
              {link.name}
            </NavLink>
          </li>
        ))}
      </ul>

      {/* Mobile Hamburger */}
      <button
        className="md:hidden flex flex-col gap-1.5 p-2 rounded-lg hover:bg-white/10 transition-colors"
        onClick={() => setMenuOpen(!menuOpen)}
        aria-label="Toggle menu"
      >
        <span className={`block w-5 h-0.5 bg-white transition-all duration-300 origin-center ${menuOpen ? "rotate-45 translate-y-2" : ""}`} />
        <span className={`block w-5 h-0.5 bg-white transition-all duration-300 ${menuOpen ? "opacity-0" : ""}`} />
        <span className={`block w-5 h-0.5 bg-white transition-all duration-300 origin-center ${menuOpen ? "-rotate-45 -translate-y-2" : ""}`} />
      </button>

      {/* Mobile Menu */}
      {menuOpen && (
        <div
          className="absolute top-full left-0 w-full md:hidden shadow-xl z-50 py-4 px-6"
          style={{ background: "linear-gradient(180deg, #065f46 0%, #064e3b 100%)" }}
        >
          <ul className="flex flex-col gap-1 list-none m-0 p-0">
            {navLinks.map((link) => (
              <li key={link.name}>
                <NavLink
                  to={link.path}
                  className={mobileLinkClass}
                  onClick={() => setMenuOpen(false)}
                  end={link.path === "/"}
                >
                  {link.name}
                </NavLink>
              </li>
            ))}
          </ul>
        </div>
      )}
    </nav>
  );
}