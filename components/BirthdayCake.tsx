"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { DOGS } from "./dogs";

const DOG_SIZE = 64;

export default function BirthdayCake() {
  const [barking, setBarking] = useState<number | null>(null);

  const bark = (index: number) => {
    setBarking(index);
    window.setTimeout(() => {
      setBarking((current) => (current === index ? null : current));
    }, 900);
  };

  return (
    <div className="cake" aria-label="Pastel de cumpleaños con perritos">
      <div className="dogs">
        {DOGS.map((dog, index) => (
          <motion.button
            type="button"
            className="dog"
            key={dog.src}
            onClick={() => bark(index)}
            aria-label="Hacer ladrar al perrito"
            animate={{ y: [0, -6, 0] }}
            transition={{
              duration: 1.1,
              repeat: Infinity,
              delay: index * 0.18,
            }}
            whileTap={{ scale: 1.3, rotate: [0, -10, 10, 0] }}
          >
            <Image
              src={dog.src}
              alt=""
              width={DOG_SIZE}
              height={DOG_SIZE}
              className="dog-face"
              style={{
                width: DOG_SIZE,
                height: DOG_SIZE,
                objectFit: "cover",
                objectPosition: dog.facePosition,
                borderRadius: "50%",
                display: "block",
              }}
            />
            <AnimatePresence>
              {barking === index && (
                <motion.span
                  className="bark"
                  initial={{ opacity: 0, y: 6, scale: 0.7 }}
                  animate={{ opacity: 1, y: -4, scale: 1 }}
                  exit={{ opacity: 0, y: -14 }}
                  transition={{ duration: 0.25 }}
                >
                  {dog.bark}
                </motion.span>
              )}
            </AnimatePresence>
          </motion.button>
        ))}
      </div>
      <div className="cake-top" />
      <div className="cake-layer cake-layer-one">
        <span className="cake-decor" aria-hidden="true">
          🦴 🐾 🦴 🐾 🦴
        </span>
      </div>
      <div className="cake-layer cake-layer-two">
        <span className="cake-decor" aria-hidden="true">
          🐾 🦴 🐾 🦴 🐾
        </span>
      </div>
      <div className="cake-plate" />
    </div>
  );
}
