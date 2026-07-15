"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import confetti from "canvas-confetti";
import * as Dialog from "@radix-ui/react-dialog";
import { motion, AnimatePresence } from "framer-motion";
import { Gift, Music, Pause, PartyPopper, Ticket, X } from "lucide-react";
import BirthdayCake from "./BirthdayCake";

const launchConfetti = () => {
  const isMobile = window.matchMedia("(max-width: 600px)").matches;
  const scale = isMobile ? 0.4 : 1;
  const duration = isMobile ? 5000 : 10000;
  const intervalDelay = isMobile ? 350 : 220;
  const animationEnd = Date.now() + duration;

  const randomInRange = (min: number, max: number) =>
    Math.random() * (max - min) + min;

  const interval = window.setInterval(() => {
    const timeLeft = animationEnd - Date.now();

    if (timeLeft <= 0) {
      window.clearInterval(interval);
      return;
    }

    confetti({
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

    confetti({
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

    confetti({
      particleCount: Math.round(12 * scale),
      angle: 30,
      spread: 55,
      startVelocity: 38,
      origin: {
        x: 0,
        y: randomInRange(0.25, 0.65),
      },
    });

    confetti({
      particleCount: Math.round(12 * scale),
      angle: 150,
      spread: 55,
      startVelocity: 38,
      origin: {
        x: 1,
        y: randomInRange(0.25, 0.65),
      },
    });

    confetti({
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

    confetti({
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

export default function BirthdayExperience() {
  const [isOpen, setIsOpen] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

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

      <span className="sparkle sparkle-one" aria-hidden="true">✨</span>
      <span className="sparkle sparkle-two" aria-hidden="true">⭐</span>
      <span className="sparkle sparkle-three" aria-hidden="true">✨</span>
      <span className="sparkle sparkle-four" aria-hidden="true">⭐</span>

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
              <Gift size={58} strokeWidth={1.8} />
            </motion.div>

            <p className="eyebrow">Tienes una sorpresa</p>

            <h1>Una tarjeta especial está esperando por ti</h1>

            <p className="subtitle">Activa el sonido y abre tu regalo.</p>

            <button className="primary-button" onClick={openCard} type="button">
              <Gift size={20} />
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
              ¡Feliz cumpleaños, Jeny!
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
                <PartyPopper size={18} />
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
                    <Image
                      src="/images/ticket.PNG"
                      alt="Regalo sorpresa"
                      width={480}
                      height={480}
                      className="modal-image"
                      unoptimized
                    />
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
