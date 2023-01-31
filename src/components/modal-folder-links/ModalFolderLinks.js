import { Button, Input, Modal, Text } from "@nextui-org/react";
import { useState } from "react";

function ModalFolderLinks({ name, action, title, showButtonRender }) {

    const [folderName, setFolderName] = useState(name || '');
    const [visible, setVisible] = useState(false);
    const handler = () => setVisible(true);

    const closeHandler = () => {
        setVisible(false);
    };

    return (
        <div>

            {
                showButtonRender({
                    click: handler
                })
            }

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
                        size="lg"
                        placeholder="Name"
                        value={folderName}
                        onChange={event => setFolderName(event.target.value)}
                    />

                </Modal.Body>
                <Modal.Footer>
                    <Button auto flat color="error" onPress={closeHandler}>
                        Close
                    </Button>
                    <Button auto onPress={() => {
                        console.log(folderName);
                        action(folderName)
                        closeHandler()
                    }}>
                        Save
                    </Button>
                </Modal.Footer>
            </Modal>
        </div >
    );
}

export default ModalFolderLinks;