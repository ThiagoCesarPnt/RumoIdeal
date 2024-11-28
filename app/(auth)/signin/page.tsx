"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../../config/firebaseConfig";

export default function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const router = useRouter();

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccessMessage("");

    try {
      await signInWithEmailAndPassword(auth, email, password);

      // Salva o estado de autenticação no localStorage
      localStorage.setItem("isLoggedIn", "true");
      localStorage.setItem("email", email);

      setSuccessMessage("Login realizado com sucesso!");
      setTimeout(() => router.push("/"), 1500); // Redireciona após 1,5 segundos
    } catch (error: any) {
      console.error("Erro ao fazer login:", error);
      setError("Erro ao fazer login: " + error.message);
    }
  };

  useEffect(() => {
    // Verifica se o usuário já está logado e redireciona se necessário
    if (localStorage.getItem("isLoggedIn") === "true") {
      router.push("/"); // Redireciona para a página inicial
    }
  }, []);

  return (
    <section>
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
      <Link
          href="/"
          className="absolute top-4 left-4 inline-flex items-center px-2 py-1 text-sm font-medium bg-gradient-to-t  text-white rounded-md shadow hover:bg-[length:100%_150%] sm:px-2 sm:py-1"
        >
          Voltar
        </Link>
        <div className="py-12 md:py-20">
          <div className="pb-12 text-center">
            <h1 className="animate-[gradient_6s_linear_infinite] bg-[linear-gradient(to_right,theme(colors.gray.200),theme(colors.indigo.200),theme(colors.gray.50),theme(colors.indigo.300),theme(colors.gray.200))] bg-[length:200%_auto] bg-clip-text font-nacelle text-3xl font-semibold text-transparent md:text-4xl">
              Faça o login
            </h1>
          </div>
          <form className="mx-auto max-w-[400px]" onSubmit={handleSignIn}>
            <div className="space-y-5">
              <div>
                <label className="mb-1 block text-sm font-medium text-indigo-200/65" htmlFor="email">
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  className="form-input w-full"
                  placeholder="Insira o seu e-mail"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-indigo-200/65" htmlFor="password">
                  Senha
                </label>
                <input
                  id="password"
                  type="password"
                  className="form-input w-full"
                  placeholder="Insira sua senha"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <Link className="text-sm text-gray-600 hover:underline" href="/reset-password">
                  Esqueceu a senha?
                </Link>
              </div>
            </div>
            {error && <p className="text-red-500">{error}</p>}
            {successMessage && <p className="text-green-500">{successMessage}</p>}
            <div className="mt-6 space-y-5">
              <button className="btn w-full bg-gradient-to-t from-gray-400  text-indigo-200/65">
                Entrar
              </button>
            </div>
          </form>
          <div className="mt-6 text-center text-sm text-indigo-200/65">
            Não possui conta?{" "}
            <Link className="font-medium text-indigo-500" href="/signup">
              Registrar
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
