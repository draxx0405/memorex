import { Box, Heading } from '@chakra-ui/react';
import React, { useState } from "react";


interface CardProps{
    url?:string,
    width?:`${number}px`,
    height?:`${number}px`,
    borderRadius?:`${number}px`,
    backgroundColor?:string,
    label?:string,
    isLookUp:boolean,
    onClick?:()=>void
}

const Card:React.FC<CardProps>=({
url='',
width=200,
height=200,
borderRadius=50,
backgroundColor="red",
label="5",
isLookUp=false,
onClick
})=>{
    const [opacity,setOpacity]=useState(1);

    return(
        <Box
            width={width}
            height={height}
            borderRadius={borderRadius}
            backgroundColor={backgroundColor}
            justifyContent={'center'}
            alignItems={'center'}
            onClick={onClick}
            onMouseEnter={()=>setOpacity(.8)}
            onMouseLeave={()=>setOpacity(1)}
            opacity={opacity}
        >
            <Heading>
                {isLookUp ? label : 'Estoy abajo'}
            </Heading>
        </Box>
    );
}

export default Card;