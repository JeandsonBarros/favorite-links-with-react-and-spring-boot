import { Button, Popover, Progress } from "@nextui-org/react";
import { useEffect, useState } from "react";
import { BsFillPlusCircleFill } from "react-icons/bs";
import { useLocation, useParams } from "react-router-dom";
import Alert from "../../../components/alert/Alert";
import Directory from "../../../components/directory/Directory";
import ListLinks from "../../../components/list-links/ListLinks";
import ModalFavoriteLink from "../../../components/modal-favorite-link/ModalFavoriteLink";
import { deleteFavoriteLink, postFavoriteLink, putFavoriteLink } from "../../../services/FavoriteLinksService";
import { getDataFolderLinks, getFolderLinks } from "../../../services/LinksFolderService";

function Links() {

    const location = useLocation()
    const params = useParams();
    const [favoriteLinks, setFavoriteLinks] = useState([])
    const [folderId, setFolderId] = useState()
    const [alertVisible, setAlertVisible] = useState(false)
    const [alertText, setAlertText] = useState('')
    const [visibleLoading, setVisibleLoading] = useState(false)
    const [visibleModalNewLink, setVisibleModalNewLink] = useState(false)
    const [popoverIsOpen, setPopoverIsOpen] = useState(false)

    useEffect(() => {
        getLianks()
        getDataFolder()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [location.pathname])

    async function getDataFolder() {
        setVisibleLoading(true)
        const folderData = await getDataFolderLinks(params.nameFolder)
        setVisibleLoading(false)

        if (typeof (folderData) === 'object') {
            setFolderId(folderData.id)
            return
        }

        setAlertText(folderData)
        setAlertVisible(true)
    }

    async function getLianks() {
        setVisibleLoading(true)
        const data = await getFolderLinks(params.nameFolder)
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
        await getLianks()
        setVisibleLoading(false)

        setAlertText(data)
        setAlertVisible(true)
    }

    async function updateFavoriteLink(name, url, folderId, id) {
        setVisibleLoading(true)
        const data = await putFavoriteLink(name, url, folderId, id)
        await getLianks()
        setVisibleLoading(false)

        setAlertText(data)
        setAlertVisible(true)

    }

    async function removeFavoriteLink(id) {
        setVisibleLoading(true)
        const data = await deleteFavoriteLink(id)
        await getLianks()
        setVisibleLoading(false)

        setAlertText(data)
        setAlertVisible(true)
    }

    return (
        <>
            <Directory pathname={params.nameFolder} />

            <Alert setVisible={setAlertVisible} visible={alertVisible} text={alertText} />
            {visibleLoading &&
                <Progress
                    indeterminated
                    value={50}
                    color="primary"
                    status="primary"
                />}

            {favoriteLinks.length > 0 &&
                <ListLinks
                    listFavoriteLinks={favoriteLinks}
                    refreshList={getLianks}
                    updateFavoriteLink={updateFavoriteLink}
                    removeFavoriteLink={removeFavoriteLink}
                />}

            {folderId && <ModalFavoriteLink
                title="+ New favorite link"
                action={saveFavoriteLinks}
                folderId={folderId}
                visible={visibleModalNewLink}
                closeHandler={() => setVisibleModalNewLink(false)}
            />}

            <Popover placement="top" isOpen={popoverIsOpen} onClose={()=>setPopoverIsOpen(false)}>
                <Popover.Trigger>
                    <Button
                        rounded
                        auto
                        color="primary"
                        shadow
                        onPress={() => setPopoverIsOpen(true)}
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
                    <Button
                        light
                        onPress={() => {
                            setPopoverIsOpen(false)
                            setVisibleModalNewLink(true)
                        }} >
                        + New favorite link
                    </Button>
                </Popover.Content>
            </Popover>

        </>);
}

export default Links;