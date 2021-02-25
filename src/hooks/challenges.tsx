import { createContext, useCallback, useContext, useMemo, useState } from "react";

import challenges from '../helpers/challenges.json';

interface ChallengeProps {
  type: 'body' | 'eye';
  description: string;
  amount: number
}

interface ChallengeContextData {
  level: number;
  currentExperience: number;
  challengesCompleted: number;
  nextExperienceLevel: number
  activeChallenge: ChallengeProps;
  levelUp(): void;
  completChallenge(xp: number): void;
  startNewChallenge(): void;
  resetChallenge(): void;
}

interface ChallengeProviderProps {
  children: React.ReactNode
}

const ChallengeContext = createContext({} as ChallengeContextData);

export function ChallengeProvider({ children }: ChallengeProviderProps) {

  const [level, setLevel] = useState(1);
  const [currentExperience, setCurrentExperience] = useState(0)
  const [challengesCompleted, setChallengesCompleted] = useState(0)

  const nextExperienceLevel = useMemo(() => 
    Math.pow((level + 1) * 4, 2)
  ,[level]) 

  const [activeChallenge, setActiveChallenge] = useState(null)

  const handleLevelUp = useCallback(() => {
    setLevel(level + 1)
  },[level])

  const handleStartNewChallenge = useCallback(() => {
    const radomChallengeIndex = Math.floor(Math.random() * challenges.length)
    const challenge = challenges[radomChallengeIndex];
    setActiveChallenge(challenge)
    console.log('start');
  },[])

  const handleResetChallenge = useCallback(() => {
    setActiveChallenge(null)
  },[])

  const handleCompleteChallenge = useCallback((xp: number) => {
    setCurrentExperience(currentExperience + xp);
    setActiveChallenge(null)
  },[currentExperience])

  return ( 
  <ChallengeContext.Provider 
    value={{ 
      level, 
      levelUp: handleLevelUp,
      challengesCompleted,
      currentExperience,
      startNewChallenge: handleStartNewChallenge,
      activeChallenge,
      resetChallenge: handleResetChallenge,
      completChallenge: handleCompleteChallenge,
      nextExperienceLevel
    }} 
  >
    {children}
  </ChallengeContext.Provider> 
  );
}

export function useChallenge():ChallengeContextData {
  const context = useContext(ChallengeContext);

  if(!context) {
    throw new Error('useAuth must be used within a ChallengeProvider');
  }

  return context;
}
