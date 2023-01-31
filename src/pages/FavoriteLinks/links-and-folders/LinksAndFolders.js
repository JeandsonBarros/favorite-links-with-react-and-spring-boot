import '../../../styles/StyleFavoriteLinks.css';

import { Button, Loading, Popover, Row } from '@nextui-org/react';
import { useEffect, useState } from 'react';
import { BsFillPlusCircleFill, BsFillTrashFill, BsPencilSquare } from 'react-icons/bs';
import { MdFolder } from 'react-icons/md';
import { Link } from 'react-router-dom';

import Alert from '../../../components/alert/Alert';
import Directory from '../../../components/directory/Directory';
import ListLinks from '../../../components/list-links/ListLinks';
import { deleteFolderLinks, getAllFolderLinks, getDataFolderLinks, getFolderLinks, postFolderLinks, putFolderLinks } from '../../../services/LinksFolderService';
import ModalFavoriteLink from '../../../components/modal-favorite-link/ModalFavoriteLink';
import { deleteFavoriteLink, postFavoriteLink, putFavoriteLink } from '../../../services/FavoriteLinksService';
import ModalFolderLinks from '../../../components/modal-folder-links/ModalFolderLinks';

function LinksAndFolders() {

    const [favoriteLinks, setFavoriteLinks] = useState([])
    const [folderLinks, setFolderLinks] = useState([])
    const [alertVisible, setAlertVisible] = useState(false)
    const [alertText, setAlertText] = useState('')
    const [visibleLoading, setVisibleLoading] = useState(false)
    const [folderId, setFolderId] = useState(0)

    useEffect(() => {
        getFavoriteLinksInRoot()
        getTotalFolderLinks()
        getDataFolder()
    }, [])

    async function getDataFolder(){
        setVisibleLoading(true)
        const folderData = await getDataFolderLinks("root")
        setVisibleLoading(false)

        if (typeof (folderData) === 'object') {
            setFolderId(folderData.id)
            return
        }

        setAlertText(folderData)
        setAlertVisible(true)
    }

    async function getTotalFolderLinks() {

        setVisibleLoading(true)
        let data = await getAllFolderLinks()
        setVisibleLoading(false)

        const index = data.map(e => e.name).indexOf('root');
        if (index > -1) { // only splice array when item is found
            data.splice(index, 1); // 2nd parameter means remove one item only
        }

        if (typeof (data) === 'object') {
            setFolderLinks(data)
            return
        }

        setAlertText(data)
        setAlertVisible(true)

    }

    async function getFavoriteLinksInRoot() {

        setVisibleLoading(true)
        const data = await getFolderLinks("root")
        setVisibleLoading(false)

        if (typeof (data) === 'object') {
            setFavoriteLinks(data)
            return
        }

        setAlertText(data)
        setAlertVisible(true)
    }

    async function saveFavoriteLinks(name, url, folderId) {

        setVisibleLoading(true)
        const data = await postFavoriteLink(name, url, folderId)
        await getFavoriteLinksInRoot()
        await getTotalFolderLinks()
        setVisibleLoading(false)

        setAlertText(data)
        setAlertVisible(true)
    }

    async function saveFolderLinks(folderName) {
       
        setVisibleLoading(true)
        const data = await postFolderLinks(folderName)
        await getFavoriteLinksInRoot()
        await getTotalFolderLinks()
        setVisibleLoading(false)

        setAlertText(data)
        setAlertVisible(true)

    }

    async function updateFolderLinks(newFolderName, id) {

        setVisibleLoading(true)
        const data = await putFolderLinks(newFolderName, id)
        await getFavoriteLinksInRoot()
        await getTotalFolderLinks()
        setVisibleLoading(false)

        setAlertText(data)
        setAlertVisible(true)
    }

    async function removeFolderLinks(id) {
        setVisibleLoading(true)
        const data = await deleteFolderLinks(id)
        await getFavoriteLinksInRoot()
        await getTotalFolderLinks()
        setVisibleLoading(false)

        setAlertText(data)
        setAlertVisible(true)
    }

    async function updateFavoriteLink(name, url, folderId, id) {
        setVisibleLoading(true)
        const data = await putFavoriteLink(name, url, folderId, id)
        await getFavoriteLinksInRoot()
        setVisibleLoading(false)
        
        setAlertText(data)
        setAlertVisible(true)

    }

    async function removeFavoriteLink(id) {
        setVisibleLoading(true)
        const data = await deleteFavoriteLink(id)
        await getFavoriteLinksInRoot()
        setVisibleLoading(false)
       
        setAlertText(data)
        setAlertVisible(true)
    }

    return (
        <div>

            <Directory pathname="/" />

            <Alert setVisible={setAlertVisible} visible={alertVisible} text={alertText} />
            {visibleLoading && <Loading type="points" />}

            <div className="listLinksAndFolders">
                {/* List folder links */}
                {folderLinks.length > 0 &&
                    folderLinks.map(folder => {
                        return (
                            <Row
                                align="center"
                                key={folder.id}
                                css={{ borderBottom: "solid 1px #80808065", p: 10 }}
                            >

                                <Link to={`/${folder.name}`} >
                                    <MdFolder style={{ fontSize: 25, margin: 10 }} />
                                    {folder.name}
                                </Link>

                                <Row justify="flex-end">

                                    <ModalFolderLinks
                                        title="Update link"
                                        name={folder.name}
                                        action={(newFolderName) => {
                                            updateFolderLinks(newFolderName, folder.id)
                                        }}
                                        showButtonRender={({ click }) => (
                                            <Button
                                                auto
                                                css={{ marginRight: 10 }}
                                                color="warning"
                                                flat
                                                title="Update link"
                                                shadow
                                                onPress={click}>
                                                <BsPencilSquare />
                                            </Button>
                                        )}
                                    />

                                    <Button
                                        auto
                                        css={{ marginRight: 10 }}
                                        color="error"
                                        flat
                                        title="Delete link"
                                        shadow
                                        onPress={() => removeFolderLinks(folder.id)}
                                    >
                                        <BsFillTrashFill />
                                    </Button>
                                </Row>
                            </Row>
                        )
                    })
                }
            </div>

            {/* List links that have no folder */}
            {favoriteLinks.length > 0 &&
                <ListLinks
                    listFavoriteLinks={favoriteLinks}
                    refreshList={getFavoriteLinksInRoot}
                    updateFavoriteLink={updateFavoriteLink}
                    removeFavoriteLink={removeFavoriteLink}
                />}

            <Popover placement="top" isDismissable={false}>
                <Popover.Trigger>
                    <Button
                        rounded
                        auto
                        color="primary"
                        shadow
                        icon={<BsFillPlusCircleFill style={{ fontSize: 50 }} />}
                        css={{
                            position: "fixed",
                            bottom: 80,
                            right: 30,
                            h: 60,
                            w: 60,
                            zIndex: 999
                        }}
                    />
                </Popover.Trigger>
                <Popover.Content>

                    <ModalFavoriteLink
                        title="+ New favorite link"
                        action={saveFavoriteLinks}
                        folderId={folderId}
                        showButtonRender={({ click }) => (
                            <Button light onPress={click}>+ New favorite link</Button>
                        )}
                    />

                    <ModalFolderLinks
                        action={saveFolderLinks}
                        title="+ New links folder"
                        showButtonRender={({ click }) => (
                            <Button light onPress={click}>+ New links folder</Button>
                        )}
                    />

                </Popover.Content>
            </Popover>

        </div>
    );
}

export default LinksAndFolders;

