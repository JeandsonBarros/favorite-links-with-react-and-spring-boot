import { useRef, useState } from "react";
import { TextInput, StyleSheet, View, Text, TouchableOpacity } from "react-native";
import Icon from 'react-native-vector-icons/MaterialIcons';

export default function Input({ value, onChange, placeholder, label, css, secureTextEntry, icon }) {

    const inputRef = useRef(null)
    const viewRef = useRef(null)
    const [visiblePassword, setVisiblePassword] = useState(secureTextEntry)

    return (
        <View style={css}>

            <Text>{label}</Text>

            <TouchableOpacity
                style={styles.view}
                ref={viewRef}
                onPress={() => inputRef.current.focus()}
            >

                <View style={{ flexDirection: 'row' }}>

                    {
                        icon &&
                        <Text style={styles.leftIcon}>
                            {icon}
                        </Text>
                    }

                    <TextInput
                        style={{ width: icon && secureTextEntry ? '80%' : icon || secureTextEntry ? '89%' : '100%', fontWeight: '300', }}
                        onChangeText={onChange}
                        value={value}
                        placeholder={placeholder}
                        secureTextEntry={visiblePassword}
                        ref={inputRef}
                        onFocus={() => {
                            viewRef.current.setNativeProps({
                                style:
                                {
                                    borderColor: 'aqua', borderWidth: 1
                                }
                            });
                        }}
                        onBlur={() => {
                            viewRef.current.setNativeProps({
                                style: {
                                    borderColor: null, borderWidth: null
                                }
                            });
                        }}
                    />

                </View>

                {
                    secureTextEntry &&
                    <View style={{ width: '10%', flexDirection: 'row', position: 'absolute', right: 10 }}>
                        {visiblePassword ?
                            <TouchableOpacity onPress={() => setVisiblePassword(false)}>
                                <Icon name="visibility-off" size={30} />
                            </TouchableOpacity>
                            :
                            <TouchableOpacity onPress={() => setVisiblePassword(true)}>
                                <Icon name="visibility" size={30} />
                            </TouchableOpacity>
                        }
                    </View>
                }

            </TouchableOpacity>

        </View>
    );
}

const styles = StyleSheet.create({

    view: {
        height: 55,
        /* borderWidth: 2, */
        /* borderColor: '#69edff', */
        backgroundColor: 'rgb(225, 225, 225)',
        borderRadius: 10,
        padding: 10,
        flexDirection: 'row',
        alignItems: 'center',
        minWidth: '100%',
        maxWidth: '100%',
        justifyContent: 'space-between',
    },
    leftIcon: {
        marginRight: 5,
        width: 30,
    }

});