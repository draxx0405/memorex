import { Box, Heading, Image } from "@chakra-ui/react";
import { motion } from "framer-motion";
import React from "react";
import BackView from "../../../assets/BackView.jpg";

interface CardProps {
  label: string;
  isLookUp: boolean;
  onClick?: () => void;
  url: string
}

const MotionBox = motion(Box);

export const Card: React.FC<CardProps> = ({ label, isLookUp, url, onClick }) => {
  return (
    <MotionBox
      width="100px"
      height="200px"
      borderRadius="lg"
      bg={isLookUp ? "white" : "blue.500"}
      display="flex"
      alignItems="center"
      justifyContent="center"
      color={isLookUp ? "black" : "white"}
      boxShadow="md"
      cursor="pointer"
      style={{
        transformStyle: "preserve-3d",
        perspective: "1000px",
      }}
      animate={{
        rotateY: isLookUp ? 180 : 0,
      }}
      transition={{
        duration: .6,
        ease: "easeInOut",
      }}
      onClick={onClick}
    >
      <Box
        position="absolute"
        transform={isLookUp ? "rotateY(180deg)" : 'none'}
        display="flex"
        alignItems="center"
        justifyContent="center"
        width="100%"
        height="100%"
        backgroundImage={`url(${isLookUp ? url : BackView})`}
        backgroundRepeat="no-repeat"
        backgroundSize="cover"
        backgroundPosition="center"
      >
      </Box>
    </MotionBox>
  );
};

export default Card;