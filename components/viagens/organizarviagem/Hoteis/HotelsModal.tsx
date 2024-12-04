import { Calendar, MapPin, X } from "lucide-react";
import { FormEvent, useState } from "react";
import { db } from '../../../../config/firebaseConfig';
import { collection, addDoc } from "firebase/firestore";
import { DayPicker } from "react-day-picker";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

interface HostelsModalProps {
  closeHostelsModal: () => void;
  addHostel?: (hostel: { id: string; name: string; address: string; check_in: string; check_out: string; }) => void;
}

export default function HostelsModal({
  closeHostelsModal,
  addHostel
}: HostelsModalProps) {
  const [selectedCheckIn, setSelectedCheckIn] = useState<Date | null>(null);
  const [selectedCheckOut, setSelectedCheckOut] = useState<Date | null>(null);
  const [isDatePickerOpen, setIsDatePickerOpen] = useState<"check_in" | "check_out" | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  function openDatePicker(type: "check_in" | "check_out") {
    setIsDatePickerOpen(type);
  }

  function closeDatePicker() {
    setIsDatePickerOpen(null);
  }

  async function createHostel(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const name = event.currentTarget.name.value;
    const address = event.currentTarget.address.value;

    if (!selectedCheckIn || !selectedCheckOut) {
      setErrorMessage("Por favor, selecione as datas de check-in e check-out.");
      return;
    }

    if (selectedCheckIn >= selectedCheckOut) {
      setErrorMessage("A data de check-in deve ser anterior à data de check-out.");
      return;
    }

    setErrorMessage(null);
    const trip = localStorage.getItem("selectedTripId");
    const hostelData = {
      trip,
      name,
      address,
      check_in: selectedCheckIn.toISOString().split('T')[0],
      check_out: selectedCheckOut.toISOString().split('T')[0],
    };

    const docRef = await addDoc(collection(db, "hostels"), hostelData);

    const hostel = { id: docRef.id, ...hostelData };

    if (addHostel) {
      addHostel(hostel);
    }

    window.location.reload();
    closeHostelsModal();
  }

  return (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center px-4">
      <div className="w-full max-w-[720px] px-8 py-7 rounded-xl shadow-lg bg-zinc-900 space-y-7">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold">Cadastrar hospedagem</h2>
          <button onClick={closeHostelsModal}>
            <X className="size-6 text-zinc-400" />
          </button>
        </div>

        <p className="text-sm text-zinc-400">
          Todos os convidados podem visualizar as hospedagens.
        </p>

        <form onSubmit={createHostel} className="space-y-5">
          <div className="h-14 px-4 bg-zinc-950 border border-zinc-800 rounded-lg flex items-center gap-2">
            <MapPin className="text-zinc-400 size-5" />
            <input
              name="name"
              placeholder="Nome do hotel ou hospedagem"
              className="bg-transparent text-lg placeholder-zinc-400 outline-none flex-1"
              required
            />
          </div>
          <div className="h-14 px-4 bg-zinc-950 border border-zinc-800 rounded-lg flex items-center gap-2">
            <input
              name="address"
              placeholder="Endereço"
              className="bg-transparent text-lg placeholder-zinc-400 outline-none flex-1"
              required
            />
          </div>

          <div className="flex flex-col sm:flex-row gap-5">
            <div className="flex-1 h-14 px-4 bg-zinc-950 border border-zinc-800 rounded-lg flex items-center gap-2">
              <Calendar className="text-zinc-400 size-5" />
              <input
                type="text"
                value={selectedCheckIn ? format(selectedCheckIn, 'dd/MM/yyyy') : ''}
                readOnly
                onClick={() => openDatePicker("check_in")}
                placeholder="Data de check-in"
                className="bg-transparent text-lg placeholder-zinc-400 outline-none flex-1 cursor-pointer"
              />
            </div>
            <div className="flex-1 h-14 px-4 bg-zinc-950 border border-zinc-800 rounded-lg flex items-center gap-2">
              <Calendar className="text-zinc-400 size-5" />
              <input
                type="text"
                value={selectedCheckOut ? format(selectedCheckOut, 'dd/MM/yyyy') : ''}
                readOnly
                onClick={() => openDatePicker("check_out")}
                placeholder="Data de check-out"
                className="bg-transparent text-lg placeholder-zinc-400 outline-none flex-1 cursor-pointer"
              />
            </div>
          </div>
          {errorMessage && (
            <p className="text-red-500 text-sm">{errorMessage}</p>
          )}

          {isDatePickerOpen && (
            <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center bg-black/60 z-10">
              <div className="bg-zinc-900 rounded-lg p-4 relative">
                <button
                  type="button"
                  onClick={closeDatePicker}
                  className="absolute top-2 right-2 text-zinc-400"
                >
                  <X className="size-5" />
                </button>
                <DayPicker
                  mode="single"
                  selected={isDatePickerOpen === "check_in" ? selectedCheckIn : selectedCheckOut}
                  onSelect={(date) => {
                    if (isDatePickerOpen === "check_in") {
                      setSelectedCheckIn(date);
                    } else {
                      setSelectedCheckOut(date);
                    }
                    closeDatePicker();
                  }}
                  locale={ptBR}
                />
              </div>
            </div>
          )}

          <button
            type="submit"
            className="w-full h-14 rounded-lg text-lg font-bold bg-gradient-to-t from-gray-700 to-gray-500 hover:from-gray-600 hover:to-gray-400 text-white"
          >
            Salvar hospedagem
          </button>
        </form>
      </div>
    </div>
  );
}
