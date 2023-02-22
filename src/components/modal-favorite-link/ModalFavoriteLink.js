import { Button, Input, Loading, Modal, Text } from "@nextui-org/react";
import { useEffect, useState } from "react";
import { getAllFolderLinks } from "../../services/LinksFolderService";
import Alert from "../alert/Alert";

function ModalFavoriteLink({ favoriteLinkProp, closeHandler, visible, action, title, folderId }) {

  const [favoriteLink, setFavoriteLink] = useState(favoriteLinkProp || { name: '', url: '', folderId });
  const [folderLinks, setFolderLinks] = useState([])
  const [alertText, setAlertText] = useState('')
  const [visibleLoading, setVisibleLoading] = useState(false)
  const [alertVisible, setAlertVisible] = useState(false)

  useEffect(() => {
    getTotalFolderLinks()
  }, [visible])


  async function getTotalFolderLinks() {

    setVisibleLoading(true)
    const data = await getAllFolderLinks()
    setVisibleLoading(false)

    if (typeof (data) === 'object') {
      setFolderLinks(data)
      return
    }

    setAlertText(data)
    setAlertVisible(true)

  }

  function setValues(value, key) {
    let tempValues = { ...favoriteLink }
    tempValues[key] = value
    setFavoriteLink(tempValues)
  }

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

          <Alert setVisible={setAlertVisible} visible={alertVisible} text={alertText} />
          {visibleLoading && <Loading type="points" />}

          <Input
            aria-label="nameLink"
            clearable
            bordered
            fullWidth
            color="primary"
            size="lg"
            placeholder="Name"
            initialValue={favoriteLink.name}
            onChange={event => setValues(event.target.value, "name")}
          />

          <Input
            aria-label="url"
            clearable
            bordered
            fullWidth
            color="primary"
            size="lg"
            type="url"
            placeholder="URL"
            initialValue={favoriteLink.url}
            onChange={event => setValues(event.target.value, "url")}
          />

          <hr />

          {!folderId && <div>

            <h5>Update folder</h5>
            <small>If you don't select a folder, the link will be saved in the root folders</small>

            <div style={{ maxHeight: 200, overflowY: 'auto' }}>
              {folderLinks.map(folder => (
                <Button
                  auto
                  light={favoriteLink.folderId !== folder.id}
                  key={folder.id}
                  onPress={() => setValues(folder.id, "folderId")}>
                  {folder.name === "root" ? "/" : folder.name}
                </Button>
              ))}
            </div>

          </div>}

        </Modal.Body>
        <Modal.Footer>
          <Button auto flat color="error" onPress={closeHandler}>
            Close
          </Button>
          <Button auto onPress={() => {
            closeHandler()
            action(favoriteLink.name, favoriteLink.url, favoriteLink.folderId)
          }}>
            Save
          </Button>
        </Modal.Footer>
      </Modal>
  );
}

export default ModalFavoriteLink;