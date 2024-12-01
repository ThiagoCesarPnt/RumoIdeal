import { MapPin, Calendar } from "lucide-react";
import { useEffect, useState } from "react";

export default function DestinationAndDateHeader() {
  const [destination, setDestination] = useState<string>("");
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);

  // Carregar os dados do localStorage
  useEffect(() => {
    const storedDestination = localStorage.getItem("destination");
    const storedStartDate = localStorage.getItem("startDate");
    const storedEndDate = localStorage.getItem("endDate");

    if (storedDestination) setDestination(storedDestination);
    if (storedStartDate) setStartDate(new Date(storedStartDate));
    if (storedEndDate) setEndDate(new Date(storedEndDate));
  }, []);

  const formattedStartDate = startDate ? startDate.toLocaleDateString() : "";
  const formattedEndDate = endDate ? endDate.toLocaleDateString() : "";

  return (
    <div className="h-16 bg-opacity-90 bg-zinc-700 px-4 rounded-xl flex items-center shadow-shape gap-3">
      <div className="flex items-center gap-2 flex-1">
        <MapPin className="size-5 text-zinc-100" />
        <span className="text-lg text-zinc-100">{destination || "Destino não selecionado"}</span>
      </div>

      <div className="flex items-center gap-2 text-lg text-zinc-100">
        <Calendar className="size-5 text-zinc-100" />
        <span>{formattedStartDate} até {formattedEndDate}</span>
      </div>
    </div>
  );
}
