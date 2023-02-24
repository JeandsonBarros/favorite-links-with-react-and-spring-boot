import { useEffect, useState } from "react";
import { ActivityIndicator, Linking, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { getAllFolderLinks } from '../services/LinksFolderService';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import Foundation from 'react-native-vector-icons/Foundation';
import Styles from "../styles/Styles";
import Alert from "./Alert";
import ModalComponent from "./ModalComponent";
import Input from "./Input";
import Button from "./Button";
import ModalDown from "./ModalDown";

export default function ListLinks({ links, updateFavoriteLink, removeFavoriteLink }) {

    const [folders, setFolders] = useState([])
    const [alert, setAlert] = useState({ visible: false, text: '', status: 'info' })

    useEffect(() => {
        getFolders()
    }, [])

    async function getFolders() {

        const data = await getAllFolderLinks()

        if (typeof (data) === 'object') {
            setFolders(data)
            return
        }

        setAlert({ visible: true, text: data, status: 'error' })
    }

    return (
        <View>

            <Alert
                text={alert.text}
                visible={alert.visible}
                status={alert.status}
                onClosed={() => setAlert({ visible: false, text: '', status: 'info' })}
            />

            {
                (links && links.length > 0) &&
                links.map(link => (
                    <Link
                        key={link.id}
                        link={link}
                        updateFavoriteLink={updateFavoriteLink}
                        removeFavoriteLink={removeFavoriteLink}
                        folders={folders}
                    />
                ))
            }

        </View>
    );
}

function Link({ link, updateFavoriteLink, removeFavoriteLink, folders }) {

    const [modalDownVisible, setModalDownVisible] = useState(false)
    const [modalLinkVisible, setModalLinkVisible] = useState(false)
    const [loadVisible, setLoadVisible] = useState(false)
    const [alert, setAlert] = useState({ visible: false, text: '', status: 'info' })
    const [messageFields, setMessageFields] = useState('')
    const [updateLink, setUpdateLink] = useState({ ...link, folderId: link.linksFolder.id })

    async function linkOpen(url) {
        // Checking if the link is supported for links with custom URL scheme.
        const supported = await Linking.canOpenURL(url);

        if (supported) {
            // Opening the link with some app, if the URL scheme is "http" the web link should be opened
            // by some browser in the mobile
            await Linking.openURL(url);
        } else {
            setAlert({ visible: true, text: `Don't know how to open this URL: ${url}`, status: 'error' })
        }
    }

    return (

        <View
            key={link.id}
            style={[Styles.listStyle, { justifyContent: 'space-between' }]}
        >

            <Alert
                text={alert.text}
                visible={alert.visible}
                status={alert.status}
                onClosed={() => setAlert({ visible: false, text: '', status: 'info' })}
            />

            {
                updateLink &&
                <>
                    <ModalComponent
                        visible={modalLinkVisible}
                        onClosed={() => setModalLinkVisible(false)}
                    >
                        <ScrollView>

                            <Text style={{ fontSize: 25 }}>Update favorite link</Text>
                            <Text style={{ color: 'red' }}>{messageFields}</Text>
                            
                            {
                                loadVisible &&
                                <ActivityIndicator size="large" />
                            }

                            <Input
                                value={updateLink.name}
                                label="Name"
                                placeholder="example"
                                onChange={text => setUpdateLink({ ...updateLink, name: text })}
                            />
                            <Input
                                value={updateLink.url}
                                css={{ marginTop: 10 }}
                                label="URL"
                                placeholder="www.example.com"
                                onChange={text => setUpdateLink({ ...updateLink, url: text })}
                            />

                            <Text style={{ marginTop: 20 }}>Folder</Text>
                            <View
                                style={{
                                    backgroundColor: 'rgb(240,240,240)',
                                    height: 250,
                                    minWidth: '100%',
                                    borderRadius: 15,
                                    padding: 10,
                                }}>

                                {
                                    folders &&
                                    <ScrollView style={{ width: '100%' }}>

                                        {
                                            folders.map(folder => (
                                                <TouchableOpacity
                                                    key={folder.id}
                                                    onPress={() => setUpdateLink({ ...updateLink, folderId: folder.id })}
                                                    style={{
                                                        minWidth: '100%',
                                                        flexDirection: 'row',
                                                        alignItems: 'center',
                                                    }}
                                                >
                                                    <SimpleLineIcons
                                                        name="folder"
                                                        size={20}
                                                        color={updateLink.folderId === folder.id ? "#3694FF" : 'black'}
                                                    />
                                                    <Text
                                                        style={[
                                                            Styles.textItemList,
                                                            {
                                                                marginRight: 20,
                                                                color: updateLink.folderId === folder.id ? "#3694FF" : 'black'
                                                            }
                                                        ]}>
                                                        {folder.name}
                                                    </Text>
                                                </TouchableOpacity>
                                            ))
                                        }

                                    </ScrollView>

                                }
                            </View>

                            <Button
                                onPress={() => {
                                    if (!updateLink.name || !updateLink.url) {
                                        return setMessageFields("Do not leave empty fields")
                                    }
                                    setLoadVisible(true)
                                    updateFavoriteLink(updateLink.name, updateLink.url, updateLink.folderId, updateLink.id)
                                    setLoadVisible(false)
                                    setModalLinkVisible(false)
                                }}
                                css={{ marginTop: 15 }}
                            >
                                <Text> Update </Text>
                            </Button>

                        </ScrollView>

                    </ModalComponent>

                    <ModalDown
                        modalVisible={modalDownVisible}
                        onClosed={() => setModalDownVisible(false)}
                    >

                        <View style={{ width: '100%', padding: 10 }}>

                            <Button
                                css={{ backgroundColor: 'purple' }}
                                onPress={() => {
                                    setModalDownVisible(false)
                                    setModalLinkVisible(true)
                                }}
                            >
                                <SimpleLineIcons size={20} name="note" />
                                <Text style={{ fontSize: 20 }}>   Update favorite link </Text>
                            </Button>

                            <Button
                                css={{ backgroundColor: '#e86d6d' }}
                                onPress={async () => {
                                    removeFavoriteLink(updateLink.id)
                                    setModalDownVisible(false)
                                }}
                            >
                                <SimpleLineIcons size={20} name="trash" />
                                <Text style={{ fontSize: 20 }}>  Delete favorite link </Text>
                            </Button>

                        </View>

                    </ModalDown>
                </>

            }

            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Foundation name="bookmark" color="#3694FF" size={50} />
                <TouchableOpacity
                    onPress={() => linkOpen(link.url)}
                >
                    <Text
                        style={Styles.textItemList}
                    >
                        {link.name.length > 15 ? link.name.slice(0, 15) + "..." : link.name}
                    </Text>
                    <Text
                        style={[Styles.textItemList, { fontSize: 15, color: '#3694FF' }]}
                    >
                        {link.url.length > 25 ? link.url.slice(0, 25) + "..." : link.url}
                    </Text>
                </TouchableOpacity>
            </View>

            <TouchableOpacity
                onPress={() => setModalDownVisible(true)}
            >
                <Text>
                    <SimpleLineIcons size={20} name="options-vertical" />
                </Text>
            </TouchableOpacity>

        </View>
    )
}