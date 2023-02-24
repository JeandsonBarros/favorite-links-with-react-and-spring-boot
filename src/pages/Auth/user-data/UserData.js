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
    const [alert, setAlert] = useState({ visible: false, text: '' })
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

        setAlert({ visible: true, text: data })

    }

    async function updateUserData() {

        if (!email || !name)
            return setAlert({ visible: true, text: "Don't leave empty fields" })

        setVisibleLoading(true)
        const response = await patchUser({ email, name })
        setVisibleLoading(false)

        setAlert({ visible: true, text: response })

    }

    async function updateUserPassword() {

        if (!password || !confirmPassword)
            return setAlert({ visible: true, text: "Don't leave empty fields" })

        if (password !== confirmPassword)
            return setAlert({ visible: true, text: "Passwords do not match" })

        setVisibleLoading(true)
        const response = await patchUser({ password })
        setVisibleLoading(false)

        setAlert({ visible: true, text: response })

    }

    return (
        <div>

            <Alert
                onClosed={() => setAlert({ visible: false, text: '' })}
                visible={alert.visible}
                text={alert.text}
            />

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
                        <Button color='error' css={{ margin: '30px auto' }} onPress={click} flat>Delete account</Button>
                    )}
                />

            </div>

        </div>);
}

export default UserData;