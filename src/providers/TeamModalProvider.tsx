"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { AnimatePresence } from "framer-motion";
import type { TeamMember } from "@/types/team";
import TeamMemberModal from "@/components/team/TeamMemberModal";

interface TeamModalContextValue {
  /** Open the personal portfolio overlay for a team member. */
  openMember: (member: TeamMember) => void;
}

const TeamModalContext = createContext<TeamModalContextValue | null>(null);

export function useTeamModal(): TeamModalContextValue {
  const ctx = useContext(TeamModalContext);
  if (!ctx) {
    throw new Error("useTeamModal must be used within <TeamModalProvider>.");
  }
  return ctx;
}

/**
 * Global team-member portfolio overlay. Mount once in the root layout — any
 * Team card (homepage or /team page) opens it via useTeamModal().openMember().
 */
export function TeamModalProvider({ children }: { children: ReactNode }) {
  const [active, setActive] = useState<TeamMember | null>(null);

  const close = useCallback(() => setActive(null), []);
  const openMember = useCallback((member: TeamMember) => setActive(member), []);

  const value = useMemo(() => ({ openMember }), [openMember]);

  return (
    <TeamModalContext.Provider value={value}>
      {children}
      <AnimatePresence>
        {active && <TeamMemberModal member={active} onClose={close} />}
      </AnimatePresence>
    </TeamModalContext.Provider>
  );
}
