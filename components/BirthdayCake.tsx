import Image from "next/image";

export default function BirthdayCake() {
  return (
    <div
      className="cake"
      aria-label="Pastel de cumpleaños con botellas de cerveza"
    >
      <div className="bottles" aria-hidden="true">
        {[0, 1, 2, 3].map((bottle) => (
          <div className="bottle" key={bottle}>
            <Image
              src="/images/bottle.png"
              alt=""
              width={28}
              height={44}
              unoptimized
            />
          </div>
        ))}
      </div>
      <div className="cake-top" />
      <div className="cake-layer cake-layer-one" />
      <div className="cake-layer cake-layer-two" />
      <div className="cake-plate" />
    </div>
  );
}
