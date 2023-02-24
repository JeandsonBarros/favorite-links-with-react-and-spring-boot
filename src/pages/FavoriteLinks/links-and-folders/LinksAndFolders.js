import '../../../styles/StyleFavoriteLinks.css';

import { Button, Popover, Progress } from '@nextui-org/react';
import { useEffect, useState } from 'react';
import { BsFillPlusCircleFill } from 'react-icons/bs';
import { useParams } from 'react-router-dom';

import Alert from '../../../components/alert/Alert';
import Directory from '../../../components/directory/Directory';
import ListFolders from '../../../components/list-folders/ListFolders';
import ListLinks from '../../../components/list-links/ListLinks';
import ModalFavoriteLink from '../../../components/modal-favorite-link/ModalFavoriteLink';
import ModalFolderLinks from '../../../components/modal-folder-links/ModalFolderLinks';
import { deleteFavoriteLink, findFavoriteLinks, postFavoriteLink, putFavoriteLink } from '../../../services/FavoriteLinksService';
import {
    deleteFolderLinks,
    findFolderLinks,
    getAllFolderLinks,
    getDataFolderLinks,
    getFolderLinks,
    postFolderLinks,
    putFolderLinks,
} from '../../../services/LinksFolderService';

function LinksAndFolders() {

    const params = useParams()
    const [favoriteLinks, setFavoriteLinks] = useState([])
    const [folderLinks, setFolderLinks] = useState([])
    const [alert, setAlert] = useState({ visible: false, text: '' })
    const [visibleLoading, setVisibleLoading] = useState(false)
    const [folderRootId, setFolderRootId] = useState()
    const [visibleModalNewFolder, setVisibleModalNewFolder] = useState(false)
    const [visibleModalNewLink, setVisibleModalNewLink] = useState(false)
    const [popoverIsOpen, setPopoverIsOpen] = useState(false)

    useEffect(() => {

        gets()

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [params])


    async function gets() {

        setVisibleLoading(true)
        await getFavoriteLinksInRoot()
        await getListFolderLinks()
        await getDataRootFolder()
        setVisibleLoading(false)

    }

    async function getDataRootFolder() {

        const folderData = await getDataFolderLinks("root")

        if (typeof (folderData) === 'object') {
            setFolderRootId(folderData.id)
            return
        }

        setAlert({ visible: true, text: folderData })
    }

    async function getListFolderLinks() {

        let data = params.name ? await findFolderLinks(params.name) : await getAllFolderLinks()

        if (typeof (data) === 'object') {

            const index = data.map(e => e.name).indexOf('root');
            if (index > -1) { // only splice array when item is found
                data.splice(index, 1); // 2nd parameter means remove one item only
            }

            setFolderLinks(data)
            return
        }

        setAlert({ visible: true, text: data })

    }

    async function getFavoriteLinksInRoot() {

        const data = params.name ? await findFavoriteLinks(params.name) : await getFolderLinks("root")

        if (typeof (data) === 'object') {
            setFavoriteLinks(data)
            return
        }

        setAlert({ visible: true, text: data })
    }

    async function saveFavoriteLinks(name, url, folderId) {

        setVisibleLoading(true)
        const data = await postFavoriteLink(name, url, folderId)
        await getFavoriteLinksInRoot()
        await getListFolderLinks()
        setVisibleLoading(false)

        setAlert({ visible: true, text: data })
    }

    async function saveFolderLinks(folderName) {

        setVisibleLoading(true)
        const data = await postFolderLinks(folderName)
        await getFavoriteLinksInRoot()
        await getListFolderLinks()
        setVisibleLoading(false)

        setAlert({ visible: true, text: data })

    }

    async function updateFolderLinks(newFolderName, id) {

        setVisibleLoading(true)
        const data = await putFolderLinks(newFolderName, id)
        await getFavoriteLinksInRoot()
        await getListFolderLinks()
        setVisibleLoading(false)

        setAlert({ visible: true, text: data })
    }

    async function removeFolderLinks(id) {
        setVisibleLoading(true)
        const data = await deleteFolderLinks(id)
        await getFavoriteLinksInRoot()
        await getListFolderLinks()
        setVisibleLoading(false)

        setAlert({ visible: true, text: data })
    }

    async function updateFavoriteLink(name, url, folderId, id) {

        setVisibleLoading(true)
        const data = await putFavoriteLink(name, url, folderId, id)
        await getFavoriteLinksInRoot()
        setVisibleLoading(false)

        setAlert({ visible: true, text: data })

    }

    async function removeFavoriteLink(id) {
        setVisibleLoading(true)
        const data = await deleteFavoriteLink(id)
        await getFavoriteLinksInRoot()
        setVisibleLoading(false)

        setAlert({ visible: true, text: data })
    }

    return (
        <div>

            <Directory pathname="/" />

            <Alert onClosed={() => setAlert({ visible: false, text: '' })} visible={alert.visible} text={alert.text} />
            {visibleLoading &&
                <Progress
                    indeterminated
                    value={50}
                    color="primary"
                    status="primary"
                />}

            {/* List folder links */}
            {folderLinks.length > 0 &&
                <ListFolders
                    folderLinks={folderLinks}
                    updateFolderLinks={updateFolderLinks}
                    removeFolderLinks={removeFolderLinks}
                />
            }

            {/* List links that have no folder */}
            {favoriteLinks.length > 0 &&
                <ListLinks
                    listFavoriteLinks={favoriteLinks}
                    refreshList={getFavoriteLinksInRoot}
                    updateFavoriteLink={updateFavoriteLink}
                    removeFavoriteLink={removeFavoriteLink}
                />}

            {folderRootId && <ModalFavoriteLink
                title="+ New favorite link"
                action={saveFavoriteLinks}
                folderId={folderRootId}
                visible={visibleModalNewLink}
                closeHandler={() => setVisibleModalNewLink(false)}
            />}

            <ModalFolderLinks
                action={saveFolderLinks}
                title="+ New links folder"
                visible={visibleModalNewFolder}
                closeHandler={() => setVisibleModalNewFolder(false)}
            />

            <Popover placement="top" isOpen={popoverIsOpen} onClose={() => setPopoverIsOpen(false)}>

                <Popover.Trigger>
                    <Button
                        rounded
                        auto
                        color="primary"
                        shadow
                        icon={<BsFillPlusCircleFill style={{ fontSize: 50 }} />}
                        onPress={() => setPopoverIsOpen(true)}
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

                    <Button
                        light
                        onPress={() => {
                            setPopoverIsOpen(false)
                            setVisibleModalNewLink(true)
                        }}>
                        + New favorite link
                    </Button>

                    <Button
                        light
                        onPress={() => {
                            setPopoverIsOpen(false)
                            setVisibleModalNewFolder(true)
                        }}>
                        + New links folder
                    </Button>

                </Popover.Content>

            </Popover>

        </div>
    );
}

export default LinksAndFolders;

