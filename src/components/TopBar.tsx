import { HStack,Heading,VStack,Progress } from "@chakra-ui/react";
import React from "react";
import ButtonP from './Button';

interface TopBarProps{
    time:number,
    backgroundColor:string,
    progress:number,
    attempts:number,
    flippedPairs:number
}


const TopBar:React.FC<TopBarProps>=({
time=160,
backgroundColor,
progress,
attempts,
flippedPairs
})=>{

    return(
        <HStack
            width={'100vw'}
            height={'100px'}
            backgroundColor={backgroundColor}
            justifyContent={'space-around'}
            alignItems={'center'}
        >
            <ButtonP text="Regresar" backgroundColor="#36307C"/>

            <VStack>
                <Heading color={'white'} size={'md'}>Tiempo</Heading>
                <Heading color={'white'} size={'md'}>{time}</Heading>
            </VStack>
            <VStack>
                <Heading color={'white'} size={'md'}>Intentos</Heading>
                <Heading color={'white'} size={'md'}>{attempts}</Heading>
            </VStack>
            <VStack>
                <Heading color={'white'} size={'md'}>Pares encontrados</Heading>
                <Heading color={'white'} size={'md'}>{flippedPairs}</Heading>
            </VStack>
            <VStack>
                <Heading color={'white'} size={'md'}>Progreso</Heading>
                <Progress value={progress} size={'lg'} color={'#9BF09D'} w='150px' borderRadius={15}/>
            </VStack>



        </HStack>
    )
}

export default TopBar