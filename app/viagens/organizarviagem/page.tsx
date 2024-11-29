"use client";

import { Plus } from "lucide-react";
import { useState } from "react";
import dynamic from "next/dynamic"; 

const CreateActivityModal = dynamic(
  () => import("../../../components/viagens/organizarviagem/activities/create-activity-modal"),
  { ssr: false }
);

const Guests = dynamic(
  () => import("../../../components/viagens/organizarviagem/guests/guests"),
  { ssr: false }
);

const Activities = dynamic(
  () => import("../../../components/viagens/organizarviagem/activities/activities"),
  { ssr: false }
);

const DestinationAndDateHeader = dynamic(
  () => import("../../../components/viagens/organizarviagem/links/destination-and-date-header"),
  { ssr: false }
);

const CreateImportantLinksModal = dynamic(
  () => import("../../../components/viagens/organizarviagem/links/create-important-links-modal"),
  { ssr: false }
);

const ImportantLinks = dynamic(
  () => import("../../../components/viagens/organizarviagem/links/important-links"),
  { ssr: false }
);

const PageIllustration = dynamic(
  () => import("../../../components/page-illustration"),
  { ssr: false }
);

export default function TripDetailsPage() {
  const [isCreateActivityModalOpen, setIsCreateActivityModalOpen] = useState(false);
  const [isCreateImportantLinksModalOpen, setIsCreateImportantLinksModalOpen] = useState(false);
  const [isGuestsModalOpen, setIsGuestsModalOpen] = useState(false);
  const [isGuestsInputOpen, setIsGuestsInputOpen] = useState(false);
  const [emailsToInvite, setEmailsToInvite] = useState([]);

  function openGuestsInput() {
    setIsGuestsInputOpen(true);
  }
  function closeGuestsInput() {
    setIsGuestsInputOpen(false);
  }

  function openGuestsModal() {
    setIsGuestsModalOpen(true);
  }
  function closeGuestsModal() {
    setIsGuestsModalOpen(false);
  }

  function openCreateActivityModal() {
    setIsCreateActivityModalOpen(true);
  }
  function closeCreateActivityModal() {
    setIsCreateActivityModalOpen(false);
  }

  function openCreateImportantLinksModal() {
    setIsCreateImportantLinksModalOpen(true);
  }
  function closeCreateImportantLinkModal() {
    setIsCreateImportantLinksModalOpen(false);
  }

  return (
    <div className="max-w-6xl px-6 py-10 mx-auto space-y-8">
      <PageIllustration />
      <DestinationAndDateHeader />

      <main className="flex gap-16 px-4">
        <div className="flex-1 space-y-6 ">
          <div className="flex items-center gap-28 justify-between">
            <h2 className="text-3xl font-semibold">Atividades</h2>
            <button
              onClick={openCreateActivityModal}
              className="btn group mb-4 w-full bg-gradient-to-t from-gray-300 to-gray-700 bg-[length:100%_100%] bg-[bottom] text-white shadow-[inset_0px_1px_0px_0px_theme(colors.white/.16)] hover:bg-[length:100%_150%] sm:mb-0 sm:w-auto"
            >
              <Plus className="size-5" />
              Cadastrar atividade
            </button>
          </div>
          <Activities />
        </div>

        <div className="w-80 space-y-6">
          <ImportantLinks />
          <button
            onClick={openCreateImportantLinksModal}
            className="flex items-center gap-2 hover:bg-zinc-800 w-full h-11"
          >
            <Plus className="size-5" />
            Cadastrar novo link
          </button>
          <div className="w-full h-px bg-zinc-800" />
          <Guests />
        </div>
      </main>

      {isCreateActivityModalOpen && (
        <CreateActivityModal closeCreateActivityModal={closeCreateActivityModal} />
      )}

      {isCreateImportantLinksModalOpen && (
        <CreateImportantLinksModal closeCreateImportantLinkModal={closeCreateImportantLinkModal} />
      )}
    </div>
  );
}
