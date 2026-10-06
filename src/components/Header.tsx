"use client";

import { useState, useEffect } from "react";
import { IconSun, IconMoon } from "./Icons";

export default function Header() {
  const [open, setOpen] = useState(false);
  const [theme, setTheme] = useState("light");
  const [activeSection, setActiveSection] = useState("perfil");

  useEffect(() => {
    try {
      const stored = localStorage.getItem("theme");
      const systemPrefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
      const initialTheme = stored || (systemPrefersDark ? "dark" : "light");
      setTheme(initialTheme);
      document.documentElement.setAttribute("data-theme", initialTheme);
    } catch {}

    const handleScroll = () => {
      const sections = ["perfil", "experiencia", "herramientas", "cursos", "proyectos", "contacto"];
      const scrollPosition = window.scrollY + 180;

      for (const sectionId of sections) {
        const element = document.getElementById(sectionId);
        if (element) {
          const top = element.offsetTop;
          const height = element.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  function toggleTheme() {
    const next = theme === "light" ? "dark" : "light";
    setTheme(next);
    try {
      localStorage.setItem("theme", next);
    } catch {}
    document.documentElement.setAttribute("data-theme", next);
  }

  const navItems = [
    { id: "perfil", label: "Perfil" },
    { id: "experiencia", label: "Experiencia" },
    { id: "herramientas", label: "Herramientas" },
    { id: "cursos", label: "Cursos" },
    { id: "proyectos", label: "Proyectos" },
    { id: "contacto", label: "Contacto" }
  ];

  return (
    <div className="header-wrapper">
      <header className="site-nav">
        <a href="#perfil" className="brand">
          <span className="brand-dot" aria-hidden="true" />
          <span>AXEL MERCADO</span>
        </a>

        <button
          className={`mobile-toggle ${open ? "is-open" : ""}`}
          onClick={() => setOpen((isOpen) => !isOpen)}
          aria-label={open ? "Cerrar menú" : "Abrir menú"}
          aria-expanded={open}
          aria-controls="main-menu"
          type="button"
        >
          {open ? "✕" : "☰"}
        </button>

        <nav id="main-menu" className={`nav ${open ? "open" : ""}`}>
          {navItems.map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              className={`nav-link ${activeSection === item.id ? "active" : ""}`}
              onClick={() => setOpen(false)}
            >
              {item.label}
            </a>
          ))}

          <button className="theme-toggle" onClick={toggleTheme} type="button" aria-label="Cambiar tema">
            {theme === "dark" ? <IconSun /> : <IconMoon />}
            <span>{theme === "dark" ? "Modo claro" : "Modo oscuro"}</span>
          </button>
        </nav>
      </header>
    </div>
  );
}
