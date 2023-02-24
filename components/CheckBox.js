import { useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

function CheckBox({ children, onChange, isChecked }) {

    const [isSelected, setSelection] = useState(isChecked ? true : false);

    return (
        <TouchableOpacity
            onPress={() => {
                onChange(!isSelected)
                setSelection(!isSelected)
            }}>
            <View style={{ flexDirection: 'row', alignItems: 'center', marginRight: 5 }}>
                <Text>
                    {
                        isSelected ?
                            <MaterialCommunityIcons size={25} color="#3694FF" name="checkbox-marked-outline" /> :
                            <MaterialCommunityIcons size={25} color="#3694FF" name="checkbox-blank-outline" />
                    }
                </Text>
                <Text style={{fontWeight: '300'}}> {children} </Text>
            </View>
        </TouchableOpacity>);
}

export default CheckBox;