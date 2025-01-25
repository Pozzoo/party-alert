import React, {ReactNode, useState} from "react";
import {Pressable, StyleSheet} from "react-native";

interface ModalContextProps {
    modal: ReactNode;
    closeModal: () => void;
    openModal: (modal: ReactNode) => void;
}

const ModalContext = React.createContext<ModalContextProps | undefined>(undefined);

interface ModalProviderProps {
    children: ReactNode;
}

export const ModalProvider = ({ children }: ModalProviderProps) => {
    const [modal, setModal] = useState<ReactNode>(undefined);

    const closeModal = () => {
        setModal(undefined);
    }

    const openModal = (modal: ReactNode) => {
        setModal(modal);
    }

    const handleOverlayClick = () => {
        closeModal();
    }

    return (
        <ModalContext.Provider value={{ modal, closeModal, openModal }}>
            {children}

            {modal && (
                <Pressable style={styles.overlay} android_disableSound android_ripple={{ color: "transparent" }} id="modal-overlay" onPress={() => handleOverlayClick()}>
                    {modal}
                </Pressable>
            )}
        </ModalContext.Provider>
    );
};

const styles = StyleSheet.create({
    overlay: {
        height: '100%',
        width: '100%',
        position: 'absolute',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#00000050'
    }
});

export default ModalContext;