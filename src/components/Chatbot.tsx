"use client";

import { useState, useRef, useEffect } from "react";
import { Blobatar } from "@blobatar/react";
import { useGaze } from "@blobatar/react/gaze";
import { FaWhatsapp, FaEnvelope, FaPaperPlane, FaTimes } from "react-icons/fa";

interface Message {
  id: string;
  sender: "bot" | "user";
  text: string;
  actions?: Array<{ label: string; url: string; icon: "whatsapp" | "email" }>;
}

const botNotifications = [
  "💡 ¿Sabías que Axel creó el CMS y bot omnicanal con IA para Merrash?",
  "🛠️ ¿Quieres saber si Axel conoce alguna tecnología específica? ¡Pregúntame!",
  "🥽 Axel desarrolló un simulador inmersivo en VR/AR para capacitación industrial en CiatSoftware.",
  "🎓 Axel cursa Ing. en Tecnologías de la Información en Innovación Digital en UTVT."
];

export default function Chatbot() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [activeNotificationIdx, setActiveNotificationIdx] = useState(0);
  const [showNotification, setShowNotification] = useState(true);

  const { ref } = useGaze({ travel: 4, lookAt: "pointer" });
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      sender: "bot",
      text: "¡Hola! Soy el asistente virtual con IA de Axel. ¿Qué te gustaría saber sobre sus proyectos, tecnologías o disponibilidad?"
    }
  ]);

  useEffect(() => {
    if (open) {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
      setShowNotification(false);
    }
  }, [messages, open]);

  // Rotate bot notification bubbles
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveNotificationIdx((prev) => (prev + 1) % botNotifications.length);
    }, 9000);
    return () => clearInterval(timer);
  }, []);

  const handleSend = async (textToSend?: string) => {
    const query = (textToSend || input).trim();
    if (!query || loading) return;

    const userMsg: Message = { id: Date.now().toString(), sender: "user", text: query };
    const updatedMessages = [...messages, userMsg];
    setMessages(updatedMessages);
    if (!textToSend) setInput("");
    setLoading(true);

    try {
      // Call Next.js API route connecting to Groq AI
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: updatedMessages })
      });

      if (res.ok) {
        const data = await res.json();
        if (data.reply) {
          let actions: Message["actions"] = undefined;
          const lowerReply = data.reply.toLowerCase();
          if (lowerReply.includes("whatsapp") || lowerReply.includes("contact") || lowerReply.includes("correo")) {
            actions = [
              { label: "WhatsApp Directo", url: "https://wa.me/525665273380?text=Hola%20Axel,%20me%20gustar%C3%ADa%20hablar", icon: "whatsapp" },
              { label: "Enviar Correo", url: "mailto:axelmercado126@gmail.com", icon: "email" }
            ];
          }

          setMessages((prev) => [
            ...prev,
            { id: (Date.now() + 1).toString(), sender: "bot", text: data.reply, actions }
          ]);
          setLoading(false);
          return;
        }
      }
    } catch (e) {
      console.error("AI Fetch error:", e);
    }

    // Fallback if API offline
    setMessages((prev) => [
      ...prev,
      {
        id: (Date.now() + 1).toString(),
        sender: "bot",
        text: "Axel es Desarrollador Full-Stack enfocado en desarrollo web, móvil, automatización con IA y simuladores VR/AR. Tiene experiencia práctica con tecnologías como React, Next.js, Python, PostgreSQL, PHP y C#.",
        actions: [
          { label: "Contactar por WhatsApp", url: "https://wa.me/525665273380", icon: "whatsapp" }
        ]
      }
    ]);
    setLoading(false);
  };

  return (
    <div className="chatbot">
      {/* Floating Notification Bubble */}
      {showNotification && !open && (
        <div className="bot-notification-bubble fade-in">
          <button
            type="button"
            className="bot-notification-close"
            onClick={() => setShowNotification(false)}
            aria-label="Cerrar notificación"
          >
            <FaTimes />
          </button>
          <div className="bot-notification-content" onClick={() => setOpen(true)}>
            {botNotifications[activeNotificationIdx]}
          </div>
        </div>
      )}

      {/* Expanded Chat Window */}
      {open && (
        <div className="chat-panel fade-in">
          <div className="chat-panel-header">
            <div className="chat-avatar-wrapper" style={{ width: 34, height: 34 }}>
              <Blobatar ref={ref} name="Portfolio Guide" animate="always" size={34} />
            </div>
            <div style={{ flex: 1 }}>
              <h4 className="chat-panel-title">Asistente IA de Axel</h4>
              <span style={{ fontSize: "0.72rem", color: "#10b981", fontWeight: 600 }}>⚡ Groq Llama3 IA en línea</span>
            </div>
            <button
              onClick={() => setOpen(false)}
              style={{ background: "none", border: "none", color: "var(--muted)", cursor: "pointer", fontSize: "1.2rem" }}
              aria-label="Cerrar chat"
            >
              ×
            </button>
          </div>

          <div className="chat-messages-container">
            {messages.map((msg) => (
              <div key={msg.id} className={`chat-message ${msg.sender}`}>
                <div className="message-bubble">{msg.text}</div>
                {msg.actions && (
                  <div className="message-actions">
                    {msg.actions.map((act, i) => (
                      <a key={i} href={act.url} target="_blank" rel="noreferrer" className="chat-action-link">
                        {act.icon === "whatsapp" ? <FaWhatsapp color="#25d366" /> : <FaEnvelope color="#0284c7" />}
                        <span>{act.label}</span>
                      </a>
                    ))}
                  </div>
                )}
              </div>
            ))}

            {loading && (
              <div className="chat-message bot">
                <div className="message-bubble" style={{ color: "var(--muted)" }}>
                  Pensando respuesta con IA...
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          <div className="chat-suggestions">
            <button type="button" onClick={() => handleSend("¿Cuáles son las tecnologías que domina Axel?")}>
              🛠️ Tecnologías
            </button>
            <button type="button" onClick={() => handleSend("¿Qué hizo Axel en Merrash?")}>
              🚀 Proyecto Merrash
            </button>
            <button type="button" onClick={() => handleSend("¿Cómo puedo contactarlo para contratarlo?")}>
              📩 Contactar
            </button>
          </div>

          <form
            className="chat-input-row"
            onSubmit={(e) => {
              e.preventDefault();
              handleSend();
            }}
          >
            <input
              type="text"
              placeholder="Pregunta algo sobre Axel..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
            />
            <button type="submit" aria-label="Enviar pregunta" disabled={loading}>
              <FaPaperPlane />
            </button>
          </form>
        </div>
      )}

      {/* Floating Toggle Button */}
      <button
        className="chat-toggle"
        onClick={() => setOpen((s) => !s)}
        aria-label="Asistente virtual"
        type="button"
      >
        <span className="chat-avatar-wrapper" aria-hidden="true">
          <Blobatar ref={ref} name="Portfolio Guide" animate="always" size={40} />
        </span>
        <span className="chat-toggle-text">{open ? "Cerrar" : "Preguntarle al Bot"}</span>
      </button>
    </div>
  );
}
