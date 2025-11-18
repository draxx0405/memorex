import { SimpleGrid, VStack, Flex } from '@chakra-ui/react'
import Card from '../components/Card/v2/Card';
import TopBar from '../components/TopBar'
import { useMemorama } from '../hooks/useMemorama';
import ModalMessage from '../components/Modal/CustomModal';
import Fondo from './../assets/fondo-galaxia-colores-realistas_23-2148965681.jpg';

function App() {
  //desestructurado el hook useMemorama
  const { progress, time, attempts, flippedPairs, handleCard, memoramaItems } = useMemorama();


  return (
    <VStack
      width={'100vw'}
      height={'100vh'}
      backgroundImage={`url(${Fondo})`}
      backgroundRepeat="no-repeat"
      backgroundSize="cover"
      backgroundPosition="center"

    >
      <TopBar backgroundColor='#120D61' progress={progress} time={time} attempts={attempts} flippedPairs={flippedPairs} />
      <Flex alignItems={'center'} justifyItems={'center'} mt={10}>
        <SimpleGrid columns={10} spacing={5}>
          {memoramaItems.map((item, index) => (
            <Card
              key={index}
              label={item.label}
              isLookUp={item.isLookUp}
              onClick={() => handleCard(index)}
              url={item.url}
            />
          ))}
        </SimpleGrid>
      </Flex>
    </VStack>
  )
}

export default App
