import { Button, Input, Modal, Text } from "@nextui-org/react";
import { useState } from "react";

function ModalFolderLinks({ name, action, title, visible, closeHandler }) {

    const [folderName, setFolderName] = useState(name || '');
   
    return (
        <Modal
            closeButton
            aria-labelledby="modal-title"
            aria-describedby="modal-description"
            open={visible}
            onClose={closeHandler}
        >
            <Modal.Header>
                <Text id="modal-title" size={18}>
                    {title}
                </Text>
            </Modal.Header>

            <Modal.Body>

                <Input
                    aria-label="nameFolder"
                    bordered
                    fullWidth
                    color="primary"
                    placeholder="Name"
                    initialValue={folderName}
                    onChange={event => setFolderName(event.target.value)}
                />

            </Modal.Body>

            <Modal.Footer>
                <Button auto flat color="error" onPress={closeHandler}>
                    Close
                </Button>
                <Button auto onPress={() => {
                    action(folderName)
                    closeHandler()
                }}>
                    Save
                </Button>
            </Modal.Footer>

        </Modal>
    );
}

export default ModalFolderLinks;