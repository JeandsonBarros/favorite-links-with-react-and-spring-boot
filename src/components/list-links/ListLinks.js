import '../../styles/StyleFavoriteLinks.css';
import './StyleListLinks.css';

import { Button, Row } from '@nextui-org/react';
import { BsBoxArrowUpRight, BsFillBookmarkStarFill, BsFillTrashFill, BsPencilSquare } from 'react-icons/bs';

import ModalFavoriteLink from '../modal-favorite-link/ModalFavoriteLink';

function ListLinks({ listFavoriteLinks, updateFavoriteLink, removeFavoriteLink }) {

    return (
        <div className="listLinksAndFolders" >

            {listFavoriteLinks.map(favoriteLink => {
                return (
                    <Row
                        justify="space-around"
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
                        
                        <Row justify="flex-end">
                            <ModalFavoriteLink
                                title="Update link"
                                action={(name, url, folderId) => updateFavoriteLink(name, url, folderId, favoriteLink.id)}
                                favoriteLinkProp={{ name: favoriteLink.name, url: favoriteLink.url, folderId: favoriteLink.linksFolder.id }}
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
                                onPress={() => removeFavoriteLink(favoriteLink.id)}
                                shadow>
                                <BsFillTrashFill />
                            </Button>
                        </Row>
                    </Row>
                )
            })}

        </div>
    );
}

export default ListLinks;