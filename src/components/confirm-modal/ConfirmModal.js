import { Button, Modal, Text } from "@nextui-org/react";
import { useState } from "react";

function ConfirmModal({ text, title, action, showButton }) {

    const [visible, setVisible] = useState(false);
    const handler = () => setVisible(true);
    const closeHandler = () => setVisible(false);

    return (
        <div>

            {showButton({ click: handler })}

            <Modal
                blur
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

                    <p>{text}</p>

                </Modal.Body>
                <Modal.Footer>
                    <Button auto flat color="error" onPress={closeHandler}>
                        Close
                    </Button>
                    <Button auto onPress={() => {
                        closeHandler()
                        action()
                    }}>
                        Confirm
                    </Button>
                </Modal.Footer>
            </Modal>

        </div>
    );
}

export default ConfirmModal;