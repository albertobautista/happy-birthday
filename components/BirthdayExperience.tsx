"use client";

import { useRef, useState } from "react";
import confetti from "canvas-confetti";
import * as Dialog from "@radix-ui/react-dialog";
import { motion, AnimatePresence } from "framer-motion";
import { Dog, Gift, Lock, Music, Pause, PawPrint, Ticket, X } from "lucide-react";
import BirthdayCake from "./BirthdayCake";

const launchConfetti = () => {
  const isMobile = window.matchMedia("(max-width: 600px)").matches;
  const scale = isMobile ? 0.4 : 1;
  const duration = isMobile ? 5000 : 10000;
  const intervalDelay = isMobile ? 350 : 220;
  const animationEnd = Date.now() + duration;

  const colors = [
    "#d98a3d",
    "#ff7f6b",
    "#7fcfa8",
    "#ffd76a",
    "#fff3e1",
    "#6b3f24",
  ];
  const fire = (options: confetti.Options) =>
    confetti({ colors, ...options });

  const randomInRange = (min: number, max: number) =>
    Math.random() * (max - min) + min;

  const interval = window.setInterval(() => {
    const timeLeft = animationEnd - Date.now();

    if (timeLeft <= 0) {
      window.clearInterval(interval);
      return;
    }

    fire({
      particleCount: Math.round(18 * scale),
      angle: 60,
      spread: 65,
      startVelocity: 45,
      gravity: 0.9,
      origin: {
        x: 0,
        y: randomInRange(0.65, 0.95),
      },
    });

    fire({
      particleCount: Math.round(18 * scale),
      angle: 120,
      spread: 65,
      startVelocity: 45,
      gravity: 0.9,
      origin: {
        x: 1,
        y: randomInRange(0.65, 0.95),
      },
    });

    fire({
      particleCount: Math.round(12 * scale),
      angle: 30,
      spread: 55,
      startVelocity: 38,
      origin: {
        x: 0,
        y: randomInRange(0.25, 0.65),
      },
    });

    fire({
      particleCount: Math.round(12 * scale),
      angle: 150,
      spread: 55,
      startVelocity: 38,
      origin: {
        x: 1,
        y: randomInRange(0.25, 0.65),
      },
    });

    fire({
      particleCount: Math.round(12 * scale),
      angle: 270,
      spread: 100,
      startVelocity: 12,
      gravity: 0.65,
      drift: randomInRange(-0.5, 0.5),
      origin: {
        x: randomInRange(0.1, 0.9),
        y: -0.1,
      },
    });

    fire({
      particleCount: Math.round(14 * scale),
      angle: 90,
      spread: 80,
      startVelocity: 42,
      gravity: 1,
      origin: {
        x: randomInRange(0.15, 0.85),
        y: 1,
      },
    });
  }, intervalDelay);
};

const SECRET_PASSWORD = "2911";

