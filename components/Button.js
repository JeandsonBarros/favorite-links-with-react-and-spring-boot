import { StyleSheet, Text, TouchableOpacity } from "react-native";

export default function Button({ children, onPress, css }) {
    return (
        <TouchableOpacity
            onPress={onPress}
            style={[styles.defalteButton, css]}>
            <Text style={styles.text}>
                {children}
            </Text>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    text: {
        fontSize: 20,
        color: '#fff',
        fontWeight: '300',
    },
    defalteButton: {
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
        backgroundColor: '#3694FF',
        padding: 15,
        margin: 5,
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
