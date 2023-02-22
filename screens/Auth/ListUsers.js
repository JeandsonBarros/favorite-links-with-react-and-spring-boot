import { createContext, useContext, useEffect, useState } from 'react';
import { ActivityIndicator, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';

import Alert from '../../components/Alert';
import Button from '../../components/Button';
import CheckBox from '../../components/CheckBox';
import ConfirmModal from '../../components/ConfirmModal';
import Input from '../../components/Input';
import Line from '../../components/Line';
import ModalComponent from '../../components/ModalComponent';
import { deleteOneUser, findUser, getAllUsers, getUserData, patchOneUser } from '../../services/AuthService';
import Styles from '../../styles/Styles';
import ModalDown from '../../components/ModalDown';

const ListContext = createContext(null);

export default function ListUsers({ navigation }) {

    const [users, setUsers] = useState([])
    const [search, setSearch] = useState('')
    const [visibleActivityIndicator, setVisibleActivityIndicator] = useState(false)
    const [alert, setAlert] = useState({ visible: false, text: '' })
    const [pagination, setPagination] = useState({ page: 0, totalElements: 0 })
    const [authenticatedUser, setAuthenticatedUser] = useState()

    useEffect(() => {
        listUsers()
        showUserData()
    }, [search])

    async function showUserData() {

        const data = await getUserData()

        if (typeof (data) === 'object')
            return setAuthenticatedUser(data)

        setAlert({ text: data, visible: true })

    }

    async function listUsers(pageParam = 0) {
        setPagination({ ...pagination, page: pageParam })

        setVisibleActivityIndicator(true)
        let data = search.length > 0 ? await findUser(pageParam, search) : await getAllUsers(pageParam)
        setVisibleActivityIndicator(false)

        if (typeof (data) === 'object') {

            setPagination({ ...pagination, totalElements: data.totalElements })
            if (pageParam === 0)
                setUsers(data.content)
            else
                setUsers(users.concat(data.content))

            return
        }

        setAlert({ text: data, visible: true })

    }

    async function removeUser(email) {

        setVisibleActivityIndicator(true)
        const data = await deleteOneUser(email)
        setVisibleActivityIndicator(false)

        if (email === authenticatedUser.email) {
            removeToken()
            navigation.navigate("Login")
            return
        }

        setAlert({ text: data, visible: true })
        listUsers()

    }

    async function updateUserData(user) {

        if (!user.email || !user.name) {
            return "Don't leave empty fields"
        }

        const response = await patchOneUser(user.email, { email: user.email, name: user.name, roles: user.roles })

        listUsers()

        return response

    }

    async function updateUserPassword(user) {

        if (!user.password || !user.confirmPassword) {
            return "Don't leave empty fields"
        }

        if (user.password !== user.confirmPassword) {
            return "Passwords do not match"
        }

        setVisibleActivityIndicator(true)
        const response = await patchOneUser(user.email, { password: user.password })
        setVisibleActivityIndicator(false)

        return response

    }

    return (

        <View style={Styles.container}>

            <Input
                placeholder="Find by name"
                onChange={text => {
                    setSearch(text)
                }}
                icon={
                    <SimpleLineIcons
                        color="grey"
                        size={25}
                        name="magnifier"
                    />
                }
                css={{ m: 5 }}
            />

            <Alert
                text={alert.text}
                visible={alert.visible}
                onClosed={() => setAlert({ visible: false, text: '' })}
            />

            {visibleActivityIndicator &&
                <ActivityIndicator size="large" />}


            <ScrollView style={{ width: '100%' }}>

                <View style={Styles.container}>

                    <ListContext.Provider
                        value={{
                            listUsers,
                            authenticatedUser,
                            removeUser,
                            updateUserData,
                            updateUserPassword
                        }}
                    >

                        {
                            users.length > 0 &&
                            users.map(user => (
                                <User key={user.id} user={user} />
                            ))
                        }

                        {
                            (pagination.totalElements !== users.length && pagination.totalElements > 0) &&
                            <TouchableOpacity
                                style={Styles.iconButton}
                                onPress={() => {
                                    listUsers(pagination.page + 1)
                                }}
                            >
                                <Text>
                                    <SimpleLineIcons
                                        name="plus"
                                        size={35}
                                        color="#fff"
                                    />
                                </Text>
                            </TouchableOpacity>
                        }

                    </ListContext.Provider>

                </View>

            </ScrollView>

        </View >

    );
}


function User({ user }) {

    const [visibleModalUser, setVisibleModalUser] = useState(false)
    const [visibleConfirm, setVisibleConfirm] = useState(false)
    const [visibleModalDown, setVisibleModalDown] = useState(false)
    const listContext = useContext(ListContext);

    return (

        <View
            style={{
                justifyContent: 'space-between',
                flexDirection: 'row',
                width: '100%',
                borderBottomWidth: 0.5,
                padding: 10,
            }}>
            <View>
                <Text style={Styles.textItemList}> {user.name} </Text>
                <Text
                    style={{
                        paddingLeft: 10
                    }}
                >
                    {user.email}
                </Text>
            </View>
            <View>

                <ModalUser
                    visibleModal={visibleModalUser}
                    onClosed={() => setVisibleModalUser(false)}
                    user={user}
                />

                <ConfirmModal
                    title="Delete user"
                    text="If you do, all of his data will be erased. Do you wish to continue?"
                    visible={visibleConfirm}
                    onClosed={() => setVisibleConfirm(false)}
                    action={async () => {
                        await listContext.removeUser(user.email)
                        setVisibleConfirm(false)
                    }}
                />

                <ModalDown
                    modalVisible={visibleModalDown}
                    onClosed={() => setVisibleModalDown(false)}
                >

                    <View style={{ width: '100%', padding: 10 }}>

                        <Button
                            css={{ backgroundColor: '#d1bd38' }}
                            onPress={() => {
                                setVisibleModalDown(false)
                                setVisibleModalUser(true)
                            }}
                        >
                            <>
                                <SimpleLineIcons name="note" color="#fff" size={30} />
                                <Text> Update data </Text>
                            </>
                        </Button>

                        <Button
                            css={{ backgroundColor: '#e86d6d' }}
                            onPress={() => {
                                setVisibleModalDown(false)
                                setVisibleConfirm(true)
                            }}
                        >
                            <>
                                <SimpleLineIcons name="trash" color="#fff" size={30} />
                                <Text> Delete user </Text>
                            </>
                        </Button>

                    </View>

                </ModalDown>

                {
                    (listContext.authenticatedUser && listContext.authenticatedUser.roles.map(role => role.role).includes("MASTER")) &&
                    <TouchableOpacity
                        onPress={() => setVisibleModalDown(true)}
                    >
                        <Text>
                            <SimpleLineIcons size={25} name="options-vertical" />
                        </Text>
                    </TouchableOpacity>
                }

            </View>
        </View >
    )
}

function ModalUser({ visibleModal, onClosed, user }) {

    const [userUpdate, setUserUpdate] = useState({ ...user, roles: user.roles.map(role => role.role), confirmPassword: '' })
    const [alert, setAlert] = useState({ visible: false, text: '' })
    const [visibleLoading, setVisibleLoading] = useState(false)
    const listContext = useContext(ListContext);

    function checkBoxChange(isSelected, value) {
        let tempList = [...userUpdate.roles]
        if (isSelected) {
            tempList.push(value)
            setUserUpdate({ ...userUpdate, roles: tempList })
        } else {
            const index = tempList.indexOf(value)
            tempList.splice(index, index + 1)
            setUserUpdate({ ...userUpdate, roles: tempList })
        }
    }

    return (
        <ModalComponent
            visible={visibleModal}
            onClosed={onClosed}
        >
            <View>

                <Alert
                    text={alert.text}
                    visible={alert.visible}
                    onClosed={() => setAlert({ visible: false, text: '' })}
                />

                {visibleLoading &&
                    <ActivityIndicator size="large" />}

                <Text style={Styles.title}>
                    Update data
                </Text>

                <Input
                    css={{ marginTop: 25 }}
                    label="Email"
                    placeholder="example@email.com"
                    value={userUpdate.email}
                    onChange={text => setUserUpdate({ ...userUpdate, email: text })}
                />

                <Input
                    css={{ marginTop: 25 }}
                    label="Name"
                    placeholder="Example"
                    value={userUpdate.name}
                    onChange={text => setUserUpdate({ ...userUpdate, name: text })}
                />

                {
                    userUpdate.roles.length > 0 &&
                    <View style={{ flexDirection: 'row', marginTop: 10 }}>

                        <CheckBox
                            isChecked={userUpdate.roles.includes("MASTER")}
                            onChange={isSelected => {
                                checkBoxChange(isSelected, "MASTER")
                            }}
                        >
                            <Text>Master</Text>
                        </CheckBox>

                        <CheckBox
                            isChecked={userUpdate.roles.includes("ADMIN")}
                            onChange={isSelected => {
                                checkBoxChange(isSelected, "ADMIN")
                            }}
                        >
                            <Text>Admin</Text>
                        </CheckBox>

                        <CheckBox
                            isChecked={userUpdate.roles.includes("USER")}
                            onChange={isSelected => {
                                checkBoxChange(isSelected, "USER")
                            }}
                        >
                            <Text>User</Text>
                        </CheckBox>

                    </View>
                }

                <Button
                    css={{ marginTop: 20 }}
                    onPress={async () => {
                        setVisibleLoading(true)
                        const response = await listContext.updateUserData(userUpdate)
                        setVisibleLoading(false)
                        setAlert({ visible: true, text: response })

                    }}
                >
                    <Text> Update data </Text>
                </Button>

                <Line />

                <Text
                    style={Styles.title}>
                    Update password
                </Text>

                <Input
                    css={{ marginTop: 15 }}
                    label="Password"
                    placeholder="user12345"
                    secureTextEntry={true}
                    onChange={text => setUserUpdate({ ...userUpdate, password: text })}
                />

                <Input
                    css={{ marginTop: 25 }}
                    label="Confirm password"
                    placeholder="user12345"
                    secureTextEntry={true}
                    onChange={text => setUserUpdate({ ...userUpdate, confirmPassword: text })}
                />

                <Button
                    css={{ marginTop: 20 }}
                    onPress={async () => {
                        setVisibleLoading(true)
                        const response = await listContext.updateUserPassword(userUpdate)
                        setVisibleLoading(false)
                        setAlert({ visible: true, text: response })
                    }}
                >
                    <Text> Update password </Text>
                </Button>

            </View>
        </ModalComponent>
    )

}

