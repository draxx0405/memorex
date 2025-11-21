import { SimpleGrid, VStack, Flex } from '@chakra-ui/react'
import Card from '../components/Card/v2/Card';
import TopBar from '../components/TopBar'
import Fondo from './../assets/fondo-galaxia-colores-realistas_23-2148965681.jpg';
import MenuModal from '../components/Modal/MenuModal';
import { useGame } from '../hooks/useGame';
import CustomModal from '../components/Modal/CustomModal';
import InputModal from '../components/Modal/InputModal';

function App() {
  //desestructurado el hook useMemorama
  const { progress, time, handleCard, memoramaItems, modalText,
    isOpenMenuModal, setIsOpenMenuModal,
    isOpenModal, setIsOpenModal,
    confirmPlayer1, confirmPlayer2,
    isOpenInputModalP1, setIsOpenInputModalP1,
    isOpenInputModalP2, setIsOpenInputModalP2,
    setNameP1,
    setNameP2,
    setGameMode,
    currentPlayer, players
  } = useGame();

  return (
    <VStack
      width={'100vw'}
      height={'100vh'}
      backgroundImage={`url(${Fondo})`}
      backgroundRepeat="no-repeat"
      backgroundSize="cover"
      backgroundPosition="center"

    >
      <TopBar backgroundColor='#120D61' progress={progress} time={time} player={players[currentPlayer]?.name} flippedPairs={players[currentPlayer]?.flipedCards} />
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

      <MenuModal
        isOpen={isOpenMenuModal}
        onClose={() => setIsOpenMenuModal(false)}
        onClickOp1={() => {
          setGameMode('1P');
          setIsOpenInputModalP1(true);
          setIsOpenMenuModal(false);
        }}
        onClickOp2={() => {
          setGameMode('1P vs 2P');
          setIsOpenInputModalP1(true);
          setIsOpenMenuModal(false);

        }}
        onClickOp3={() => {
          setGameMode('1P VS IA');
          setIsOpenInputModalP1(true);
          setIsOpenMenuModal(false);
        }}
      />

      <CustomModal isOpen={isOpenModal} onClose={() => setIsOpenModal(false)} content={modalText} title='Memorex' />
      <InputModal isOpen={isOpenInputModalP1} onClose={() => setIsOpenInputModalP1(false)} onClick={confirmPlayer1} onChangeText={(value) => setNameP1(value)} />
      <InputModal isOpen={isOpenInputModalP2} onClose={() => setIsOpenInputModalP2(false)} onClick={confirmPlayer2} onChangeText={(value) => setNameP2(value)} />
    </VStack>
  )
}

export default App
