"use client";

import InviteGuestsStep from "../../../components/viagens/create-trip/invite-guests-step";
import InviteGuestsModal from "../../../components/viagens/create-trip/invite-guests-modal";
import { FormEvent, useState } from "react";
import { DateRange } from "react-day-picker";
import DestinationAndDateStep from "../../../components/viagens/create-trip/destination-and-date-step";
import PageIllustration from "../../../components/page-illustration";
import Logo from "../../../components/ui/logo";

export default function CreateTripPage() {

  const [isGuestsInputOpen, setIsGuestsInputOpen] = useState(false)
  const [isGuestsModalOpen, setIsGuestsModalOpen] = useState(false)

  const [emailsToInvite, setEmailsToInvite] = useState([])

  const [destination, setDestination] = useState('')
  const [ownerName, setOwnerName] = useState('')
  const [ownerEmail, setOwnerEmail] = useState('')
  const [eventStartAndEndDates, setEventStartAndEndDates] = useState<DateRange | undefined>()

  function openGuestsInput() {setIsGuestsInputOpen(true)}

  function closeGuestsInput() {setIsGuestsInputOpen(false)}

  function openGuestsModal() {setIsGuestsModalOpen(true)}

  function closeGuestsModal() {setIsGuestsModalOpen(false)}

  function addNewEmailToInvite(email: string, name: string) {
    if (!email) { return; }
    if (emailsToInvite.includes(email)) { return; }
    setEmailsToInvite([...emailsToInvite, email]);
  }
  

  function removeEmailFromInvites(emailToRemove: string) {
    const newEmailList = emailsToInvite.filter(email => email !== emailToRemove)

    setEmailsToInvite(newEmailList)
  }

  async function createTrip(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    if (!destination) {
      return
    }

    if (!eventStartAndEndDates?.from || !eventStartAndEndDates?.to) {
      return
    }

    if (emailsToInvite.length === 0) {
      return
    }

    if (!ownerName || !ownerEmail) {
      return
    }


  }

  return (

<div className="h-screen flex items-center justify-center bg-pattern bg-no-repeat bg-center">
  <PageIllustration/>
  <div className="max-w-3xl w-full px-6 text-center space-y-10">
    <div className="flex flex-col items-center gap-3">
    <Logo />
      <p className="text-zinc-300 text-lg">
        Convide seus amigos e planeje sua próxima viagem!
      </p>
    </div>


    <div className="space-y-4">
      <DestinationAndDateStep 
        closeGuestsInput={closeGuestsInput}
        isGuestsInputOpen={isGuestsInputOpen}
        openGuestsInput={openGuestsInput}
        setDestination={setDestination}
        setEventStartAndEndDates={setEventStartAndEndDates}
        eventStartAndEndDates={eventStartAndEndDates}
      />

      {isGuestsInputOpen && (
        <InviteGuestsStep
          createTrip={CreateTripPage} 
          emailsToInvite={emailsToInvite}
          openGuestsModal={openGuestsModal}
        />
      )}
    </div>

    <p className="text-sm text-zinc-500">
      Ao planejar sua viagem pelo RumoIdeal você automaticamente concorda <br />
      com nossos <a className="text-zinc-300 underline" href="/terms">termos de uso</a> e <a className="text-zinc-300 underline" href="/terms">políticas de privacidade</a>.
    </p>
  </div>

  {isGuestsModalOpen && (
    <InviteGuestsModal 
      emailsToInvite={emailsToInvite}
      addNewEmailToInvite={addNewEmailToInvite}
      closeGuestsModal={closeGuestsModal}
      removeEmailFromInvites={removeEmailFromInvites}
    />
  )} 
 
</div>
);
}
