import { useState } from "react"
import { StyleSheet, Text, TouchableOpacity, View } from "react-native"
import Icon from 'react-native-vector-icons/Entypo';

export default function Collapse({ title, children }) {

    const [visible, setVisible] = useState(false)

    return (
        <View style={styles.collapse}>

            <TouchableOpacity
                onPress={() => setVisible(!visible)}
                style={styles.headerCollapse}>
                <Text style={styles.titleCollapse}>{title}</Text>
                {
                    visible ?
                    <Icon name="chevron-thin-up" size={20} /> :
                    <Icon name="chevron-thin-down" size={20} />
                }
            </TouchableOpacity>

            {
                visible &&
                <View>
                    {children}
                </View>
            }

        </View>
    )
}

const styles = StyleSheet.create({

    collapse: {
        width: '100%',
        borderBottomWidth: 0.4,
        padding: 10
    },
    headerCollapse: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    titleCollapse: {
        fontSize: 20
    }

})