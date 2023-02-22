import { useState } from 'react';
import { ActivityIndicator, Text, View } from 'react-native';

import Alert from '../../components/Alert';
import Button from '../../components/Button';
import Input from '../../components/Input';
import { changeForgottenPassword, login, sendCodeToResetPassword } from '../../services/AuthService';
import Styles from '../../styles/Styles';

function ForgotPassword({ navigation }) {

    const [visibleActivityIndicator, setVisibleActivityIndicator] = useState(false)
    const [email, setEmail] = useState()
    const [newPassword, setNewPassword] = useState()
    const [confirmNewPassword, setConfirmNewPassword] = useState()
    const [recoveryCode, setRecoveryCode] = useState()
    const [alert, setAlert] = useState({ visible: false, text: '' })
    const [emailIsSend, setEmailIsSend] = useState(false)

    async function sendEmail() {

        if (!email) {
            setAlert({ visible: true, text: "Enter an email!" })
            return
        }

        setVisibleActivityIndicator(true)
        const response = await sendCodeToResetPassword(email)
        setVisibleActivityIndicator(false)

        if (response === 201) {
            setEmailIsSend(true)
            setAlert({ visible: true, text: "Email sent." })
            return
        }

        setAlert({ visible: true, text: response })
    }

    async function changePassword() {

        if (!email || !newPassword || !recoveryCode || !confirmNewPassword)
            return setAlert({ visible: true, text: "Don't leave empty fields" })

        if (newPassword !== confirmNewPassword)
            return setAlert({ visible: true, text: "Passwords do not match" })

        setVisibleActivityIndicator(true)
        const response = await changeForgottenPassword(email, newPassword, recoveryCode)
        setVisibleActivityIndicator(false)

        let loginResponse
        if (response === 200) {
            loginResponse = await login(email, newPassword)
            if (loginResponse === "authenticated")
                navigation.navigate("Home")
            return
        }

        setAlert({ visible: true, text: response })
    }

    return (
        <View style={[Styles.container, { justifyContent: 'center' }]}>

            <Alert
                text={alert.text}
                visible={alert.visible}
                onClosed={() => setAlert({ visible: false, text: '' })}
            />

            {visibleActivityIndicator &&
                <ActivityIndicator size="large" />}

            {
                emailIsSend ?
                    <View>

                        <Text style={Styles.title}>Change Password</Text>
                        <Text style={{ textAlign: 'center' }}>
                            Enter your email, the code that
                            was sent to the email and the new password.
                        </Text>

                        <Input
                            onChange={setRecoveryCode}
                            label="Code sent to email"
                            placeholder="12345678"
                            css={{ marginTop: 20 }}
                        />

                        <Input
                            onChange={setNewPassword}
                            label="New password"
                            placeholder="user12345"
                            css={{ marginTop: 20 }}
                            secureTextEntry={true}
                        />

                        <Input
                            onChange={setConfirmNewPassword}
                            label="Confirm new password"
                            placeholder="user12345"
                            css={{ marginTop: 20 }}
                            secureTextEntry={true}
                        />

                        <Button
                            onPress={changePassword}
                            text="Change"
                            css={{ marginTop: 20 }}
                        >
                            <Text>Change</Text>
                        </Button>

                        <Button
                            onPress={() => setEmailIsSend(false)}
                            css={{ marginTop: 20, backgroundColor: 'purple' }}
                        >
                            <Text>Sen new email</Text>
                        </Button>

                    </View>
                    :
                    <View>

                        <Text style={Styles.title}>Send email</Text>
                        <Text style={{ textAlign: 'center' }}>
                            Enter your email so that an email containing the
                            password reset code will be sent.
                        </Text>

                        <Input
                            onChange={setEmail}
                            label="Email"
                            placeholder="example@email.com"
                            css={{ marginTop: 20 }}
                        />
                        <Button onPress={sendEmail} css={{ marginTop: 20 }}>
                            <Text>Send</Text>
                        </Button>
                    </View>
            }

        </View>
    );
}

export default ForgotPassword;