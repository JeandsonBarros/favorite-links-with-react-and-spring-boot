import { Modal, ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';
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

                <ScrollView>

                    <View style={styles.modalView}>

                        <TouchableOpacity
                            onPress={onClosed}
                            style={{
                                position: 'absolute',
                                top: 10,
                                right: 10,
                            }}
                        >
                            <SimpleLineIcons color="grey" name="close" size={30} />
                        </TouchableOpacity>

                        {children}

                    </View>

                </ScrollView>

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
        backgroundColor: 'blue'
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
    }
});