import { MapPin, Calendar } from "lucide-react";
import { useEffect, useState } from "react";
import { format } from "date-fns";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../../../config/firebaseConfig";
import { useParams } from "next/navigation";

interface Trip {
  destination: string;
  startDate: string; 
  endDate: string;
}

export default function DestinationAndDateHeader() {
  const [trip, setTrip] = useState<Trip | null>(null); 
  const { eventId } = useParams(); 

  const fetchTripData = async () => {
    if (!eventId) {
      console.error("ID do evento não encontrado!");
      return;
    }

    try {
      const tripDoc = await getDoc(doc(db, "trips", eventId)); 
      if (tripDoc.exists()) {
        const tripData = tripDoc.data() as Trip; 
        setTrip(tripData); 
      } else {
        console.error("Viagem não encontrada!");
      }
    } catch (error) {
      console.error("Erro ao buscar os dados da viagem:", error);
    }
  };

  useEffect(() => {
    fetchTripData(); 
  }, [eventId]);

  const displayedDate = trip
    ? `${format(new Date(trip.startDate), "d 'de' LLL")} até ${format(new Date(trip.endDate), "d 'de' LLL")}`
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
      </div>
    </div>
  );
}
