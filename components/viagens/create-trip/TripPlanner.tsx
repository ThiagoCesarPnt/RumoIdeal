import { useState } from 'react';
import { collection, addDoc } from "firebase/firestore";
import { db } from '../../../config/firebaseConfig';
import DestinationAndDateStep from './destination-and-date-step';

export default function TripPlanner() {
  const [destination, setDestination] = useState('');
  const [eventStartAndEndDates, setEventStartAndEndDates] = useState<{ from: Date; to: Date } | undefined>(undefined);
  const [isGuestsInputOpen, setIsGuestsInputOpen] = useState(false);

  const openGuestsInput = () => setIsGuestsInputOpen(true);
  const closeGuestsInput = () => setIsGuestsInputOpen(false);

  const handleSave = async () => {
    if (!destination || !eventStartAndEndDates) {
      alert('Por favor, preencha todos os campos.');
      return;
    }

    const tripData = {
      destination,
      startDate: eventStartAndEndDates.from,
      endDate: eventStartAndEndDates.to,
    };

    try {
      await addDoc(collection(db, "trips"), tripData);
      console.log("Viagem salva com sucesso:", tripData);
    } catch (error) {
      console.error("Erro ao salvar a viagem:", error);
    }
  };

  return (
    <div>
      <DestinationAndDateStep
        isGuestsInputOpen={isGuestsInputOpen}
        eventStartAndEndDates={eventStartAndEndDates}
        closeGuestsInput={closeGuestsInput}
        openGuestsInput={openGuestsInput}
        setDestination={setDestination}
        setEventStartAndEndDates={setEventStartAndEndDates} // A função setEventStartAndEndDates está sendo passada aqui
      />
      <button onClick={handleSave} className="mt-4 p-2 bg-blue-500 text-white rounded">
        Salvar Viagem
      </button>
    </div>
  );
}
