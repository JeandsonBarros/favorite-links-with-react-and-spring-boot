import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { ActivityIndicator, Text, View } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

import Alert from '../../components/Alert';
import Button from '../../components/Button';
import Input from '../../components/Input';
import { userResgister } from '../../services/AuthService';
import Styles from '../../styles/Styles';

function Register({ navigation }) {

    const [user, setUser] = useState({ email: '', password: '', name: '', confirmPassword: '' })
    const [visibleActivityIndicator, setVisibleActivityIndicator] = useState(false)
    const [alert, setAlert] = useState({ visible: false, text: '' })

    function setValues(key, value) {
        let temp = { ...user }
        temp[key] = value
        setUser({ ...temp })
    }

    async function register() {

        if (!user.email || !user.password || !user.name || !user.confirmPassword)
            return setAlert({ visible: true, text: "Do not leave empty fields!" })

        if (user.password !== user.confirmPassword)
            return setAlert({ visible: true, text: "Passwords do not match!" })

        setVisibleActivityIndicator(true)
        const data = await userResgister(user.email, user.password, user.name)
        setVisibleActivityIndicator(false)

        if (data === "authenticated")
            return navigation.navigate("Home")

        setAlert({ visible: true, text: data })

    }

    return (

        <View style={[Styles.container, { justifyContent: 'center' }]}>

            <Alert
                text={alert.text}
                visible={alert.visible}
                onClosed={() => setAlert({ visible: false, text: '' })}
            />

            <Icon name="user" size={90} color="aqua" />
            <Text style={{ fontSize: 40 }}>Register user</Text>
            <Text style={{ textAlign: 'center' }}>
                Register to be able to save and manage your favorite links
            </Text>

            {visibleActivityIndicator &&
                <ActivityIndicator size="large" />}

            <View>

                <Input
                    label="Name"
                    placeholder='Fulano'
                    onChange={text => setValues("name", text)}
                    css={{ margin: 10 }}
                />

                <Input
                    label="Email"
                    placeholder='example@email.com'
                    onChange={text => setValues("email", text)}
                    css={{ margin: 10 }}
                />

                <Input
                    label="Password"
                    placeholder='user12345'
                    onChange={text => setValues("password", text)}
                    css={{ margin: 10 }}
                    secureTextEntry={true}
                />

                <Input
                    label="Confirm password"
                    placeholder='user12345'
                    onChange={text => setValues("confirmPassword", text)}
                    css={{ margin: 10 }}
                    secureTextEntry={true}
                />

            </View>

            <View>

                <Button text="Register" onPress={register}>
                    <Text>Register</Text>
                </Button>
                <Button text="Login" onPress={() => navigation.navigate("Login")}>
                    <Text>Login</Text>
                </Button>

            </View>

            <StatusBar style="auto" />
        </View>

    );
}

export default Register;