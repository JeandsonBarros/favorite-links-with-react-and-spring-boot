import { createContext, useContext, useEffect, useState } from 'react';
import { ActivityIndicator, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';

import Alert from '../../components/Alert';
import Button from '../../components/Button';
import ConfirmModal from '../../components/ConfirmModal';
import Input from '../../components/Input';
import ModalDown from '../../components/ModalDown';
import { deleteOneUser, findUser, getAllUsers, getUserData } from '../../services/AuthService';
import Styles from '../../styles/Styles';

const ListContext = createContext(null);

export default function ListUsers({ navigation }) {

    const [users, setUsers] = useState([])
    const [search, setSearch] = useState('')
    const [visibleActivityIndicator, setVisibleActivityIndicator] = useState(false)
    const [alert, setAlert] = useState({ visible: false, text: '', status: 'info' })
    const [pagination, setPagination] = useState({ page: 0, totalElements: 0 })
    const [authenticatedUser, setAuthenticatedUser] = useState()

    useEffect(() => {

        navigation.addListener('focus', () => {
            listUsers()
            getAuthenticatedUser()
        });

        listUsers()
        getAuthenticatedUser()

    }, [search, navigation])

    async function getAuthenticatedUser() {

        const data = await getUserData()

        if (typeof (data) === 'object')
            return setAuthenticatedUser(data)

        setAlert({ text: data, visible: true, status: 'error' })

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

        setAlert({ text: data, visible: true, status: 'error' })

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

        setAlert({ text: data, visible: true, status: data === 'Error' ? 'error' : 'success' })
        listUsers()

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
                status={alert.status}
                onClosed={() => setAlert({ visible: false, text: '', status: 'info' })}
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
                            navigation
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

    const [visibleConfirm, setVisibleConfirm] = useState(false)
    const [visibleModalDown, setVisibleModalDown] = useState(false)
    const listContext = useContext(ListContext);

    return (

        <View style={[Styles.listStyle, { justifyContent: 'space-between' }]}>
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
                            css={{ backgroundColor: 'purple' }}
                            onPress={() => {
                                setVisibleModalDown(false)
                                listContext.navigation.navigate("UpdateAUser", { user: user })
                            }}
                        >
                            <>
                                <SimpleLineIcons name="note" color="#fff" size={20} />
                                <Text> Update data </Text>
                            </>
                        </Button>

                        <Button
                            css={{ backgroundColor: 'rgb(200,80,80)' }}
                            onPress={() => {
                                setVisibleModalDown(false)
                                setVisibleConfirm(true)
                            }}
                        >
                            <>
                                <SimpleLineIcons name="trash" color="#fff" size={20} />
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
                            <SimpleLineIcons size={20} name="options-vertical" />
                        </Text>
                    </TouchableOpacity>
                }

            </View>
        </View >
    )
}


