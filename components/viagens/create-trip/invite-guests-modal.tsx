import { X, AtSign, Plus, Trash2 } from "lucide-react";
import { FormEvent, useState, useEffect } from "react";
import { db, collection, addDoc, getDocs, deleteDoc, doc } from "../../../config/firebaseConfig"; // Importando as configurações do Firebase

interface InviteGuestsModalProps {
  closeGuestsModal: () => void;
  emailsToInvite: string[];
  addNewEmailToInvite: (email: string, name: string) => void;
  removeEmailFromInvites: (email: string) => void;
}

export default function InviteGuestsModal({
  closeGuestsModal,
  addNewEmailToInvite,
  emailsToInvite = [],
  removeEmailFromInvites
}: InviteGuestsModalProps) {
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [error, setError] = useState<string | null>(null);
  const [convidados, setConvidados] = useState<any[]>([]); // Estado para armazenar os convidados

  useEffect(() => {
    const fetchConvidados = async () => {
      try {
        const convidadosSnapshot = await getDocs(collection(db, "convidados"));
        const convidadosList = convidadosSnapshot.docs.map(doc => ({ ...doc.data(), id: doc.id }));
        console.log("Convidados:", convidadosList);  // Verificando o retorno
        setConvidados(convidadosList);
      } catch (err) {
        console.error("Erro ao buscar convidados:", err);
      }
    };
  
    fetchConvidados();
  }, []); // Apenas executa uma vez quando o modal for aberto

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (email && name) {
      try {
        const docRef = await addDoc(collection(db, "convidados"), {
          name,
          email,
          createdAt: new Date()
        });

        console.log("Convidado adicionado com ID:", docRef.id);

        // Passa o email e o nome diretamente para addNewEmailToInvite
        addNewEmailToInvite(email, name);

        setEmail('');
        setName('');
        setError(null);

        // Após adicionar o convidado, recarrega a lista de convidados
        const convidadosSnapshot = await getDocs(collection(db, "convidados"));
        const convidadosList = convidadosSnapshot.docs.map(doc => ({ ...doc.data(), id: doc.id }));
        setConvidados(convidadosList);

      } catch (err) {
        console.error("Erro ao adicionar o convidado:", err);
        setError("Erro ao adicionar o convidado. Tente novamente.");
      }
    } else {
      setError("Nome e e-mail são obrigatórios.");
    }
  };

  // Função para excluir o convidado
  const handleDeleteConvidado = async (id: string) => {
    try {
      const convidadoDocRef = doc(db, "convidados", id);
      await deleteDoc(convidadoDocRef); // Exclui o documento do Firestore
      console.log("Convidado excluído com ID:", id);

      // Atualiza a lista de convidados
      setConvidados(convidados.filter(convidado => convidado.id !== id));
    } catch (err) {
      console.error("Erro ao excluir convidado:", err);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
      <div className="w-[640px] rounded-xl py-5 px-6 shadow-xl bg-zinc-900 space-y-5">
        {/* Título e botão X na mesma linha e parte superior direita */}
        <div className="flex justify-between items-center w-full">
          <h3 className="text-lg text-zinc-100">Convidados</h3>
          <button onClick={closeGuestsModal} className="text-zinc-400 hover:text-zinc-300">
            <X className="size-5" />
          </button>
        </div>

        <div className="space-y-2">
          <div className="pb-2">
            <p className="text-sm text-zinc-400">
              Os convidados irão receber e-mails para confirmar a participação na viagem.
            </p>
          </div>

          <div className="flex flex-wrap gap-2">
            {convidados.map((convidado, index) => (
              <div key={index} className="py-1.5 px-3 rounded-lg bg-zinc-800 flex items-center gap-2">
                <span className="text-zinc-300">{convidado.name} ({convidado.email})</span>
                <button
                  onClick={() => handleDeleteConvidado(convidado.id)}
                  className="text-red-500 hover:text-red-400"
                >
                  <Trash2 className="size-5" />
                </button>
              </div>
            ))}
          </div>
        </div>

        <form onSubmit={handleSubmit} className="p-4 bg-zinc-950 border border-zinc-800 rounded-lg flex flex-col gap-4">
          {error && <p className="text-red-500 text-sm">{error}</p>}
          <div className="flex items-center gap-2">
            <AtSign className="text-zinc-400 size-5" />
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Digite o nome do convidado"
              className="bg-transparent text-lg placeholder-zinc-400 outline-none flex-1"
            />
          </div>

          <div className="flex items-center gap-2">
            <AtSign className="text-zinc-400 size-5" />
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Digite o email do convidado"
              className="bg-transparent text-lg placeholder-zinc-400 outline-none flex-1"
            />
          </div>

          <button
            type="submit"
            className="btn group mb-4 w-full bg-gradient-to-t from-gray-300 to-gray-700 bg-[length:100%_100%] bg-[bottom] text-white shadow-[inset_0px_1px_0px_0px_theme(colors.white/.16)] hover:bg-[length:100%_150%] sm:mb-0 sm:w-auto"
          >
            Convidar
            <Plus className="size-5" />
          </button>
        </form>
      </div>
    </div>
  );
}
