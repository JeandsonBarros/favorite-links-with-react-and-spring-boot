import { useEffect, useState } from 'react';
import { ActivityIndicator, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';

import Alert from '../../components/Alert';
import Button from '../../components/Button';
import Input from '../../components/Input';
import ListLinks from '../../components/ListLinks';
import ModalComponent from '../../components/ModalComponent';
import { deleteFavoriteLink, postFavoriteLink, putFavoriteLink } from '../../services/FavoriteLinksService';
import { findLinkInFolder, getDataFolderLinks, getFolderLinks } from '../../services/LinksFolderService';
import LinksStyles from '../../styles/LinksStyles';
import Styles from '../../styles/Styles';

function FolderLinks({ navigation, route }) {

    const { folderName } = route.params;
    const [links, setLianks] = useState([])
    const [modalLinkVisible, setModalLinkVisible] = useState(false)
    const [loadVisible, setLoadVisible] = useState(false)
    const [alert, setAlert] = useState({ visible: false, text: '', status: 'info' })
    const [favoriteLink, setFavoriteLink] = useState({ name: '', url: '' })
    const [search, setSearch] = useState('')
    const [folder, setFolder] = useState()

    useEffect(() => {
        navigation.setOptions({ title: folderName })
        getLinksByFolder()
    }, [search])

    async function getLinksByFolder() {

        setLoadVisible(true)
        const data = search.length > 0 ? await findLinkInFolder(folderName, search) : await getFolderLinks(folderName)
        const dataFolder = await getDataFolderLinks(folderName)
        setLoadVisible(false)

        if (typeof (data) === 'object')
            setLianks(data)
        else
            return setAlert({ visible: true, text: data, status: 'error' })

        if (typeof (dataFolder) === 'object')
            setFolder(dataFolder)
        else
            return setAlert({ visible: true, text: dataFolder, status: 'error' })

    }

    async function saveFavoriteLink() {

        if (!favoriteLink.name || !favoriteLink.url) {
            return setAlert({ text: "Do not leave empty fields", visible: true, status: 'warning' })
        }

        setLoadVisible(true)
        const data = await postFavoriteLink(favoriteLink.name, favoriteLink.url, folder.id)
        setLoadVisible(false)
        setModalLinkVisible(false)

        setAlert({ visible: true, text: data, status: data === 'Error' ? 'error' : 'success' })
        getLinksByFolder()
        setFavoriteLink({ name: '', url: '' })
    }

    async function updateFavoriteLink(name, url, folderId, id) {

        if (!name || !url) {
            return setAlert({ text: "Do not leave empty fields", visible: true, status: 'warning' })
        }

        setLoadVisible(true)
        const data = await putFavoriteLink(name, url, folderId, id)
        setLoadVisible(false)

        setAlert({ visible: true, text: data, status: data === 'Error' ? 'error' : 'success' })
        getLinksByFolder()

    }

    async function removeFavoriteLink(id) {
        setLoadVisible(true)
        const data = await deleteFavoriteLink(id)
        setLoadVisible(false)

        setAlert({ visible: true, text: data, status: data === 'Error' ? 'error' : 'success' })
        getLinksByFolder()

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
                onClosed={() => setAlert({ visible: false, text: '', status: 'info' })}
            />

            <ScrollView style={{ width: '100%' }}>
                <ListLinks
                    updateFavoriteLink={updateFavoriteLink}
                    removeFavoriteLink={removeFavoriteLink}
                    links={links}
                />
            </ScrollView>

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
                        label="Link"
                        placeholder="www.example.com"
                        onChange={text => setFavoriteLink({ ...favoriteLink, url: text })}
                    />

                    <Button
                        onPress={saveFavoriteLink}
                        css={{ marginTop: 15 }}
                    >
                        <Text>Save</Text>
                    </Button>

                </View>

            </ModalComponent>

            {
                folder &&
                <TouchableOpacity
                    onPress={() => setModalLinkVisible(true)}
                    style={LinksStyles.addButton}
                >
                    <SimpleLineIcons
                        color="#fff"
                        size={45}
                        name="plus"
                    />
                </TouchableOpacity>
            }

        </View>
    );
}

export default FolderLinks;