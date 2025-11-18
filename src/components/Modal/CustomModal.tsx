import React from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Button,
  Text,
} from "@chakra-ui/react";
import { motion } from "framer-motion";

const MotionModalContent = motion(ModalContent);

interface CustomModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  content: string;
  confirmText?: string;
  onConfirm?: () => void;
}

const CustomModal: React.FC<CustomModalProps> = ({
  isOpen,
  onClose,
  title,
  content,
  confirmText = "Aceptar",
  onConfirm,
}) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay />

      {/* Modal con animación de scale */}
      <MotionModalContent
        borderRadius="lg"
        p={1}
        initial={{ scale: 0.3, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.3, opacity: 0 }}
        transition={{
          duration: 0.2,
          ease: "easeOut",
        }}
      >
        <ModalHeader>{title}</ModalHeader>
        <ModalCloseButton />

        <ModalBody>
          <Text fontSize="lg" whiteSpace={'pre-line'}>{content}</Text>
        </ModalBody>

        <ModalFooter>
          <Button variant="ghost" mr={3} onClick={onClose}>
            Cerrar
          </Button>

          {onConfirm && (
            <Button colorScheme="blue" onClick={onConfirm}>
              {confirmText}
            </Button>
          )}
        </ModalFooter>
      </MotionModalContent>
    </Modal>
  );
};

export default CustomModal;
