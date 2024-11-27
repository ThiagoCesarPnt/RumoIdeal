import { Link2, Trash } from "lucide-react"; // Importando o ícone de lixeira
import { useState, useEffect } from "react";
import { db } from '../../../../config/firebaseConfig'; // Ajuste o caminho conforme necessário
import { collection, getDocs, deleteDoc, doc } from "firebase/firestore"; // Importando deleteDoc e doc

interface Link {
  id: string;
  title: string;
  url: string;
}

export default function ImportantLinks() {
  const [links, setLinks] = useState<Link[]>([]); // Estado para armazenar os links

  useEffect(() => {
    const fetchLinks = async () => {
      const linksCollection = collection(db, "important_links"); // Nome da coleção onde os links estão
      const linksSnapshot = await getDocs(linksCollection);
      const linksList = linksSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data() as Omit<Link, 'id'> // Garantindo que o tipo está correto
      }));

      setLinks(linksList); // Atualiza o estado com os links recuperados
    };

    fetchLinks();
  }, []);

  const handleDeleteLink = async (linkId: string) => {
    try {
      const linkRef = doc(db, "important_links", linkId); // Referência do link a ser excluído
      await deleteDoc(linkRef); // Excluindo do Firestore

      // Atualizando o estado para remover o link excluído da interface
      setLinks(prevLinks => prevLinks.filter(link => link.id !== linkId));
      console.log(`Link ${linkId} excluído com sucesso.`);
    } catch (error) {
      console.error("Erro ao excluir o link:", error);
    }
  };

  return (
    <div className="space-y-8">
      <div className="space-y-6">
        <h2 className="font-semibold text-xl">Links importantes</h2>
        {links.length > 0 ? (
          links.map(link => (
            <div key={link.id} className="space-y-2.5">
              <div className="flex items-center justify-between gap-4">
                <div className="space-y-1.5">
                  <span className="block font-medium text-zinc-100">{link.title}</span>
                  <a href={link.url} className="block text-xs text-zinc-100 truncate hover:text-zinc-200" target="_blank" rel="noopener noreferrer">
                    {link.url}
                  </a>
                </div>
                <button onClick={() => handleDeleteLink(link.id)} className="text-red-500 hover:text-red-700 ml-2">
                  <Trash className="size-5" /> {/* Botão para excluir o link */}
                </button>
              </div>
            </div>
          ))
        ) : (
          <p className="text-zinc-500 text-sm">Nenhum link cadastrado.</p>
        )}
      </div>
    </div>
  );
}
