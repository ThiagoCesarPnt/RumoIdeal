//Acabar essa pagina e ajustar o fundo
import { MapPin, Trash } from "lucide-react";
import { useState, useEffect } from "react";
import { db } from '../../../../config/firebaseConfig';
import { collection, getDocs, deleteDoc, doc } from "firebase/firestore";

interface Hostel {
  id: string;
  name: string;
  address: string;
  check_in: string;
  check_out: string;
  tripId: string;
}

export default function HostelsList() {
  const [hostels, setHostels] = useState<Hostel[]>([]);

  useEffect(() => {
    const fetchHostels = async () => {
      const tripId = localStorage.getItem("selectedTripId");

      if (!tripId) {
        console.error("ID da viagem não encontrado. Certifique-se de que uma viagem foi selecionada.");
        return;
      }

      const hostelsCollection = collection(db, "hostels");
      const hostelsSnapshot = await getDocs(hostelsCollection);
      const hostelsList = hostelsSnapshot.docs
        .map(doc => ({
          id: doc.id,
          ...doc.data() as Omit<Hostel, 'id'>,
        }))
        .filter(hostel => hostel.tripId === tripId);

      setHostels(hostelsList);
    };

    fetchHostels();
  }, []);

  const handleDeleteHostel = async (hostelId: string) => {
    try {
      const hostelRef = doc(db, "hostels", hostelId);
      await deleteDoc(hostelRef);

      setHostels(prevHostels => prevHostels.filter(hostel => hostel.id !== hostelId));
      console.log(`Hospedagem ${hostelId} excluída com sucesso.`);
    } catch (error) {
      console.error("Erro ao excluir a hospedagem:", error);
    }
  };

  return (
    <div className="space-y-8">
      <div className="space-y-6">
        {hostels.length > 0 ? (
          hostels.map(hostel => (
            <div key={hostel.id} className="space-y-2.5">
              <div className="flex items-center justify-between gap-4">
                <div className="space-y-1.5">
                  <span className="block font-medium text-zinc-100">{hostel.name}</span>
                  <span className="block text-sm text-zinc-400">{hostel.address}</span>
                  <span className="block text-xs text-zinc-300">
                    {`Check-in: ${hostel.check_in} | Check-out: ${hostel.check_out}`}
                  </span>
                </div>
                <button onClick={() => handleDeleteHostel(hostel.id)} className="text-red-500 hover:text-red-700 ml-2">
                  <Trash className="size-5" />
                </button>
              </div>
            </div>
          ))
        ) : (
          <p className="text-zinc-500 text-sm">Nenhuma hospedagem cadastrada.</p>
        )}
      </div>
    </div>
  );
}
