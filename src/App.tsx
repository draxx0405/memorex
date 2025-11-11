import { useEffect, useState, } from 'react'
import { VStack } from '@chakra-ui/react'
import Card from './components/Card';
import TopBar from './components/TopBar'
import ButtonP from './components/Button';
import { MemoryRouter } from 'react-router-dom';

interface MemoramaItems {
  url?: string,
  isLookUp: boolean,
  label?: string
}

function App() {
  const [progress, setProgress] = useState(100);
  const [time, setTime] = useState(0);
  const [attempts, setAttempts] = useState(0);
  const [flippedPairs, setFlippedPairs] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  const [memoramaItems, setMemoramaITems] = useState<MemoramaItems[]>([
    { url: '', isLookUp: false, label: 'A' },
    { url: '', isLookUp: false, label: 'A' },
    { url: '', isLookUp: false, label: 'B' },
    { url: '', isLookUp: false, label: 'B' },
    { url: '', isLookUp: false, label: 'C' },
    { url: '', isLookUp: false, label: 'C' },
    { url: '', isLookUp: false, label: 'D' },
    { url: '', isLookUp: false, label: 'D' },
    { url: '', isLookUp: false, label: 'E' },
    { url: '', isLookUp: false, label: 'E' },
    { url: '', isLookUp: false, label: 'F' },
    { url: '', isLookUp: false, label: 'F' },
    { url: '', isLookUp: false, label: 'G' },
    { url: '', isLookUp: false, label: 'G' },
    { url: '', isLookUp: false, label: 'H' },
    { url: '', isLookUp: false, label: 'H' },
    { url: '', isLookUp: false, label: 'I' },
    { url: '', isLookUp: false, label: 'I' },
    { url: '', isLookUp: false, label: 'J' },
    { url: '', isLookUp: false, label: 'J' },
  ]);

  const shuffleArray = <T,>(array: T[]): T[] => {
    const newArray = [...array];
    for (let i = newArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }
    return newArray;
  };

  useEffect(() => {
    const newList = shuffleArray(memoramaItems);
    setMemoramaITems(newList)
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(prev => (prev + 1));
    }, 1000);
    return () => clearInterval(timer);
  }, [isPlaying]);

  const handleCard = () => {

  };
  return (
    <VStack
      width={'100vw'}
      height={'100vh'}
    >
      <TopBar backgroundColor='#120D61' progress={progress} time={time} attempts={attempts} flippedPairs={flippedPairs} />
      <ButtonP onClick={() => { setIsPlaying(!isPlaying) }} />

      <VStack>
        {memoramaItems.map((item, index) => {
          let items=0;
          return (
            <Card
              key={index}
              label={item.label}
              isLookUp={item.isLookUp}
            />
          );
        })}

      </VStack>
    </VStack>
  )
}

export default App
