import '../../../styles/StyleAuth.css';

import { Button, Input, Progress } from '@nextui-org/react';
import { useEffect, useState } from 'react';
import { BsEnvelopeFill, BsFillPersonFill, BsFillPersonLinesFill, BsLockFill } from 'react-icons/bs';
import { useNavigate } from 'react-router-dom';

import Alert from '../../../components/alert/Alert';
import ConfirmModal from '../../../components/confirm-modal/ConfirmModal';
import { deleteUser, getUserData, patchUser } from '../../../services/AuthService';

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
        showUserData()
    }, [])

    async function showUserData() {

        setVisibleLoading(true)
        const data = await getUserData()
        setVisibleLoading(false)

        if (typeof (data) === 'object') {
            setEmail(data.email)
            setName(data.name)
            return
        }

        setAlertText(data)
        setAlertVisible(true)

    }

    async function updateUserData() {

        if (!email || !name) {
            setAlertText("Don't leave empty fields")
            setAlertVisible(true)
            return
        }

        setVisibleLoading(true)
        const response = await patchUser({ email, name })
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
        const response = await patchUser({ password })
        setVisibleLoading(false)

        setAlertText(response)
        setAlertVisible(true)

    }

    return (
        <div>

            <Alert setVisible={setAlertVisible} visible={alertVisible} text={alertText} />
            {visibleLoading &&
                <Progress
                    indeterminated
                    value={50}
                    color="primary"
                    status="primary"
                />}

            <form className="formAuth">
                <BsFillPersonFill className='userIconForm' />
                <h3>User data update</h3>

                <Input
                    fullWidth
                    id='email'
                    label="Email"
                    type="email"
                    bordered
                    color="primary"
                    placeholder="exemple@email.com"
                    initialValue={email}
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
                    initialValue={name}
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

            <div >

                <ConfirmModal
                    title="Delete account"
                    text="If you delete this account, all your data will be permanently deleted. Do you really want to delete?"
                    action={async () => {
                        await deleteUser()
                        navigate("/login")
                    }}
                    showButton={({ click }) => (
                        <Button color='error' css={{margin: '30px auto'}} onPress={click} flat>Delete account</Button>
                    )}
                />
               
            </div>

        </div>);
}

export default UserData;