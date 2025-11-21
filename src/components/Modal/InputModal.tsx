import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalCloseButton,
    Input
} from "@chakra-ui/react";
import ButtonP from "../Button";
import type React from "react";
interface MenuModalProps {
    isOpen: boolean;
    onClose: () => void;
    onChangeText: (value: string) => void;
    onClick: () => void;
}

const InputModal: React.FC<MenuModalProps> = ({
    isOpen,
    onClose,
    onChangeText,
    onClick
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
                <ModalHeader>Ingresa tu nombre:</ModalHeader>
                <ModalCloseButton />
                <ModalBody justifyContent={"flex-end"} width={'100%'}>
                    <Input onChange={(e) => onChangeText(e.target.value)} />
                    <ButtonP text="Continuar" onClick={onClick} />
                </ModalBody>
            </ModalContent>
        </Modal>
    );
};

export default InputModal;
