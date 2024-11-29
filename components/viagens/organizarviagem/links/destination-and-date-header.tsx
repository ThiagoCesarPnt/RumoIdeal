import { MapPin, Calendar } from "lucide-react";
import { format } from "date-fns";

export default function DestinationAndDateHeader() {

  const trip = {
    destination: "Miami, Florida",
    startDate: new Date(2024, 11, 1), 
    endDate: new Date(2024, 11, 7), 
  };

  const displayedDate = `${format(trip.startDate, "d 'de' LLL")} até ${format(
    trip.endDate,
    "d 'de' LLL"
  )}`;

  return (
    <div className="w-full px-4 h-16 rounded-xl bg-opacity-90 bg-zinc-700 shadow-shape flex items-center justify-between">
      <div className="flex items-center gap-2">
        <MapPin className="size-5 text-zinc-100" />
        <span className="text-zinc-100">{trip.destination}</span>
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
