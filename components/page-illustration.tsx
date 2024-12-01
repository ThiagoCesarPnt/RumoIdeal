import Image from "next/image";
import Fundo from "../public/images/fundo.png";

export default function PageIllustration() {
  return (
    <div
      className="absolute inset-0 -z-10"
      aria-hidden="true"
    >
      <Image
        className="w-full h-full object-cover"
        src={Fundo}
        alt="Fundo"
        layout="fill" 
        priority 
      />
    </div>
  );
}
