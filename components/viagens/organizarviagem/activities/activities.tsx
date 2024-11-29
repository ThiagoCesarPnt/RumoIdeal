import { CircleCheck, Trash } from "lucide-react";
import { useEffect, useState } from "react";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { db } from '../../../../config/firebaseConfig';
import { collection, getDocs, doc, deleteDoc, query, where } from "firebase/firestore";
import axios from "axios";

interface Activity {
  id: string;
  title: string;
  occurs_at: string;
  date: string;
}

interface ActivitiesByDate {
  date: string;
  activities: Activity[];
}

interface WeatherForecast {
  temp: number;
}

export default function Activities() {
  const [activities, setActivities] = useState<ActivitiesByDate[]>([]);
  const [currentWeather, setCurrentWeather] = useState<WeatherForecast | null>(null);
  const selectedTripId = localStorage.getItem("selectedTripId");
  const destination = localStorage.getItem("destination");

  const fetchActivities = async () => {
    if (!selectedTripId) {
      console.error("Nenhuma viagem selecionada.");
      return;
    }

    try {
      const activitiesCollection = collection(db, "activities");
      const q = query(activitiesCollection, where("trip", "==", selectedTripId));
      const activitiesSnapshot = await getDocs(q);

      const activitiesList: Activity[] = activitiesSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data() as Omit<Activity, 'id'>
      }));
      const activitiesByDate: ActivitiesByDate[] = activitiesList.reduce((acc: ActivitiesByDate[], activity) => {
        const date = activity.date;
        const existingDateIndex = acc.findIndex(item => item.date === date);
        if (existingDateIndex > -1) {
          acc[existingDateIndex].activities.push(activity);
        } else {
          acc.push({ date, activities: [activity] });
        }
        return acc;
      }, []);

      setActivities(activitiesByDate);
    } catch (error) {
      console.error("Erro ao buscar atividades:", error);
    }
  };

  const fetchWeather = async () => {
    if (!destination) {
      console.error("Destino não encontrado no localStorage.");
      setCurrentWeather(null);  // Clear weather if destination is missing
      return;
    }
  
    const url = `https://api.allorigins.win/raw?url=https://api.hgbrasil.com/weather?key=caf90c00&city_name=${destination}`;
    console.log("URL da requisição:", url);
    console.log("Destino:", destination);

    try {
      const response = await axios.get(url);
      console.log("Resposta da API:", response.data);  // Verifique a resposta da API
      const currentWeatherData = response.data.results;
      setCurrentWeather({
        temp: currentWeatherData.temp
      });
    } catch (error) {
      console.error("Erro ao buscar clima:", error);
    }
  };

  useEffect(() => {
    fetchActivities();
    fetchWeather(); // Chama a função para buscar o clima
  }, []); // Executa ao montar o componente

  const handleDeleteActivity = async (activityId: string) => {
    if (window.confirm("Você tem certeza que deseja excluir esta atividade?")) {
      try {
        const activityRef = doc(db, "activities", activityId);
        await deleteDoc(activityRef);
        setActivities(prevActivities =>
          prevActivities.map(category => ({
            ...category,
            activities: category.activities.filter(activity => activity.id !== activityId)
          })).filter(category => category.activities.length > 0)
        );
        console.log(`Atividade ${activityId} excluída com sucesso.`);
      } catch (error) {
        console.error("Erro ao excluir a atividade:", error);
      }
    }
  };

  console.log("Estado currentWeather:", currentWeather);  // Verifique o estado
  
  return (
    <div className="space-y-8">
      {activities.map(category => (
        <div key={category.date} className="space-y-2.5">
          <div className="flex gap-2 items-baseline">
            <span className="text-xl text-zinc-300 font-semibold">Dia {format(new Date(category.date), 'd')}</span>
            <span className="text-xs text-zinc-500">{format(new Date(category.date), 'EEEE', { locale: ptBR })}</span>
  
            <span>Temperatura Atual:</span>
            {currentWeather ? (
              <span>
                {currentWeather.temp}°C
              </span>
            ) : (
              <span>Carregando...</span>
            )}
          </div>
          
          {category.activities.length > 0 ? (
            <div>
              {category.activities.map(activity => (
                <div key={activity.id} className="space-y-2.5">
                  <div className="px-4 py-2.5 bg-zinc-700 bg-opacity-90 rounded-xl shadow-shape flex items-center gap-3">
                    <CircleCheck className="size-5 text-lime-300" />
                    <span className="text-zinc-100">{activity.title}</span>
                    <span className="text-zinc-100 text-sm ml-auto">
                      {format(new Date(activity.occurs_at), 'HH:mm')}h
                    </span>
                    <button onClick={() => handleDeleteActivity(activity.id)} className="text-red-500 hover:text-red-700 ml-2">
                      <Trash className="size-5" />
                    </button> 
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-zinc-500 text-sm">Nenhuma atividade cadastrada nessa data.</p>
          )}
        </div>
      ))}
    </div>
  );
}
