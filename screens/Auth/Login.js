import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { ActivityIndicator, BackHandler, Alert as AlertReact, Text, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

import Alert from '../../components/Alert';
import Button from '../../components/Button';
import Input from '../../components/Input';
import { login } from '../../services/AuthService';
import { getToken } from '../../services/TokenService';
import Styles from '../../styles/Styles';


function Login({ navigation }) {

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [visibleActivityIndicator, setVisibleActivityIndicator] = useState(false)
    const [alert, setAlert] = useState({ visible: false, text: '' })

    useEffect(() => {

        navigation.addListener('focus', () => {
            getToken().then((token) => { if (token) navigation.navigate("Home") })
        });

        BackHandler.addEventListener('hardwareBackPress', () => BackHandler.exitApp())

    }, [navigation])

    async function userLogin() {

        if (!email || !password)
            return setAlert({ visible: true, text: "Do not leave empty fields!" })

        setVisibleActivityIndicator(true)
        const data = await login(email, password)
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

            {/* https://www.npmjs.com/package/react-native-vector-icons */}
            {/* https://oblador.github.io/react-native-vector-icons/ */}
            <Icon name="user" size={90} color="aqua" />
            <Text style={{ fontSize: 40 }}>Login</Text>

            <Text style={{ textAlign: 'center' }}>
                Login to be able to save and manage your favorite links
            </Text>

            {visibleActivityIndicator &&
                <ActivityIndicator size="large" />}

            <View style={{ margin: 20 }}>

                <Input
                    label="Email"
                    placeholder='exemplo@email.com'
                    onChange={setEmail}
                />

                <Input
                    label="Senha"
                    placeholder='user12345'
                    onChange={setPassword}
                    css={{ marginTop: 10 }}
                    secureTextEntry={true}
                />

                <TouchableOpacity
                    onPress={() => navigation.navigate("ForgotPassword")}
                    style={{ marginTop: 5 }}
                >
                    <Text>Forgot password?</Text>
                </TouchableOpacity>

            </View>

            <View>
                <Button onPress={userLogin}>
                    <Text>Login</Text>
                </Button>
                <Button onPress={() => navigation.navigate("Register")}>
                    <Text>Register</Text>
                </Button>
            </View>

            <StatusBar style="auto" />
        </View>
    );
}

export default Login;