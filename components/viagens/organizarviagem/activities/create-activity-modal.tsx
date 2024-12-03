import { Calendar, Tag, X } from "lucide-react"; 
import { FormEvent, useState } from "react"; 
import { db } from '../../../../config/firebaseConfig';
import { collection, addDoc } from "firebase/firestore"; 
import { DayPicker } from "react-day-picker"; 
import { format } from "date-fns"; 
import { ptBR } from "date-fns/locale";

interface CreateActivityModalProps {
  closeCreateActivityModal: () => void;
  addActivity?: (activity: { id: string; title: string; occurs_at: string; date: string; }) => void;
}

export default function CreateActivityModal({
  closeCreateActivityModal,
  addActivity
}: CreateActivityModalProps) {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState<string>('00:00');
  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);

  function openDatePicker() {
    setIsDatePickerOpen(true);
  }
  
  function closeDatePicker() {
    setIsDatePickerOpen(false);
  }

  async function createActivity(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
  
    const title = event.currentTarget.title.value;
    const occurs_at = selectedDate && selectedTime 
      ? new Date(`${selectedDate.toISOString().split('T')[0]}T${selectedTime}:00`)
      : null;
  
    if (occurs_at) {
      occurs_at.setMinutes(occurs_at.getMinutes() - occurs_at.getTimezoneOffset());
  
      const trip = localStorage.getItem("selectedTripId");
      const activityData = {
        trip,
        title,
        occurs_at: occurs_at.toISOString(),
        date: occurs_at.toISOString().split('T')[0],
      };
  
      const docRef = await addDoc(collection(db, "activities"), activityData);
  
      const activity = { id: docRef.id, ...activityData };
  
      if (addActivity) {
        addActivity(activity);
      }
  
      window.location.reload();
      closeCreateActivityModal();
    }
  }
  

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center">
      <div className="w-[640px] rounded-xl py-5 px-6 shadow-shape bg-zinc-900 space-y-5">
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <h2 className="font-lg font-semibold">Cadastrar atividades</h2>
            <button onClick={closeCreateActivityModal}>
              <X className="size-5 text-zinc-400" />
            </button>
          </div>
          <p className="text-sm text-zinc-400">Todos convidados podem visualizar os links.</p>
        </div>

        <form onSubmit={createActivity} className="space-y-3">
          <div className="h-14 px-4 bg-zinc-950 border border-zinc-800 rounded-lg flex items-center gap-2">
            <Tag className="text-zinc-400 size-5" />
            <input
              name="title"
              placeholder="Qual a atividade?"
              className="bg-transparent text-lg placeholder-zinc-400 outline-none flex-1"
              required
            />
          </div>

          <div className="h-14 flex-1 px-4 bg-zinc-950 border border-zinc-800 rounded-lg flex items-center gap-2">
            <Calendar className="text-zinc-400 size-5" />
            <input
              type="text"
              value={selectedDate ? format(selectedDate, 'dd/MM/yyyy') : ''}
              readOnly
              onClick={openDatePicker}
              placeholder="Selecione a data"
              className="bg-transparent text-lg placeholder-zinc-400 outline-none flex-1 cursor-pointer"
            />
            <div className="relative">
              <select
                value={selectedTime}
                onChange={(e) => setSelectedTime(e.target.value)}
                className="bg-zinc-800 text-zinc-200 border border-zinc-700 rounded-lg h-full px-2"
              >
                {Array.from({ length: 48 }, (_, i) => {
                  const hours = String(Math.floor(i / 2)).padStart(2, '0');
                  const minutes = i % 2 === 0 ? '00' : '30';
                  return <option key={i} value={`${hours}:${minutes}`}>{`${hours}:${minutes}`}</option>;
                })}
              </select>
            </div>
          </div>

          {isDatePickerOpen && (
            <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center bg-black/50 z-10">
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
                  selected={selectedDate}
                  onSelect={setSelectedDate}
                  locale={ptBR}
                />
              </div>
            </div>
          )}

          <button type="submit" className="flex items-center gap-2 hover:bg-zinc-800">
            Salvar atividades
          </button>
        </form>
      </div>
    </div>
  );
}
