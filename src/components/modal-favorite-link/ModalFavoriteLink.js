import { Button, Input, Loading, Modal, Text } from "@nextui-org/react";
import { useEffect, useState } from "react";
import { getAllFolderLinks } from "../../services/LinksFolderService";
import Alert from "../alert/Alert";

function ModalFavoriteLink({ favoriteLinkProp, action, title, showButtonRender, folderId }) {

  const [favoriteLink, setFavoriteLink] = useState(favoriteLinkProp || { name: '', url: '', folderId });
  const [folderLinks, setFolderLinks] = useState([])
  const [visible, setVisible] = useState(false);
  const [alertText, setAlertText] = useState('')
  const [visibleLoading, setVisibleLoading] = useState(false)
  const [alertVisible, setAlertVisible] = useState(false)
  const handler = () => setVisible(true);

  useEffect(() => {
    getTotalFolderLinks()
  }, [])


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

  const closeHandler = () => {
    setVisible(false);
  };

  function setValues(value, key) {
    let tempValues = { ...favoriteLink }
    tempValues[key] = value
    setFavoriteLink(tempValues)
  }

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
            value={favoriteLink.name}
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
            value={favoriteLink.url}
            onChange={event => setValues(event.target.value, "url")}
          />

          <hr />

          <div>

            <h5>Select one folder</h5>
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

          </div>

        </Modal.Body>
        <Modal.Footer>
          <Button auto flat color="error" onPress={closeHandler}>
            Close
          </Button>
          <Button auto onPress={() => {
            console.log(favoriteLink);
            closeHandler()
            action(favoriteLink.name, favoriteLink.url, favoriteLink.folderId)
          }}>
            Save
          </Button>
        </Modal.Footer>
      </Modal>
    </div >
  );
}

export default ModalFavoriteLink;