import { Modal, StyleSheet, Text, View } from 'react-native';

import Button from './Button';

function ConfirmModal({ visible, onClosed, action, title, text }) {
    return (
        <Modal
            animationType="fade"
            transparent={true}
            visible={visible}
            onRequestClose={() => {
                onClosed()
            }}>
            <View style={styles.centeredView}>

                <View style={styles.modalView}>

                    <View>
                        <Text style={styles.modalTitle}>{title}</Text>
                    </View>

                    <View>
                        <Text style={styles.modalText}>{text}</Text>
                    </View>

                    <View style={styles.footer}>
                        <Button onPress={action}>
                            <Text>Confirm</Text>
                        </Button>
                        <Button css={{ backgroundColor: '#e86d6d' }} onPress={onClosed}>
                            <Text>Cancel</Text>
                        </Button>
                    </View>

                </View>
            </View>
        </Modal>);
}

export default ConfirmModal;

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 22,
    },
    modalView: {
        margin: 20,
        backgroundColor: 'white',
        borderRadius: 20,
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
    modalText: {
        marginBottom: 15,
        textAlign: 'center',
    },
    modalTitle: {
        marginBottom: 25,
        textAlign: 'center',
        fontSize: 25,
    },
    footer: {
        flexDirection: 'row'
    }
});