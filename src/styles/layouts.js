import { StyleSheet } from "react-native";

const layoutStyles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        padding: 25,
        justifyContent: "center",
    },
    logo: {
        width: "100%",
        height: 100,
        resizeMode: "contain",
        marginBottom: 20,
    },
});

export default layoutStyles;
