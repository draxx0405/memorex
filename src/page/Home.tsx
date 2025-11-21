import { VStack, Heading } from '@chakra-ui/react';
import Fondo from './../assets/fondo-galaxia-colores-realistas_23-2148965681.jpg';
import ButtonP from '../components/Button';
import { useNavigate } from 'react-router-dom';
import CustomModal from '../components/Modal/CustomModal';
import { useState } from 'react';


function App() {
  const navigator = useNavigate();
  const [ruleModalVisible, setRuleModaVisible] = useState(false);
  const [playGameModalVisible, setPlayGameModalVisible] = useState(false);

  return (
    <VStack
      width={'100vw'}
      height={'100vh'}
      backgroundImage={`url(${Fondo})`}
      backgroundRepeat="no-repeat"
      backgroundSize="cover"
      backgroundPosition="center"
      justifyContent={"center"}
      alignItems={"center"}
    >
      <VStack>
        <Heading fontSize={150} color={"white"}>Memorex</Heading>
        <ButtonP onClick={() => setPlayGameModalVisible(true)} width={"200px"} text='Iniciar juego' backgroundColor='#633EA4' />
        <ButtonP width={"200px"} text='Reglas' backgroundColor='#633EA4' onClick={() => { setRuleModaVisible(true) }} />
      </VStack>
      <CustomModal
        isOpen={ruleModalVisible}
        confirmText='Cerrar'
        onConfirm={() => setRuleModaVisible(false)}
        onClose={() => setRuleModaVisible(false)}
        content={'1- Elige un modo de juego.' + '\n' + '2- Voltea 2 cartas por turno' + '\n' + '3- Si coinciden, ganas el punto y sigues.' + '\n' + ' 4- Si no coinciden, se voltean de nuevo.' + '\n' + '5- Encuentra todas las parejas para ganar.'}
        title='Reglas' />

      <CustomModal
        isOpen={playGameModalVisible}
        confirmText='Continuar'
        onConfirm={() => navigator('/Game')}
        onClose={() => setPlayGameModalVisible(false)}
        content={'1- Elige un modo de juego.' + '\n' + '2- Voltea 2 cartas por turno' + '\n' + '3- Si coinciden, ganas el punto y sigues.' + '\n' + ' 4- Si no coinciden, se voltean de nuevo.' + '\n' + '5- Encuentra todas las parejas para ganar.'}
        title='Reglas' />
    </VStack>
  )
}

export default App
