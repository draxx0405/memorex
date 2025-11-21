import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalCloseButton,
    ModalFooter,
    VStack,
} from "@chakra-ui/react";
import ButtonP from "../Button";
import type React from "react";

interface MenuModalProps {
    isOpen: boolean,
    onClose: () => void
    onClickOp1: () => void
    onClickOp2: () => void
    onClickOp3: () => void
}

const MenuModal: React.FC<MenuModalProps> = ({
    isOpen = false,
    onClose,
    onClickOp1,
    onClickOp2,
    onClickOp3
}) => {

    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            closeOnOverlayClick={false}
            isCentered

        >
            <ModalOverlay />
            <ModalContent borderRadius="lg" p={2}>
                <ModalHeader>Modo de juego</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    <VStack spacing={4} align="center">
                        <ButtonP text="Un Jugador" backgroundColor="#645eb4ff" onClick={onClickOp1} />
                        <ButtonP text="1P vs 2P" backgroundColor="#393397ff" onClick={onClickOp2} />
                        <ButtonP text="1P vs AI" backgroundColor="#120D61" onClick={onClickOp3} />
                    </VStack>
                </ModalBody>
            </ModalContent>
        </Modal>
    );
}


export default MenuModal;