"use client";

import { useState } from "react";
import { Blobatar } from "@blobatar/react";
import { useGaze } from "@blobatar/react/gaze";
import type { IconType } from "react-icons";
import {
  SiCplusplus,
  SiCss,
  SiGit,
  SiGithub,
  SiHtml5,
  SiJavascript,
  SiPhp,
  SiPostgresql,
  SiPython,
  SiReact,
  SiSharp,
  SiTypescript,
  SiAngular,
  SiNodedotjs,
  SiLaravel,
  SiMongodb,
  SiMysql,
  SiVercel,
  SiUnity,
  SiArduino,
  SiPrisma,
  SiSwagger,
  SiHostinger,
  SiIntellijidea,
  SiNpm
} from "react-icons/si";
import { VscCode } from "react-icons/vsc";
import {
  FaWhatsapp,
  FaEnvelope,
  FaMapMarkerAlt,
  FaGraduationCap,
  FaExternalLinkAlt,
  FaMobileAlt,
  FaDesktop,
  FaChevronLeft,
  FaChevronRight,
  FaJava,
  FaTerminal,
  FaInfoCircle
} from "react-icons/fa";
import "blobatar/motion.css";
import "blobatar/gaze.css";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Chatbot from "../components/Chatbot";

interface Technology {
  name: string;
  icon: IconType;
  color: string;
  category: "Web & Frontend" | "Backend & Frameworks" | "Bases de Datos & ORMs" | "Móvil, IoT & 3D" | "Herramientas & Cloud";
}

const technologyData: Technology[] = [
  // Web & Frontend
  { name: "JavaScript", icon: SiJavascript, color: "#f7df1e", category: "Web & Frontend" },
  { name: "TypeScript", icon: SiTypescript, color: "#3178c6", category: "Web & Frontend" },
  { name: "React", icon: SiReact, color: "#61dafb", category: "Web & Frontend" },
  { name: "Angular", icon: SiAngular, color: "#dd0031", category: "Web & Frontend" },
  { name: "HTML5", icon: SiHtml5, color: "#e34f26", category: "Web & Frontend" },
  { name: "CSS3", icon: SiCss, color: "#1572b6", category: "Web & Frontend" },

  // Backend & Frameworks
  { name: "Node.js", icon: SiNodedotjs, color: "#5fa04e", category: "Backend & Frameworks" },
  { name: "Python", icon: SiPython, color: "#3776ab", category: "Backend & Frameworks" },
  { name: "C#", icon: SiSharp, color: "#68217a", category: "Backend & Frameworks" },
  { name: "C++", icon: SiCplusplus, color: "#00599c", category: "Backend & Frameworks" },
  { name: "PHP", icon: SiPhp, color: "#777bb4", category: "Backend & Frameworks" },
  { name: "Laravel", icon: SiLaravel, color: "#ff2d20", category: "Backend & Frameworks" },
  { name: "Java", icon: FaJava, color: "#5382a1", category: "Backend & Frameworks" },
  { name: "Swagger", icon: SiSwagger, color: "#85ea2d", category: "Backend & Frameworks" },

  // Bases de Datos & ORMs
  { name: "PostgreSQL", icon: SiPostgresql, color: "#336791", category: "Bases de Datos & ORMs" },
  { name: "Neon", icon: SiPostgresql, color: "#00e599", category: "Bases de Datos & ORMs" },
  { name: "MongoDB", icon: SiMongodb, color: "#47a248", category: "Bases de Datos & ORMs" },
  { name: "SQLYog / MySQL", icon: SiMysql, color: "#4479a1", category: "Bases de Datos & ORMs" },
  { name: "Prisma ORM", icon: SiPrisma, color: "#2d3748", category: "Bases de Datos & ORMs" },

  // Móvil, IoT & 3D
  { name: "React Native", icon: SiReact, color: "#61dafb", category: "Móvil, IoT & 3D" },
  { name: "Unity 3D", icon: SiUnity, color: "#000000", category: "Móvil, IoT & 3D" },
  { name: "Arduino IDE", icon: SiArduino, color: "#00979d", category: "Móvil, IoT & 3D" },

  // Herramientas & Cloud
  { name: "Git", icon: SiGit, color: "#f05032", category: "Herramientas & Cloud" },
  { name: "GitHub", icon: SiGithub, color: "#181717", category: "Herramientas & Cloud" },
  { name: "Vercel", icon: SiVercel, color: "#000000", category: "Herramientas & Cloud" },
  { name: "Hostinger", icon: SiHostinger, color: "#673ab7", category: "Herramientas & Cloud" },
  { name: "Visual Studio / VS Code", icon: VscCode, color: "#007acc", category: "Herramientas & Cloud" },
  { name: "IntelliJ IDEA", icon: SiIntellijidea, color: "#000000", category: "Herramientas & Cloud" },
  { name: "GitBash", icon: FaTerminal, color: "#f05032", category: "Herramientas & Cloud" },
  { name: "PowerShell", icon: FaTerminal, color: "#5391fe", category: "Herramientas & Cloud" },
  { name: "NPM / Node", icon: SiNpm, color: "#cb3837", category: "Herramientas & Cloud" }
];

