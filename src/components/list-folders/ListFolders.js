import { Button, Popover, Row } from "@nextui-org/react";
import { useState } from "react";
import { BsFillTrashFill, BsPencilSquare, BsThreeDotsVertical } from "react-icons/bs";
import { MdFolder } from "react-icons/md";
import { Link } from "react-router-dom";

import ModalFolderLinks from "../modal-folder-links/ModalFolderLinks";

function Folder({ folder, updateFolderLinks, removeFolderLinks }) {

    const [visibleModalUpdate, setVisibleModalUpdate] = useState(false)
    const [popoverIsOpen, setPopoverIsOpen] = useState(false)

    return (
        <Row
            align="center"
            justify="space-between"
            css={{ borderBottom: "solid 1px #80808065", p: 10 }}
        >

            <Link to={`/${folder.name}`} >
                <MdFolder style={{ fontSize: 25 }} />
                {folder.name}
            </Link>

            <ModalFolderLinks
                title="Update link"
                name={folder.name}
                action={(newFolderName) => {
                    updateFolderLinks(newFolderName, folder.id)
                }}
                visible={visibleModalUpdate}
                closeHandler={() => setVisibleModalUpdate(false)}
            />

            <Popover placement="top" isOpen={popoverIsOpen} onClose={()=>setPopoverIsOpen(false)}>
                <Popover.Trigger>
                    <Button
                        auto
                        light
                        onPress={() => setPopoverIsOpen(true)}
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
                            Update folder <BsPencilSquare style={{ marginLeft: 5 }} />
                        </Button>

                        <Button
                            auto
                            css={{ marginRight: 10 }}
                            light
                            onPress={() => {
                                setPopoverIsOpen(false)
                                removeFolderLinks(folder.id)
                            }}
                        >
                            Delete folder <BsFillTrashFill style={{ marginLeft: 5 }} />
                        </Button>

                    </div>
                </Popover.Content>
            </Popover>

        </Row>
    )
}

function ListFolders({ folderLinks, updateFolderLinks, removeFolderLinks }) {

    return (
        <div className="listLinksAndFolders">
            {/* List folder links */}
            {folderLinks.map(folder => {

                return (
                    <Folder
                        key={folder.id}
                        folder={folder}
                        updateFolderLinks={updateFolderLinks}
                        removeFolderLinks={removeFolderLinks}
                    />
                )
            })
            }
        </div>
    );
}

export default ListFolders;