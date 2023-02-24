import { useEffect } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Icon from 'react-native-vector-icons/AntDesign';
import PropTypes from 'prop-types';

export default function Alert({ text, visible, onClosed, status }) {

    useEffect(() => {
        const time = setTimeout(() => {
            onClosed()
        }, 3000)

        return () => clearTimeout(time)
    }, [visible])

    return (
        <>
            {
                visible &&
                <View style={[styles.container, styles[status]]}>
                    <View
                        style={styles.viewHeader}>
                        <Text style={styles.textHeader}>{status}</Text>
                        <TouchableOpacity
                            style={styles.buttonClosed}
                            onPress={onClosed}>
                            <Icon
                                name="closecircleo"
                                size={30}
                            />
                        </TouchableOpacity>
                    </View>
                    <Text style={styles.text}>
                        {text}
                        {/*  Mais vale um pássaro na mão do que bois voando.. Os últimos serão os primeiros e os do meio sempre serão os do meio.. Se barba fosse respeito, bode não tinha chifre.. Sonhar que está comendo uma maria-mole gigante pode significar acordar sem o travesseiro!. Jesus salva! Que passa para Moisés, que chuta e é gooooolllll.... */}
                    </Text>
                </View>
            }
        </>
    );
}

const styles = StyleSheet.create({
    container: {
        maxWidth: 300,
        borderRadius: 10,
        padding: 10,
        borderRadius: 10,

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
        top: 50,
        right: 10,
        flexDirection: 'column',
        zIndex: 999
    },
    viewHeader: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    textHeader: {
        fontWeight: 'bold',
        fontSize: 20,
    },
    text: {
        marginRight: 10,
        marginTop: 15,
        fontWeight: '300',
    },
    info: {
        backgroundColor: 'aqua',
    },
    error: {
        backgroundColor: '#e86d6d',
    },
    warning: {
        backgroundColor: '#d1bd38',
    },
    success: {
        backgroundColor: '#4affc3',
    }

})

Alert.defaultProps = {
    status: 'info',
}

Alert.propTypes = {
    text: PropTypes.string.isRequired,
    visible: PropTypes.bool.isRequired,
    onClosed: PropTypes.func.isRequired,
    status: PropTypes.oneOf(["info", "error", 'warning', 'success'])
};