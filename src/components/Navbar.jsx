import React, { useEffect, useRef, useState } from "react";
import menuData from "../content/global/menu.json";

const Navbar = ({
  className = "",
  classNameHideScroll = "",
  showMenu = true,
}) => {
  const [activeSection, setActiveSection] = useState("");
  const [scrollingDown, setScrollingDown] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const observerRef = useRef(null);

  // Implementación del IntersectionObserver para detectar secciones visibles
  useEffect(() => {
    const options = {
      root: null,
      rootMargin: "0px",
      threshold: 0.3, // Sección visible en un 30%
    };

    observerRef.current = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    }, options);

    // Observar cada sección
    const sections = document.querySelectorAll("section");
    sections.forEach((section) => {
      observerRef.current.observe(section);
    });

    // Limpiar observadores al desmontar
    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, []);

  // Detectar scroll para cambiar el background del navbar
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.pageYOffset;
      console.log(scrollY, scrollY > 50);
      // Cambiar el fondo del navbar si se ha desplazado más de 50px
      if (scrollY > 50) {
        setScrollingDown(true);
      } else {
        setScrollingDown(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Añadir comportamiento de scroll suave
  useEffect(() => {
    document.documentElement.style.scrollBehavior = "smooth";
    return () => {
      document.documentElement.style.scrollBehavior = "";
    };
  }, []);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <nav
      className={`p-4 fixed w-full z-10 top-0 transition-colors duration-500 ${className} ${
        scrollingDown ? "bg-secondary" : classNameHideScroll
      }`}
    >
      <div className="container mx-auto flex justify-between items-center px-4 xl:px-0">
        <a href="/" title="Hacktober Fest Gye">
          <img
            className="duration-300 ease-out"
            src="/images/logos/hacktoberfest.png"
            alt="Site Logo"
            style={{ maxHeight: scrollingDown ? "3em" : "4.5em" }}
          />
        </a>
        <div className="hidden md:flex space-x-4">
          {showMenu &&
            menuData.data.map((item, index) => (
              <a
                key={index}
                href={item.href}
                className={`navbar-link px-3 py-2 rounded-md ${
                  activeSection === item.href.split("#")[1]
                    ? "bg-primary text-black"
                    : "text-white hover:bg-secondary-blue"
                }`}
              >
                {item.title}
              </a>
            ))}
          {!showMenu && (
            <a
              href="/"
              className="navbar-link px-3 py-2 rounded-md text-white hover:bg-secondary-blue"
            >
              Inicio
            </a>
          )}
        </div>
        <div className="md:hidden">
          <button
            id="menu-toggle"
            className="text-white focus:outline-none"
            onClick={toggleMenu}
          >
            {menuOpen ? (
              <svg
                className="w-8 h-8"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            ) : (
              <svg
                className="w-8 h-8"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16m-7 6h7"
                />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Menú de navegación móvil */}
      <div
        id="mobile-menu"
        className={`md:hidden flex flex-col space-y-4 p-4 bg-secondary absolute left-0 top-16 w-full transition-all duration-500 ${
          menuOpen ? "block" : "hidden"
        }`}
      >
        {showMenu &&
          menuData.data.map((item, index) => (
            <a
              key={index}
              href={item.href}
              className={`navbar-link text-white block px-3 py-2 rounded-md ${
                activeSection === item.href.split("#")[1]
                  ? "bg-gray-300 text-black"
                  : ""
              }`}
              onClick={toggleMenu}
            >
              {item.title}
            </a>
          ))}

        {!showMenu && (
          <a
            href="/"
            className="navbar-link text-white block px-3 py-2 rounded-md"
          >
            Inicio
          </a>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
