import { 
  createContext, 
  useCallback, 
  useContext, 
  useEffect, 
  useMemo, 
  useState 
} from "react";

import Cookie from 'js-cookie'

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
  children: React.ReactNode;
  level: number;
  currentExperience: number;
  challengesCompleted: number;

}

const ChallengeContext = createContext({} as ChallengeContextData);

export function ChallengeProvider({ 
  children, 
  level: storagedLevel, 
  currentExperience: storagedCurrentExperience, 
  challengesCompleted: storagedchallengesCompleted 
}: ChallengeProviderProps) {  

  const [level, setLevel] = useState(storagedLevel ?? 1);
  const [currentExperience, setCurrentExperience] = useState(
    storagedCurrentExperience ?? 0
  )
  const [challengesCompleted, setChallengesCompleted] = useState(
    storagedchallengesCompleted ?? 0
  )

  const nextExperienceLevel = useMemo(() => 
    Math.pow((level + 1) * 4, 2)
  ,[level]) 

  const [activeChallenge, setActiveChallenge] = useState(null)

  useEffect(() => {
    Notification.requestPermission()
  },[])

  useEffect(() => {
    Cookie.set('level', String(level))
    Cookie.set('challengesCompleted', String(challengesCompleted))
    Cookie.set('currentExperience', String(currentExperience))
  },[level, challengesCompleted, currentExperience])

  const handleLevelUp = useCallback(() => {
    setLevel(level + 1)
  },[level])

  const handleStartNewChallenge = useCallback(() => {
    const radomChallengeIndex = Math.floor(Math.random() * challenges.length)
    const challenge = challenges[radomChallengeIndex];
    setActiveChallenge(challenge)

    new Audio('/notification.mp3').play()

    if(Notification.permission === 'granted') {
      new Notification('Novo desafio', {
        body: `Valendo ${challenge.amount}xp`
      })
    }
  },[])

  const handleResetChallenge = useCallback(() => {
    setActiveChallenge(null)
  },[])

  const handleCompleteChallenge = useCallback((xp: number) => {
    if(!activeChallenge) {
      return;
    }

    let finalExperience = currentExperience + xp;

    if(finalExperience >= nextExperienceLevel) {
      finalExperience = finalExperience - nextExperienceLevel;
      handleLevelUp()

    }
    setCurrentExperience(finalExperience);
    setActiveChallenge(null)
    setChallengesCompleted(challengesCompleted + 1)
  },[currentExperience, activeChallenge, handleLevelUp, challengesCompleted])

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
