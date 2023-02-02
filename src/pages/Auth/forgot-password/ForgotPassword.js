import { Button, Input, Progress, Row } from "@nextui-org/react";
import { useState } from "react";
import { BsEnvelopeFill } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import Alert from "../../../components/alert/Alert";
import { sendCodeToResetPassword } from "../../../services/ForgotPasswordService";
import "../../../styles/StyleAuth.css";

function ForgotPassword() {

    const navigate = useNavigate()
    const [email, setEmail] = useState('')
    const [alertVisible, setAlertVisible] = useState(false)
    const [alertText, setAlertText] = useState('')
    const [visibleLoading, setVisibleLoading] = useState(false)

    async function sendEmail() {

        if (!email) {
            setAlertText("Enter an email!")
            alertVisible(true)
            return
        }

        setVisibleLoading(true)
        const response = await sendCodeToResetPassword(email)
        setVisibleLoading(false)

        if (response === 201) {
            setAlertText("Email successfully sent")
            setAlertVisible(true)
            setTimeout(()=>navigate("/change-forgot-password"), 2000)
            return
        }

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

                <h2>Send code to reset password</h2>
                <span>A code valid for 15 minutes will be sent to your email.</span>

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

                <Row wrap="wrap">
                    <Button
                        auto
                        flat
                        shadow
                        css={{ mr: 15 }}
                        onPress={sendEmail}
                    >
                        Send
                    </Button>
                    <Button
                        auto
                        flat
                        shadow
                        color="secondary"
                        css={{ mr: 15 }}
                        onPress={() => navigate("/change-forgot-password")}
                    >
                        Use recovery code
                    </Button>
                    <Button
                        auto
                        color="error"
                        flat
                        shadow
                        onPress={() => navigate("/login")}>
                        Cancel
                    </Button>
                </Row>

            </form>

        </div >
    );
}

export default ForgotPassword;