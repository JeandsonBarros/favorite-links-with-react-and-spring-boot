import { Button, Checkbox, Collapse, Input, Modal, Progress, Row, Text } from "@nextui-org/react";
import { createContext, useContext, useEffect, useState } from "react";
import { deleteOneUser, findUser, getAllUsers, getUserData, patchOneUser } from '../../../services/AuthService'
import { BsEnvelopeFill, BsFillPersonLinesFill, BsFillPlusCircleFill, BsFillTrashFill, BsLockFill, BsPencilSquare, BsSearch } from 'react-icons/bs';
import Alert from "../../../components/alert/Alert";
import ConfirmModal from "../../../components/confirm-modal/ConfirmModal";
import { useNavigate } from "react-router-dom";
import { removeToken } from "../../../services/TokenService";

const ListContext = createContext(null);

export default function ListUsers() {

    const navigate = useNavigate()
    const [search, setSearch] = useState('')
    const [alert, setAlert] = useState({ visible: false, text: '' })
    const [visibleLoading, setVisibleLoading] = useState(false)
    const [page, setPage] = useState(0)
    const [totalUsers, setTotalUsers] = useState(0)
    const [authenticatedUser, setAuthenticatedUser] = useState()
    const [users, setUsers] = useState([])

    useEffect(() => {
        listUsers()
        showUserData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    async function showUserData() {

        const data = await getUserData()

        if (typeof (data) === 'object') {
            setAuthenticatedUser(data)
            return
        }

    }

    async function listUsers(pageParam = 0, searchName = '') {
        setPage(pageParam)

        setVisibleLoading(true)

        let data = []
        if (searchName.length > 0) {
            setSearch(searchName)
            data = await findUser(pageParam, searchName)
        }
        else {
            data = await getAllUsers(pageParam, searchName)
        }

        setVisibleLoading(false)

        if (typeof (data) === 'object') {

            setTotalUsers(data.totalElements)
            if (pageParam === 0)
                setUsers(data.content)
            else
                setUsers(users.concat(data.content))

            return
        }

        setAlert({ visible: true, text: data })

    }

    async function removeUser(email) {

        setVisibleLoading(true)
        const data = await deleteOneUser(email)
        setVisibleLoading(false)

        if (email === authenticatedUser.email) {
            removeToken()
            navigate("/login")
            return
        }

        setAlert({ visible: true, text: data })
        listUsers()

    }

    async function updateUserData(user) {

        if (!user.email || !user.name) {
            return "Don't leave empty fields"
        }

        const response = await patchOneUser(user.email, { email: user.email, name: user.name, roles: user.roles })

        listUsers()

        return response

    }

    async function updateUserPassword(user) {

        if (!user.password || !user.confirmPassword) {
            return "Don't leave empty fields"
        }

        if (user.password !== user.confirmPassword) {
            return "Passwords do not match"
        }

        setVisibleLoading(true)
        const response = await patchOneUser(user.email, { password: user.password })
        setVisibleLoading(false)

        return response

    }

    return (
        <div>

            <Alert
                onClosed={() => setAlert({ visible: false, text: '' })}
                visible={alert.visible}
                text={alert.text}
            />

            {
                visibleLoading &&
                <Progress
                    indeterminated
                    value={50}
                    color="primary"
                    status="primary"
                />
            }

            <Text h2 css={{ m: 10 }}>User list</Text>

            <Input
                aria-label="search-by-name"
                placeholder="Find by name"
                initialValue={search}
                contentLeft={<BsSearch />}
                onChange={event => {
                    listUsers(0, event.target.value)
                }}
                css={{ m: 5 }}
            />

            <Collapse.Group>

                <ListContext.Provider
                    value={{
                        listUsers,
                        authenticatedUser,
                        removeUser,
                        updateUserData,
                        updateUserPassword
                    }}
                >

                    {users.length > 0 &&
                        users.map(user => (
                            <UserCollapse
                                key={user.id}
                                user={user}
                            />
                        ))
                    }

                </ListContext.Provider>

            </Collapse.Group>

            {(totalUsers !== users.length && totalUsers > 0) && <Button
                rounded
                auto
                title="show more"
                color="secondary"
                shadow
                icon={<BsFillPlusCircleFill style={{ fontSize: 50 }} />}
                onPress={() => {
                    listUsers(page + 1, search)
                }}
                css={{
                    m: '20px auto',
                    h: 60,
                    w: 60,
                    zIndex: 999
                }}
            />}

        </div>
    );
}

function ModalUpdateUser({ visibleModal, setVisibleModal, user }) {

    const [userUpdate, setUserUpdate] = useState({ ...user, roles: user.roles.map(role => role.role), confirmPassword: '' })
    const [alert, setAlert] = useState({ visible: false, text: '' })
    const [visibleLoading, setVisibleLoading] = useState(false)
    const listContext = useContext(ListContext);

    function setValues(value, key) {
        let tempValues = { ...userUpdate }
        tempValues[key] = value
        setUserUpdate(tempValues)
    }

    return (
        <Modal
            closeButton
            aria-labelledby="modal-title"
            aria-describedby="modal-description"
            open={visibleModal}
            onClose={() => {
                setAlert({ visible: false, text: '' })
            }}
        >
            <Modal.Body>

                {visibleLoading &&
                    <Progress
                        indeterminated
                        value={50}
                        color="primary"
                        status="primary"
                    />}

                <Alert onClosed={() => setAlert({ visible: false, text: '' })} visible={alert.visible} text={alert.text} />

                <h3>Update data</h3>

                <Input
                    fullWidth
                    label="Email"
                    type="email"
                    bordered
                    color="primary"
                    placeholder="exemple@email.com"
                    initialValue={userUpdate.email}
                    onChange={event => setValues(event.target.value, "email")}
                    contentLeft={<BsEnvelopeFill />}
                />

                <Input
                    fullWidth
                    label="Name"
                    type="text"
                    bordered
                    color="primary"
                    placeholder="Fulano"
                    initialValue={userUpdate.name}
                    onChange={event => setValues(event.target.value, "name")}
                    contentLeft={<BsFillPersonLinesFill />}
                />

                {userUpdate.roles.length > 0 &&
                    <Checkbox.Group
                        value={userUpdate.roles}
                        label="Select roles"
                        orientation="horizontal"
                        onChange={value => {
                            setUserUpdate({ ...userUpdate, roles: value })
                        }}
                    >
                        <Checkbox value="MASTER">Master</Checkbox>
                        <Checkbox value="ADMIN">Admin</Checkbox>
                        <Checkbox value="USER">User</Checkbox>
                    </Checkbox.Group>
                }

                <Button
                    auto
                    flat
                    shadow
                    onPress={async () => {
                        setVisibleLoading(true)
                        const response = await listContext.updateUserData(userUpdate)
                        setVisibleLoading(false)
                        setAlert({ visible: true, text: response })
                    }}
                >
                    Update
                </Button>

                <hr />

                <h3>Update password</h3>

                <Input.Password
                    fullWidth
                    label="New password"
                    bordered
                    color="primary"
                    placeholder="user12345"
                    onChange={event => setValues(event.target.value, "password")}
                    contentLeft={<BsLockFill />}
                />

                <Input.Password
                    fullWidth
                    label="Confirm password"
                    bordered
                    color="primary"
                    placeholder="user12345"
                    onChange={event => setValues(event.target.value, "confirmPassword")}
                    contentLeft={<BsLockFill />}
                />

                <Button
                    auto flat
                    shadow
                    onPress={async () => {
                        setVisibleLoading(true)
                        const response = await listContext.updateUserPassword(userUpdate)
                        setVisibleLoading(false)
                        setAlert({ visible: true, text: response })
                    }}
                >
                    Update
                </Button>

            </Modal.Body>

        </Modal>
    )
}

function UserCollapse({ user }) {

    const [visibleModalUpdate, setVisibleModalUpdate] = useState(false)
    const listContext = useContext(ListContext);

    return (
        <Collapse key={user.id} title={user.name}>

            <Text>
                ID: {user.id}
            </Text>

            <Text>
                Email: {user.email}
            </Text>

            <Text>
                Roles: {user.roles.map(role => " " + role.role).toString()}
            </Text>

            {(listContext.authenticatedUser && listContext.authenticatedUser.roles.map(role => role.role).includes('MASTER')) &&
                <Row align="center" css={{ m: 10 }}>

                    <ModalUpdateUser
                        setVisibleModal={setVisibleModalUpdate}
                        visibleModal={visibleModalUpdate}
                        user={user}
                    />

                    <Button
                        rounded
                        auto
                        css={{ mr: 10 }}
                        shadow
                        flat
                        color="warning"
                        title="Update user"
                        onPress={() => {
                            setVisibleModalUpdate(true)
                        }}
                        icon={<BsPencilSquare />}
                    />

                    <ConfirmModal
                        title="Delete user"
                        text="If you do, all of his data will be erased. Do you wish to continue?"
                        action={() => listContext.removeUser(user.email)}
                        showButton={({ click }) => (
                            <Button
                                rounded
                                auto
                                css={{ mr: 10 }}
                                shadow
                                flat
                                color="error"
                                title="Delete user"
                                onPress={click}
                                icon={<BsFillTrashFill />}
                            />
                        )}
                    />

                </Row>
            }
        </Collapse>
    )
}
