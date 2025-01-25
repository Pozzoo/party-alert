import {Pressable, StyleProp, StyleSheet, ViewStyle} from "react-native";
import {ReactNode} from "react";

interface Props {
    children: ReactNode;
    style?: StyleProp<ViewStyle>;
}

const ModalWrapper = ({ children, style }: Props) => {
    return (
        <Pressable style={[styles.container, style]} android_disableSound android_ripple={{ color: "transparent" }} onPress={(e) => e.stopPropagation()}>
            {children}
        </Pressable>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#dae2ec',
        padding: 20,
        borderRadius: 16,
        position: 'absolute',
    },
});

export default ModalWrapper;