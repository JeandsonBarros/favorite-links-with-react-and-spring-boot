import { Button, Input, Progress } from "@nextui-org/react";
import { useEffect, useState } from "react";
import { BsEnvelopeFill, BsFillPersonFill, BsFillPersonLinesFill, BsLockFill } from "react-icons/bs";
import Alert from "../../../components/alert/Alert";
import "../../../styles/StyleAuth.css";
import { deleteUser, getUserData, putUser } from "../../../services/AuthService"
import { removeToken } from "../../../services/TokenService";
import { useNavigate } from "react-router-dom";
import ConfirmModal from "../../../components/confirm-modal/ConfirmModal";

function UserData() {

    const navigate = useNavigate()
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [alertVisible, setAlertVisible] = useState(false)
    const [alertText, setAlertText] = useState('')
    const [visibleLoading, setVisibleLoading] = useState(false)

    useEffect(() => {
        getUserData().then(userData => {
            setEmail(userData.email)
            setName(userData.name)
        })
    }, [])

    async function updateUserData() {

        if (!email || !name) {
            setAlertText("Don't leave empty fields")
            setAlertVisible(true)
            return
        }

        setVisibleLoading(true)
        const response = await putUser({ email, name })
        setVisibleLoading(false)

        setAlertText(response)
        setAlertVisible(true)

    }

    async function updateUserPassword() {

        if (!password || !confirmPassword) {
            setAlertText("Don't leave empty fields")
            setAlertVisible(true)
            return
        }

        if (password !== confirmPassword) {
            setAlertText("Passwords do not match")
            setAlertVisible(true)
            return
        }

        setVisibleLoading(true)
        const response = await putUser({ password })
        setVisibleLoading(false)

        setAlertText(response)
        setAlertVisible(true)

    }

    return (
        <div>

            <Alert setVisible={setAlertVisible} visible={alertVisible} text={alertText} />
            {visibleLoading && <Progress type="points" />}

            <form className="formAuth">
                <BsFillPersonFill className='userIconForm' />
                <h3>User data</h3>

                <Input
                    fullWidth
                    id='email'
                    label="Email"
                    type="email"
                    bordered
                    color="primary"
                    placeholder="exemple@email.com"
                    value={email}
                    onChange={event => setEmail(event.target.value)}
                    contentLeft={<BsEnvelopeFill />}
                />

                <Input
                    fullWidth
                    id='name'
                    label="Name"
                    type="text"
                    bordered
                    color="primary"
                    placeholder="Fulano"
                    value={name}
                    onChange={event => setName(event.target.value)}
                    contentLeft={<BsFillPersonLinesFill />}
                />

                <Button flat onPress={updateUserData}>Update</Button>

            </form>

            <form className="formAuth">

                <h3>Update password</h3>

                <Input.Password
                    fullWidth
                    label="Password"
                    placeholder="user12345"
                    bordered
                    color="primary"
                    onChange={event => setPassword(event.target.value)}
                    contentLeft={<BsLockFill />}
                />

                <Input.Password
                    fullWidth
                    label="Password"
                    placeholder="user12345"
                    bordered
                    color="primary"
                    onChange={event => setConfirmPassword(event.target.value)}
                    contentLeft={<BsLockFill />}
                />

                <Button flat onPress={updateUserPassword}>Update</Button>

            </form>

            <div className="formAuth">

                <ConfirmModal
                    title="Delete account"
                    text="If you delete this account, all your data will be permanently deleted. Do you really want to delete?"
                    action={async () => {
                        await deleteUser()
                        navigate("/login")
                    }}
                    showButton={({ click }) => (
                        <Button color='error' onPress={click} flat>Delete account</Button>
                    )}
                />

                <hr />
                <Button
                    color='error'
                    onPress={() => {
                        removeToken()
                        navigate("/login")
                    }}
                    flat>
                    Exit
                </Button>
                
            </div>

        </div>);
}

export default UserData;