import { useState } from 'react';
import { ActivityIndicator, Text, TouchableOpacity, View } from 'react-native';
import Entypo from 'react-native-vector-icons/Entypo';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';

import Styles from '../styles/Styles';
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
    const [alert, setAlert] = useState('')
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
                        <View>

                            <Text style={{ fontSize: 25 }}>Update folder</Text>

                            {
                                loadVisible &&
                                <ActivityIndicator size="large" />
                            }

                            <Text style={{ color: 'red' }}>{alert}</Text>
                            
                            <Input
                                value={updateFolder.name}
                                label="Name"
                                placeholder="example"
                                onChange={text => setUpdateFolder({ ...updateFolder, name: text })}
                            />

                            <Button
                                onPress={() => {
                                    if (!updateFolder.name) {
                                        return setAlert("Do not leave empty fields")
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

                        </View>

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
                                <Text style={{ fontSize: 20 }}>  Update folder </Text>
                            </Button>

                            <Button
                                css={{ backgroundColor: '#e86d6d' }}
                                onPress={() => {
                                    setModalDownVisible(false)
                                    removeFolderLinks(updateFolder.id)
                                }}
                            >
                                <SimpleLineIcons size={20} name="trash" />
                                <Text style={{ fontSize: 20 }}>  Delete folder </Text>
                            </Button>

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
                    <SimpleLineIcons size={20} name="options-vertical" />
                </Text>
            </TouchableOpacity>

        </View>
    )
}