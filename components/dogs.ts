export type DogPhoto = {
  src: string;
  bark: string;
  /** Where the face is, for the round crop. */
  facePosition: string;
};

export const DOGS: DogPhoto[] = [
  { src: "/images/dogs/blanco.jpg", bark: "¡Woof!", facePosition: "50% 45%" },
  { src: "/images/dogs/peludo.jpg", bark: "¡Guau guau!", facePosition: "58% 50%" },
  { src: "/images/dogs/carro.jpg", bark: "¡Guau!", facePosition: "8% 50%" },
];
