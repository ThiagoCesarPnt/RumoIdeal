import { CheckCircle2, CircleDashed, UserCog, Trash2 } from "lucide-react";
import { useState, useEffect } from "react";
import { db, collection, addDoc, deleteDoc, getDocs, doc } from "../../../../config/firebaseConfig"; 
import { useParams } from "next/navigation";
import InviteGuestsModal from "../../create-trip/invite-guests-modal"; 

interface Participant {
  id: string;
  name: string | null;
  email: string;
  is_confirmed: boolean;
}

export default function Guests() {
  const [participants, setParticipants] = useState<Participant[]>([]);
  const [emailsToInvite, setEmailsToInvite] = useState<string[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { eventId } = useParams();
  const [convidados, setConvidados] = useState<any[]>([]); 

  const fetchParticipants = async () => {
    const querySnapshot = await getDocs(collection(db, "events", eventId!, "participants"));
    const participantsList = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    setParticipants(participantsList as Participant[]);
  };

  const fetchConvidados = async () => {
    const querySnapshot = await getDocs(collection(db, "events", eventId!, "convidados"));
    const convidadosList = querySnapshot.docs
      .map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }))
      .filter((convidado) => convidado.eventId === eventId);

    console.log("Convidados encontrados:", convidadosList); 
    setConvidados(convidadosList);
  };

  const inviteParticipant = async (email: string, name: string | null) => {
    try {
      const docRef = await addDoc(collection(db, "events", eventId!, "participants"), {
        email,
        name,
        is_confirmed: false,
      });
      const newParticipant = { id: docRef.id, email, name, is_confirmed: false };
      setParticipants((prev) => [...prev, newParticipant]);
    } catch (error) {
      console.error("Erro ao convidar participante:", error);
    }
  };

  const removeParticipant = async (id: string) => {
    try {
      await deleteDoc(doc(db, "events", eventId!, "participants", id));
      setParticipants((prev) => prev.filter((participant) => participant.id !== id));
    } catch (error) {
      console.error("Erro ao excluir participante:", error);
    }
  };

  useEffect(() => {
    if (eventId) {
      fetchParticipants();
      fetchConvidados();
    }
  }, [eventId]); 

  const handleAddEmailToInvite = (email: string, name: string) => {
    setEmailsToInvite((prev) => [...prev, email]);
    inviteParticipant(email, name); 
  };

  const handleRemoveEmailFromInvites = (email: string) => {
    setEmailsToInvite((prev) => prev.filter((item) => item !== email));
  };

  return (
    <div className="space-y-6">
      <h2 className="font-semibold text-xl">Convidados</h2>

      <div className="space-y-5">

        {convidados.length > 0 && 
          convidados.map((convidado, index) => (
            <div key={convidado.id} className="flex items-center justify-between gap-4">
              <div className="space-y-1.5">
                <span className="block font-medium text-zinc-100">{convidado.name ?? `Convidado ${index + 1}`}</span>
                <span className="block text-sm text-zinc-400 truncate">{convidado.email}</span>
              </div>

              <CircleDashed className="text-zinc-400 size-5 shrink-0" />
            </div>
          ))
        }
      </div>

      <button
        className="flex items-center gap-2 hover:bg-zinc-800 w-full h-11"
        onClick={() => setIsModalOpen(true)}
      >
        <UserCog className="size-5" />
        Gerenciar convidados
      </button>

      {isModalOpen && (
        <InviteGuestsModal
          closeGuestsModal={() => setIsModalOpen(false)}
          emailsToInvite={emailsToInvite}
          addNewEmailToInvite={handleAddEmailToInvite}
          removeEmailFromInvites={handleRemoveEmailFromInvites}
          convidados={convidados}
        />
      )}
    </div>
  );
}
