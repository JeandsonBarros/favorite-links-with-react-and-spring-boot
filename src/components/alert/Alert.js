import { Button, Card, Row, Text } from "@nextui-org/react";

function Alert({visible, setVisible, text}) {
    return (
        <>
            {visible && <Card css={{ mt: 10 }}>
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