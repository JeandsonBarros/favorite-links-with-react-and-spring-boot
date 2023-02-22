import { useRef, useState } from "react";
import { Dimensions, Modal, StyleSheet, TouchableOpacity, View } from "react-native";
import Styles from "../styles/Styles";

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export default function ModalDown({ modalVisible, onClosed, children }) {

    const [bottom, setBottom] = useState(0)
    const [initialY, setInitialY] = useState(windowHeight - 195)

    function closed() {
        onClosed()
        setBottom(0)
    }

    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={closed}>

            <TouchableOpacity
                style={styles.bodyGrey}
                onPress={closed}
            >
            </TouchableOpacity>

            <View
                style={[
                    styles.viewContent,
                    Styles.shadow,
                    { bottom: bottom }
                ]}
                onStartShouldSetResponder={() => true}
                onResponderMove={(event) => {
                    /* how much you drag your finger */

                    /* console.log("initialY: ", initialY);
                    console.log("pageY: ", event.nativeEvent.pageY);
                    console.log("Subtração: ", -(event.nativeEvent.pageY - initialY)); */

                    if (-(event.nativeEvent.pageY - initialY) <= 0)
                        setBottom(-(event.nativeEvent.pageY - initialY))

                }}
                onResponderRelease={(event) => {
                    /* after releasing the finger */

                    if (-(event.nativeEvent.pageY.toFixed(0) - initialY.toFixed(0)) <= -80) {
                        closed()
                    } else {
                        setBottom(0)
                    }
                }}
            >

                <View style={styles.lineDrag} />

                {children}

            </View>

        </Modal>
    );
}

const styles = StyleSheet.create({
    viewContent: {
        height: 200,
        width: '100%',
        position: 'absolute',
        backgroundColor: '#FFF',
        borderTopLeftRadius: 35,
        borderTopRightRadius: 35,
        alignItems: 'center',
        zIndex: 999,
        flexDirection: 'column',
       
    },
    bodyGrey: {
        backgroundColor: 'rgba(100,100,100,0.3)',
        position: 'absolute',
        height: '100%',
        width: '100%',
    },
    lineDrag: {
        backgroundColor: 'grey',
        width: 100,
        height: 8,
        borderRadius: 10,
        marginTop: 10,
        marginBottom: 10,
        
    }
})
