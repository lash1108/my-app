import { StyleSheet } from "react-native";
import colors from "./colors";

const formStyles = StyleSheet.create({
    input: {
        marginBottom: 20,
    },
    btnSuccess: {
        padding: 5,
        backgroundColor: colors.primary,
    },
    btnText: {
        marginTop: 10,
    },
    btnTextLabel:{
        color: colors.white,
        fontWeight: "bold",
        fontSize: 16,
    }
});

export default formStyles;
