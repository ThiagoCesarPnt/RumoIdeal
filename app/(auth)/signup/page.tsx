"use client";
import { useEffect, useState } from "react";
import { auth } from "../../../config/firebaseConfig"; // ajuste conforme a estrutura
import { createUserWithEmailAndPassword } from "firebase/auth"; // Importar a função aqui
import Link from "next/link";
import { useAuth } from "../../../config/AuthContext"; // Importando o contexto de autenticação
import { useRouter } from "next/navigation"; // Importando useRouter para redirecionamento

export default function SignUp() {
  const { user } = useAuth(); // Obtendo o usuário do contexto de autenticação
  const router = useRouter(); // Inicializando o roteador
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showMessage, setShowMessage] = useState(false); // Novo estado para controlar a mensagem

  // Utilizando useEffect para redirecionar se o usuário estiver autenticado
  useEffect(() => {
    if (user) {
      setShowMessage(true); // Mostra a mensagem quando o usuário está logado
      const timer = setTimeout(() => {
        router.push("/"); // Redireciona após 3 segundos
      }, 3000); // Delay de 3000 milissegundos (3 segundos)

      return () => clearTimeout(timer); // Limpa o timer ao desmontar o componente
    }
  }, [user, router]);

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      console.log("Usuário criado com sucesso:", userCredential);
      // Você pode redirecionar ou fazer outra ação após o registro bem-sucedido
    } catch (error) {
      console.error("Erro ao criar usuário:", error);
      setError("Erro ao criar usuário: " + error.message);
    }
  };

  // Renderizando mensagem se o usuário já estiver logado
  if (showMessage && user) {
    return (
      <section className="flex items-center justify-center min-h-screen bg-gradient-to-b from-indigo-900 to-indigo-600">
        <div className="bg-white shadow-lg rounded-lg p-8 max-w-md text-center">
          <h1 className="text-3xl font-bold text-indigo-600 mb-4">
            Você já está logado!
          </h1>
          <p className="text-lg text-gray-700 mb-6">
            Estamos te levando de volta à página inicial.
          </p>
          <Link className="mt-4 text-indigo-500 font-semibold underline" href="/">
            Voltar para a página inicial
          </Link>
        </div>
      </section>
    );
  }

  return (
    <section>
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <Link
          href="/"
          className="absolute top-4 left-4 inline-flex items-center px-2 py-1 text-sm font-medium bg-gradient-to-t text-indigo-200/65 rounded-md shadow hover:bg-[length:100%_150%] sm:px-2 sm:py-1"
        >
          Voltar
        </Link>

        <div className="py-12 md:py-20">
          <div className="pb-12 text-center">
            <h1 className="animate-[gradient_6s_linear_infinite] bg-[linear-gradient(to_right,theme(colors.gray.200),theme(colors.indigo.200),theme(colors.gray.50),theme(colors.indigo.300),theme(colors.gray.200))] bg-[length:200%_auto] bg-clip-text font-nacelle text-3xl font-semibold text-transparent md:text-4xl">
              Criar conta
            </h1>
          </div>
          <form className="mx-auto max-w-[400px]" onSubmit={handleSignUp}>
            <div className="space-y-5">
              <div>
                <label className="mb-1 block text-sm font-medium text-indigo-200/65" htmlFor="name">
                  Nome <span className="text-red-500">*</span>
                </label>
                <input
                  id="name"
                  type="text"
                  className="form-input w-full"
                  placeholder="Insira o seu nome"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>

              <div>
                <label className="mb-1 block text-sm font-medium text-indigo-200/65" htmlFor="email">
                  Email <span className="text-red-500">*</span>
                </label>
                <input
                  id="email"
                  type="email"
                  className="form-input w-full"
                  placeholder="Insira o seu e-mail"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-indigo-200/65" htmlFor="password">
                  Senha <span className="text-red-500">*</span>
                </label>
                <input
                  id="password"
                  type="password"
                  className="form-input w-full"
                  placeholder="Insira sua senha"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>
            {error && <p className="text-red-500">{error}</p>}
            <div className="mt-6 space-y-5">
              <button className="btn w-full bg-gradient-to-t from-gray-400  text-indigo-200/65">
                Registrar
              </button>
            </div>
          </form>
          <div className="mt-6 text-center text-sm text-indigo-200/65">
            Já está registrado?{" "}
            <Link className="font-medium text-indigo-500" href="/signin">
              Entrar
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
