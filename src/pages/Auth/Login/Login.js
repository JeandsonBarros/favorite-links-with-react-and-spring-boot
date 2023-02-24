import { Button, Input, Loading } from '@nextui-org/react';
import { BsEnvelopeFill, BsFillPersonFill, BsLockFill } from "react-icons/bs";
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import "./StyleLogin.css";
import "../../../styles/StyleAuth.css";
import { login } from '../../../services/AuthService';
import Alert from '../../../components/alert/Alert';

function Login() {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const navigate = useNavigate()
    const [alert, setAlert] = useState({ visible: false, text: '' })
    const [visibleLoading, setVisibleLoading] = useState(false)

    async function loginUser(event) {
        event.preventDefault()

        if (!email || !password)
            return setAlert({ visible: true, text: "Don't leave empty fields" })

        setVisibleLoading(true)
        const response = await login(email, password)
        setVisibleLoading(false)

        if (response === "authenticated")
            return navigate('/')

        setAlert({ visible: true, text: response })

    }

    return (
        <div>

            <form onSubmit={loginUser} className='formAuth'>

                <BsFillPersonFill className='userIconForm' />
                <h1>Login</h1>

                <Alert
                    onClosed={() => setAlert({ visible: false, text: '' })}
                    visible={alert.visible}
                    text={alert.text}
                />

                {visibleLoading && <Loading type="points" />}

                <Input
                    fullWidth
                    id='email'
                    label="Email"
                    type="email"
                    bordered
                    color="primary"
                    placeholder="exemple@email.com"
                    onChange={event => setEmail(event.target.value)}
                    contentLeft={<BsEnvelopeFill />}
                />

                <div>
                    <Input.Password
                        id='password'
                        fullWidth
                        label="Password"
                        placeholder="user12345"
                        bordered
                        color="primary"
                        onChange={event => setPassword(event.target.value)}
                        contentLeft={<BsLockFill />}
                    />
                    <Link to="/forgot-password">Forgot password?</Link>
                </div>

                <Button css={{ mt: 20 }} shadow type='submit'>Login</Button>
                <Link to="/register">Register</Link>

            </form>

        </div>
    );
}

export default Login;