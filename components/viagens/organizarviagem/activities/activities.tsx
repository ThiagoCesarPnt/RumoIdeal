import { CircleCheck, Trash } from "lucide-react";
import { useEffect, useState } from "react";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { db } from '../../../../config/firebaseConfig';
import { collection, getDocs, doc, deleteDoc } from "firebase/firestore";

interface Activity {
  id: string;
  title: string;
  occurs_at: string;
  date: string;
  categoryId: string; // Adicionado para vincular as atividades à categoria
}

interface ActivitiesByDate {
  date: string;
  activities: Activity[];
}

interface ActivitiesProps {
  categoryId: string; // Recebe o ID da categoria como prop
}

export default function Activities({ categoryId }: ActivitiesProps) {
  const [activities, setActivities] = useState<ActivitiesByDate[]>([]);

  const fetchActivities = async () => {
    const activitiesCollection = collection(db, "activities");
    const activitiesSnapshot = await getDocs(activitiesCollection);
    const activitiesList: Activity[] = activitiesSnapshot.docs
      .map(doc => ({
        id: doc.id,
        ...doc.data() as Omit<Activity, 'id'>
      }))
      .filter(activity => activity.categoryId === categoryId); // Filtra as atividades pela categoria

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
  };

  useEffect(() => {
    fetchActivities();
  }, [categoryId]); // Atualiza ao mudar a categoria

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

  return (
    <div className="space-y-8">
      {activities.map(category => (
        <div key={category.date} className="space-y-2.5">
          <div className="flex gap-2 items-baseline">
            <span className="text-xl text-zinc-300 font-semibold">Dia {format(new Date(category.date), 'd')}</span>
            <span className="text-xs text-zinc-500">{format(new Date(category.date), 'EEEE', { locale: ptBR })}</span>
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
