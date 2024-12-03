// Adicione a diretiva "use client" no topo do arquivo
'use client';

import { auth } from '../../../config/firebaseConfig'; 
import { sendPasswordResetEmail } from 'firebase/auth'; 
import { useState } from 'react';

export default function ResetPassword() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    try {
      await sendPasswordResetEmail(auth, email);
      setMessage('Enviamos um e-mail para redefinir sua senha.');
    } catch (error) {
      const errorCode = error.code;
      const errorMessage = error.message;
      if (errorCode === 'auth/invalid-email') {
        setMessage('O endereço de e-mail fornecido é inválido.');
      } else if (errorCode === 'auth/user-not-found') {
        setMessage('Nenhum usuário encontrado com esse e-mail.');
      } else {
        setMessage('Ocorreu um erro ao enviar o e-mail de redefinição.');
      }
    }

    setLoading(false);
  };

  return (
    <section>
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="py-12 md:py-20">
          <div className="pb-12 text-center">
            <h1 className="animate-[gradient_6s_linear_infinite] bg-[linear-gradient(to_right,theme(colors.gray.200),theme(colors.indigo.200),theme(colors.gray.50),theme(colors.indigo.300),theme(colors.gray.200))] bg-[length:200%_auto] bg-clip-text font-nacelle text-3xl font-semibold text-transparent md:text-4xl">
              Esqueci a senha 
            </h1>
          </div>
          <form onSubmit={handleSubmit} className="mx-auto max-w-[400px]">
            <div>
              <label
                className="mb-1 block text-sm font-medium text-indigo-200/65"
                htmlFor="email"
              >
                Email
              </label>
              <input
                id="email"
                type="email"
                className="form-input w-full"
                placeholder="Seu e-mail"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="mt-6">
              <button 
                className="btn w-full bg-gradient-to-t from-indigo-600 to-indigo-500 bg-[length:100%_100%] bg-[bottom] text-white shadow-[inset_0px_1px_0px_0px_theme(colors.white/.16)] hover:bg-[length:100%_150%]"
                type="submit"
                disabled={loading}
              >
                {loading ? 'Enviando...' : 'Mandar E-mail'}
              </button>
            </div>
          </form>

          {message && <div className="mt-4 text-center text-sm text-zinc-400">{message}</div>}
        </div>
      </div>
    </section>
  );
}
