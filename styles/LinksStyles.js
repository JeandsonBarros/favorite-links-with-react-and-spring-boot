import { StyleSheet } from "react-native";

export default StyleSheet.create({
    addButton: {
        height: 70,
        width: 70,
        position: 'absolute',
        bottom: 30,
        right: 30,
        backgroundColor: '#3694FF',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 5,
        borderRadius: 50,
        marginTop: 10,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,

        elevation: 5,
    }
})