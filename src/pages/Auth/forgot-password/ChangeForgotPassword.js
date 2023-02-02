import { Button, Input, Progress, Row } from "@nextui-org/react";
import { useState } from "react";
import { BsEnvelopeFill, BsLockFill } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import Alert from "../../../components/alert/Alert";
import { TiSortNumerically } from "react-icons/ti";
import { changeForgottenPassword } from "../../../services/ForgotPasswordService";

function ChangeForgotPassword() {

    const navigate = useNavigate()
    const [email, setEmail] = useState()
    const [newPassword, setNewPassword] = useState()
    const [confirmNewPassword, setConfirmNewPassword] = useState()
    const [recoveryCode, setRecoveryCode] = useState()
    const [alertVisible, setAlertVisible] = useState(false)
    const [alertText, setAlertText] = useState('')
    const [visibleLoading, setVisibleLoading] = useState(false)

    async function changePassword() {

        if (!email || !newPassword || !recoveryCode || !confirmNewPassword) {
            setAlertText("Don't leave empty fields")
            alertVisible(true)
            return
        }

        if (newPassword !== confirmNewPassword) {
            setAlertText("Passwords do not match")
            setAlertVisible(true)
            return
        }

        setVisibleLoading(true)
        const response = await changeForgottenPassword(email, newPassword, recoveryCode)
        setVisibleLoading(false)

        setAlertText(response)
        setAlertVisible(true)
    }

    return (
        <div>
            <form className='formAuth'>

                <Alert setVisible={setAlertVisible} visible={alertVisible} text={alertText} />
                {visibleLoading && <Progress
                    indeterminated
                    value={50}
                    color="primary"
                    status="primary"
                />}

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