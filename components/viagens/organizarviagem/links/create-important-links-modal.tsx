import { Link, Pencil, X } from "lucide-react";
import { FormEvent } from "react";
import { db } from '../../../../config/firebaseConfig'; 
import { collection, addDoc } from "firebase/firestore"; 

interface CreateImportantLinkModalProps {
  closeCreateImportantLinkModal: () => void;
}

export default function CreateImportantLinksModal({ closeCreateImportantLinkModal }: CreateImportantLinkModalProps) {
  
  async function createLink(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const title = data.get('title')?.toString();
    const url = data.get('url')?.toString();

    if (title && url) { 
      try {
        const linksCollection = collection(db, "important_links"); 
        await addDoc(linksCollection, { title, url }); 

        console.log("Link salvo com sucesso:", { title, url }); 
        closeCreateImportantLinkModal(); 
        window.document.location.reload(); 
      } catch (error) {
        console.error("Erro ao salvar link:", error); 
      }
    } else {
      console.log("Título ou URL não fornecidos."); 
    }
  }

  return (
    <div className="fixed inset-0 bg-zinc-800 bg-opacity-60 flex items-center justify-center">
      <div className="w-[640px] rounded-xl py-5 px-6 shadow-shape bg-zinc-900 space-y-5">
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <h2 className="font-lg font-semibold">Cadastrar links</h2>
            <button>
              <X className="size-5 text-zinc-400" onClick={closeCreateImportantLinkModal} />
            </button>
          </div>

          <p className="text-sm text-zinc-400">
            Todos convidados podem visualizar os links.
          </p>
        </div>
        
        <form onSubmit={createLink} className="space-y-3">
          <div className="h-14 px-4 bg-zinc-950 border border-zinc-800 rounded-lg flex items-center gap-2">
            <Pencil className="text-zinc-100 size-5" />
            <input
              name="title"
              placeholder="Nome para o link"
              className="bg-transparent text-lg placeholder-zinc-100 outline-none flex-1"
            />
          </div>

          <div className="h-14 flex-1 px-4 bg-zinc-950 border border-zinc-800 rounded-lg flex items-center gap-2">
            <Link className="text-zinc-100 size-5" />
            <input
              type="url"
              name="url"
              placeholder="Insira o link"
              className="bg-transparent text-lg placeholder-zinc-100 outline-none flex-1 "
            />
          </div>

          <button className=" flex items-center gap-2 hover:bg-zinc-800 w-full h-11 ">
            Salvar links
          </button>
        </form>
      </div>
    </div>
  );
}
