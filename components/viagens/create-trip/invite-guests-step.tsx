"use client";

import { UserRoundPlus, ArrowRight } from "lucide-react";
import Link from "next/link";
import { FormEvent } from "react";

interface InviteGuestsStepProps {
  openGuestsModal: () => void;
  emailsToInvite: string[]
  createTrip: (event: FormEvent<HTMLFormElement>) => void
}

export default function InviteGuestsStep({
  emailsToInvite,
  openGuestsModal
}: InviteGuestsStepProps) {
  return (
    <div className="h-16 bg-opacity-90 bg-zinc-700 px-4 rounded-xl flex items-center shadow-shape gap-3">
      <button type="button" onClick={openGuestsModal} className="flex items-center gap-2 flex-1 text-left">
        <UserRoundPlus className="size-5 text-zinc-100" />
        {emailsToInvite.length > 0 ? (
          <span className="text-zinc-100 text-lg flex-1">{emailsToInvite.length} pessoa(s) convidada(s)</span>
        ) : (
          <span className="text-zinc-100 text-lg flex-1">Quem estará na viagem?</span>
        )}
      </button>

      <div className="w-px h-6 bg-zinc-100" />

      <button className="btn group mb-4 w-full bg-gradient-to-t from-gray-300 to-gray-700 bg-[length:100%_100%] bg-[bottom] text-white shadow-[inset_0px_1px_0px_0px_theme(colors.white/.16)] hover:bg-[length:100%_150%] sm:mb-0 sm:w-auto">
  <Link href="/viagens/organizarviagem">
    Confirmar viagem
  </Link>
</button>

    </div>
  )
}