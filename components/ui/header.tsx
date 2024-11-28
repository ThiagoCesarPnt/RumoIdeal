"use client";

import { useAuth } from "../../config/AuthContext"; // Importando o contexto de autenticação
import Link from "next/link";
import Logo from "./logo";
import { signOut } from "firebase/auth"; // Importando a função de logout
import { useRouter } from "next/navigation"; // Importando useRouter para redirecionamento
import { auth } from "../../config/firebaseConfig";

export default function Header() {
  const { user } = useAuth(); // Obtendo o usuário do contexto de autenticação
  const router = useRouter(); // Inicializando o roteador

  const handleLogout = async () => {
    try {
      await signOut(auth); // Fazendo logout do usuário
      localStorage.removeItem("isLoggedIn"); // Removendo estado de login do localStorage
      router.push("/signin"); // Redirecionando para a página de login
    } catch (error) {
      console.error("Erro ao deslogar:", error);
    }
  };

  return (
    <header className="z-30 mt-2 w-full md:mt-5">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="relative flex h-14 items-center justify-between gap-3 rounded-2xl bg-gray-900/90 px-3 before:pointer-events-none before:absolute before:inset-0 before:rounded-[inherit] before:border before:border-transparent before:[background:linear-gradient(to_right,theme(colors.gray.800),theme(colors.gray.700),theme(colors.gray.800))_border-box] before:[mask-composite:exclude_!important] before:[mask:linear-gradient(white_0_0)_padding-box,_linear-gradient(white_0_0)] after:absolute after:inset-0 after:-z-10 after:backdrop-blur-sm">
          {/* Site branding */}
          <div className="flex flex-1 items-center">
            <Logo />
          </div>

          {/* Desktop sign in links */}
          <ul className="flex flex-1 items-center justify-end gap-3">
            {!user ? ( // Se o usuário não estiver logado
              <>
                <li>
                  <Link
                    href="/signin"
                    className="btn-sm relative bg-gradient-to-b from-gray-800 to-gray-800/60 bg-[length:100%_100%] bg-[bottom] py-[5px] text-gray-300 before:pointer-events-none before:absolute before:inset-0 before:rounded-[inherit] before:border before:border-transparent before:[background:linear-gradient(to_right,theme(colors.gray.800),theme(colors.gray.700),theme(colors.gray.800))_border-box] before:[mask-composite:exclude_!important] before:[mask:linear-gradient(white_0_0)_padding-box,_linear-gradient(white_0_0)] hover:bg-[length:100%_150%]"
                  >
                    Entrar
                  </Link>
                </li>
                <li>
                  <Link
                    href="/signup"
                    className="btn-sm bg-gradient-to-t from-gray-800 to-gray-800/60 bg-[length:100%_100%] bg-[bottom] py-[5px] text-white shadow-[inset_0px_1px_0px_0px_theme(colors.white/.16)] hover:bg-[length:100%_150%]"
                  >
                    Registrar
                  </Link>
                </li>
              </>
            ) : ( // Se o usuário estiver logado
              <li>
                <button onClick={handleLogout} className="btn group mb-4 w-full bg-gradient-to-t from-gray-300 to-gray-700 bg-[length:100%_100%] bg-[bottom] text-white shadow-[inset_0px_1px_0px_0px_theme(colors.white/.16)] hover:bg-[length:100%_150%] sm:mb-0 sm:w-auto">
                  Sair
                </button>
              </li>
            )}
          </ul>
        </div>
      </div>
    </header>
  );
}
