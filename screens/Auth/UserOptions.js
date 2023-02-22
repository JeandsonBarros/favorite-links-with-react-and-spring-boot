import { useEffect, useState } from 'react';
import { ActivityIndicator, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

import Alert from '../../components/Alert';
import ConfirmModal from '../../components/ConfirmModal';
import { deleteUser, getUserData } from '../../services/AuthService';
import { getToken, removeToken } from '../../services/TokenService';
import Styles from '../../styles/Styles';

export default function UserOptions({ navigation }) {

    const [user, setUser] = useState()
    const [alert, setAlert] = useState({ visible: false, text: '' })
    const [visibleModal, setVisibleModal] = useState(false)
    const [visibleActivityIndicator, setVisibleActivityIndicator] = useState(false)

    useEffect(() => {

        navigation.addListener('focus', () => {
            asToken()
        });

        asToken()

        getUserData().then(data => {
            setUser(data)
        }).catch(error => setAlert({ visible: true, text: error }))

    }, [navigation])

    const asToken = async () => {
        const token = await getToken()
        if (!token) navigation.navigate("Login")
    }

    async function removeAccount() {
        setVisibleActivityIndicator(true)
        const status = await deleteUser()
        setVisibleActivityIndicator(false)

        if (status === 200) {
            await removeToken()
            return navigation.navigate("Login")
        }

        setAlert({ visible: true, text: data })

    }

    function buttonUsers() {
        const roles = user.roles.map(role => role.role)
        if (roles.includes('MASTER') || roles.includes('ADMIN')) {
            return (
                <TouchableOpacity
                    onPress={() => navigation.navigate("ListUsers")}
                    style={Styles.listStyle} >
                    <Icon name="users" size={20} />
                    <Text style={Styles.textItemList}>Users</Text>
                </TouchableOpacity >
            )
        }

        return <></>
    }

    return (
        <View>

            <Alert
                text={alert.text}
                visible={alert.visible}
                onClosed={() => setAlert({ visible: false, text: '' })}
            />

            {
                visibleActivityIndicator &&
                <ActivityIndicator size="large" />
            }

            {
                user &&
                <View style={[stylesOptions.userInfo, Styles.shadow]}>
                    <Text style={stylesOptions.userName}>{user.name}</Text>
                    <Text>{user.email}</Text>
                </View>
            }

            <TouchableOpacity
                onPress={() => navigation.navigate("UserData")}
                style={Styles.listStyle}>
                <Icon name="user" size={25} />
                <Text style={Styles.textItemList}>
                    Account data
                </Text>
            </TouchableOpacity>

            <TouchableOpacity
                onPress={() => navigation.navigate("AccountSecurity")}
                style={Styles.listStyle}>
                <Icon name="shield" size={25} />
                <Text style={Styles.textItemList}>Account security</Text>
            </TouchableOpacity>

            <ConfirmModal
                visible={visibleModal}
                onClosed={() => setVisibleModal(false)}
                text="If you delete this account, all your data will be permanently deleted. Do you really want to delete?"
                title="Delete account"
                action={removeAccount}
            />

            <TouchableOpacity
                onPress={() => setVisibleModal(true)}
                style={Styles.listStyle}>
                <Icon name="trash" size={25} />
                <Text style={Styles.textItemList}>Remove account</Text>
            </TouchableOpacity>

            {user && buttonUsers()}

            <TouchableOpacity
                onPress={async () => {
                    await removeToken()
                    navigation.navigate("Login")
                }}
                style={Styles.listStyle}>
                <Icon name="sign-out" size={25} color='#e86d6d' />
                <Text style={[Styles.textItemList, { color: '#e86d6d' }]}>Exit</Text>
            </TouchableOpacity>

        </View>
    );
}

const stylesOptions = StyleSheet.create({
    userInfo: {
        borderRadius: 10,
        padding: 20,
        margin: 5,
    },
    userName: {
        fontSize: 25
    }
})