import { useEffect } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Icon from 'react-native-vector-icons/AntDesign';

export default function Alert({ text, visible, onClosed }) {

    return (
        <>
            {visible &&
                <View style={styles.container}>
                    <Text style={styles.text}>{text}</Text>
                    <TouchableOpacity onPress={onClosed}>
                        <Icon
                            name="closecircleo"
                            size={30}
                        />
                    </TouchableOpacity>
                </View>
            }
        </>
    );
}

const styles = StyleSheet.create({
    container: {

        borderRadius: 10,
        padding: 10,
        borderRadius: 10,
        backgroundColor: 'aqua',
        padding: 15,
        fontSize: 90,
        margin: 5,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        position: "absolute",
        top: 10,
        right: 10,
        alignItems: 'center',
        justifyContent: 'space-between',
        flexDirection: 'row',
        flexWrap: 'nowrap',
        zIndex: 999
    },
    text: {
        marginRight: 10
    }
})