import { useEffect, useState } from 'react';
import { ActivityIndicator, Text, View } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

import Alert from '../../components/Alert';
import Button from '../../components/Button';
import Input from '../../components/Input';
import { getUserData, patchUser } from '../../services/AuthService';
import Styles from '../../styles/Styles';

function UserData({ navigation }) {

    const [user, setUser] = useState({ name: '', email: '' })
    const [alert, setAlert] = useState({ visible: false, text: '' })
    const [visibleActivityIndicator, setVisibleActivityIndicator] = useState(false)

    useEffect(() => {
        getUserData()
            .then(data => setUser({ email: data.email, name: data.name }))
            .catch(error => setAlert({ visible: true, text: error }))
    }, [])

    async function updateUser() {

        if (!user.email || !user.name)
            return setAlert({ visible: true, text: "Do not leave empty fields!" })

        setVisibleActivityIndicator(true)
        const response = await patchUser(user)
        setVisibleActivityIndicator(false)

        setAlert({ visible: true, text: response })
    }

    return (
        <View style={[Styles.container, { paddingTop: 30 }]}>

            <Icon name="user" size={95} />

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
                label="Email"
                placeholder="example@email.com"
                value={user.email}
                onChange={text => setUser({ ...user, email: text })}
            />

            <Input
                css={{ marginTop: 25 }}
                label="Name"
                placeholder="Example"
                value={user.name}
                onChange={text => setUser({ ...user, name: text })}
            />

            <View style={{ flexDirection: 'row', marginTop: 20 }}>
                <Button text="Update" onPress={updateUser}>
                    <Text>Update</Text>
                </Button>
                <Button
                    onPress={() => navigation.goBack()}
                    text="Cancel"
                    css={{ backgroundColor: '#e86d6d' }}
                >
                    <Text>Cancel</Text>
                </Button>
            </View>

        </View>
    );
}

export default UserData;