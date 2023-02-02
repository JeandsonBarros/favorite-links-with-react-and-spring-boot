import { Button, Input, Loading } from "@nextui-org/react";
import { useState } from "react";
import { BsEnvelopeFill, BsFillPersonFill, BsFillPersonLinesFill, BsLockFill } from "react-icons/bs";
import { Link, useNavigate } from "react-router-dom";
import Alert from "../../../components/alert/Alert";
import { userResgister } from "../../../services/AuthService";
import "../../../styles/StyleAuth.css";

function Register() {

    const navigate = useNavigate()
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [alertVisible, setAlertVisible] = useState(false)
    const [alertText, setAlertText] = useState('')
    const [visibleLoading, setVisibleLoading] = useState(false)

    async function registerUser(event) {
        event.preventDefault()

        if (!email || !password || !name || !confirmPassword) {
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
        const response = await userResgister(email, password, name)
        setVisibleLoading(false)

        if (response === "authenticated") {
            setAlertVisible(false)
            return navigate('/')
        }

        setAlertText(response)
        setAlertVisible(true)

    }

    return (

        <div >
            <form onSubmit={registerUser} className="formAuth">

                <BsFillPersonFill className='userIconForm' />
                <h1>Register</h1>

                <Alert setVisible={setAlertVisible} visible={alertVisible} text={alertText} />
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

                <Input
                    fullWidth
                    id='name'
                    label="Name"
                    type="text"
                    bordered
                    color="primary"
                    placeholder="Fulano"
                    onChange={event => setName(event.target.value)}
                    contentLeft={<BsFillPersonLinesFill />}
                />

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

                <Button css={{ mt: 20 }} shadow type='submit'>Register</Button>
                <Link to="/login">Login</Link>

            </form>

        </div>

    );
}

export default Register;