import { Link2, Trash } from "lucide-react"; 
import { useState, useEffect } from "react";
import { db } from '../../../../config/firebaseConfig'; 
import { collection, getDocs, deleteDoc, doc } from "firebase/firestore"; 

interface Link {
  id: string;
  title: string;
  url: string;
  tripId: string; 
}

export default function ImportantLinks() {
  const [links, setLinks] = useState<Link[]>([]); 

  useEffect(() => {
    const fetchLinks = async () => {
      const tripId = localStorage.getItem("selectedTripId");

      if (!tripId) {
        console.error("ID da viagem não encontrado. Certifique-se de que uma viagem foi selecionada.");
        return;
      }

      const linksCollection = collection(db, "important_links");
      const linksSnapshot = await getDocs(linksCollection);
      const linksList = linksSnapshot.docs
        .map(doc => ({
          id: doc.id,
          ...doc.data() as Omit<Link, 'id'>,
        }))
        .filter(link => link.tripId === tripId);

      setLinks(linksList);
    };

    fetchLinks();
  }, []);

  const handleDeleteLink = async (linkId: string) => {
    try {
      const linkRef = doc(db, "important_links", linkId);
      await deleteDoc(linkRef);

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
                  <Trash className="size-5" />
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
