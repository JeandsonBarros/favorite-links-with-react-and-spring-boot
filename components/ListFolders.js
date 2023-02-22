import { useState } from 'react';
import { ActivityIndicator, Text, TouchableOpacity, View } from 'react-native';
import Entypo from 'react-native-vector-icons/Entypo';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';

import Styles from '../styles/Styles';
import Alert from './Alert';
import Button from './Button';
import Input from './Input';
import ModalComponent from './ModalComponent';
import ModalDown from './ModalDown';

export default function ListFolders({ folders, updateFolderLinks, removeFolderLinks, navigation }) {
    return (

        <View>
            {
                (folders && folders.length > 0) &&
                <View>
                    {folders.map(folder => (
                        <Folder
                            navigation={navigation}
                            key={folder.id}
                            folder={folder}
                            updateFolderLinks={updateFolderLinks}
                            removeFolderLinks={removeFolderLinks}
                        />
                    ))}
                </View>
            }
        </View>
    );
}

function Folder({ folder, updateFolderLinks, removeFolderLinks, navigation }) {

    const [modalDownVisible, setModalDownVisible] = useState(false)
    const [modalLinkVisible, setModalLinkVisible] = useState(false)
    const [loadVisible, setLoadVisible] = useState(false)
    const [alert, setAlert] = useState({ visible: false, text: '' })
    const [updateFolder, setUpdateFolder] = useState(folder)

    return (
        <View key={folder.id} style={[Styles.listStyle, { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }]}>

            {
                updateFolder &&
                <>
                    <ModalComponent
                        visible={modalLinkVisible}
                        onClosed={() => setModalLinkVisible(false)}
                    >
                        <Text style={{ fontSize: 25 }}>Update folder</Text>

                        {
                            loadVisible &&
                            <ActivityIndicator size="large" />
                        }

                        <Alert
                            text={alert.text}
                            visible={alert.visible}
                            onClosed={() => setAlert({ visible: false, text: '' })}
                        />

                        <Input
                            value={updateFolder.name}
                            label="Name"
                            placeholder="example"
                            onChange={text => setUpdateFolder({ ...updateFolder, name: text })}
                        />

                        <Button
                            onPress={() => {
                                if (!updateFolder.name) {
                                    return setAlert({ text: "Do not leave empty fields", visible: true })
                                }
                                setLoadVisible(true)
                                updateFolderLinks(updateFolder.name, updateFolder.id)
                                setLoadVisible(false)
                                setModalLinkVisible(false)
                            }}
                            css={{ marginTop: 15 }}
                        >
                            <Text> Update </Text>
                        </Button>
                    </ModalComponent>

                    <ModalDown
                        modalVisible={modalDownVisible}
                        onClosed={() => setModalDownVisible(false)}
                    >

                        <View style={{ width: '100%' }}>

                            <TouchableOpacity
                                onPress={() => {
                                    setModalDownVisible(false)
                                    setModalLinkVisible(true)
                                }}
                                style={{
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                    margin: 10
                                }}>

                                <SimpleLineIcons
                                    color="grey"
                                    size={30}
                                    name="plus"
                                />

                                <Text style={{ marginLeft: 5, fontSize: 25 }}>
                                    Update folder
                                </Text>

                            </TouchableOpacity>

                            <TouchableOpacity
                                onPress={() => {
                                    setModalDownVisible(false)
                                    removeFolderLinks(updateFolder.id)
                                }}
                                style={{
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                    margin: 10
                                }}>

                                <SimpleLineIcons
                                    color="grey"
                                    size={30}
                                    name="plus"
                                />

                                <Text style={{ marginLeft: 5, fontSize: 25 }}>Delete folder</Text>

                            </TouchableOpacity>

                        </View>

                    </ModalDown>
                </>

            }

            <TouchableOpacity
                onPress={() => navigation.navigate("FolderLinks", { folderName: folder.name })}
                style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                }}
            >
                <Entypo
                    color="#3694FF"
                    size={30}
                    name="folder"
                />
                <Text style={Styles.textItemList}>{folder.name}</Text>
            </TouchableOpacity>

            <TouchableOpacity
                onPress={() => setModalDownVisible(true)}
            >
                <Text>
                    <SimpleLineIcons size={25} name="options-vertical" />
                </Text>
            </TouchableOpacity>

        </View>
    )
}