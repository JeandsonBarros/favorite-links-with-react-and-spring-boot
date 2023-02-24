import { Modal, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';

function ModalComponent({ visible, onClosed, children }) {
    return (

        <Modal
            animationType="fade"
            transparent={true}
            visible={visible}
            onRequestClose={() => {
                onClosed()
            }}>

            <View style={styles.centeredView}>

                <TouchableOpacity
                    onPress={onClosed}
                    style={styles.tapout}
                />

                <View style={styles.modalView}>

                    <TouchableOpacity
                        onPress={onClosed}
                        style={styles.closedButton}
                    >
                        <SimpleLineIcons color="grey" name="close" size={30} />
                    </TouchableOpacity>

                    {children}

                </View>

            </View>

        </Modal>

    );
}

export default ModalComponent;

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 40,
    },
    modalView: {
        margin: 20,
        justifyContent: 'center',
        minHeight: 50,
        minMargin: 50,
        backgroundColor: 'white',
        borderRadius: 10,
        padding: 35,
        alignItems: 'center',

        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    tapout: {
        position: 'absolute',
        height: '100%',
        width: '100%',

    },
    closedButton: {
        position: 'absolute',
        top: 10,
        right: 10,
    }
});