const categoryTabs = [
  "Todos",
  "Web & Frontend",
  "Backend & Frameworks",
  "Bases de Datos & ORMs",
  "Móvil, IoT & 3D",
  "Herramientas & Cloud"
] as const;

const coursesData = [
  {
    title: "Desarrollo Full-Stack",
    description: "Aplicaciones web relacionales, APIs RESTful y optimización de bases de datos para proyectos reales.",
    topics: "Web · APIs · PostgreSQL · Next.js"
  },
  {
    title: "Automatización con IA",
    description: "Flujos inteligentes, bots omnicanal y agentes asistidos por IA que reducen tiempos operativos.",
    topics: "IA · Bots Omnicanal · Automation"
  },
  {
    title: "Realidad Virtual y Aumentada",
    description: "Experiencias interactivas y entornos 3D para simulación y entrenamiento de procesos técnicos.",
    topics: "VR · AR · Unity · C#"
  }
] as const;

const experienceData = [
  {
    id: "merrash-job",
    role: "Desarrollador Full-Stack",
    company: "Merrash",
    date: "Enero 2026 – Abril 2026",
    location: "Metepec, Estado de México",
    brandColor: "#1f8a8c",
    projectIdx: 0,
    bullets: [
      "Diseñé y desarrollé desde cero un CMS personalizado para gestionar servicios, testimonios y catálogo de cursos.",
      "Implementé un bot omnicanal con IA para Web y WhatsApp, automatizando el 70% de la atención inicial.",
      "Integré la sincronización con Neon / PostgreSQL y Google Calendar para evitar duplicidad de citas y controlar disponibilidad en tiempo real."
    ],
    stack: ["Next.js", "IA / Bots", "PostgreSQL", "Google Calendar API"]
  },
  {
    id: "ciatsoftware-job",
    role: "Desarrollador Full-Stack",
    company: "CiatSoftware",
    date: "Mayo 2024 – Agosto 2024",
    location: "Toluca, Estado de México",
    brandColor: "#d12d2d",
    projectIdx: 1,
    bullets: [
      "Desarrollé una plataforma de entrenamiento en realidad virtual y aumentada para simular maquinaria industrial.",
      "Creé módulos interactivos en 3D para prácticas técnicas en un entorno seguro.",
      "Implementé un sistema de acceso por roles para asegurar el uso de la plataforma."
    ],
    stack: ["VR / AR", "Simulación 3D", "C#", "Seguridad por Roles"]
  }
] as const;

const projectData = [
  {
    id: "merrash",
    name: "Merrash Web & CMS",
    label: "Proyecto en vivo",
    summary: "Plataforma web con CMS a medida, agendamiento inteligente sincronizado y bot omnicanal asistido por IA.",
    stack: "Next.js · IA Omnicanal · PostgreSQL · Google Calendar",
    brandColor: "#1f8a8c",
    siteUrl: "https://merrash-web.vercel.app/",
    goals: [
      "Diseñé y desarrollé desde cero un CMS personalizado para gestionar servicios, testimonios y catálogo de cursos.",
      "Implementé un bot omnicanal con IA para Web y WhatsApp, automatizando el 70% de la atención inicial y acelerando el agendamiento.",
      "Integré la sincronización con Neon / PostgreSQL y Google Calendar para evitar duplicidad de citas y controlar disponibilidad en tiempo real."
    ]
  },
  {
    id: "vr-simulator",
    name: "Simulador Industrial VR/AR",
    label: "Beta en desarrollo",
    summary: "Plataforma de entrenamiento inmersivo para maquinaria industrial con módulos 3D y entorno seguro.",
    stack: "VR/AR · Modelado 3D · C# · Capacitación industrial",
    brandColor: "#d12d2d",
    siteUrl: "",
    goals: [
      "Desarrollé una beta de simulador para entrenar en maquinaria industrial en un entorno seguro y práctico.",
      "Creé módulos interactivos en 3D para prácticas técnicas y capacitación de procesos reales.",
      "Mejoré la experiencia para su uso en pantallas tradicionales y entornos VR/AR con un enfoque de accesibilidad y claridad."
    ]
  }
] as const;

