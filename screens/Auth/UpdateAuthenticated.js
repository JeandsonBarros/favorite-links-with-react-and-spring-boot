import { useState } from 'react';
import { ActivityIndicator, View } from 'react-native';

import Alert from '../../components/Alert';
import UpdateUserForm from '../../components/UpdateUserForm';
import { patchUser } from '../../services/AuthService';

function UpdateAuthenticated({ navigation, route }) {

    const { user } = route.params
    const [alert, setAlert] = useState({ visible: false, text: '', status: 'info' })
    const [visibleLoading, setVisibleLoading] = useState(false)

    async function updateUserData(userUpdate) {

        if (!userUpdate.email || !userUpdate.name)
            return setAlert({ text: "Don't leave empty fields", visible: true, status: 'warning' })

        setVisibleLoading(true)
        const response = await patchUser({ email: userUpdate.email, name: userUpdate.name })
        setVisibleLoading(false)

        setAlert({ text: response, visible: true, status: response === 'Error' ? 'error' : 'success' })
    }

    async function updateUserPassword(userUpdate) {

        if (!userUpdate.password || !userUpdate.confirmPassword)
            return setAlert({ text: "Don't leave empty fields", visible: true, status: 'warning' })

        if (userUpdate.password !== userUpdate.confirmPassword)
            return setAlert({ text: "Passwords do not match", visible: true, status: 'warning' })

        setVisibleLoading(true)
        const response = await patchUser({ password: userUpdate.password })
        setVisibleLoading(false)

        setAlert({ text: response, visible: true, status: response === 'Error' ? 'error' : 'success' })

    }

    return (
        <View>

            <Alert
                text={alert.text}
                visible={alert.visible}
                status={alert.status}
                onClosed={() => setAlert({ visible: false, text: '', status: 'info' })}
            />

            {visibleLoading &&
                <ActivityIndicator size="large" />}

            <UpdateUserForm
                updateUserData={updateUserData}
                updateUserPassword={updateUserPassword}
                user={user}
            />

        </View>
    );
}

export default UpdateAuthenticated;