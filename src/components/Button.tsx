import { Button } from "@chakra-ui/react";
import type React from "react";
interface ButtonProps {
    backgroundColor?: string,
    width?: `${number}px`,
    height?: `${number}px`,
    borderRadius?: `${number}px`,
    text?: string,
    fontSize?: number,
    fontColor?: string,
    fontFamily?: string,
    onClick?: () => void
}

const ButtonP: React.FC<ButtonProps> = ({
    backgroundColor = 'Red',
    width = '150px',
    height = '50px',
    borderRadius = '25px',
    text = 'Button',
    fontSize = 25,
    fontColor = 'white',
    fontFamily = '',
    onClick
}) => {
    return (
        <Button
            backgroundColor={backgroundColor}
            width={width}
            height={height}
            borderRadius={borderRadius}
            fontSize={fontSize}
            color={fontColor}
            fontFamily={fontFamily}
            onClick={onClick}
        >{text}</Button>
    );

}

export default ButtonP;