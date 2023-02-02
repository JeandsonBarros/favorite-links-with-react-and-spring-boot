import { Button, Row } from "@nextui-org/react";
import { BsFillTrashFill, BsPencilSquare } from "react-icons/bs";
import { MdFolder } from "react-icons/md";
import { Link } from "react-router-dom";
import ConfirmModal from "../confirm-modal/ConfirmModal";
import ModalFolderLinks from "../modal-folder-links/ModalFolderLinks";

function ListFolders({ folderLinks, updateFolderLinks, removeFolderLinks }) {

    return (
        <div className="listLinksAndFolders">
            {/* List folder links */}
            {folderLinks.map(folder => {
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

                            <ConfirmModal
                                title="Delete folder"
                                text="If you delete this folder, all links in it will be permanently deleted. Do you really want to delete?"
                                action={() => {
                                    removeFolderLinks(folder.id)
                                }}
                                showButton={({ click }) => (
                                    <Button
                                        auto
                                        css={{ marginRight: 10 }}
                                        color="error"
                                        flat
                                        title="Delete folder"
                                        shadow
                                        onPress={click}
                                    >
                                        <BsFillTrashFill />
                                    </Button>
                                )}
                            />

                        </Row>
                    </Row>
                )
            })
            }
        </div>
    );
}

export default ListFolders;