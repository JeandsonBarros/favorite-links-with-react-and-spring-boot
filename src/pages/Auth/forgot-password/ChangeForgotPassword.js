import { Button, Input, Progress, Row } from "@nextui-org/react";
import { useEffect, useState } from "react";
import { BsEnvelopeFill, BsLockFill } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import Alert from "../../../components/alert/Alert";
import { TiSortNumerically } from "react-icons/ti";
import { changeForgottenPassword, login } from "../../../services/AuthService";

function ChangeForgotPassword() {

    const navigate = useNavigate()
    const [email, setEmail] = useState()
    const [newPassword, setNewPassword] = useState()
    const [confirmNewPassword, setConfirmNewPassword] = useState()
    const [recoveryCode, setRecoveryCode] = useState()
    const [alert, setAlert] = useState({ visible: false, text: '' })
    const [visibleLoading, setVisibleLoading] = useState(false)
    const [contProgress, setContProgress] = useState(0)

    async function changePassword() {

        if (!email || !newPassword || !recoveryCode || !confirmNewPassword) {
            setAlert({ visible: true, text: "Don't leave empty fields" })
            return
        }

        if (newPassword !== confirmNewPassword) {
            setAlert({ visible: true, text: "Passwords do not match" })
            return
        }

        setVisibleLoading(true)
        const response = await changeForgottenPassword(email, newPassword, recoveryCode)
        setVisibleLoading(false)

        setAlert({ visible: true, text: response })

        if (response === 'updated password') {
            const loginResponse = await login(email, newPassword)
            if (loginResponse === 'authenticated') {
                let cont = 0
                setInterval(() => {
                    cont += 20
                    setContProgress(cont)
                    if (cont === 100) navigate('/')
                }, 1000)
            }
        }


    }

    return (
        <div>
            <form className='formAuth'>

                <Alert onClosed={() => setAlert({ visible: false, text: '' })} visible={alert.visible} text={alert.text} />

                {
                    contProgress >= 20 &&
                    <>
                        <h3>Logging in</h3>
                        <Progress
                            value={contProgress}
                            color="primary"
                            status="primary"
                        />
                    </>
                }
                {
                    visibleLoading &&
                    <Progress
                        indeterminated
                        value={30}
                        color="primary"
                        status="primary"
                    />
                }

                <h2>Change forgotten password</h2>

                <Input
                    fullWidth
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
                    label="Recovery code"
                    type="number"
                    bordered
                    color="primary"
                    placeholder="12345678"
                    onChange={event => setRecoveryCode(event.target.value)}
                    contentLeft={<TiSortNumerically />}
                />

                <Input.Password
                    fullWidth
                    label="Password"
                    placeholder="user12345"
                    bordered
                    color="primary"
                    onChange={event => setNewPassword(event.target.value)}
                    contentLeft={<BsLockFill />}
                />

                <Input.Password
                    fullWidth
                    label="Password"
                    placeholder="user12345"
                    bordered
                    color="primary"
                    onChange={event => setConfirmNewPassword(event.target.value)}
                    contentLeft={<BsLockFill />}
                />

                <Row wrap="wrap">
                    <Button
                        auto
                        flat
                        shadow
                        css={{ m: 10 }}
                        onPress={changePassword}
                    >
                        Change
                    </Button>
                    <Button
                        auto
                        flat
                        shadow
                        color="secondary"
                        css={{ m: 10 }}
                        onPress={() => navigate("/forgot-password")}
                    >
                        Resend code
                    </Button>
                    <Button
                        auto
                        color="error"
                        flat
                        shadow
                        css={{ m: 10 }}
                        onPress={() => navigate("/login")}>
                        Cancel
                    </Button>
                </Row>

            </form>

        </div >
    );
}

export default ChangeForgotPassword;