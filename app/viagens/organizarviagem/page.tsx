"use client";

import { Plus } from "lucide-react";
import {  useState } from "react";
import CreateActivityModal from "../../../components/viagens/organizarviagem/activities/create-activity-modal";
import Guests from "../../../components/viagens/organizarviagem/guests/guests";
import Activities from "../../../components/viagens/organizarviagem/activities/activities";
import DestinationAndDateHeader from "../../../components/viagens/organizarviagem/links/destination-and-date-header";
import CreateImportantLinksModal from "../../../components/viagens/organizarviagem/links/create-important-links-modal";
import ImportantLinks from "@/components/viagens/organizarviagem/links/important-links";
import PageIllustration from "@/components/page-illustration";

export default function TripDetailsPage() {

  const [isCreateActivityModalOpen, setIsCreateActivityModalOpen] = useState(false);
  const [isCreateImportantLinksModalOpen, setIsCreateImportantLinksModalOpen] = useState(false);
  const [isGuestsModalOpen, setIsGuestsModalOpen] = useState(false);
  const [isGuestsInputOpen, setIsGuestsInputOpen] = useState(false)
  const [emailsToInvite, setEmailsToInvite] = useState([
    "diego@rocketseat.com.br",
    "john@acme.com",
  ]);

  function openGuestsInput() {
    setIsGuestsInputOpen(true)
  }
  function closeGuestsInput() {
    setIsGuestsInputOpen(false)
  }

  function openGuestsModal() {
    setIsGuestsModalOpen(true)
  }
  function closeGuestsModal() {
    setIsGuestsModalOpen(false)
  }

  function openCreateActivityModal() {
    setIsCreateActivityModalOpen(true)
  }
  function closeCreateActivityModal() {
    setIsCreateActivityModalOpen(false)
  }

  function openCreateImportantLinksModal() {
    setIsCreateImportantLinksModalOpen(true)
  }
  function closeCreateImportantLinkModal() {
    setIsCreateImportantLinksModalOpen(false)
  }


  return (
    <div className="max-w-6xl px-6 py-10 mx-auto space-y-8">
      <PageIllustration />
      <DestinationAndDateHeader />

      <main className="flex gap-16 px-4">

        <div className="flex-1 space-y-6 ">
          <div className="flex items-center gap-28 justify-between">
            <h2 className="text-3xl font-semibold">Atividades</h2>
            <button onClick={openCreateActivityModal} className="btn group mb-4 w-full bg-gradient-to-t from-gray-300 to-gray-700 bg-[length:100%_100%] bg-[bottom] text-white shadow-[inset_0px_1px_0px_0px_theme(colors.white/.16)] hover:bg-[length:100%_150%] sm:mb-0 sm:w-auto">
              <Plus className="size-5" />
              Cadastrar atividade
            </button>
          </div>
          <Activities />
        </div>

        <div className="w-80 space-y-6">
          <ImportantLinks />
          <button onClick={openCreateImportantLinksModal} className="flex items-center gap-2 hover:bg-zinc-800 w-full h-11">
            <Plus className="size-5" />
            Cadastrar novo link
          </button>
          <div className="w-full h-px bg-zinc-800" />
          <Guests />
        </div>
      </main>

      {isCreateActivityModalOpen && (
        <CreateActivityModal
          closeCreateActivityModal={closeCreateActivityModal}
        />
      )}

      {isCreateImportantLinksModalOpen && (
        <CreateImportantLinksModal
          closeCreateImportantLinkModal={closeCreateImportantLinkModal}
        />
      )}
    </div>
  );
}
