import Image from "next/image";
import calendarioEdata from "../public/images/icone-de-calendario-e-relogio-simbolo-de-data-e-hora-icone-de-evento-sinal-de-vetor-plana-isolado-no-branco_635979-718-removebg-preview.png";
import Spotlight from "../components/spotlight";
import convideSeusAmigos from "../public/images/convideseusamigos.png";
import task from "../public/images/task.png";

export default function Workflows() {
  return (
    <section>
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="pb-12 md:pb-20">
          <div className="mx-auto max-w-3xl pb-12 text-center md:pb-20">
            <div className="inline-flex items-center gap-3 pb-3 before:h-px before:w-8 before:bg-gradient-to-r before:from-transparent before:to-indigo-200/50 after:h-px after:w-8 after:bg-gradient-to-l after:from-transparent after:to-indigo-200/50">
              <span className="inline-flex bg-gradient-to-r from-indigo-500 to-indigo-200 bg-clip-text text-transparent">
                Como funciona
              </span>
            </div>
            <h2 className="animate-[gradient_6s_linear_infinite] bg-[linear-gradient(to_right,theme(colors.gray.200),theme(colors.indigo.200),theme(colors.gray.50),theme(colors.indigo.300),theme(colors.gray.200))] bg-[length:200%_auto] bg-clip-text pb-4 font-nacelle text-3xl font-semibold text-transparent md:text-4xl">
              Passos de planejamento
            </h2>
            <p className="text-lg text-indigo-200/65">
              Na Rumo Ideal, acreditamos que a organização é a chave para uma vida mais produtiva e tranquila.
              Nossa missão é ajudar você a transformar seu espaço e sua rotina, proporcionando clareza e eficiência.
              Se você está cansado da desordem e busca um ambiente mais harmonioso, veio ao lugar certo!
            </p>
          </div>
          <Spotlight className="group mx-auto grid max-w-sm items-start gap-6 lg:max-w-none lg:grid-cols-3">
            {/* Card 1 */}
            <a
              className="group/card relative h-full overflow-hidden rounded-2xl bg-gradient-to-t from-gray-500 to-gray-700
               bg-[length:100%_100%] bg-[bottom] shadow-[inset_0px_1px_0px_0px_theme(colors.white/.16)]
                hover:bg-[length:100%_150%] sm:mb-0 sm:w-auto p-px before:pointer-events-none before:absolute before:-left-40
                 before:-top-40 before:z-10 before:h-80 before:w-80 before:translate-x-[var(--mouse-x)] before:translate-y-[var(--mouse-y)]
                  before:rounded-full before:bg-zinc-100/80 before:opacity-0 before:blur-3xl before:transition-opacity before:duration-500
                   after:pointer-events-none after:absolute after:-left-48 after:-top-48 after:z-30 after:h-64 after:w-64 after:translate-x-[var(--mouse-x)]
                    after:translate-y-[var(--mouse-y)] after:rounded-full after:bg-indigo-900 after:opacity-0 after:blur-3xl after:transition-opacity
                     after:duration-500 after:hover:opacity-20 before:group-hover:opacity-100"
              href="#0"
            >
                <div className="relative z-20 h-full overflow-hidden rounded-[inherit] ">              
                <div
                  className="absolute right-6 top-6 flex h-8 w-8 items-center justify-center rounded-full border border-gray-700/50 bg-gray-800/65 text-gray-200 opacity-0 transition-opacity group-hover/card:opacity-100"
                  aria-hidden="true"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width={9}
                    height={8}
                    fill="none"
                  >
                    <path
                      fill="#F4F4F5"
                      d="m4.92 8-.787-.763 2.733-2.68H0V3.443h6.866L4.133.767 4.92 0 9 4 4.92 8Z"
                    />
                  </svg>
                </div>
                <Image
                  className="inline-flex"
                  src={calendarioEdata}
                  width={350}
                  height={288}
                  alt="Workflow 03"
                />
              <div className="p-6">
                  <div className="mb-3">
                    <span className="btn-sm relative rounded-full bg-gray-800/40 px-2.5 py-0.5 text-xs font-normal before:pointer-events-none before:absolute before:inset-0 before:rounded-[inherit] before:border before:border-transparent before:[background:linear-gradient(to_bottom,theme(colors.gray.700/.15),theme(colors.gray.700/.5))_border-box] before:[mask-composite:exclude_!important] before:[mask:linear-gradient(white_0_0)_padding-box,_linear-gradient(white_0_0)] hover:bg-gray-800/60">
                      <span className="bg-gradient-to-r from-white to-zinc-300 bg-clip-text text-transparent">
                        Defina data e local
                      </span>
                    </span>
                  </div>
                  <p className="text-white">
                    Escolha a data, defina o destino e deixe o resto com a gente – sua viagem perfeita começa aqui.
                  </p>
                </div>
              </div>
            </a>
            
            {/* Card 2 */}
            <a
              className="group/card relative h-full overflow-hidden rounded-2xl bg-gradient-to-t from-gray-500 to-gray-700
               bg-[length:100%_100%] bg-[bottom] shadow-[inset_0px_1px_0px_0px_theme(colors.white/.16)]
                hover:bg-[length:100%_150%] sm:mb-0 sm:w-auto p-px before:pointer-events-none before:absolute before:-left-40
                 before:-top-40 before:z-10 before:h-80 before:w-80 before:translate-x-[var(--mouse-x)] before:translate-y-[var(--mouse-y)]
                  before:rounded-full before:bg-zinc-100/80 before:opacity-0 before:blur-3xl before:transition-opacity before:duration-500
                   after:pointer-events-none after:absolute after:-left-48 after:-top-48 after:z-30 after:h-64 after:w-64 after:translate-x-[var(--mouse-x)]
                    after:translate-y-[var(--mouse-y)] after:rounded-full after:bg-indigo-900 after:opacity-0 after:blur-3xl after:transition-opacity
                     after:duration-500 after:hover:opacity-20 before:group-hover:opacity-100"
              href="#0"
            >
            <div className="relative z-20 h-full overflow-hidden rounded-[inherit] ">
                <div
                  className="absolute right-6 top-6 flex h-8 w-8 items-center justify-center rounded-full border border-gray-700/50 bg-gray-800/65 text-gray-200 opacity-0 transition-opacity group-hover/card:opacity-100"
                  aria-hidden="true"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width={9}
                    height={8}
                    fill="none"
                  >
                    <path
                      fill="#F4F4F5"
                      d="m4.92 8-.787-.763 2.733-2.68H0V3.443h6.866L4.133.767 4.92 0 9 4 4.92 8Z"
                    />
                  </svg>
                </div>
                <Image
                  className="inline-flex"
                  src={convideSeusAmigos}
                  width={350}
                  height={288}
                  alt="Workflow 02"
                />
                <div className="p-6">
                  <div className="mb-3">
                    <span className="btn-sm relative rounded-full bg-gray-800/40 px-2.5 py-0.5 text-xs font-normal before:pointer-events-none before:absolute before:inset-0 before:rounded-[inherit] before:border before:border-transparent before:[background:linear-gradient(to_bottom,theme(colors.gray.700/.15),theme(colors.gray.700/.5))_border-box] before:[mask-composite:exclude_!important] before:[mask:linear-gradient(white_0_0)_padding-box,_linear-gradient(white_0_0)] hover:bg-gray-800/60">
                    <span className="bg-gradient-to-r from-white to-zinc-300 bg-clip-text text-transparent">
                        Convide os seus amigos
                      </span>
                    </span>
                  </div>
                  <p className="text-white">
                    Chame os amigos, prepare as malas e embarque em uma viagem inesquecível – juntos, tudo fica melhor!
                  </p>
                </div>
              </div>
            </a>
            {/* Card 3 */}
            <a
              className="group/card relative h-full overflow-hidden rounded-2xl bg-gradient-to-t from-gray-500 to-gray-700
               bg-[length:100%_100%] bg-[bottom] shadow-[inset_0px_1px_0px_0px_theme(colors.white/.16)]
                hover:bg-[length:100%_150%] sm:mb-0 sm:w-auto p-px before:pointer-events-none before:absolute before:-left-40
                 before:-top-40 before:z-10 before:h-80 before:w-80 before:translate-x-[var(--mouse-x)] before:translate-y-[var(--mouse-y)]
                  before:rounded-full before:bg-zinc-100/80 before:opacity-0 before:blur-3xl before:transition-opacity before:duration-500
                   after:pointer-events-none after:absolute after:-left-48 after:-top-48 after:z-30 after:h-64 after:w-64 after:translate-x-[var(--mouse-x)]
                    after:translate-y-[var(--mouse-y)] after:rounded-full after:bg-indigo-900 after:opacity-0 after:blur-3xl after:transition-opacity
                     after:duration-500 after:hover:opacity-20 before:group-hover:opacity-100"
              href="#0"
            >
                <div className="relative z-20 h-full overflow-hidden rounded-[inherit] animate-[gradient_6s_linear_infinite] bg-[linear-gradient(to_right,theme(colors.gray.200),
              theme(colors.indigo.200),theme(colors.gray.50),theme(colors.indigo.300),theme(colors.gray.200))]
              after:absolute after:inset-0 after:bg-gradient-to-br after:from-gray-900/50 after:via-gray-800/25 after:to-gray-900/50">                {/* Arrow */}
                <div
                  className="absolute right-6 top-6 flex h-8 w-8 items-center justify-center rounded-full border border-gray-700/50 bg-gray-800/65 text-gray-200 opacity-0 transition-opacity group-hover/card:opacity-100"
                  aria-hidden="true"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width={9}
                    height={8}
                    fill="none"
                  >
                    <path
                      fill="#F4F4F5"
                      d="m4.92 8-.787-.763 2.733-2.68H0V3.443h6.866L4.133.767 4.92 0 9 4 4.92 8Z"
                    />
                  </svg>
                </div>
                <Image
                  className="inline-flex"
                  src={task}
                  width={350}
                  height={288}
                  alt="Workflow 03"
                />
                <div className="p-6">
                  <div className="mb-3">
                    <span className="btn-sm relative rounded-full bg-gray-800/40 px-2.5 py-0.5 text-xs font-normal before:pointer-events-none before:absolute before:inset-0 before:rounded-[inherit] before:border before:border-transparent before:[background:linear-gradient(to_bottom,theme(colors.gray.700/.15),theme(colors.gray.700/.5))_border-box] before:[mask-composite:exclude_!important] before:[mask:linear-gradient(white_0_0)_padding-box,_linear-gradient(white_0_0)] hover:bg-gray-800/60">
                    <span className="bg-gradient-to-r from-white to-zinc-300 bg-clip-text text-transparent">
                        Atividades
                      </span>
                    </span>
                  </div>
                  <p className="text-white">
                    Planeje cada detalhe, escolha as atividades e viva uma viagem do seu jeito – a aventura começa com você!
                  </p>
                </div>
              </div>
            </a>
          </Spotlight>
        </div>
      </div>
    </section>
  );
}
