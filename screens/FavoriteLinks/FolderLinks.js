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
    const [alert, setAlert] = useState({ visible: false, text: '' })
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
            return setAlert({ visible: true, text: data })

        if (typeof (dataFolder) === 'object')
            setFolder(dataFolder)
        else
            return setAlert({ visible: true, text: dataFolder })

    }

    async function saveFavoriteLink() {

        if (!favoriteLink.name || !favoriteLink.url) {
            return setAlert({ text: "Do not leave empty fields", visible: true })
        }

        setLoadVisible(true)
        const data = await postFavoriteLink(favoriteLink.name, favoriteLink.url, folder.id)
        setLoadVisible(false)
        setModalLinkVisible(false)

        setAlert({ visible: true, text: data })
        getLinksByFolder()
    }

    async function updateFavoriteLink(name, url, folderId, id) {

        setLoadVisible(true)
        const data = await putFavoriteLink(name, url, folderId, id)
        setLoadVisible(false)

        setAlert({ visible: true, text: data })
        getLinksByFolder()

    }

    async function removeFavoriteLink(id) {
        setLoadVisible(true)
        const data = await deleteFavoriteLink(id)
        setLoadVisible(false)

        setAlert({ visible: true, text: data })
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
                onClosed={() => setAlert({ visible: false, text: '' })}
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
                <Text style={{ fontSize: 25 }}>New favorite link</Text>

                {
                    loadVisible &&
                    <ActivityIndicator size="large" />
                }

                <Input
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