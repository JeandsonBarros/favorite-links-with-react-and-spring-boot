import '../../styles/StyleFavoriteLinks.css';
import './StyleListLinks.css';

import { Button, Popover, Row } from '@nextui-org/react';
import { BsBoxArrowUpRight, BsFillBookmarkStarFill, BsFillTrashFill, BsPencilSquare, BsThreeDotsVertical } from 'react-icons/bs';

import ModalFavoriteLink from '../modal-favorite-link/ModalFavoriteLink';
import { useState } from 'react';

function Link({ favoriteLink, updateFavoriteLink, removeFavoriteLink }) {

    const [visibleModalUpdate, setVisibleModalUpdate] = useState(false)
    const [popoverIsOpen, setPopoverIsOpen] = useState(false)

    return (
        <Row
            align="center"
            key={favoriteLink.id}
            css={{ borderBottom: "solid 1px #80808065", p: 10 }}
        >
            <Row align="center">
                <div>
                    <a
                        href={favoriteLink.url}
                        target="_blank"
                        rel="noreferrer"
                        className="favoriteLink"
                        title={favoriteLink.url}
                    >
                        <BsFillBookmarkStarFill style={{ fontSize: 20, marginRight: 10 }} />
                        {favoriteLink.name}
                        <BsBoxArrowUpRight id="redirectIcon" style={{ marginLeft: 5 }} />
                    </a>
                </div>
            </Row>

            <ModalFavoriteLink
                title="Update favorite link"
                action={(name, url, folderId) => updateFavoriteLink(name, url, folderId, favoriteLink.id)}
                favoriteLinkProp={{ name: favoriteLink.name, url: favoriteLink.url, folderId: favoriteLink.linksFolder.id }}
                visible={visibleModalUpdate}
                closeHandler={() => setVisibleModalUpdate(false)}
            />

            <Popover placement="top" isOpen={popoverIsOpen} onClose={()=>setPopoverIsOpen(false)}>
                <Popover.Trigger>
                    <Button
                        auto
                        light
                        onPress={()=>setPopoverIsOpen(true)}
                        icon={<BsThreeDotsVertical />}
                    />
                </Popover.Trigger>
                <Popover.Content>
                    <div >
                        <Button
                            auto
                            css={{ marginRight: 10 }}
                            light
                            onPress={() => {
                                setPopoverIsOpen(false)
                                setVisibleModalUpdate(true)
                            }}>
                            Update link <BsPencilSquare style={{ marginLeft: 5 }} />
                        </Button>
                        <Button
                            auto
                            css={{ marginRight: 10 }}
                            light
                            onPress={() => {
                                setPopoverIsOpen(false)
                                removeFavoriteLink(favoriteLink.id)
                            }}>
                            Delete link <BsFillTrashFill style={{ marginLeft: 5 }} />
                        </Button>
                    </div>
                </Popover.Content>
            </Popover>

        </Row>
    )
}

function ListLinks({ listFavoriteLinks, updateFavoriteLink, removeFavoriteLink }) {

    return (
        <div className="listLinksAndFolders" >

            {listFavoriteLinks.map(favoriteLink => {
                return (
                    <Link
                        key={favoriteLink.id}
                        favoriteLink={favoriteLink}
                        updateFavoriteLink={updateFavoriteLink}
                        removeFavoriteLink={removeFavoriteLink}
                    />
                )
            })}

        </div>
    );
}

export default ListLinks;