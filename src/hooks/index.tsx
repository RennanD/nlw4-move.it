import { ChallengeProvider } from './challenges'

interface AppProviderProps {
  children: React.ReactNode;
}

export function AppProvider({ children }: AppProviderProps): JSX.Element {
  return (
    <ChallengeProvider>
      {children}
    </ChallengeProvider>
  )
}
