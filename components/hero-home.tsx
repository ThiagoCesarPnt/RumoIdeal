"use client";

import VideoThumb from "../public/images/hero-image-01.png";
import ModalVideo from "../components/modal-video";
import { useRouter } from "next/navigation";
import { useAuth } from "../config/AuthContext"; 

export default function HeroHome() {
  const router = useRouter();
  const { user } = useAuth(); 

  const isLoggedIn = user !== null;

  const handlePlanClick = () => {
    if (isLoggedIn) {
      console.log("Usuário logado, redirecionando para /viagens");
      router.push("/viagens"); 
    } else {
      console.log("Usuário não logado, redirecionando para /signin");
      router.push("/signin"); 
    }
  };

  return (
    <section>
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="py-12 md:py-20">
          <div className="pb-12 text-center md:pb-20">
            <h1
              className="animate-[gradient_6s_linear_infinite] bg-[linear-gradient(to_right,theme(colors.gray.200),theme(colors.indigo.200),theme(colors.gray.50),theme(colors.indigo.300),theme(colors.gray.200))] bg-[length:200%_auto] bg-clip-text pb-5 font-nacelle text-4xl font-semibold text-transparent md:text-5xl"
              data-aos="fade-up"
            >
              Rumo Ideal
            </h1>
            <div className="mx-auto max-w-3xl">
              <p
                className="mb-8 text-xl text-indigo-200/65"
                data-aos="fade-up"
                data-aos-delay={200}
              >
                Explore o mundo com a Rumo Ideal – Seu portal para viagens inesquecíveis!
              </p>
              <div className="mx-auto max-w-xs sm:flex sm:max-w-none sm:justify-center">
                <div data-aos="fade-up" data-aos-delay={400}>
                  <button
                    onClick={handlePlanClick}
                    className="btn group mb-4 w-full bg-gradient-to-t from-gray-300 to-gray-700 bg-[length:100%_100%] bg-[bottom] text-white shadow-[inset_0px_1px_0px_0px_theme(colors.white/.16)] hover:bg-[length:100%_150%] sm:mb-0 sm:w-auto"
                  >
                    Planejar
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
