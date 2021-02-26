import { 
  createContext, 
  ReactNode, 
  useCallback, 
  useContext, 
  useEffect, 
  useMemo, 
  useState 
} from 'react'

import { useChallenge } from './challenges';

interface CountdownContextData {
  resetCountdown(): void;
  startCountdown(): void;
  minutes: number,
  seconds: number;
  isCountdownActive: boolean;
  hasCountdownFinished: boolean;
}

interface CountdownProviderProps {
  children: ReactNode
}

const CountdownContext = createContext({} as CountdownContextData);

let countdownTimeout: NodeJS.Timeout;

export function CountdownProvider(
  { children }: CountdownProviderProps
): JSX.Element {

  const { startNewChallenge } = useChallenge()

  const [time, setTime] = useState(0.1 * 60)
  const [isActive, setIsActive] = useState(false)
  const [hasFinished, setHasFinished] = useState(false)

  const minutes = useMemo(() => Math.floor(time / 60), [time]);
  const seconds = useMemo(() => time % 60 , [time])

  const handleStartCountdown = useCallback(() => {
    console.log('iniciou')
    setIsActive(true);
  },[])

  const handleResetCountdown = useCallback(() => {
    clearTimeout(countdownTimeout);
    setIsActive(false)
    setTime(0.1 * 60)
    setHasFinished(false)
  },[countdownTimeout])


  useEffect(() =>{
    if(isActive && time > 0) {
      countdownTimeout = setTimeout(() => {
        setTime(time - 1)
      }, 1000);
    } else if (isActive && time === 0) {
      setHasFinished(true)
      setIsActive(false)
      startNewChallenge()
    }
  },[isActive, time, startNewChallenge])

  return (
    <CountdownContext.Provider value={{
      hasCountdownFinished: hasFinished,
      isCountdownActive: isActive,
      minutes,
      seconds,
      startCountdown: handleStartCountdown,
      resetCountdown: handleResetCountdown
    }}>
      {children}
    </CountdownContext.Provider>
  )
}

export function useCountdown(): CountdownContextData {
  const context = useContext(CountdownContext);
  
  if(!context) {
    throw new Error('useAuth must be used within a CountdownProvider');
  }

  return context
}
