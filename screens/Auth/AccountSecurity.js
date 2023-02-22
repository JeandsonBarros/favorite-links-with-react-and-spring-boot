import { useState } from 'react';
import { ActivityIndicator, Text, View } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

import Alert from '../../components/Alert';
import Button from '../../components/Button';
import Input from '../../components/Input';
import { patchUser } from '../../services/AuthService';
import Styles from '../../styles/Styles';

function AccountSecurity({ navigation }) {

    const [user, setUser] = useState({ password: '', confirmPassword: '' })
    const [alert, setAlert] = useState({ visible: false, text: '' })
    const [visibleActivityIndicator, setVisibleActivityIndicator] = useState(false)

    async function updateUser() {

        if (!user.password || !user.confirmPassword)
            return setAlert({ visible: true, text: "Do not leave empty fields!" })

        if (user.password !== user.confirmPassword)
            return setAlert({ visible: true, text: "Passwords do not match!" })

        setVisibleActivityIndicator(true)
        const response = await patchUser({ password: user.password })
        setVisibleActivityIndicator(false)

        setAlert({ visible: true, text: response })
    }

    return (
        <View style={[Styles.container, { padding: 20 }]}>

            <Icon name="shield" size={95} />

            <Alert
                text={alert.text}
                visible={alert.visible}
                onClosed={() => setAlert({ visible: false, text: '' })}
            />

            {
                visibleActivityIndicator &&
                <ActivityIndicator size="large" />
            }

            <Input
                label="Password"
                secureTextEntry={true}
                placeholder="example@email.com"
                value={user.email}
                onChange={text => setUser({ ...user, password: text })}
            />

            <Input
                css={{ marginTop: 25 }}
                secureTextEntry={true}
                label="Confirm Password"
                placeholder="Example"
                value={user.name}
                onChange={text => setUser({ ...user, confirmPassword: text })}
            />

            <View style={{ flexDirection: 'row', marginTop: 20 }}>
                <Button onPress={updateUser}>
                    <Text>Update</Text>
                </Button>
                <Button onPress={() => navigation.goBack()} css={{ backgroundColor: '#e86d6d' }}>
                    <Text>Cancel</Text>
                </Button>
            </View>

        </View>);
}

export default AccountSecurity;