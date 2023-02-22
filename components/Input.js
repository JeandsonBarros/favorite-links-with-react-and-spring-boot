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
                <View style={{alignItems: 'center', flexDirection: 'row'}}>
                    <Text style={styles.rightIcon}>
                        {icon}
                    </Text>
                    <TextInput
                        style={styles.input}
                        onChangeText={onChange}
                        value={value}
                        placeholder={placeholder}
                        secureTextEntry={visiblePassword}
                        ref={inputRef}
                        onFocus={() => {
                            viewRef.current.setNativeProps({
                                style:
                                {
                                    borderColor: 'aqua', borderWidth: 3
                                }
                            });
                        }}
                        onBlur={() => {
                            viewRef.current.setNativeProps({
                                style: {
                                    borderColor: '#69edff', borderWidth: 2
                                }
                            });
                        }}
                    />
                </View>
                {
                    secureTextEntry &&
                    <View style={{ flexDirection: 'row', position: 'absolute', right: 10 }}>
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
        borderWidth: 2,
        borderColor: '#69edff',
        borderRadius: 10,
        padding: 10,
        flexDirection: 'row',
        alignItems: 'center',
        minWidth: '100%',
        maxWidth: '100%',
    },
    input: {
        width: '91%',
    },
    rightIcon: {
        marginRight: 5
    }

});