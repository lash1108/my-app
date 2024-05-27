import {StyleSheet} from "react-native";
import colors from "./colors";

const formStyles = StyleSheet.create({
    input: {
        marginBottom: 20,
        backgroundColor: colors.secondary,
    },
    btnSuccess: {
        padding: 5,
        backgroundColor: colors.primary,
    },
    btnText: {
        marginTop: 10,
    },
    btnTextLabel: {
        color: colors.dark,
    },
});

export default formStyles;