import { MapPin, Calendar, Settings2, ArrowRight, X } from "lucide-react";
import { useState } from "react";
import { DateRange, DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";
import { format } from "date-fns";
import { db } from "../../../config/firebaseConfig";
import { collection, addDoc } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { Dispatch, SetStateAction } from 'react';

interface DestinationAndDateStepProps {
  isGuestsInputOpen: boolean;
  eventStartAndEndDates: DateRange | undefined;
  closeGuestsInput: () => void;
  openGuestsInput: () => void;
  setDestination: (destination: string) => void;
  setEventStartAndEndDates: Dispatch<SetStateAction<{ from: Date; to: Date } | undefined>>;
}

export default function DestinationAndDateStep({
  closeGuestsInput,
  isGuestsInputOpen,
  openGuestsInput,
  setDestination,
  setEventStartAndEndDates,
  eventStartAndEndDates,
}: DestinationAndDateStepProps) {
  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);
  const [destination, setLocal] = useState<string>("");

  function openDatePicker() {
    setIsDatePickerOpen(true);
  }

  function closeDatePicker() {
    setIsDatePickerOpen(false);
  }

  const displayedDate =
    eventStartAndEndDates &&
      eventStartAndEndDates.from &&
      eventStartAndEndDates.to
      ? format(eventStartAndEndDates.from, "d' de 'LLL").concat(" até ").concat(format(eventStartAndEndDates.to, "d' de 'LLL"))
      : null;

      
  const handleContinue = async () => {
    const auth = getAuth();
    const user = auth.currentUser;

    if (!user) {
      console.log("Usuário não autenticado. Faça login para continuar.");
      return;
    }

    if (!destination || !eventStartAndEndDates?.from || !eventStartAndEndDates?.to) {
      console.log("Preencha todos os campos antes de continuar.");
      return;
    }


    const email = localStorage.getItem("email");

    const tripData = {
      destination,
      startDate: eventStartAndEndDates.from,
      endDate: eventStartAndEndDates.to,
      createBy: email,
    };

    try {
      const docRef = await addDoc(collection(db, "trips"), tripData);

      // Salvar o ID da viagem no localStorage
      localStorage.setItem("selectedTripId", docRef.id);
      localStorage.setItem("destination", tripData.destination);
      console.log("ID da viagem salvo no localStorage:", docRef.id);

      // Abrir a etapa de convidados
      openGuestsInput();
    } catch (error) {
      console.error("Erro ao salvar dados da viagem:", error);
    }
  };

  return (
    <div className="h-16 bg-opacity-90 bg-zinc-700 px-4 rounded-xl flex items-center shadow-shape gap-3">
      <div className="flex items-center gap-2 flex-1">
        <MapPin className="size-5 text-zinc-100" />
        <input
          disabled={isGuestsInputOpen}
          type="text"
          placeholder="Para onde você vai?"
          className="bg-transparent text-lg placeholder-zinc-100 outline-none flex-1"
          onChange={(event) => {
            setLocal(event.target.value);
            setDestination(event.target.value);
          }}
        />
      </div>

      <button
        disabled={isGuestsInputOpen}
        onClick={openDatePicker}
        className="flex items-center gap-2 text-left w-[240px]"
      >
        <Calendar className="size-5 text-zinc-100" />
        <span className="text-lg text-zinc-100 w-40 flex-1">{displayedDate || "Quando"}</span>
      </button>

      {isDatePickerOpen && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center">
          <div className="rounded-xl py-5 px-6 shadow-shape bg-zinc-900 space-y-5">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <h2 className="font-lg font-semibold">Selecione a data</h2>
                <button>
                  <X className="size-5 text-zinc-100" onClick={closeDatePicker} />
                </button>
              </div>
            </div>

            <DayPicker mode="range" selected={eventStartAndEndDates} onSelect={setEventStartAndEndDates} />
          </div>
        </div>
      )}

      <div className="w-px h-6 bg-zinc-100" />

      {isGuestsInputOpen ? (
        <button onClick={closeGuestsInput} className="flex items-center gap-2 hover:bg-opacity-10 hover:bg-zinc-200">
          Alterar local/data
          <Settings2 className="size-5" />
        </button>
      ) : (
        <button onClick={handleContinue} className="flex items-center gap-2 hover:bg-opacity-10 hover:bg-zinc-200">
          Confirmar
          <ArrowRight className="size-5" />
        </button>
      )}
    </div>
  );
}