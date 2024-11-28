import { MapPin, Calendar, Settings2 } from "lucide-react";
import { useEffect, useState } from "react";
import { format } from "date-fns";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../../../config/firebaseConfig"; 
import { useParams } from "next/navigation";

interface Trip {
  destination: string;
  startDate: string; // Alterado para corresponder aos dados do Firebase
  endDate: string;
}

export default function DestinationAndDateHeader() {
  const [trip, setTrip] = useState<Trip | undefined>();
  const { eventId } = useParams(); // O ID do evento na URL é o destino

  // Função para buscar os dados da viagem no Firestore
  const fetchTripData = async () => {
    if (!eventId) return; // Garante que o ID está definido

    try {
      const tripDoc = await getDoc(doc(db, "trips", eventId)); // Busca o documento pelo ID
      if (tripDoc.exists()) {
        const tripData = tripDoc.data() as Trip;
        setTrip(tripData); // Atualiza o estado com os dados carregados
      } else {
        console.error("Viagem não encontrada!");
      }
    } catch (error) {
      console.error("Erro ao buscar os dados da viagem:", error);
    }
  };

  useEffect(() => {
    fetchTripData(); // Executa ao carregar o componente
  }, [eventId]);

  // Formatação das datas para exibição
  const displayedDate = trip
    ? `${format(new Date(trip.startDate), "d' de 'LLL")} até ${format(new Date(trip.endDate), "d' de 'LLL")}`
    : "Data não definida";

  return (
    <div className="w-full px-4 h-16 rounded-xl bg-opacity-90 bg-zinc-700 shadow-shape flex items-center justify-between">
      <div className="flex items-center gap-2">
        <MapPin className="size-5 text-zinc-100" />
        <span className="text-zinc-100">{trip?.destination || "Destino não definido"}</span>
      </div>

      <div className="flex items-center gap-5">
        <div className="flex items-center gap-2">
          <Calendar className="size-5 text-zinc-100" />
          <span className="text-zinc-100">{displayedDate}</span>
        </div>

        <div className="w-px h-6 bg-zinc-800" />

        <button className="flex items-center gap-2 hover:bg-opacity-10 hover:bg-zinc-200">
          Alterar local/data
          <Settings2 className="size-5" />
        </button>
      </div>
    </div>
  );
}
