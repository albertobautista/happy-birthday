"use client";

import Image from "next/image";
import { motion } from "framer-motion";

export default function BirthdayCake() {
  return (
    <div
      className="cake"
      aria-label="Pastel de cumpleaños con botellas de cerveza"
    >
      <div className="bottles" aria-hidden="true">
        {[0, 1, 2, 3].map((bottle) => (
          <motion.div
            className="bottle"
            key={bottle}
            whileTap={{ scale: 1.35, rotate: [0, -8, 8, 0] }}
            transition={{ duration: 0.35 }}
          >
            <Image
              src="/images/bottle.png"
              alt=""
              width={28}
              height={44}
              unoptimized
            />
          </motion.div>
        ))}
      </div>
      <div className="cake-top" />
      <div className="cake-layer cake-layer-one" />
      <div className="cake-layer cake-layer-two" />
      <div className="cake-plate" />
    </div>
  );
}