export default function Page() {
  const [selectedProject, setSelectedProject] = useState<(typeof projectData)[number] | null>(null);
  const [activeTab, setActiveTab] = useState<string>("Todos");
  const [activeProjectIdx, setActiveProjectIdx] = useState<number>(0);
  const [activeCourseIdx, setActiveCourseIdx] = useState<number>(0);
  const [deviceMode, setDeviceMode] = useState<"phone" | "desktop">("phone");
  const { ref } = useGaze({ travel: 7, lookAt: "pointer" });

  const filteredTools = activeTab === "Todos"
    ? technologyData
    : technologyData.filter((tech) => tech.category === activeTab);

  const currentProject = projectData[activeProjectIdx];

  const handleJumpToProject = (projectIdx: number) => {
    setActiveProjectIdx(projectIdx);
    const element = document.getElementById("proyectos");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="shell">
      <Header />

      <main className="container">
        {/* HERO SECTION (Full Height, Unboxed) */}
        <section id="perfil" className="section fade-in">
          <div className="hero-wrapper">
            {/* Background Tech Watermark */}
            <div className="hero-techs-watermark" aria-hidden="true">
              {technologyData.slice(0, 12).map(({ name, icon: TechIcon, color }) => (
                <div key={name} className="hero-tech-item" title={name}>
                  <TechIcon color={color} />
                </div>
              ))}
            </div>

            <div className="hero-top-info">
              <div className="status-badge">
                <span className="status-dot" aria-hidden="true" />
                <span>Disponible para contrataciones & proyectos</span>
              </div>
              <div className="location-tag">
                <FaMapMarkerAlt />
                <span>Toluca, México</span>
              </div>
            </div>

            <div className="hero-main-layout">
              {/* Unboxed Avatar */}
              <div className="hero-avatar-wrap">
                <Blobatar ref={ref} name="Francisco Axel Mercado Sierra" animate="always" size={160} />
              </div>

              <div className="hero-content">
                <div className="eyebrow">Portfolio / Full-Stack</div>
                <h1>Francisco Axel Mercado Sierra</h1>
                
                <div className="hero-role">
                  Desarrollador Full-Stack · Web · Móvil · VR/AR
                </div>

                <p className="hero-bio">
                  Desarrollador Full-Stack enfocado en aplicaciones web y móviles, con experiencia en simuladores VR/AR y automatización con IA. He trabajado en proyectos donde la tecnología mejora procesos reales, reduce tiempos operativos y mejora la experiencia del usuario.
                </p>

                <div className="hero-education-subtle">
                  <FaGraduationCap />
                  <span><strong>Educación:</strong> Ingeniería en Tecnologías de la Información en Innovación Digital · UTVT (2022 – 2026)</span>
                </div>

                <div className="hero-actions">
                  <a
                    className="btn btn-whatsapp"
                    href="https://wa.me/525665273380"
                    target="_blank"
                    rel="noreferrer"
                    aria-label="Contactarme por WhatsApp"
                  >
                    <FaWhatsapp style={{ fontSize: "1.05rem" }} />
                    <span>WhatsApp</span>
                  </a>

                  <a
                    className="btn"
                    href="mailto:axelmercado126@gmail.com"
                    aria-label="Contactarme por correo electrónico"
                  >
                    <FaEnvelope />
                    <span>Correo</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* EXPERIENCE SECTION (Unboxed Timeline with Project Jump Buttons) */}
        <section id="experiencia" className="section fade-in">
          <div className="section-header">
            <div>
              <div className="eyebrow">Trayectoria</div>
              <h2 className="section-title">Experiencia</h2>
            </div>
          </div>

          <div className="timeline-unboxed">
            {experienceData.map((job) => (
              <div key={job.id} className="timeline-entry" style={{ "--entry-color": job.brandColor } as React.CSSProperties}>
                <div className="timeline-entry-dot" />
                <div className="timeline-entry-content">
                  <div className="timeline-entry-header">
                    <h3 className="timeline-entry-role">
                      {job.role} · <span className="timeline-entry-company" style={{ color: job.brandColor }}>{job.company}</span>
                    </h3>
                    <span className="timeline-entry-date">{job.date}</span>
                  </div>

                  <div className="timeline-entry-location">
                    📍 {job.location}
                  </div>

                  <ul className="timeline-entry-bullets">
                    {job.bullets.map((bullet, i) => (
                      <li key={i}>{bullet}</li>
                    ))}
                  </ul>

                  <div className="stack-row">
                    {job.stack.map((item) => (
                      <span key={item} className="stack-pill">
                        {item}
                      </span>
                    ))}
                  </div>

                  <div style={{ marginTop: "1rem" }}>
                    <button
                      type="button"
                      className="btn"
                      onClick={() => handleJumpToProject(job.projectIdx)}
                      style={{ fontSize: "0.82rem", padding: "0.45rem 0.95rem", color: job.brandColor, borderColor: job.brandColor }}
                    >
                      <span>Ver proyecto de {job.company}</span>
                      <FaExternalLinkAlt style={{ fontSize: "0.7rem" }} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* TOOLS & TECH SECTION (Categorized Unboxed Grid) */}
        <section id="herramientas" className="section fade-in">
          <div className="section-header">
            <div>
              <div className="eyebrow">Stack técnico</div>
              <h2 className="section-title">Tecnologías con las que trabajo</h2>
            </div>
          </div>

          <div className="tools-tabs">
            {categoryTabs.map((tab) => (
              <button
                key={tab}
                className={`tab-btn ${activeTab === tab ? "active" : ""}`}
                onClick={() => setActiveTab(tab)}
                type="button"
              >
                {tab}
              </button>
            ))}
          </div>

          <div className="tools-grid">
            {filteredTools.map(({ name, icon: TechIcon, color }) => (
              <div key={name} className="tool-item-unboxed">
                <div className="tool-icon">
                  <TechIcon color={color} />
                </div>
                <div className="tool-name">{name}</div>
              </div>
            ))}
          </div>
        </section>

        {/* COURSES & CERTIFICATIONS SECTION (CAROUSEL) */}
        <section id="cursos" className="section fade-in">
          <div className="section-header">
            <div>
              <div className="eyebrow">Formación</div>
              <h2 className="section-title">Cursos y Certificaciones</h2>
            </div>

            <div className="carousel-arrow-controls">
              <button
                type="button"
                className="carousel-btn"
                onClick={() => setActiveCourseIdx((prev) => (prev === 0 ? coursesData.length - 1 : prev - 1))}
                aria-label="Anterior curso"
              >
                <FaChevronLeft />
              </button>
              <button
                type="button"
                className="carousel-btn"
                onClick={() => setActiveCourseIdx((prev) => (prev === coursesData.length - 1 ? 0 : prev + 1))}
                aria-label="Siguiente curso"
              >
                <FaChevronRight />
              </button>
            </div>
          </div>

          <div className="courses-carousel-container">
            {coursesData.map((course, idx) => (
              <article
                key={course.title}
                className="course-card-item"
                style={{
                  opacity: idx === activeCourseIdx ? 1 : 0.65,
                  borderColor: idx === activeCourseIdx ? "var(--fg-heading)" : "var(--line)"
                }}
              >
                <div>
                  <span className="course-label">Formación #{idx + 1}</span>
                  <h3>{course.title}</h3>
                  <p>{course.description}</p>
                </div>
                <div className="course-topics">{course.topics}</div>
              </article>
            ))}
          </div>

          <div className="carousel-dots">
            {coursesData.map((_, i) => (
              <div
                key={i}
                className={`carousel-dot ${i === activeCourseIdx ? "active" : ""}`}
                onClick={() => setActiveCourseIdx(i)}
              />
            ))}
          </div>
        </section>

        {/* FEATURED PROJECTS (CAROUSEL WITH LIVE VIRTUAL MACHINE) */}
        <section id="proyectos" className="section fade-in">
          <div className="section-header">
            <div>
              <div className="eyebrow">Portafolio Interactivo</div>
              <h2 className="section-title">Proyectos destacados</h2>
            </div>

            <div className="carousel-arrow-controls">
              <button
                type="button"
                className="carousel-btn"
                onClick={() => setActiveProjectIdx((prev) => (prev === 0 ? projectData.length - 1 : prev - 1))}
                aria-label="Anterior proyecto"
              >
                <FaChevronLeft />
              </button>
              <button
                type="button"
                className="carousel-btn"
                onClick={() => setActiveProjectIdx((prev) => (prev === projectData.length - 1 ? 0 : prev + 1))}
                aria-label="Siguiente proyecto"
              >
                <FaChevronRight />
              </button>
            </div>
          </div>

          {/* PROJECT 1: MERRASH VIRTUAL MACHINE CAROUSEL ITEM */}
          {activeProjectIdx === 0 && (
            <div className="live-showcase-container fade-in">
              <div className="showcase-info">
                <span
                  className="stack-pill"
                  style={{
                    background: "rgba(31, 138, 140, 0.12)",
                    color: "#1f8a8c",
                    borderColor: "rgba(31, 138, 140, 0.3)",
                    marginBottom: "0.75rem",
                    display: "inline-block"
                  }}
                >
                  {currentProject.label} · Máquina Virtual
                </span>
                <h3>{currentProject.name}</h3>
                <p className="showcase-summary">{currentProject.summary}</p>

                <div className="showcase-controls">
                  <span style={{ fontSize: "0.82rem", color: "var(--muted)", fontWeight: 600 }}>Modo de vista:</span>
                  <button
                    type="button"
                    className={`mode-btn ${deviceMode === "phone" ? "active" : ""}`}
                    onClick={() => setDeviceMode("phone")}
                  >
                    <FaMobileAlt /> Smartphone
                  </button>
                  <button
                    type="button"
                    className={`mode-btn ${deviceMode === "desktop" ? "active" : ""}`}
                    onClick={() => setDeviceMode("desktop")}
                  >
                    <FaDesktop /> Navegador
                  </button>
                </div>

                <div className="stack-row" style={{ marginBottom: "1.25rem" }}>
                  <span className="stack-pill">Next.js</span>
                  <span className="stack-pill">IA Omnicanal</span>
                  <span className="stack-pill">PostgreSQL</span>
                  <span className="stack-pill">Google Calendar</span>
                </div>

                <div style={{ display: "flex", gap: "0.65rem", flexWrap: "wrap" }}>
                  <button
                    type="button"
                    className="btn"
                    onClick={() => setSelectedProject(currentProject)}
                    style={{ color: "#1f8a8c", borderColor: "#1f8a8c" }}
                  >
                    <FaInfoCircle />
                    <span>Información adicional</span>
                  </button>
                  <a
                    href="https://merrash-web.vercel.app/"
                    target="_blank"
                    rel="noreferrer"
                    className="btn"
                    style={{ background: "#1f8a8c", color: "#ffffff", borderColor: "#1f8a8c" }}
                  >
                    <span>Abrir en nueva pestaña</span>
                    <FaExternalLinkAlt style={{ fontSize: "0.75rem" }} />
                  </a>
                </div>
              </div>

              {/* Virtual Device Frame */}
              <div className="virtual-device-wrapper">
                {deviceMode === "phone" ? (
                  <div className="phone-mockup-frame">
                    <div className="phone-island-notch" />
                    <div className="phone-screen-body">
                      <iframe
                        src="https://merrash-web.vercel.app/"
                        title="Merrash Live Smartphone Preview"
                        loading="lazy"
                      />
                    </div>
                  </div>
                ) : (
                  <div className="browser-mockup-frame">
                    <div className="browser-header-bar">
                      <div className="mac-dots">
                        <span className="mac-dot red" />
                        <span className="mac-dot yellow" />
                        <span className="mac-dot green" />
                      </div>
                      <div className="browser-url-bar">
                        🔒 https://merrash-web.vercel.app/
                      </div>
                    </div>
                    <div className="browser-iframe-body">
                      <iframe
                        src="https://merrash-web.vercel.app/"
                        title="Merrash Live Desktop Preview"
                        loading="lazy"
                      />
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* PROJECT 2: VR/AR SIMULATOR CAROUSEL ITEM */}
          {activeProjectIdx === 1 && (
            <div className="secondary-project-unboxed fade-in" style={{ paddingTop: 0, borderTop: "none" }}>
              <span
                className="stack-pill"
                style={{
                  background: "rgba(209, 45, 45, 0.12)",
                  color: "#d12d2d",
                  borderColor: "rgba(209, 45, 45, 0.3)",
                  width: "fit-content"
                }}
              >
                {currentProject.label}
              </span>
              <h3 style={{ margin: "0.5rem 0 0.25rem", color: "#d12d2d", fontSize: "1.8rem" }}>
                {currentProject.name}
              </h3>
              <p style={{ margin: 0, color: "var(--fg)", fontSize: "1.05rem", maxWidth: "44rem" }}>
                {currentProject.summary}
              </p>

              <div className="stack-row" style={{ margin: "1rem 0" }}>
                <span className="stack-pill">VR / AR</span>
                <span className="stack-pill">Modelado 3D</span>
                <span className="stack-pill">C#</span>
                <span className="stack-pill">Capacitación Industrial</span>
              </div>

              <div style={{ display: "flex", gap: "0.75rem", alignItems: "center" }}>
                <button
                  type="button"
                  className="btn"
                  onClick={() => setSelectedProject(currentProject)}
                  style={{ color: "#d12d2d", borderColor: "#d12d2d" }}
                >
                  <FaInfoCircle />
                  <span>Información adicional</span>
                </button>
                <span style={{ fontSize: "0.88rem", color: "#d12d2d", fontWeight: 600 }}>
                  Beta disponible para demostración práctica
                </span>
              </div>
            </div>
          )}

          <div className="carousel-dots">
            {projectData.map((_, i) => (
              <div
                key={i}
                className={`carousel-dot ${i === activeProjectIdx ? "active" : ""}`}
                onClick={() => setActiveProjectIdx(i)}
              />
            ))}
          </div>
        </section>

        {/* CONTACT SECTION (Full Height, Unboxed) */}
        <section id="contacto" className="section fade-in">
          <div className="section-header">
            <div>
              <div className="eyebrow">Contacto</div>
              <h2 className="section-title">Contáctame</h2>
              <p className="section-subtitle">
                ¿Tienes algún proyecto, vacante o idea en la que podamos trabajar juntos? Puedes escribirme directamente por WhatsApp o correo.
              </p>
            </div>
          </div>

          <div className="hero-actions" style={{ marginTop: 0 }}>
            <a
              className="btn btn-whatsapp"
              href="https://wa.me/525665273380"
              target="_blank"
              rel="noreferrer"
            >
              <FaWhatsapp style={{ fontSize: "1.05rem" }} />
              <span>WhatsApp</span>
            </a>

            <a className="btn" href="mailto:axelmercado126@gmail.com">
              <FaEnvelope />
              <span>axelmercado126@gmail.com</span>
            </a>
          </div>
        </section>
      </main>

      {/* PROJECT DETAIL MODAL WITH COLLABORATORS DISCLAIMER */}
      {selectedProject && (
        <div className="modal-backdrop" onClick={() => setSelectedProject(null)}>
          <div className="modal-card" onClick={(event) => event.stopPropagation()}>
            <button
              type="button"
              className="modal-close"
              onClick={() => setSelectedProject(null)}
              aria-label="Cerrar detalle"
            >
              ×
            </button>

            <span
              className="stack-pill"
              style={{
                background: `${selectedProject.brandColor}15`,
                color: selectedProject.brandColor,
                borderColor: `${selectedProject.brandColor}40`
              }}
            >
              {selectedProject.label}
            </span>

            <h3 className="modal-title">{selectedProject.name}</h3>
            <p style={{ color: "var(--muted)", margin: "0 0 1rem" }}>{selectedProject.summary}</p>

            <ul className="modal-list">
              {selectedProject.goals.map((goal, idx) => (
                <li key={idx}>{goal}</li>
              ))}
            </ul>

            {/* Practical Disclaimer Notice for Live Platform */}
            <div className="disclaimer-box">
              ⚠️ <strong>Aviso sobre la versión en vivo:</strong> Esta plataforma interactiva puede presentar variaciones continuas o ajustes de funcionalidad debido a la constante integración de practicantes, estudiantes y nuevos colaboradores trabajando en el proyecto.
            </div>

            <div style={{ display: "flex", gap: "0.75rem", marginTop: "1.5rem", flexWrap: "wrap" }}>
              {selectedProject.siteUrl ? (
                <a
                  href={selectedProject.siteUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="btn"
                  style={{
                    background: selectedProject.brandColor,
                    color: "#ffffff",
                    borderColor: selectedProject.brandColor
                  }}
                >
                  <span>Abrir sitio en vivo en nueva pestaña</span>
                  <FaExternalLinkAlt style={{ fontSize: "0.75rem" }} />
                </a>
              ) : (
                <span style={{ fontSize: "0.88rem", color: selectedProject.brandColor, fontWeight: 600 }}>
                  Beta disponible para demostración
                </span>
              )}
              <button type="button" className="btn" onClick={() => setSelectedProject(null)}>
                Cerrar
              </button>
            </div>
          </div>
        </div>
      )}

      <Footer />
      <Chatbot />
    </div>
  );
}