export default function BirthdayExperience() {
  const [isOpen, setIsOpen] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [passwordInput, setPasswordInput] = useState("");
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  const checkPassword = (e: React.FormEvent) => {
    e.preventDefault();

    if (passwordInput === SECRET_PASSWORD) {
      setIsUnlocked(true);
      setPasswordError(false);
    } else {
      setPasswordError(true);
    }
  };

  const resetSecretModal = (open: boolean) => {
    if (!open) {
      setPasswordInput("");
      setIsUnlocked(false);
      setPasswordError(false);
    }
  };

  const openCard = async () => {
    setIsOpen(true);
    launchConfetti();

    try {
      await audioRef.current?.play();
      setIsPlaying(true);
    } catch {
      setIsPlaying(false);
    }
  };

  const toggleMusic = async () => {
    const audio = audioRef.current;

    if (!audio) return;

    if (audio.paused) {
      try {
        await audio.play();
        setIsPlaying(true);
      } catch {
        setIsPlaying(false);
      }
    } else {
      audio.pause();
      setIsPlaying(false);
    }
  };

  return (
    <main className="page-shell">
      <audio
        ref={audioRef}
        loop
        preload="auto"
        src="/audio/birthday-song.mp3"
      />

      <div className="cloud cloud-one" />
      <div className="cloud cloud-two" />
      <div className="cloud cloud-three" />

      <div className="floating-shape shape-one" />
      <div className="floating-shape shape-two" />
      <div className="floating-shape shape-three" />

      <span className="sparkle sparkle-one" aria-hidden="true">
        🐾
      </span>
      <span className="sparkle sparkle-two" aria-hidden="true">
        🦴
      </span>
      <span className="sparkle sparkle-three" aria-hidden="true">
        🐾
      </span>
      <span className="sparkle sparkle-four" aria-hidden="true">
        🦴
      </span>

      <AnimatePresence mode="wait">
        {!isOpen ? (
          <motion.section
            key="welcome"
            className="welcome-card"
            initial={{ opacity: 0, scale: 0.92, y: 24 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 1.05 }}
            transition={{ duration: 0.55 }}
          >
            <motion.div
              className="gift-icon"
              animate={{ rotate: [-5, 5, -5], y: [0, -8, 0] }}
              transition={{ duration: 2.4, repeat: Infinity }}
            >
              <Dog size={58} strokeWidth={1.8} />
            </motion.div>

            <p className="eyebrow">Tienes una sorpresa</p>

            <h1>Una tarjeta especial está esperando por ti</h1>

            <p className="subtitle">Activa el sonido y abre tu regalo.</p>

            <button className="primary-button" onClick={openCard} type="button">
              <PawPrint size={20} />
              Abrir mi regalo
            </button>
          </motion.section>
        ) : (
          <motion.section
            key="birthday"
            className="birthday-card"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65 }}
          >
            <motion.p
              className="eyebrow"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              Hoy celebramos algo muy especial
            </motion.p>

            <motion.h1
              initial={{ opacity: 0, scale: 0.85 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{
                delay: 0.25,
                type: "spring",
                stiffness: 120,
              }}
            >
              ¡Feliz cumpleaños, Sandra!
            </motion.h1>

            <motion.p
              className="birthday-message"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              Espero que este nuevo año esté lleno de buenos momentos, muchas
              risas y grandes recuerdos. Disfruta mucho tu día.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.55 }}
            >
              <BirthdayCake />
            </motion.div>

            <div className="actions">
              <button
                className="secondary-button"
                onClick={toggleMusic}
                type="button"
              >
                {isPlaying ? <Pause size={18} /> : <Music size={18} />}
                {isPlaying ? "Pausar música" : "Reproducir música"}
              </button>

              <button
                className="secondary-button"
                onClick={launchConfetti}
                type="button"
              >
                <PawPrint size={18} />
                Más confeti
              </button>

              <Dialog.Root>
                <Dialog.Trigger asChild>
                  <button className="secondary-button" type="button">
                    <Ticket size={18} />
                    Ver regalo
                  </button>
                </Dialog.Trigger>
                <Dialog.Portal>
                  <Dialog.Overlay className="modal-overlay" />
                  <Dialog.Content className="modal-content">
                    <Dialog.Title className="modal-title">
                      Tu regalo
                    </Dialog.Title>
                    <Dialog.Close asChild>
                      <button
                        className="modal-close"
                        type="button"
                        aria-label="Cerrar"
                      >
                        <X size={20} />
                      </button>
                    </Dialog.Close>
                    <div className="coming-soon">
                      <motion.div
                        className="coming-soon-icon"
                        animate={{ rotate: [-6, 6, -6], y: [0, -6, 0] }}
                        transition={{ duration: 2.2, repeat: Infinity }}
                      >
                        <Gift size={44} strokeWidth={1.8} />
                      </motion.div>
                      <p className="coming-soon-title">Coming soon</p>
                      <p className="coming-soon-text">
                        Tu regalo viene en camino.
                      </p>
                    </div>
                  </Dialog.Content>
                </Dialog.Portal>
              </Dialog.Root>

              <Dialog.Root onOpenChange={resetSecretModal}>
                <Dialog.Trigger asChild>
                  <button className="secondary-button" type="button">
                    <Lock size={18} />
                    Mensaje
                  </button>
                </Dialog.Trigger>
                <Dialog.Portal>
                  <Dialog.Overlay className="modal-overlay" />
                  <Dialog.Content className="modal-content">
                    <Dialog.Title className="modal-title">
                      {isUnlocked ? "Mensaje" : "Escribe la contraseña"}
                    </Dialog.Title>
                    <Dialog.Close asChild>
                      <button
                        className="modal-close"
                        type="button"
                        aria-label="Cerrar"
                      >
                        <X size={20} />
                      </button>
                    </Dialog.Close>

                    {isUnlocked ? (
                      <>
                        <p className="secret-message">
                          Esta tarjeta la hice con mucho cariño para ti.
                        </p>
                        <p className="secret-message">
                          A lo largo de este tiempo me ha gustado muchísimo
                          poder conocerte más. Cada plática, cada momento y
                          cada risa compartida me han dejado ver lo increíble
                          que eres, y eso es algo que disfruto de verdad.
                        </p>
                        <p className="secret-message">
                          También quiero darte las gracias por todo lo que has
                          hecho por mí. Quizá no siempre te lo digo, pero lo
                          valoro y lo agradezco mucho más de lo que imaginas.
                        </p>
                        <p className="secret-message">
                          Espero que sigamos conociéndonos más con el paso del
                          tiempo y que esto que tenemos no termine nunca,
                          porque te has convertido en una persona muy
                          importante en mi vida.
                        </p>
                        <p className="secret-message">
                          Que este nuevo año te traiga muchísima felicidad.
                        </p>
                        <p className="secret-message">
                          ¡Feliz cumpleaños, Sandra! Te quiero mucho. ❤️
                        </p>
                      </>
                    ) : (
                      <form className="password-form" onSubmit={checkPassword}>
                        <input
                          type="password"
                          inputMode="numeric"
                          className="password-input"
                          placeholder="Contraseña"
                          value={passwordInput}
                          onChange={(e) => {
                            setPasswordInput(e.target.value);
                            setPasswordError(false);
                          }}
                          autoFocus
                        />
                        {passwordError && (
                          <p className="password-error">
                            Contraseña incorrecta, intenta de nuevo.
                          </p>
                        )}
                        <button
                          className="primary-button password-submit"
                          type="submit"
                        >
                          Desbloquear
                        </button>
                      </form>
                    )}
                  </Dialog.Content>
                </Dialog.Portal>
              </Dialog.Root>
            </div>
          </motion.section>
        )}
      </AnimatePresence>
    </main>
  );
}
