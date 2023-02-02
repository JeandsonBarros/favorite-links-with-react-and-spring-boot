import { Button, Card, Row, Text } from "@nextui-org/react";
import { useEffect } from "react";

function Alert({ visible, setVisible, text }) {

    useEffect(() => {

        if (visible)
            setTimeout(() => {
                setVisible(false)
            }, 4000)

    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [visible])

    return (
        <>
            {visible && <Card css={{
                m: 10,
                position: 'fixed',
                top: 20,
                right: 20,
                zIndex: 999,
                maxWidth: 400
            }}>
                <Card.Body>
                    <Row justify='space-between'>

                        <Text size={18} >{text}</Text>

                        {setVisible && <Button
                            color='error'
                            shadow
                            flat
                            auto
                            onPress={() => setVisible(false)}
                        >
                            X
                        </Button>}
                    </Row>
                </Card.Body>
            </Card>}
        </>
    );
}

export default Alert;