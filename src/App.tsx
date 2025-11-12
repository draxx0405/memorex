import { useEffect, useState, } from 'react'
import { SimpleGrid, VStack } from '@chakra-ui/react'
import Card from './components/Card';
import TopBar from './components/TopBar'

interface MemoramaItems {
  url?: string,
  isLookUp: boolean,
  label?: string
  isSelected?: boolean
}

function App() {
  const [progress, setProgress] = useState(0);
  const [time, setTime] = useState(0);
  const [attempts, setAttempts] = useState(0);
  const [flippedPairs, setFlippedPairs] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isNewGame, setIsNewGame] = useState(false);
  const [flipedCards, setFlipedCards] = useState(0);
  const [memoramaItems, setMemoramaItems] = useState<MemoramaItems[]>([
    { url: '', isLookUp: false, label: 'A', isSelected: false },
    { url: '', isLookUp: false, label: 'A', isSelected: false },
    { url: '', isLookUp: false, label: 'B', isSelected: false },
    { url: '', isLookUp: false, label: 'B', isSelected: false },
    { url: '', isLookUp: false, label: 'C', isSelected: false },
    { url: '', isLookUp: false, label: 'C', isSelected: false },
    { url: '', isLookUp: false, label: 'D', isSelected: false },
    { url: '', isLookUp: false, label: 'D', isSelected: false },
    { url: '', isLookUp: false, label: 'E', isSelected: false },
    { url: '', isLookUp: false, label: 'E', isSelected: false },
    { url: '', isLookUp: false, label: 'F', isSelected: false },
    { url: '', isLookUp: false, label: 'F', isSelected: false },
    { url: '', isLookUp: false, label: 'G', isSelected: false },
    { url: '', isLookUp: false, label: 'G', isSelected: false },
    { url: '', isLookUp: false, label: 'H', isSelected: false },
    { url: '', isLookUp: false, label: 'H', isSelected: false },
    { url: '', isLookUp: false, label: 'I', isSelected: false },
    { url: '', isLookUp: false, label: 'I', isSelected: false },
    { url: '', isLookUp: false, label: 'J', isSelected: false },
    { url: '', isLookUp: false, label: 'J', isSelected: false },
  ]);

  //Metodo creado por chatgpt para el ordenamiento aletorio de elementos del arreglo 
  //El metodo shuffle es conocido por hacer un ordenamiento aleatorio en los elementos de un arreglo o coleccion 
  const shuffleArray = <T,>(array: T[]): T[] => {
    const newArray = [...array];
    for (let i = newArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }
    return newArray;
  };

  useEffect(() => {
    if (!isNewGame) {
      const newList = shuffleArray(memoramaItems);
      setMemoramaItems(newList);
      setAttempts(0);
      setFlipedCards(0);
      setProgress(0);
      setTime(0);
      setFlippedPairs(0);
    }
  }, [isNewGame]);

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(prev => (prev + 1));
    }, 1000);
    return () => clearInterval(timer);
  }, [isPlaying]);
  useEffect(() => {
    if (flipedCards === 2) {
      console.log('Dentro del useEffect');
      const itemSelected = memoramaItems.filter((item) => item.isSelected === true);
      const isPair = itemSelected[0].label === itemSelected[1].label;
      setAttempts((prev) => prev + 1);
      setFlipedCards(0);
      let newList;
      if (isPair) {
        setFlippedPairs((prev) => prev + 1);
        setProgress((flippedPairs / 10) * 100);
        newList = memoramaItems.map((item) => {
          return item.isSelected ? { ...item, isLookUp: true } : item
        });
      } else {
        newList = memoramaItems.map((item) => {
          return item.isSelected ? { ...item, isLookUp: false, isSelected: false } : item
        });
      }
      const timeout = setTimeout(() => {
        setMemoramaItems(newList);
      }, 100);
      clearTimeout(timeout);
    }
  }, [memoramaItems]);

  const handleCard = async (indexp: number) => {
    const newList = memoramaItems.map((item, index) => {
      if (index == indexp) {
        const flipedCards = memoramaItems.filter((it) => it.isSelected === true).length;
        setFlipedCards(flipedCards + 1);
        console.log(flipedCards + 1);
        if (flipedCards < 2) {
          return { ...item, isLookUp: !item.isLookUp, isSelected: true };
        }
      }
      return item;
    })
    setMemoramaItems(newList);
  };

  return (
    <VStack
      width={'100vw'}
      height={'100vh'}
    >
      <TopBar backgroundColor='#120D61' progress={progress} time={time} attempts={attempts} flippedPairs={flippedPairs} />
      <SimpleGrid columns={5} spacing={4}>
        {memoramaItems.map((item, index) => (
          <Card
            key={index}
            label={item.label}
            isLookUp={item.isLookUp}
            onClick={() => handleCard(index)}
          />
        ))}
      </SimpleGrid>
    </VStack>
  )
}

export default App
