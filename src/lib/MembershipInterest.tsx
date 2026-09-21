import { createContext, useContext, useMemo, useState, type ReactNode } from 'react'

interface MembershipInterestValue {
  interest: string
  setInterest: (value: string) => void
}

const MembershipInterestContext = createContext<MembershipInterestValue | null>(null)

export function useMembershipInterest(): MembershipInterestValue {
  const ctx = useContext(MembershipInterestContext)
  if (!ctx) throw new Error('useMembershipInterest must be used within MembershipInterestProvider')
  return ctx
}

export function MembershipInterestProvider({ children }: { children: ReactNode }) {
  const [interest, setInterest] = useState('')
  const value = useMemo(() => ({ interest, setInterest }), [interest])
  return <MembershipInterestContext.Provider value={value}>{children}</MembershipInterestContext.Provider>
}
