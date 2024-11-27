"use client"; // Torna este componente um Componente de Cliente

import PageIllustration from "@/components/page-illustration";
import { Plane } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react"; 
import { collection, getDocs, doc, deleteDoc } from "firebase/firestore"; 
import { db } from '../../config/firebaseConfig'; 

// Definindo a interface para os dados da viagem
interface Viagem {
  id: string;
  destination: string;
  startDate: any; // Pode ser um Timestamp do Firebase, então usamos 'any'
  endDate: any; // Pode ser um Timestamp do Firebase, então usamos 'any'
}

export default function ViagensMarcadas() {
  const [viagens, setViagens] = useState<Viagem[]>([]); // Estado agora é tipado como Viagem[]

  // Função para buscar as viagens do Firestore
  const fetchViagens = async () => {
    try {
      const viagensCollection = collection(db, "trips"); // Referência à coleção de viagens
      const viagensSnapshot = await getDocs(viagensCollection); // Obtém os documentos da coleção
      const viagensList: Viagem[] = viagensSnapshot.docs.map(doc => {
        const data = doc.data();
        return {
          id: doc.id,
          destination: data.destination || '', // Garantindo valores padrão caso algum dado esteja ausente
          startDate: data.startDate ? data.startDate.toDate() : new Date(), // Verificando se startDate existe
          endDate: data.endDate ? data.endDate.toDate() : new Date() // Verificando se endDate existe
        };
      });

      setViagens(viagensList); // Atualiza o estado com as viagens
    } catch (error) {
      console.error("Erro ao buscar viagens:", error); // Log de erro se ocorrer um problema
    }
  };

  // Função para excluir a viagem
  const handleDeleteTrip = async (tripId: string) => {
    const tripRef = doc(db, "trips", tripId); // Referência ao documento da viagem a ser excluída
    const confirmDelete = window.confirm("Você tem certeza que deseja excluir esta viagem?"); // Confirmação de exclusão

    if (confirmDelete) {
      try {
        await deleteDoc(tripRef); // Exclui o documento
        console.log("Viagem excluída com sucesso:", tripId);
        // Atualiza a lista de viagens após a exclusão
        fetchViagens(); 
      } catch (error) {
        console.error("Erro ao excluir a viagem:", error);
      }
    }
  };

  useEffect(() => {
    fetchViagens(); 
  }, []);

  return (
    <div>
      <PageIllustration />

      <div className="relative">
        <div className="flex flex-col items-center justify-center bg-pattern bg-no-repeat mt-10">
          <h1
            className="animate-[gradient_6s_linear_infinite] bg-[linear-gradient(to_right,theme(colors.gray.200),theme(colors.indigo.200),theme(colors.gray.50),theme(colors.indigo.300),theme(colors.gray.200))] bg-[length:200%_auto] bg-clip-text pb-5 font-nacelle text-4xl font-semibold text-transparent md:text-3xl"
            data-aos="fade-up"
          >
            Viagens Marcadas
          </h1>

          <div className="p-4  bg-opacity-50 bg-zinc-900">
            {viagens.length > 0 ? (
              viagens.map(viagem => (
                <div key={viagem.id} className="w-[640px] rounded-xl py-5 px-6 shadow-shape bg-zinc-700 space-y-5 mb-4 relative">
                  <div className="space-y-1.5">
                    <div className="flex justify-between">
                      <span className="block font-medium text-zinc-100">{viagem.destination}</span>
                      <Plane className="text-zinc-400 size-5 shrink-0" />
                    </div>
                    <a href="#" className="block text-xs text-zinc-400 truncate hover:text-zinc-200">
                      {`${viagem.startDate.toLocaleDateString()} até ${viagem.endDate.toLocaleDateString()}`}
                    </a>
                  </div>
                  <Link href="/viagens/organizarviagem" className="text-indigo-400 hover:underline">
                    Organizar Viagem
                  </Link>
                  
                  <button 
                    onClick={() => handleDeleteTrip(viagem.id)} 
                    className="absolute bottom-2 right-2 text-xs text-white bg-red-600 hover:bg-red-700 rounded px-2 py-1 transition duration-200"
                  >
                    Excluir
                  </button>
                </div>
              ))
            ) : (
              <span className="text-zinc-400">Nenhuma viagem cadastrada.</span>
            )}
          </div>

          <div className="px-4 py-2 flex justify-center mt-8">
            <Link
              href="/viagens/create-trip"
              className="btn group mb-4 w-full bg-gradient-to-t from-gray-300 to-gray-700 bg-[length:100%_100%] bg-[bottom] text-white shadow-[inset_0px_1px_0px_0px_theme(colors.white/.16)] hover:bg-[length:100%_150%] sm:mb-0 sm:w-auto"
            >
              Marcar Viagem
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
