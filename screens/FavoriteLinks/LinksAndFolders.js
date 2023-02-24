import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { ActivityIndicator, BackHandler, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';

import Alert from '../../components/Alert';
import Button from '../../components/Button';
import Input from '../../components/Input';
import ListFolders from '../../components/ListFolders';
import ListLinks from '../../components/ListLinks';
import ModalComponent from '../../components/ModalComponent';
import ModalDown from '../../components/ModalDown';
import {
    deleteFavoriteLink,
    findFavoriteLinks,
    postFavoriteLink,
    putFavoriteLink,
} from '../../services/FavoriteLinksService';
import {
    deleteFolderLinks,
    findFolderLinks,
    getAllFolderLinks,
    getFolderLinks,
    postFolderLinks,
    putFolderLinks,
} from '../../services/LinksFolderService';
import { getToken } from '../../services/TokenService';
import LinksStyles from '../../styles/LinksStyles';
import Styles from '../../styles/Styles';

export default function LinksAndFolders({ navigation }) {

    const [modalDownVisible, setModalDownVisible] = useState(false)
    const [modalFolderVisible, setModalFolderVisible] = useState(false)
    const [modalLinkVisible, setModalLinkVisible] = useState(false)
    const [loadVisible, setLoadVisible] = useState(false)
    const [folders, setFolders] = useState([])
    const [favoriteLink, setFavoriteLink] = useState({ name: '', url: '' })
    const [nameNewFolder, setNameNewFolder] = useState('')
    const [search, setSearch] = useState('')
    const [links, setLinks] = useState([])
    const [alert, setAlert] = useState({ visible: false, text: '', status: 'info' })

    useEffect(() => {

        navigation.addListener('focus', () => {
            getLinks()
            getListFolderLinks()
            asToken()
        });

        asToken()

        BackHandler.addEventListener('hardwareBackPress', () => BackHandler.exitApp())

        getLinks()
        getListFolderLinks()

    }, [navigation, search])

    const asToken = async () => {
        const token = await getToken()
        if (!token) navigation.navigate("Login")
    }

    async function getLinks() {
        setLoadVisible(true)
        const data = search.length > 0 ? await findFavoriteLinks(search) : await getFolderLinks("root")
        setLoadVisible(false)

        if (typeof (data) === 'object')
            return setLinks(data)

        setAlert({ visible: true, text: data, status: 'error' })

    }

    async function getListFolderLinks() {

        const data = search.length > 0 ? await findFolderLinks(search) : await getAllFolderLinks()

        if (typeof (data) === 'object') {

            const index = data.map(e => e.name).indexOf('root');
            if (index > -1) { // only splice array when item is found
                data.splice(index, 1); // 2nd parameter means remove one item only
            }

            setFolders(data)
            return
        }

        setAlert({ visible: true, text: data, status: 'error' })

    }

    async function saveFavoriteLink() {

        if (!favoriteLink.name || !favoriteLink.url) {
            return setAlert({ text: "Do not leave empty fields", visible: true, status: 'warning' })
        }

        setLoadVisible(true)
        const data = await postFavoriteLink(favoriteLink.name, favoriteLink.url)
        setLoadVisible(false)
        setModalLinkVisible(false)

        setAlert({ visible: true, text: data, status: data === 'Error' ? 'error' : 'success' })
        setFavoriteLink({ name: '', url: '' })
        getLinks()

    }

    async function updateFavoriteLink(name, url, folderId, id) {

        if (!name || !url) {
            return setAlert({ text: "Do not leave empty fields", visible: true, status: 'warning' })
        }

        setLoadVisible(true)
        const data = await putFavoriteLink(name, url, folderId, id)
        setLoadVisible(false)

        setAlert({ visible: true, text: data, status: data === 'Error' ? 'error' : 'success' })
        setFavoriteLink({ name: '', url: '' })
        getLinks()

    }

    async function removeFavoriteLink(id) {

        setLoadVisible(true)
        const data = await deleteFavoriteLink(id)
        setLoadVisible(false)

        setAlert({ visible: true, text: data, status: data === 'Error' ? 'error' : 'success' })
        getLinks()


    }

    async function saveFolderLinks() {

        if (!nameNewFolder)
            return setAlert({ visible: true, text: "Enter the folder name!", status: 'warning' })

        setLoadVisible(true)
        const data = await postFolderLinks(nameNewFolder)
        await getListFolderLinks()
        setLoadVisible(false)

        setModalFolderVisible(false)

        setAlert({ visible: true, text: data, status: data === 'Error' ? 'error' : 'success' })
        setNameNewFolder('')
    }

    async function updateFolderLinks(newFolderName, id) {

        setLoadVisible(true)
        const data = await putFolderLinks(newFolderName, id)
        await getLinks()
        await getListFolderLinks()
        setLoadVisible(false)

        setAlert({ visible: true, text: data, status: data === 'Error' ? 'error' : 'success' })
    }

    async function removeFolderLinks(id) {
        setLoadVisible(true)
        const data = await deleteFolderLinks(id)
        await getLinks()
        await getListFolderLinks()
        setLoadVisible(false)

        setAlert({ visible: true, text: data, status: data === 'Error' ? 'error' : 'success' })
    }

    return (
        <View style={Styles.container}>

            <Input
                placeholder="Find by name"
                onChange={setSearch}
                icon={<SimpleLineIcons color="grey" size={25} name="magnifier" />}
            />

            <Alert
                text={alert.text}
                visible={alert.visible}
                status={alert.status}
                onClosed={() => setAlert({ visible: false, text: 'info' })}
            />

            <ModalDown
                modalVisible={modalDownVisible}
                onClosed={() => setModalDownVisible(false)}
            >

                <View style={{ width: '100%', padding: 10 }}>

                    <Button
                        onPress={() => {
                            setModalDownVisible(false)
                            setModalLinkVisible(true)
                        }}
                    >
                        <SimpleLineIcons size={20} name="plus" />
                        <Text style={{ fontSize: 20 }}> New favorite link </Text>
                    </Button>

                    <Button
                        onPress={() => {
                            setModalDownVisible(false)
                            setModalFolderVisible(true)
                        }}
                    >
                        <SimpleLineIcons size={20} name="plus" />
                        <Text style={{ fontSize: 20 }}> New folder</Text>
                    </Button>

                </View>

            </ModalDown>

            <ModalComponent
                visible={modalLinkVisible}
                onClosed={() => setModalLinkVisible(false)}
            >
                <View>

                    <Text style={{ fontSize: 25 }}>New favorite link</Text>

                    {
                        loadVisible &&
                        <ActivityIndicator size="large" />
                    }

                    <Input
                        css={{ marginTop: 10 }}
                        label="Name"
                        placeholder="example"
                        onChange={text => setFavoriteLink({ ...favoriteLink, name: text })}
                    />
                    <Input
                        css={{ marginTop: 10 }}
                        label="URL"
                        placeholder="www.example.com"
                        onChange={text => setFavoriteLink({ ...favoriteLink, url: text })}
                    />
                    <Button
                        onPress={saveFavoriteLink}
                        css={{ marginTop: 15 }}
                        text="Save"
                    >
                        <Text>Save</Text>
                    </Button>

                </View>
            </ModalComponent>

            <ModalComponent
                visible={modalFolderVisible}
                onClosed={() => setModalFolderVisible(false)}
            >
                <View>

                    <Text style={{ fontSize: 25 }}>New folder</Text>

                    <Input
                        css={{ marginTop: 15 }}
                        value={nameNewFolder}
                        onChange={setNameNewFolder}
                        label="Folder name"
                        placeholder="example"
                    />
                    <Button
                        onPress={saveFolderLinks}
                        css={{ marginTop: 15 }}
                    >
                        <Text>Save</Text>
                    </Button>

                </View>

            </ModalComponent>

            <ScrollView style={{ width: '100%' }}>
                <ListFolders
                    navigation={navigation}
                    folders={folders}
                    updateFolderLinks={updateFolderLinks}
                    removeFolderLinks={removeFolderLinks}
                />
                <ListLinks
                    links={links}
                    removeFavoriteLink={removeFavoriteLink}
                    updateFavoriteLink={updateFavoriteLink}
                />
            </ScrollView>

            <TouchableOpacity
                onPress={() => setModalDownVisible(true)}
                style={LinksStyles.addButton}
            >
                <SimpleLineIcons
                    color="#fff"
                    size={45}
                    name="plus"
                />
            </TouchableOpacity>

            <StatusBar style='auto' />

        </View>
    );
}

/* function Bolinha() {

    const [y, setY] = useState(200)
    const [x, setX] = useState(200)

    return (
        <View style={Styles.container}
            onStartShouldSetResponder={() => true}
            onResponderMove={(event) => {
                setY(event.nativeEvent.pageY)
                setX(event.nativeEvent.pageX)

                console.log("X: ", event.nativeEvent.pageY);
                console.log("Y: ", event.nativeEvent.pageX);
            }}
        >

            <View
                style={{
                    position: 'absolute',
                    left: x,
                    top: y,
                    height: 50,
                    width: 50,
                    borderRadius: 50,
                    backgroundColor: 'orange',
                }}
            />

        </View>
    )
}
 */

